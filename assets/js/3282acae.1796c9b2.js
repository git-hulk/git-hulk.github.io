"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9223],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return k}});var n=r(7294);function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,p=function(e,t){if(null==e)return{};var r,n,p={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(p[r]=e[r]);return p}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(p[r]=e[r])}return p}var u=n.createContext({}),i=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=i(e.components);return n.createElement(u.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,p=e.mdxType,a=e.originalType,u=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=i(r),k=p,f=s["".concat(u,".").concat(k)]||s[k]||m[k]||a;return r?n.createElement(f,l(l({ref:t},c),{},{components:r})):n.createElement(f,l({ref:t},c))}));function k(e,t){var r=arguments,p=t&&t.mdxType;if("string"==typeof e||p){var a=r.length,l=new Array(a);l[0]=s;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=e,o.mdxType="string"==typeof e?e:p,l[1]=o;for(var i=2;i<a;i++)l[i]=r[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},5565:function(e,t,r){r.r(t),r.d(t,{assets:function(){return c},contentTitle:function(){return u},default:function(){return k},frontMatter:function(){return o},metadata:function(){return i},toc:function(){return m}});var n=r(7462),p=r(3366),a=(r(7294),r(3905)),l=["components"],o={title:"php consumergroup \u4ecb\u7ecd",slug:"posts-opensource-intro-consumergroup",tags:["PHP","Kafka"]},u=void 0,i={permalink:"/posts-opensource-intro-consumergroup",source:"@site/blog/2016-12-27-intro-php-conusmergroup.md",title:"php consumergroup \u4ecb\u7ecd",description:"\u77e5\u9053\u6216\u8005\u719f\u6089 kafka(\u4e0d\u662f\u5199\u5c0f\u8bf4\u7684\u90a3\u4e2a\u5361\u592b\u5361)\uff0c \u90a3\u4e48\u4e00\u5b9a\u77e5\u9053\u5b83\u6709 producer \u548c consumer \u8fd9\u4e24\u79cd\u89d2\u8272\u3002producer \u7528\u6765\u751f\u4ea7\u6d88\u606f\uff0cconsumer \u7528\u6765\u6d88\u8d39\u6d88\u606f\u3002",date:"2016-12-27T00:00:00.000Z",formattedDate:"December 27, 2016",tags:[{label:"PHP",permalink:"/tags/php"},{label:"Kafka",permalink:"/tags/kafka"}],readingTime:4.82,truncated:!1,authors:[],frontMatter:{title:"php consumergroup \u4ecb\u7ecd",slug:"posts-opensource-intro-consumergroup",tags:["PHP","Kafka"]},prevItem:{title:"Redis 4.0 \u6a21\u5757\u529f\u80fd",permalink:"/posts-redis-module"},nextItem:{title:"tcpkit \u4ecb\u7ecd",permalink:"/posts-intro-tcpkit"}},c={authorsImageUrls:[]},m=[{value:"1) \u53ef\u7528\u6027",id:"1-\u53ef\u7528\u6027",level:3},{value:"2\uff09\u6d88\u8d39\u8005\u7684\u53ef\u7528\u6027",id:"2\u6d88\u8d39\u8005\u7684\u53ef\u7528\u6027",level:3},{value:"3) \u5c34\u5c2c\u7684 php",id:"3-\u5c34\u5c2c\u7684-php",level:3},{value:"4) \u529f\u80fd\u548c\u4ee3\u7801\u8bf4\u660e",id:"4-\u529f\u80fd\u548c\u4ee3\u7801\u8bf4\u660e",level:3},{value:"5\uff09\u6700\u540e",id:"5\u6700\u540e",level:3}],s={toc:m};function k(e){var t=e.components,r=(0,p.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u77e5\u9053\u6216\u8005\u719f\u6089 kafka(\u4e0d\u662f\u5199\u5c0f\u8bf4\u7684\u90a3\u4e2a\u5361\u592b\u5361)\uff0c \u90a3\u4e48\u4e00\u5b9a\u77e5\u9053\u5b83\u6709 producer \u548c consumer \u8fd9\u4e24\u79cd\u89d2\u8272\u3002producer \u7528\u6765\u751f\u4ea7\u6d88\u606f\uff0cconsumer \u7528\u6765\u6d88\u8d39\u6d88\u606f\u3002"),(0,a.kt)("h3",{id:"1-\u53ef\u7528\u6027"},"1) \u53ef\u7528\u6027"),(0,a.kt)("p",null,"\u4e0b\u9762\u662f\u6765\u81ea\u7ef4\u57fa\u767e\u79d1\u7684\u89e3\u91ca:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5728\u4e00\u4e2a\u7ed9\u5b9a\u7684\u65f6\u95f4\u95f4\u9694\u5185\uff0c\u5bf9\u4e8e\u4e00\u4e2a\u529f\u80fd\u4e2a\u4f53\u6765\u8bb2\uff0c\u603b\u7684\u53ef\u7528\u65f6\u95f4\u6240\u5360\u7684\u6bd4\u4f8b")),(0,a.kt)("p",null,"\u6bd4\u5982\u6211\u4eec\u4ee5\u5e74\u4e3a\u5355\u4f4d\u6765\u91cf\u5316\u4e00\u4e2a\u670d\u52a1\u7684\u53ef\u7528\u6027\u3002\u5047\u8bbe\u4e00\u5e74 365 \u5929\u5f53\u4e2d\u6709 364 \u5929\u670d\u52a1\u662f\u6b63\u5e38\u670d\u52a1\u7684\uff0c\u90a3\u4e48\u6211\u4eec\u5c31\u8bf4\u8fd9\u4e2a\u670d\u52a1\u7684\u53ef\u7528\u6027\u662f 364/365(\u7528\u8ba1\u7b97\u5668\u53e3\u7b97\u4e86\u4e00\u4e0b\u7ea6 99.72%)\u3002"),(0,a.kt)("p",null,"\u6211\u4eec\u5e38\u7528\u51e0\u4e2a 9 \u6765\u8861\u91cf\u4e00\u4e2a\u670d\u52a1\u7684\u53ef\u7528\u6027\uff0c\u4e24\u4e2a 9 \u5c31\u662f 99.99%\uff0c\u4e09\u4e2a 9 \u5373 99.999%, \u56db\u4e2a 9 \u5373 99.9999% ... \u4ee5\u6b64\u7c7b\u63a8\u3002"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"\u53ef\u7528\u6027"),(0,a.kt)("th",{parentName:"tr",align:null},"\u6bcf\u5e74\u5b95\u673a\u65f6\u95f4"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"99.9%"),(0,a.kt)("td",{parentName:"tr",align:null},"8 \u4e2a\u5c0f\u65f6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"99.99%"),(0,a.kt)("td",{parentName:"tr",align:null},"1 \u4e2a\u5c0f\u65f6")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"99.999%"),(0,a.kt)("td",{parentName:"tr",align:null},"5 \u5206\u949f")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"99.9999%"),(0,a.kt)("td",{parentName:"tr",align:null},"30 \u79d2")))),(0,a.kt)("h3",{id:"2\u6d88\u8d39\u8005\u7684\u53ef\u7528\u6027"},"2\uff09\u6d88\u8d39\u8005\u7684\u53ef\u7528\u6027"),(0,a.kt)("p",null,"\u4e00\u822c\u6765\u8bf4 producer \u662f\u5d4c\u5165\u5230\u4e1a\u52a1\u7a0b\u5e8f\uff0c\u90a3\u4e48\u53ef\u7528\u6027\u5c31\u7531\u4e1a\u52a1\u7a0b\u5e8f\u6765\u4fdd\u8bc1\u3002\u800c consumer \u4e00\u822c\u5c31\u662f\u4ee5\u72ec\u7acb\u7684\u7a0b\u5e8f\u5b58\u5728\uff0c\u90a3\u4e48\u5c31\u8981\u81ea\u5df1\u6765\u4fdd\u8bc1\u3002"),(0,a.kt)("p",null,"\u6240\u4ee5\u60f3\u8ba9 consumer \u505a\u5230 99.99% \u4ee5\u4e0a\u7684\u53ef\u7528\u6027\uff0c\u610f\u5473\u7740\u4e00\u5e74\u5185\u670d\u52a1\u6302\u6389\u7684\u65f6\u95f4\u4e0d\u80fd\u8d85\u8fc7\u4e00\u4e2a\u5c0f\u65f6\u3002\u5047\u8bbe\u6211\u4eec\u6ca1\u6709\u5b9e\u73b0\u4e00\u4e9b\u9ad8\u53ef\u7528\u7684\u673a\u5236\uff0c\u90e8\u5206 consumer \u5728\u534a\u591c\u6302\u4e86\uff0c\u800c\u4f60(\u6216\u8005\u8fd0\u7ef4)\u521a\u597d\u5e72\u5b8c\u4e00\u4e9b\u4e0d\u53ef\u63cf\u8ff0\u7684\u4e8b\u60c5\u4e4b\u540e\u5012\u5934\u5927\u7761\u800c\u6ca1\u6709\u6ce8\u610f\u5230\u62a5\u8b66\uff0c\u8fd9\u4e2a\u7cfb\u7edf\u7684\u53ef\u7528\u6027\u5c31\u8fbe\u4e0d\u5230\u8981\u6c42\u3002"),(0,a.kt)("p",null,"\u5f53\u524d scala, java, golang, c \u7248\u672c\u7684\u505a\u6cd5\u90fd\u662f\u76d1\u542c group \u7684 consumer \u5217\u8868\uff0c\u5982\u679c\u6709 consumer \u8fdb\u5165\u6216\u8005\u9000\u51fa\u90fd\u4f1a\u89e6\u53d1\u91cd\u65b0\u5206\u914d\u5206\u533a\uff0c\u628a\u5206\u533a\u5747\u8861\u5230\u5404\u4e2a consumer\u3002\u6240\u4ee5\u7406\u8bba\u4e0a\u6211\u4eec php \u7248\u672c\u4e5f\u53ef\u4ee5\u8fd9\u6837\u505a\u3002\u73b0\u5728\u5df2\u6709\u7684\u5f00\u6e90\u91cc\u9762\u6709 kafka \u548c zookeeper \u7684\u5ba2\u6237\u7aef\u6269\u5c55\u548c\u4f9d\u8d56\u5e93\uff0c\u4f46\u6ca1\u6709\u5b9e\u73b0\u81ea\u52a8\u5e73\u8861\u7684\u903b\u8f91\uff08\u4e5f\u53ef\u80fd\u662f\u6211\u6ca1\u770b\u5230), \u6240\u4ee5\u8fd9\u90e8\u5206\u9700\u8981\u81ea\u5df1\u6765\u505a\u3002"),(0,a.kt)("h3",{id:"3-\u5c34\u5c2c\u7684-php"},"3) \u5c34\u5c2c\u7684 php"),(0,a.kt)("p",null,"\u8fd9\u91cc\u5fc5\u987b\u5148\u627f\u8ba4 php \u662f\u4e16\u754c\u4e0a\u6700\u597d\u7684\u8bed\u8a00\u3002"),(0,a.kt)("p",null,"php \u8981\u5b9e\u73b0 consumer \u7684\u9ad8\u53ef\u7528\u6709\u4e09\u4e2d\u9009\u62e9:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5f00\u542f php \u7ebf\u7a0b\u6269\u5c55"),(0,a.kt)("li",{parentName:"ul"},"c \u5b9e\u73b0 group \u903b\u8f91"),(0,a.kt)("li",{parentName:"ul"},"\u4e0d\u4f7f\u7528\u591a\u7ebf\u7a0b\uff0c\u8fb9\u6d88\u8d39\u8fb9\u76d1\u63a7")),(0,a.kt)("p",null,"\u7b2c\u4e00\u79cd\u65b9\u6848\uff0c\u56e0\u4e3a\u6211\u4eec\u7ebf\u4e0a php \u73af\u5883\u90fd\u662f\u6ca1\u6709\u6253\u5f00\u7ebf\u7a0b\u5b89\u5168, \u6240\u4ee5\u5982\u679c\u8981\u4f7f\u7528\u8fd9\u4e2a\u6269\u5c55\u9700\u8981\u91cd\u65b0\u7f16\u8bd1 php \u6838\u5fc3\u4ee3\u7801\u5e76\u91cd\u542f\u6240\u6709\u670d\u52a1\uff0c\u8fd9\u4e2a\u57fa\u672c\u662f\u65e0\u6cd5\u63a5\u53d7\u7684\u3002"),(0,a.kt)("p",null,"\u7b2c\u4e8c\u79cd\u65b9\u6848\uff0c\u53ef\u4ee5\u4e0d\u7528\u91cd\u65b0\u7f16\u8bd1 php, \u6027\u80fd\u597d\u3002\u4f46\u5f00\u53d1\u6210\u672c\u6bd4\u8f83\u9ad8\uff0c\u98ce\u9669\u5927\u3002"),(0,a.kt)("p",null,"\u7b2c\u4e09\u79cd\u65b9\u6848, \u7eaf php \u5b9e\u73b0\uff0c\u4ee3\u7801\u7b80\u5355\u53ef\u63a7\uff0c\u4f46\u6027\u80fd\u4f1a\u6bd4\u8f83\u5dee\u4e00\u4e9b\u3002"),(0,a.kt)("p",null,"\u6700\u540e\u6211\u4eec\u9009\u62e9\u4e86\u7b2c\u4e09\u79cd\u65b9\u6848\uff0c\u5355\u8fdb\u7a0b\u7a7a\u8dd1(\u53ea\u62c9\u6d88\u606f\u4e0d\u5904\u7406)\u7684\u6027\u80fd\u662f 7w+/s\uff0c \u8fd9\u4e2a\u662f\u53ef\u4ee5\u63a5\u53d7\u7684\u3002"),(0,a.kt)("h3",{id:"4-\u529f\u80fd\u548c\u4ee3\u7801\u8bf4\u660e"},"4) \u529f\u80fd\u548c\u4ee3\u7801\u8bf4\u660e"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5206\u533a\u53d8\u5316\u65f6\u53ef\u81ea\u52a8\u91cd\u65b0\u5206\u914d\u5206\u533a"),(0,a.kt)("li",{parentName:"ul"},"\u6d88\u8d39\u8fdb\u7a0b\u9000\u51fa\u6216\u8005\u52a0\u5165\u65f6\u53ef\u81ea\u52a8\u91cd\u65b0\u5206\u914d\u5206\u533a"),(0,a.kt)("li",{parentName:"ul"},"\u81ea\u52a8\u7ba1\u7406 offset"),(0,a.kt)("li",{parentName:"ul"},"\u517c\u5bb9\u6807\u51c6\u7684 consumer group \u8def\u5f84\uff0c\u65b9\u4fbf\u5df2\u6709\u7684\u5de5\u5177\u76d1\u63a7"),(0,a.kt)("li",{parentName:"ul"},"\u63a5\u6536\u7528\u6237\u4fe1\u53f7\uff0c\u5e73\u6ed1\u8fdb\u5165\u548c\u9000\u51fa group"),(0,a.kt)("li",{parentName:"ul"},"\u5141\u8bb8\u5197\u4f59\u7684\u6d88\u8d39\u8fdb\u7a0b\u4f5c\u4e3a\u5907\u4efd")),(0,a.kt)("p",null,"github \u5730\u5740: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/meitu/php-kafka-consumer"},"https://github.com/meitu/php-kafka-consumer")),(0,a.kt)("p",null,"\u5f53\u524d\u6211\u4eec\u516c\u53f8(\u7f8e\u56fe)\u5185\u90e8\u5df2\u7ecf\u6709\u4e0d\u5c11\u4e1a\u52a1\u5df2\u7ecf\u5728\u7ebf\u4e0a\u4f7f\u7528\uff0c\u5f53\u524d\u7248\u672c\u5df2\u7ecf\u6bd4\u8f83\u7a33\u5b9a\u3002"),(0,a.kt)("h3",{id:"5\u6700\u540e"},"5\uff09\u6700\u540e"),(0,a.kt)("p",null,"\u524d\u4e00\u6bb5\u65f6\u95f4\u53d1\u73b0\u7ebf\u4e0a consumer \u5185\u5b58\u4e0d\u65ad\u4e0a\u5347\u7684\u60c5\u51b5\uff0c\u7ecf\u6392\u67e5\uff0c\u6700\u7ec8\u5b9a\u4f4d\u5e76\u9a8c\u8bc1\u662f\u4f9d\u8d56\u5e93\u7684 php-zookeeper \u6709\u5185\u5b58\u6cc4\u6f0f\u3002\u73b0\u5728\u5df2\u7ecf\u53cd\u9988\u4ee5\u53ca\u5408\u5e76\u5230\u793e\u533a\u7684 master, \u5177\u4f53\u89c1 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/php-zookeeper/php-zookeeper/pull/5"},"pr"),"\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u4f7f\u7528 release(\u5efa\u8bae) \u7248\u672c\u7684 php-zookeeper, \u9700\u8981\u624b\u52a8 patch \u8fd9\u4e2a bug\uff0c\u5426\u5219\u4f1a\u9020\u6210\u5185\u5b58\u6cc4\u6f0f\u3002"),(0,a.kt)("p",null,"\u5982\u679c\u6709\u95ee\u9898\u6216\u8005\u4efb\u4f55\u610f\u89c1\uff0c\u6b22\u8fce issue \u6216\u8005 pr\u3002"))}k.isMDXComponent=!0}}]);