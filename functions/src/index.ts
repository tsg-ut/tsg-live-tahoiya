import * as cors from 'cors';
import * as express from 'express';
import {check, validationResult} from 'express-validator';
import {initializeApp, firestore, auth as firebase_auth} from 'firebase-admin';
import { https } from 'firebase-functions';

initializeApp();
const db = firestore();
const auth = firebase_auth();

const endCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		next();
		return;
	}
	res.status(400);
	res.json({errors: errors.array()});
};

const validateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const token = await auth.verifyIdToken(req.body.token);
	req.body.uid = token.uid;
	next();
};

const adminOnly = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const userRef = db.collection('tsglive_tahoiya_users').doc(req.body.uid);
	const user = await userRef.get();
	if (user.get('admin') === true) {
		next();
		return;
	}
	res.status(403);
	res.json({errors: ['Admin only']});
};

const app = express();

app.use(cors({origin: true}));

app.get('/', (req, res) => {
	res.send('Hello!');
});

app.post('/tahoiya/theme',
	check('token').isString().not().isEmpty(),
	check('word').isString().not().isEmpty(),
	check('ruby').isString().not().isEmpty(),
	check('description').isString().not().isEmpty(),
	check('meaning').isString().not().isEmpty(),
	endCheck,
	validateToken,
	adminOnly,
	async (req, res) => {
		const {word, ruby, meaning, description} = req.body;

		const date = new Date();

		await db.collection('tsglive_tahoiya_themes').add({
			word,
			ruby,
			meaning,
			description,
			date,
		});

		res.send('Success');
	});

app.patch('/tahoiya/theme',
	check('token').isString().not().isEmpty(),
	check('id').isString().not().isEmpty(),
	check('word').isString().not().isEmpty(),
	check('ruby').isString().not().isEmpty(),
	check('description').isString().not().isEmpty(),
	check('meaning').isString().not().isEmpty(),
	endCheck,
	validateToken,
	adminOnly,
	async (req, res) => {
		const {id, word, ruby, meaning, description} = req.body;

		const docRef = db.collection('tsglive_tahoiya_themes').doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		await docRef.update({
			word,
			ruby,
			meaning,
			description,
		});

		res.send('Success');
	});

app.delete('/tahoiya/theme',
	check('token').isString().not().isEmpty(),
	check('id').isString().not().isEmpty(),
	endCheck,
	validateToken,
	adminOnly,
	async (req, res) => {
		const {id} = req.body;
		const docRef = db.collection('tsglive_tahoiya_themes').doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		await docRef.delete();

		res.send('Success');
	});

app.post('/tahoiya/meaning',
	check('token').isString().not().isEmpty(),
	check('theme_id').isString().not().isEmpty(),
	check('text').isString().not().isEmpty(),
	check('username').isString().not().isEmpty(),
	endCheck,
	validateToken,
	async (req, res) => {
		const {theme_id, text, username, uid} = req.body;

		const themeRef = db.collection('tsglive_tahoiya_themes').doc(theme_id);
		const theme = await themeRef.get();

		if (!theme.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		const date = new Date();

		await db.collection('tsglive_tahoiya_meanings').add({
			themeId: theme_id,
			text,
			username,
			date,
			uid,
			isAccepted: false,
		});

		res.send('Success');
	});

app.delete('/tahoiya/meaning',
	check('token').isString().not().isEmpty(),
	check('id').isString().not().isEmpty(),
	endCheck,
	validateToken,
	adminOnly,
	async (req, res) => {
		const {id} = req.body;

		const docRef = db.collection('tsglive_tahoiya_meanings').doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		await docRef.delete();

		res.send('Success');
	});

app.post('/tahoiya/meaning/accept',
	check('token').isString().not().isEmpty(),
	check('meaning_id').isString().not().isEmpty(),
	endCheck,
	validateToken,
	adminOnly,
	async (req, res) => {
		const meaningRef = db.collection('tsglive_tahoiya_meanings').doc(req.body.meaning_id);
		const meaning = await meaningRef.get();

		if (!meaning.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		await meaningRef.update({
			isAccepted: true,
		});

		res.send('Success');
	});

app.delete('/tahoiya/meaning/accept',
	check('token').isString().not().isEmpty(),
	check('meaning_id').isString().not().isEmpty(),
	endCheck,
	validateToken,
	adminOnly,
	async (req, res) => {
		const meaningRef = db.collection('tsglive_tahoiya_meanings').doc(req.body.meaning_id);
		const meaning = await meaningRef.get();

		if (!meaning.exists) {
			res.status(404);
			res.send('Not Found');
			return;
		}

		await meaningRef.update({
			isAccepted: false,
		});

		res.send('Success');
	});

app.post('/comments', async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		res.send('Bad Request');
		return;
	}

	const text = req.body.text.toString().trim().slice(0, 140);
	const date = new Date();

	await db.collection('tsglive_audience_comments').add({
		text,
		date,
		headers: req.headers,
	});

	res.send(`Commented: ${text}`);
});

export const tsglive = https.onRequest(app);
