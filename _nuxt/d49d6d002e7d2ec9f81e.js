(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{191:function(t,e,n){var content=n(230);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(35).default)("06087d0b",content,!0,{sourceMap:!1})},229:function(t,e,n){"use strict";var r=n(191);n.n(r).a},230:function(t,e,n){(t.exports=n(34)(!1)).push([t.i,".index-icon{vertical-align:bottom}",""])},365:function(t,e,n){"use strict";n.r(e);n(43),n(19),n(14),n(12),n(33);var r=n(15),o=(n(61),n(20),n(36));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={props:{id:{type:String,default:null}},data:function(){return{themeId:null,word:"",ruby:"",meaning:"",description:"",dummyText:"",dummyUser:"",isSubmitting:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(source,!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(source).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)({getTheme:"tsgliveTahoiyaThemes/getTheme"}),{},Object(o.c)(["token"]),{meanings:function(){var t=this,e=this.$store.state.tsgliveTahoiyaMeanings.list.filter((function(e){return e.themeId===t.themeId}));return e}}),mounted:function(){var t;return regeneratorRuntime.async((function(e){for(;;)switch(e.prev=e.next){case 0:return this.themeId=this.id,e.next=3,regeneratorRuntime.awrap(Promise.all([this.$store.dispatch("tsgliveTahoiyaThemes/initList"),this.$store.dispatch("tsgliveTahoiyaMeanings/initList")]));case 3:if(null===this.id){e.next=11;break}return e.next=6,regeneratorRuntime.awrap(this.getTheme(this.id));case 6:t=e.sent,this.word=t.word,this.ruby=t.ruby,this.meaning=t.meaning,this.description=t.description;case 11:case"end":return e.stop()}}),null,this)},methods:{onSubmit:function(t){var e,data,n,r;return regeneratorRuntime.async((function(o){for(;;)switch(o.prev=o.next){case 0:if(!this.isSubmitting){o.next=2;break}return o.abrupt("return");case 2:if(t.preventDefault(),this.isSubmitting=!0,null!==this.id){o.next=14;break}return o.next=7,regeneratorRuntime.awrap(fetch("https://us-central1-tsg-live-5.cloudfunctions.net/tsglive/tahoiya/theme",{method:"POST",mode:"cors",body:new URLSearchParams({token:this.token,word:this.word,ruby:this.ruby,meaning:this.meaning,description:this.description})}));case 7:return e=o.sent,o.next=10,regeneratorRuntime.awrap(e.text());case 10:data=o.sent,console.log(data),o.next=21;break;case 14:return o.next=16,regeneratorRuntime.awrap(fetch("https://us-central1-tsg-live-5.cloudfunctions.net/tsglive/tahoiya/theme",{method:"PATCH",mode:"cors",body:new URLSearchParams({token:this.token,id:this.themeId,word:this.word,ruby:this.ruby,meaning:this.meaning,description:this.description})}));case 16:return n=o.sent,o.next=19,regeneratorRuntime.awrap(n.text());case 19:r=o.sent,console.log(r);case 21:this.$emit("submit"),this.isSubmitting=!1;case 23:case"end":return o.stop()}}),null,this)},onDelete:function(t){var e,data;return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(!this.isSubmitting){n.next=2;break}return n.abrupt("return");case 2:return t.preventDefault(),this.isSubmitting=!0,n.next=6,regeneratorRuntime.awrap(fetch("https://us-central1-tsg-live-5.cloudfunctions.net/tsglive/tahoiya/theme",{method:"DELETE",mode:"cors",body:new URLSearchParams({token:this.token,id:this.themeId})}));case 6:return e=n.sent,n.next=9,regeneratorRuntime.awrap(e.text());case 9:data=n.sent,console.log(data),this.isSubmitting=!1;case 12:case"end":return n.stop()}}),null,this)},onAddDummy:function(t){var e,data;return regeneratorRuntime.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(!this.isSubmitting){n.next=2;break}return n.abrupt("return");case 2:return t.preventDefault(),this.isSubmitting=!0,n.next=6,regeneratorRuntime.awrap(fetch("https://us-central1-tsg-live-5.cloudfunctions.net/tsglive/tahoiya/meaning",{method:"POST",mode:"cors",body:new URLSearchParams({token:this.token,theme_id:this.themeId,text:this.dummyText,username:this.dummyUser})}));case 6:return e=n.sent,n.next=9,regeneratorRuntime.awrap(e.text());case 9:data=n.sent,console.log(data),this.isSubmitting=!1,this.dummyText="",this.dummyUser="";case 14:case"end":return n.stop()}}),null,this)},onToggleAcceptDummy:function(t,e){var n,data;return regeneratorRuntime.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!this.isSubmitting){r.next=2;break}return r.abrupt("return");case 2:return e.preventDefault(),this.isSubmitting=!0,r.next=6,regeneratorRuntime.awrap(fetch("https://us-central1-tsg-live-5.cloudfunctions.net/tsglive/tahoiya/meaning/accept",{method:t.isAccepted?"DELETE":"POST",mode:"cors",body:new URLSearchParams({token:this.token,meaning_id:t.id})}));case 6:return n=r.sent,r.next=9,regeneratorRuntime.awrap(n.text());case 9:data=r.sent,console.log(data),this.isSubmitting=!1;case 12:case"end":return r.stop()}}),null,this)},onDeleteDummy:function(t,e){var n,data;return regeneratorRuntime.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(!this.isSubmitting){r.next=2;break}return r.abrupt("return");case 2:return e.preventDefault(),this.isSubmitting=!0,r.next=6,regeneratorRuntime.awrap(fetch("https://us-central1-tsg-live-5.cloudfunctions.net/tsglive/tahoiya/meaning",{method:"DELETE",mode:"cors",body:new URLSearchParams({token:this.token,id:t.id})}));case 6:return n=r.sent,r.next=9,regeneratorRuntime.awrap(n.text());case 9:data=r.sent,console.log(data),this.isSubmitting=!1;case 12:case"end":return r.stop()}}),null,this)}},head:function(){return{title:"TSG LIVE! たほいやシステム"}}},d=n(16);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var h={components:{ThemeControl:Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"ThemeControl",on:{submit:t.onSubmit}},[n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("単語")]),t._v(" "),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.word,expression:"word"}],staticClass:"input",attrs:{type:"text",disabled:t.isSubmitting},domProps:{value:t.word},on:{input:function(e){e.target.composing||(t.word=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("読み")]),t._v(" "),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.ruby,expression:"ruby"}],staticClass:"input",attrs:{type:"text",disabled:t.isSubmitting},domProps:{value:t.ruby},on:{input:function(e){e.target.composing||(t.ruby=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("正しい意味")]),t._v(" "),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.meaning,expression:"meaning"}],staticClass:"input",attrs:{type:"text",disabled:t.isSubmitting},domProps:{value:t.meaning},on:{input:function(e){e.target.composing||(t.meaning=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("解説 (Markdown)")]),t._v(" "),n("div",{staticClass:"control"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"textarea",attrs:{disabled:t.isSubmitting},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})])]),t._v(" "),null!==t.id?n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[t._v("ダミー選択肢")]),t._v(" "),n("div",{staticClass:"content"},[n("ul",t._l(t.meanings,(function(e){return n("li",{key:e.id},[n("span",{staticClass:"has-text-success"},[t._v(t._s(e.isAccepted?"✔":""))]),t._v("\n\t\t\t\t\t"+t._s(e.text)+" ("+t._s(e.username)+")\n\t\t\t\t\t"),n("button",{staticClass:"button is-link is-small",class:{"is-loading":t.isSubmitting},attrs:{type:"button",disabled:t.isSubmitting},on:{click:function(n){return t.onToggleAcceptDummy(e,n)}}},[t._v("\n\t\t\t\t\t\t"+t._s(e.isAccepted?"不採用":"採用")+"\n\t\t\t\t\t")]),t._v(" "),n("button",{staticClass:"button is-danger is-small",class:{"is-loading":t.isSubmitting},attrs:{type:"button",disabled:t.isSubmitting},on:{click:function(n){return t.onDeleteDummy(e,n)}}},[t._v("\n\t\t\t\t\t\t削除\n\t\t\t\t\t")])])})),0)]),t._v(" "),n("div",{staticClass:"field is-horizontal"},[n("div",{staticClass:"field-body"},[n("div",{staticClass:"field"},[n("p",{staticClass:"control is-expanded"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.dummyText,expression:"dummyText"}],staticClass:"input",attrs:{type:"text",placeholder:"意味",disabled:t.isSubmitting},domProps:{value:t.dummyText},on:{input:function(e){e.target.composing||(t.dummyText=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field"},[n("p",{staticClass:"control is-expanded"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.dummyUser,expression:"dummyUser"}],staticClass:"input",attrs:{type:"text",placeholder:"名前",disabled:t.isSubmitting},domProps:{value:t.dummyUser},on:{input:function(e){e.target.composing||(t.dummyUser=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"field"},[n("p",{staticClass:"control is-expanded"},[n("button",{staticClass:"button is-primary",class:{"is-loading":t.isSubmitting},attrs:{type:"button",disabled:t.isSubmitting},on:{click:t.onAddDummy}},[t._v("\n\t\t\t\t\t\t\tダミー追加\n\t\t\t\t\t\t")])])])])])]):t._e(),t._v(" "),n("div",{staticClass:"field is-grouped"},[n("div",{staticClass:"control"},[n("button",{staticClass:"button",class:{"is-loading":t.isSubmitting,"is-link":null!==t.id,"is-primary":null===t.id},attrs:{type:"submit",disabled:t.isSubmitting}},[t._v("\n\t\t\t\t"+t._s(null===t.id?"追加":"更新")+"\n\t\t\t")])]),t._v(" "),null!==t.id?n("div",{staticClass:"control"},[n("button",{staticClass:"button is-danger",class:{"is-loading":t.isSubmitting},attrs:{type:"button",disabled:t.isSubmitting},on:{click:t.onDelete}},[t._v("\n\t\t\t\t削除\n\t\t\t")])]):t._e()]),t._v(" "),n("hr")])}),[],!1,null,null,null).exports},data:function(){return{isAdding:!1}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(source,!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(source).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.c)({tahoiyaThemes:function(t){return t.tsgliveTahoiyaThemes.list.slice().sort((function(a,b){return a.date.seconds-b.date.seconds}))}})),mounted:function(){this.$store.dispatch("tsgliveTahoiyaThemes/initList")},methods:{onAdd:function(){this.isAdding=!0},onAddComplete:function(){this.isAdding=!1}},head:function(){return{title:"TSG LIVE! たほいやシステム"}}},v=(n(229),Object(d.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t._l(t.tahoiyaThemes,(function(t){return n("theme-control",{key:t.ruby,attrs:{id:t.id}})})),t._v(" "),t.isAdding?n("theme-control",{attrs:{id:null},on:{submit:t.onAddComplete}}):t._e(),t._v(" "),n("button",{staticClass:"button is-primary",attrs:{type:"submit"},on:{click:t.onAdd}},[t._v("\n\t\t追加\n\t")])],2)}),[],!1,null,null,null));e.default=v.exports}}]);