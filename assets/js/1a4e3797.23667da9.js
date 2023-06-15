"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7920],{8824:function(e,t,n){n.d(t,{c:function(){return o}});var r=n(7294),a=n(2263),l=["zero","one","two","few","many","other"];function u(e){return l.filter((function(t){return e.includes(t)}))}var c={locale:"en",pluralForms:u(["one","other"]),select:function(e){return 1===e?"one":"other"}};function s(){var e=(0,a.Z)().i18n.currentLocale;return(0,r.useMemo)((function(){try{return t=e,n=new Intl.PluralRules(t),{locale:t,pluralForms:u(n.resolvedOptions().pluralCategories),select:function(e){return n.select(e)}}}catch(r){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+r.message+"\n"),c}var t,n}),[e])}function o(){var e=s();return{selectMessage:function(t,n){return function(e,t,n){var r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error("For locale="+n.locale+", a maximum of "+n.pluralForms.length+" plural forms are expected ("+n.pluralForms.join(",")+"), but the message contains "+r.length+": "+e);var a=n.select(t),l=n.pluralForms.indexOf(a);return r[Math.min(l,r.length-1)]}(n,t,e)}}}},1473:function(e,t,n){n.r(t),n.d(t,{default:function(){return F}});var r=n(4165),a=n(5861),l=n(7294),u=n(2263),c=n(4690),s=n(5742),o=n(9960),i=n(5999),m=n(8824),h=n(6775),f=n(412);var p=function(){var e=(0,h.k6)(),t=(0,h.TH)(),n=(0,u.Z)().siteConfig.baseUrl;return{searchValue:f.Z.canUseDOM&&new URLSearchParams(t.search).get("q")||"",updateSearchPath:function(n){var r=new URLSearchParams(t.search);n?r.set("q",n):r.delete("q"),e.replace({search:r.toString()})},generateSearchPageLink:function(e){return n+"search?q="+encodeURIComponent(e)}}},d=n(22),g=n(8202),v=n(2539),y=n(726),E=n(1073),w=n(311),S="searchQueryInput_CFBF",b="searchResultItem_U687",I="searchResultItemPath_uIbk",P="searchResultItemSummary_oZHr",R=n(3926);function k(e){var t=e.searchResult,n=t.document,r=t.type,a=t.page,u=t.tokens,c=t.metadata,s=0===r,i=2===r,m=(s?n.b:a.b).slice(),h=i?n.s:n.t;return s||m.push(a.t),l.createElement("article",{className:b},l.createElement("h2",null,l.createElement(o.Z,{to:n.u+(n.h||""),dangerouslySetInnerHTML:{__html:i?(0,v.C)(h,u):(0,y.o)(h,(0,E.m)(c,"t"),u,100)}})),m.length>0&&l.createElement("p",{className:I},(0,R.e)(m)),i&&l.createElement("p",{className:P,dangerouslySetInnerHTML:{__html:(0,y.o)(n.t,(0,E.m)(c,"t"),u,100)}}))}var F=function(){var e=(0,u.Z)().siteConfig.baseUrl,t=(0,m.c)().selectMessage,n=p(),o=n.searchValue,h=n.updateSearchPath,f=(0,l.useState)(o),v=f[0],y=f[1],E=(0,l.useState)(),b=E[0],I=E[1],P=(0,l.useState)(),R=P[0],F=P[1],Z=(0,l.useMemo)((function(){return v?(0,i.I)({id:"theme.SearchPage.existingResultsTitle",message:'Search results for "{query}"',description:"The search page title for non-empty query"},{query:v}):(0,i.I)({id:"theme.SearchPage.emptyResultsTitle",message:"Search the documentation",description:"The search page title for empty query"})}),[v]);(0,l.useEffect)((function(){h(v),b&&(v?b(v,(function(e){F(e)})):F(void 0))}),[v,b]);var _=(0,l.useCallback)((function(e){y(e.target.value)}),[]);return(0,l.useEffect)((function(){o&&o!==v&&y(o)}),[o]),(0,l.useEffect)((function(){function t(){return(t=(0,a.Z)((0,r.Z)().mark((function t(){var n,a,l;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.w)(e);case 2:n=t.sent,a=n.wrappedIndexes,l=n.zhDictionary,I((function(){return(0,g.v)(a,l,100)}));case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e]),l.createElement(c.Z,null,l.createElement(s.Z,null,l.createElement("meta",{property:"robots",content:"noindex, follow"}),l.createElement("title",null,Z)),l.createElement("div",{className:"container margin-vert--lg"},l.createElement("h1",null,Z),l.createElement("input",{type:"search",name:"q",className:S,"aria-label":"Search",onChange:_,value:v,autoComplete:"off",autoFocus:!0}),!b&&v&&l.createElement("div",null,l.createElement(w.Z,null)),R&&(R.length>0?l.createElement("p",null,t(R.length,(0,i.I)({id:"theme.SearchPage.documentsFound.plurals",message:"1 document found|{count} documents found",description:'Pluralized label for "{count} documents found". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)'},{count:R.length}))):l.createElement("p",null,(0,i.I)({id:"theme.SearchPage.noResultsText",message:"No documents were found",description:"The paragraph for empty search result"}))),l.createElement("section",null,R&&R.map((function(e){return l.createElement(k,{key:e.document.i,searchResult:e})})))))}}}]);