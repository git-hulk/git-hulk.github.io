"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6167],{3905:function(e,t,l){l.d(t,{Zo:function(){return s},kt:function(){return d}});var n=l(7294);function r(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function a(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function i(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?a(Object(l),!0).forEach((function(t){r(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):a(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function u(e,t){if(null==e)return{};var l,n,r=function(e,t){if(null==e)return{};var l,n,r={},a=Object.keys(e);for(n=0;n<a.length;n++)l=a[n],t.indexOf(l)>=0||(r[l]=e[l]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)l=a[n],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(r[l]=e[l])}return r}var o=n.createContext({}),p=function(e){var t=n.useContext(o),l=t;return e&&(l="function"==typeof e?e(t):i(i({},t),e)),l},s=function(e){var t=p(e.components);return n.createElement(o.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var l=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),k=p(l),d=r,c=k["".concat(o,".").concat(d)]||k[d]||m[d]||a;return l?n.createElement(c,i(i({ref:t},s),{},{components:l})):n.createElement(c,i({ref:t},s))}));function d(e,t){var l=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=l.length,i=new Array(a);i[0]=k;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u.mdxType="string"==typeof e?e:r,i[1]=u;for(var p=2;p<a;p++)i[p]=l[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,l)}k.displayName="MDXCreateElement"},7117:function(e,t,l){l.r(t),l.d(t,{assets:function(){return s},contentTitle:function(){return o},default:function(){return d},frontMatter:function(){return u},metadata:function(){return p},toc:function(){return m}});var n=l(7462),r=l(3366),a=(l(7294),l(3905)),i=["components"],u={layout:"article",title:"\u7f8e\u56fe\u5f00\u6e90\u4efb\u52a1\u961f\u5217 - LMSTFY",slug:"posts-meitu-opensource-task-queue",tags:["LMSTFY","Queue","Redis"]},o=void 0,p={permalink:"/posts-meitu-opensource-task-queue",source:"@site/blog/2019-11-28-meitu-task-queue.md",title:"\u7f8e\u56fe\u5f00\u6e90\u4efb\u52a1\u961f\u5217 - LMSTFY",description:"lmstfy(Let Me Schedule Task For You) \u662f\u7f8e\u56fe\u67b6\u6784\u57fa\u7840\u670d\u52a1\u56e2\u961f\u5728 2018 \u5e74\u521d\u57fa\u4e8e Redis \u5b9e\u73b0\u7684\u7b80\u5355\u4efb\u52a1\u961f\u5217(Task Queue)\u670d\u52a1\uff0c\u76ee\u524d\u5728\u7f8e\u56fe\u591a\u4e2a\u7ebf\u4e0a\u4ea7\u54c1\u4f7f\u7528\u63a5\u8fd1\u4e24\u5e74\u7684\u65f6\u95f4\u3002\u4e3b\u8981\u63d0\u4f9b\u4ee5\u4e0b\u7279\u6027:",date:"2019-11-28T00:00:00.000Z",formattedDate:"November 28, 2019",tags:[{label:"LMSTFY",permalink:"/tags/lmstfy"},{label:"Queue",permalink:"/tags/queue"},{label:"Redis",permalink:"/tags/redis"}],readingTime:12.66,truncated:!0,authors:[],frontMatter:{layout:"article",title:"\u7f8e\u56fe\u5f00\u6e90\u4efb\u52a1\u961f\u5217 - LMSTFY",slug:"posts-meitu-opensource-task-queue",tags:["LMSTFY","Queue","Redis"]},prevItem:{title:"tcpkit \u4e00\u4e9b\u6539\u8fdb",permalink:"/posts-tcpkit-improvement"},nextItem:{title:"Redis 6 \u591a\u7ebf\u7a0b IO",permalink:"/posts-redis-thread-io"}},s={authorsImageUrls:[]},m=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",level:2},{value:"\u76ee\u6807\u4e0e\u8c03\u7814",id:"\u76ee\u6807\u4e0e\u8c03\u7814",level:2},{value:"\u8bbe\u8ba1\u548c\u5b9e\u73b0",id:"\u8bbe\u8ba1\u548c\u5b9e\u73b0",level:2},{value:"\u57fa\u7840\u6982\u5ff5",id:"\u57fa\u7840\u6982\u5ff5",level:3},{value:"\u6570\u636e\u5b58\u50a8",id:"\u6570\u636e\u5b58\u50a8",level:3},{value:"\u4efb\u52a1\u5199\u5165",id:"\u4efb\u52a1\u5199\u5165",level:3},{value:"\u4efb\u52a1\u6d88\u8d39",id:"\u4efb\u52a1\u6d88\u8d39",level:3},{value:"\u540c\u6b65\u4efb\u52a1\u6a21\u578b",id:"\u540c\u6b65\u4efb\u52a1\u6a21\u578b",level:3},{value:"\u5982\u4f55\u5b9e\u73b0\u6a2a\u5411\u6269\u5c55",id:"\u5982\u4f55\u5b9e\u73b0\u6a2a\u5411\u6269\u5c55",level:3},{value:"\u5982\u4f55\u4f7f\u7528",id:"\u5982\u4f55\u4f7f\u7528",level:2},{value:"\u76d1\u63a7\u6307\u6807",id:"\u76d1\u63a7\u6307\u6807",level:2},{value:"\u672a\u6765\u8ba1\u5212",id:"\u672a\u6765\u8ba1\u5212",level:2}],k={toc:m};function d(e){var t=e.components,l=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},k,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"lmstfy(Let Me Schedule Task For You) \u662f\u7f8e\u56fe\u67b6\u6784\u57fa\u7840\u670d\u52a1\u56e2\u961f\u5728 2018 \u5e74\u521d\u57fa\u4e8e Redis \u5b9e\u73b0\u7684\u7b80\u5355\u4efb\u52a1\u961f\u5217(Task Queue)\u670d\u52a1\uff0c\u76ee\u524d\u5728\u7f8e\u56fe\u591a\u4e2a\u7ebf\u4e0a\u4ea7\u54c1\u4f7f\u7528\u63a5\u8fd1\u4e24\u5e74\u7684\u65f6\u95f4\u3002\u4e3b\u8981\u63d0\u4f9b\u4ee5\u4e0b\u7279\u6027:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4efb\u52a1\u5177\u5907\u5ef6\u65f6\u3001\u81ea\u52a8\u91cd\u8bd5\u3001\u4f18\u5148\u7ea7\u4ee5\u53ca\u8fc7\u671f\u7b49\u529f\u80fd"),(0,a.kt)("li",{parentName:"ul"},"\u901a\u8fc7 HTTP restful API \u63d0\u4f9b\u670d\u52a1"),(0,a.kt)("li",{parentName:"ul"},"\u5177\u5907\u6a2a\u5411\u6269\u5c55\u80fd\u529b"),(0,a.kt)("li",{parentName:"ul"},"\u4e30\u5bcc\u7684\u4e1a\u52a1\u548c\u6027\u80fd\u6307\u6807")),(0,a.kt)("p",null,"Github \u9879\u76ee\u5730\u5740: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/meitu/lmstfy"},"https://github.com/meitu/lmstfy")),(0,a.kt)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),(0,a.kt)("p",null,"\u4efb\u52a1\u961f\u5217\u8ddf\u6d88\u606f\u961f\u5217\u5728\u4f7f\u7528\u573a\u666f\u4e0a\u6700\u5927\u7684\u533a\u522b\u662f\uff1a \u4efb\u52a1\u4e4b\u95f4\u662f\u6ca1\u6709\u987a\u5e8f\u7ea6\u675f\u800c\u6d88\u606f\u8981\u6c42\u987a\u5e8f(FIFO)\uff0c\u4e14\u53ef\u80fd\u4f1a\u5bf9\u4efb\u52a1\u7684\u72b6\u6001\u66f4\u65b0\u800c\u6d88\u606f\u4e00\u822c\u53ea\u4f1a\u6d88\u8d39\u4e0d\u4f1a\u66f4\u65b0\u3002 \u7c7b\u4f3c Kafka \u5229\u7528\u6d88\u606f FIFO \u548c\u4e0d\u9700\u8981\u66f4\u65b0(\u4e0d\u9700\u8981\u5bf9\u6d88\u606f\u505a\u7d22\u5f15)\u7684\u7279\u6027\u6765\u8bbe\u8ba1\u6d88\u606f\u5b58\u50a8\uff0c\u5c06\u6d88\u606f\u8bfb\u5199\u53d8\u6210\u78c1\u76d8\u7684\u987a\u5e8f\u8bfb\u5199\u6765\u5b9e\u73b0\u6bd4\u8f83\u597d\u7684\u6027\u80fd\u3002\u800c\u4efb\u52a1\u961f\u5217\u9700\u8981\u80fd\u591f\u4efb\u52a1\u72b6\u6001\u8fdb\u884c\u66f4\u65b0\u5219\u9700\u8981\u5bf9\u6bcf\u4e2a\u6d88\u606f\u8fdb\u884c\u7d22\u5f15\uff0c\u6240\u4ee5\u5982\u679c\u628a\u4e24\u8005\u653e\u5230\u4e00\u8d77\u5b9e\u73b0\u5219\u5f88\u96be\u5b9e\u5728\u73b0\u529f\u80fd\u548c\u6027\u80fd\u4e0a\u517c\u5f97\u3002"),(0,a.kt)("p",null,"\u6211\u4eec\u5728\u4ee5\u4e0b\u51e0\u79cd\u573a\u666f\u4f1a\u4f7f\u7528\u4efb\u52a1\u961f\u5217:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u5b9a\u65f6\u4efb\u52a1\uff0c\u5982\u6bcf\u5929\u65e9\u4e0a 8 \u70b9\u5f00\u59cb\u63a8\u9001\u6d88\u606f\uff0c\u5b9a\u671f\u5220\u9664\u8fc7\u671f\u6570\u636e\u7b49"),(0,a.kt)("li",{parentName:"ol"},"\u4efb\u52a1\u6d41\uff0c\u5982\u81ea\u52a8\u521b\u5efa Redis \u6d41\u7a0b\u7531\u8d44\u6e90\u521b\u5efa\uff0c\u8d44\u6e90\u914d\u7f6e\uff0cDNS \u4fee\u6539\u7b49\u90e8\u5206\u7ec4\u6210\uff0c\u4f7f\u7528\u4efb\u52a1\u961f\u5217\u53ef\u4ee5\u7b80\u5316\u6574\u4f53\u7684\u8bbe\u8ba1\u548c\u91cd\u8bd5\u6d41\u7a0b"),(0,a.kt)("li",{parentName:"ol"},"\u91cd\u8bd5\u4efb\u52a1\uff0c\u5178\u578b\u573a\u666f\u5982\u79bb\u7ebf\u56fe\u7247\u5904\u7406")),(0,a.kt)("h2",{id:"\u76ee\u6807\u4e0e\u8c03\u7814"},"\u76ee\u6807\u4e0e\u8c03\u7814"),(0,a.kt)("p",null,"\u5728\u81ea\u7814\u4efb\u52a1\u961f\u5217\u4e4b\u524d\uff0c\u6211\u4eec\u57fa\u4e8e\u4ee5\u4e0b\u51e0\u4e2a\u8981\u6c42\u4f5c\u4e3a\u7ea6\u675f\u8c03\u7814\u4e86\u73b0\u6709\u4e00\u4e9b\u5f00\u6e90\u65b9\u6848:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4efb\u52a1\u652f\u6301\u5ef6\u65f6/\u4f18\u5148\u7ea7\u4efb\u52a1\u548c\u81ea\u52a8\u91cd\u8bd5"),(0,a.kt)("li",{parentName:"ul"},"\u9ad8\u53ef\u7528\uff0c\u670d\u52a1\u4e0d\u80fd\u6709\u5355\u70b9\u4ee5\u53ca\u4fdd\u8bc1\u6570\u636e\u4e0d\u4e22\u5931"),(0,a.kt)("li",{parentName:"ul"},"\u53ef\u6269\u5c55\uff0c\u4e3b\u8981\u662f\u5bb9\u91cf\u548c\u6027\u80fd\u9700\u8981\u53ef\u6269\u5c55")),(0,a.kt)("p",null,"\u7b2c\u4e00\u79cd\u65b9\u6848\u662f Redis \u4f5c\u8005\u5f00\u6e90\u7684\u5206\u5e03\u5f0f\u5185\u5b58\u961f\u5217 (disque)","[https://github.com/antirez/disque]","\u3002disque \u91c7\u7528\u548c Redis Cluster \u7c7b\u4f3c\u65e0\u4e2d\u5fc3\u8bbe\u8ba1\uff0c\u6240\u6709\u8282\u70b9\u90fd\u53ef\u4ee5\u5199\u5165\u5e76\u590d\u5236\u5230\u5176\u4ed6\u8282\u70b9\u3002\u4e0d\u7ba1\u662f\u4ece\u529f\u80fd\u4e0a\u3001\u8bbe\u8ba1\u8fd8\u662f\u53ef\u9760\u6027\u90fd\u662f\u6bd4\u8f83\u597d\u7684\u9009\u62e9\u3002\u6211\u4eec\u5728 2017 \u5e74\u4e5f\u5f15\u5165 disque \u5728\u90e8\u5206\u4e1a\u52a1\u4f7f\u7528\u8fc7\u4e00\u6bb5\u65f6\u95f4\uff0c\u540e\u9762\u9047\u5230 bug \u5728\u5185\u90e8\u4fee\u590d\u540e\u60f3\u53cd\u9988\u5230\u793e\u533a\uff0c\u53d1\u73b0 Redis \u4f5c\u8005\u51b3\u5b9a\u4e0d\u518d\u7ef4\u62a4\u8fd9\u4e2a\u9879\u76ee(\u8981\u628a disque \u529f\u80fd\u4f5c\u4e3a redis module \u6765\u7ef4\u62a4\uff0c\u5e94\u8be5\u662f\u4f1a\u4f34\u968f Redis 6 \u53d1\u5e03)\u3002\u6700\u7ec8\u6211\u4eec\u4e5f\u653e\u5f03\u4e86 disque \u65b9\u6848\uff0c\u5c06\u6570\u636e\u8fc1\u79fb\u5230\u6211\u4eec\u81ea\u7814\u4efb\u52a1\u961f\u5217\u670d\u52a1\u3002"),(0,a.kt)("p",null,"\u7b2c\u4e8c\u79cd\u65b9\u6848\u662f 2007 \u5e74\u5c31\u5f00\u6e90\u7684 (beanstalkd)","[https://github.com/beanstalkd/beanstalkd]","\uff0c\u73b0\u5728\u4ecd\u7136\u8fd8\u662f\u5728\u7ef4\u62a4\u72b6\u6001\u3002beanstalkd \u662f\u7c7b memcached \u534f\u8bae\u5168\u5185\u5b58\u4efb\u52a1\u961f\u5217\uff0c\u65ad\u7535\u6216\u8005\u91cd\u542f\u65f6\u901a\u8fc7 WAL \u6587\u4ef6\u6765\u6062\u590d\u6570\u636e\u3002\u4f46 benstalkd \u4e0d\u652f\u6301\u590d\u5236\u529f\u80fd\uff0c\u670d\u52a1\u5b58\u5728\u5355\u70b9\u95ee\u9898\u4e14\u6570\u636e\u53ef\u9760\u6027\u4e5f\u65e0\u6cd5\u6ee1\u8db3\u3002\u5f53\u65f6\u4e5f\u6709\u8003\u8651\u57fa\u4e8e beanstalkd \u53bb\u505a\u4e8c\u6b21\u5f00\u53d1\uff0c\u4f46\u770b\u5b8c\u4ee3\u7801\u4e4b\u540e\u89c9\u5f97\u9700\u8981\u6539\u9020\u7684\u70b9\u4e0d\u53ea\u662f\u590d\u5236\uff0c\u8fd8\u6709\u7c7b\u4f3c\u5185\u5b58\u63a7\u5236\u7b49\u7b49\uff0c\u6240\u4ee5\u6ca1\u6709\u9009\u62e9 beanstalkd \u4e8c\u6b21\u5f00\u53d1\u7684\u65b9\u6848\u3002"),(0,a.kt)("p",null,"\u4e5f\u8003\u8651\u8fc7\u7c7b\u4f3c\u57fa\u4e8e kafka/rocketmq \u7b49\u6d88\u606f\u961f\u5217\u4f5c\u4e3a\u5b58\u50a8\u7684\u65b9\u6848\uff0c\u6700\u540e\u4ece\u5b58\u50a8\u8bbe\u8ba1\u6a21\u578b\u548c\u56e2\u961f\u6280\u672f\u6808\u7b49\u539f\u56e0\u51b3\u5b9a\u9009\u62e9\u57fa\u4e8e redis \u4f5c\u4e3a\u5b58\u50a8\u6765\u5b9e\u73b0\u4efb\u52a1\u961f\u5217\u7684\u529f\u80fd\u3002"),(0,a.kt)("h2",{id:"\u8bbe\u8ba1\u548c\u5b9e\u73b0"},"\u8bbe\u8ba1\u548c\u5b9e\u73b0"),(0,a.kt)("h3",{id:"\u57fa\u7840\u6982\u5ff5"},"\u57fa\u7840\u6982\u5ff5"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"namespace - \u7528\u6765\u9694\u79bb\u4e1a\u52a1\uff0c\u6bcf\u4e2a\u4e1a\u52a1\u662f\u72ec\u7acb\u7684 namespace"),(0,a.kt)("li",{parentName:"ul"},"queue - \u961f\u5217\u540d\u79f0\uff0c\u7528\u533a\u5206\u540c\u4e00\u4e1a\u52a1\u4e0d\u540c\u6d88\u606f\u7c7b\u578b"),(0,a.kt)("li",{parentName:"ul"},"job - \u4e1a\u52a1\u5b9a\u4e49\u7684\u4e1a\u52a1\uff0c\u4e3b\u8981\u5305\u542b\u4ee5\u4e0b\u51e0\u4e2a\u5c5e\u6027:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"id: \u4efb\u52a1 ID\uff0c\u5168\u5c40\u552f\u4e00"),(0,a.kt)("li",{parentName:"ul"},"delay: \u4efb\u52a1\u5ef6\u65f6\u4e0b\u53d1\u65f6\u95f4\uff0c \u5355\u4f4d\u662f\u79d2"),(0,a.kt)("li",{parentName:"ul"},"tries: \u4efb\u52a1\u6700\u5927\u91cd\u8bd5\u6b21\u6570\uff0ctries = N \u8868\u793a\u4efb\u52a1\u4f1a\u6700\u591a\u4e0b\u53d1 N \u6b21"),(0,a.kt)("li",{parentName:"ul"},"ttl(time to live): \u4efb\u52a1\u6700\u957f\u6709\u6548\u671f\uff0c\u8d85\u8fc7\u4e4b\u540e\u4efb\u52a1\u81ea\u52a8\u6d88\u5931"),(0,a.kt)("li",{parentName:"ul"},"ttr(time to run): \u4efb\u52a1\u9884\u671f\u6267\u884c\u65f6\u95f4\uff0c\u8d85\u8fc7 ttr \u5219\u8ba4\u4e3a\u4efb\u52a1\u6d88\u8d39\u5931\u8d25\uff0c\u89e6\u53d1\u4efb\u52a1\u81ea\u52a8\u91cd\u8bd5")))),(0,a.kt)("h3",{id:"\u6570\u636e\u5b58\u50a8"},"\u6570\u636e\u5b58\u50a8"),(0,a.kt)("p",null,"lmstfy \u7684 redis \u5b58\u50a8\u7531\u56db\u90e8\u5206\u7ec4\u6210:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"timer(sorted set) - \u7528\u6765\u5b9e\u73b0\u5ef6\u8fdf\u4efb\u52a1\u7684\u6392\u5e8f\uff0c\u518d\u7531\u540e\u53f0\u7ebf\u7a0b\u5b9a\u671f\u5c06\u5230\u671f\u7684\u4efb\u52a1\u5199\u5165\u5230 Ready Queue \u91cc\u9762"),(0,a.kt)("li",{parentName:"ol"},"ready queue (list) - \u65e0\u5ef6\u65f6\u6216\u8005\u5df2\u5230\u671f\u4efb\u52a1\u7684\u961f\u5217"),(0,a.kt)("li",{parentName:"ol"},"deadletter (list) - \u6d88\u8d39\u5931\u8d25(\u91cd\u8bd5\u6b21\u6570\u5230\u8fbe\u4e0a\u9650)\u7684\u4efb\u52a1\uff0c\u53ef\u4ee5\u624b\u52a8\u91cd\u65b0\u653e\u56de\u961f\u5217"),(0,a.kt)("li",{parentName:"ol"},"job pool(string) - \u5b58\u50a8\u6d88\u606f\u5185\u5bb9\u7684\u6c60\u5b50")),(0,a.kt)("p",null,"\u652f\u6301\u5ef6\u8fdf\u7684\u4efb\u52a1\u961f\u5217\u672c\u8d28\u4e0a\u662f\u4e24\u4e2a\u6570\u636e\u7ed3\u6784\u7684\u7ed3\u5408: FIFO \u548c sorted set\u3002sorted set \u7528\u6765\u5b9e\u73b0\u5ef6\u65f6\u7684\u90e8\u5206\uff0c\u5c06\u4efb\u52a1\u6309\u7167\u5230\u671f\u65f6\u95f4\u6233\u5347\u5e8f\u5b58\u50a8\uff0c\u7136\u540e\u5b9a\u671f\u5c06\u5230\u671f\u7684\u4efb\u52a1\u8fc1\u79fb\u81f3 FIFO(ready queue)\u3002\u4efb\u52a1\u7684\u5177\u4f53\u5185\u5bb9\u53ea\u4f1a\u5b58\u50a8\u4e00\u4efd\u5728 job pool \u91cc\u9762\uff0c\u5176\u4ed6\u7684\u50cf ready queue\uff0ctimer\uff0cdeadletter \u53ea\u662f\u5b58\u50a8 job id\uff0c\u8fd9\u6837\u53ef\u4ee5\u8282\u7701\u4e00\u4e9b\u5185\u5b58\u7a7a\u95f4\u3002"),(0,a.kt)("p",null,"\u4ee5\u4e0b\u662f\u6574\u4f53\u8bbe\u8ba1:"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/lmstfy-arch.png",alt:"img"})),(0,a.kt)("h3",{id:"\u4efb\u52a1\u5199\u5165"},"\u4efb\u52a1\u5199\u5165"),(0,a.kt)("p",null,"\u4efb\u52a1\u5728\u5199\u5165\u65f6\u4f1a\u5148\u4ea7\u751f\u4e00\u4e2a job id\uff0c\u76ee\u524d job id (16bytes) \u5305\u542b\u5199\u5165\u65f6\u95f4\u6233\u3001 \u968f\u673a\u6570\u548c\u5ef6\u8fdf\u79d2\u6570\uff0c \u7136\u540e\u5199\u5165 key \u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"j:{namespace}/{queue}/{ID}")," \u7684\u4efb\u52a1\u5230\u4efb\u52a1\u6c60 (pool) \u91cc\u9762\u3002\u4e4b\u540e\u6839\u636e\u5ef6\u65f6\u65f6\u95f4\u6765\u51b3\u5b9a\u8fd9\u4e2a job id \u5e94\u8be5\u5230 ready queue \u8fd8\u662f timer \u91cc\u9762:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"delay = 0\uff0c\u8868\u793a\u4e0d\u9700\u8981\u5ef6\u65f6\u5219\u76f4\u63a5\u5199\u5230 ready queue(list)"),(0,a.kt)("li",{parentName:"ul"},"delay = n(n > 0)\uff0c\u8868\u793a\u9700\u8981\u5ef6\u65f6\uff0c\u5c06\u5ef6\u65f6\u52a0\u4e0a\u5f53\u524d\u7cfb\u7edf\u65f6\u95f4\u4f5c\u4e3a\u7edd\u5bf9\u65f6\u95f4\u6233\u5199\u5230 timer(sorted set)")),(0,a.kt)("p",null,"timer \u7684\u5b9e\u73b0\u662f\u5229\u7528 zset \u6839\u636e\u7edd\u5bf9\u65f6\u95f4\u6233\u8fdb\u884c\u6392\u5e8f\uff0c\u518d\u7531\u65c1\u8def\u7ebf\u7a0b\u5b9a\u671f\u8f6e\u8be2\u5c06\u5230\u671f\u7684\u4efb\u52a1\u901a\u8fc7 redis lua script \u6765\u5c06\u6570\u636e\u539f\u5b50\u5730\u8f6c\u79fb\u5230 ready queue \u91cc\u9762\u3002"),(0,a.kt)("h3",{id:"\u4efb\u52a1\u6d88\u8d39"},"\u4efb\u52a1\u6d88\u8d39"),(0,a.kt)("p",null,"\u4e4b\u524d\u63d0\u5230\u4efb\u52a1\u5728\u6d88\u8d39\u5931\u8d25\u4e4b\u540e\u9884\u671f\u80fd\u591f\u91cd\u8bd5\uff0c\u6240\u4ee5\u5fc5\u987b\u77e5\u9053\u4ec0\u4e48\u65f6\u5019\u53ef\u8ba4\u4e3a\u4efb\u52a1\u6d88\u8d39\u5931\u8d25\uff1f\u4e1a\u52a1\u5728\u6d88\u8d39\u65f6\u9700\u8981\u643a\u5e26 ttr(time to run) \u53c2\u6570\uff0c\u7528\u6765\u8868\u793a\u4e1a\u52a1\u9884\u671f\u4efb\u52a1\u6700\u957f\u6267\u884c\u65f6\u95f4\uff0c\u5982\u679c\u5728 ttr \u65f6\u95f4\u5185\u6ca1\u6709\u6536\u5230\u4e1a\u52a1\u4e3b\u52a8\u56de\u590d ACK \u6d88\u606f\u5219\u4f1a\u8ba4\u4e3a\u4efb\u52a1\u5931\u8d25(\u7c7b\u4f3c tcp \u7684\u91cd\u4f20 timer)\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/lmstfy-consume.png",alt:"img"})),(0,a.kt)("p",null,"\u6d88\u8d39\u65f6\u4ece ready queue \u4e2d (B)RPOP \u51fa\u4efb\u52a1\u7684 job id\uff0c\u7136\u540e\u6839\u636e job id \u4ece pool \u4e2d\u5c06\u4efb\u52a1\u5185\u5bb9\u53d1\u9001\u7ed9\u6d88\u8d39\u8005\u3002\u540c\u65f6\u5bf9 tries \u51cf\u4e00\uff0c\u6839\u636e\u6d88\u8d39\u7684 ttr(time to run) \u53c2\u6570, \u5c06\u4efb\u52a1\u653e\u5165 timer \u4e2d\u3002\u5982\u679c tries \u4e3a\u96f6, \u5728 ttr \u65f6\u95f4\u5230\u671f\u540e\u8be5 job id \u4f1a\u88ab\u653e\u5165 dead letter \u961f\u5217\u4e2d(\u8868\u793a\u4efb\u52a1\u6267\u884c\u5931\u8d25)\u3002"),(0,a.kt)("h3",{id:"\u540c\u6b65\u4efb\u52a1\u6a21\u578b"},"\u540c\u6b65\u4efb\u52a1\u6a21\u578b"),(0,a.kt)("p",null,"lmstfy \u9664\u4e86\u53ef\u4ee5\u7528\u6765\u5b9e\u73b0\u5f02\u6b65\u548c\u5ef6\u65f6\u4efb\u52a1\u6a21\u578b\u4e4b\u5916\uff0c\u56e0\u4e3a namespace \u4e0b\u9762\u7684\u961f\u5217\u662f\u52a8\u6001\u521b\u5efa\u4e14 job id \u5168\u5c40\u552f\u4e00\uff0c\u8fd8\u53ef\u4ee5\u7528\u6765\u5b9e\u73b0\u540c\u6b65\u4efb\u52a1\u6a21\u578b (producer \u7b49\u5230\u4efb\u52a1\u6267\u884c\u6210\u529f\u4e4b\u540e\u8fd4\u56de)\u3002\u5927\u6982\u5982\u4e0b:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"producer \u5199\u5165\u4efb\u52a1\u4e4b\u540e\u62ff\u5230 job id, \u7136\u540e\u76d1\u542c(consume)\u4ee5 job id \u4e3a\u540d\u7684\u961f\u5217"),(0,a.kt)("li",{parentName:"ol"},"consumer \u6d88\u8d39\u4efb\u52a1\u6210\u529f\u540e\uff0c\u5199\u56de\u590d\u6d88\u606f\u5230\u540c\u6837\u4ee5 job id \u4e3a\u540d\u7684\u961f\u5217\u4e2d"),(0,a.kt)("li",{parentName:"ol"},"producer \u5982\u679c\u89c4\u5b9a\u65f6\u95f4\u5185\u80fd\u8bfb\u5230\u56de\u590d\u6d88\u606f\u5219\u8ba4\u4e3a\u6d88\u8d39\u6210\u529f\uff0c\u7b49\u5f85\u8d85\u65f6\u5219\u8ba4\u4e3a\u4efb\u52a1\u5931\u8d25")),(0,a.kt)("h3",{id:"\u5982\u4f55\u5b9e\u73b0\u6a2a\u5411\u6269\u5c55"},"\u5982\u4f55\u5b9e\u73b0\u6a2a\u5411\u6269\u5c55"),(0,a.kt)("p",null,"lmstfy \u672c\u8eab\u662f\u65e0\u72b6\u6001\u7684\u670d\u52a1\u53ef\u4ee5\u5f88\u7b80\u5355\u7684\u5b9e\u73b0\u6a2a\u5411\u6269\u5c55\uff0c\u8fd9\u91cc\u7684\u6a2a\u5411\u6269\u5c55\u4e3b\u8981\u662f\u5b58\u50a8(\u76ee\u524d\u53ea\u652f\u6301 Redis)\u7684\u6a2a\u5411\u6269\u5c55\u3002\u8bbe\u8ba1\u4e5f\u6bd4\u8f83\u7b80\u5355\uff0c\u4e3b\u8981\u901a\u8fc7\u901a\u8fc7 namespace \u5bf9\u5e94\u7684 token \u8def\u7531\u6765\u5b9e\u73b0\uff0c \u6bd4\u5982\u6211\u4eec\u5f53\u524d\u914d\u7f6e\u4e24\u7ec4 Redis \u8d44\u6e90: ",(0,a.kt)("inlineCode",{parentName:"p"},"default")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"}," meipai"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'[Pool]\n[Pool.default]\nAddr = "1.1.1.1:6379"\n[Pool.meipai]\nAddr = "2.2.2.2:6389"\n')),(0,a.kt)("p",null,"\u5728\u521b\u5efa namespace \u65f6\u53ef\u4ee5\u6307\u5b9a\u8d44\u6e90\u6c60\uff0ctoken \u91cc\u9762\u4f1a\u643a\u5e26\u8d44\u6e90\u6c60\u540d\u5b57\u4f5c\u4e3a\u524d\u7f00\u3002\u6bd4\u6307\u5b9a\u7f8e\u62cd\u8d44\u6e90\u6c60\uff0c\u90a3\u4e48 token \u7c7b\u4f3c: ",(0,a.kt)("inlineCode",{parentName:"p"},"meipai:01DT8EZ1N6XT")," \uff0c\u540e\u7eed\u5728\u5904\u7406\u8bf7\u6c42\u65f6\u5c31\u53ef\u4ee5\u6839\u636e token \u91cc\u9762\u643a\u5e26\u7684\u8d44\u6e90\u6c60\u540d\u79f0\u6765\u8fdb\u884c\u8def\u7531\u6570\u636e\u3002\u4e0d\u8fc7\u8fd9\u79cd\u8bbe\u8ba1\u5b9e\u73b0\u961f\u5217\u7ea7\u522b\u7684\u6269\u5c55\uff0c\u5982\u679c\u5355\u961f\u5217\u5b58\u50a8\u6d88\u606f\u91cf\u8d85\u8fc7 Redis \u5185\u5b58\u4e0a\u9650\u5219\u9700\u8981\u5176\u4ed6\u624b\u6bb5\u6765\u89e3\u51b3(\u540e\u9762\u4f1a\u652f\u6301\u78c1\u76d8\u7c7b\u578b\u5b58\u50a8)\u3002"),(0,a.kt)("h2",{id:"\u5982\u4f55\u4f7f\u7528"},"\u5982\u4f55\u4f7f\u7528"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'# \u521b\u5efa namespace \u548c token, \u6ce8\u610f\u8fd9\u91cc\u4f7f\u7528\u7ba1\u7406\u7aef\u53e3\n$ ./scripts/token-cli -c -n test_ns -p default -D "test ns apply by @hulk" 127.0.0.1:7778\n\n{\n    "token": "01DT9323JACNBQ9JESV80G0000"\n}\n\n# \u5199\u5165\u5185\u5bb9\u4e3a value \u7684\u4efb\u52a1\n$ curl -XPUT -d "value" -i "http://127.0.0.1:7777/api/test_ns/q1?tries=3&delay=1&token=01DT931XGSPKNB7E2XFKPY3ZPB"\n\n{"job_id":"01DT9323JACNBQ9JESV80G0000","msg":"published"}\n\n# \u6d88\u8d39\u4efb\u52a1\n$ curl -i "http://127.0.0.1:7777/api/test_ns/q1?ttr=30&timeout=3&&token=01DT931XGSPKNB7E2XFKPY3ZPB"\n\n{"data":"value","elapsed_ms":272612,"job_id":"01DT9323JACNBQ9JESV80G0000","msg":"new job","namespace":"test_ns","queue":"q1","ttl":86127}\n\n# ACK \u4efb\u52a1 id\uff0c\u8868\u793a\u6d88\u8d39\u6210\u529f\u4e0d\u518d\u91cd\u65b0\u4e0b\u53d1\u6539\u4efb\u52a1\ncurl -i -XDELETE "http://127.0.0.1:7777/api/test_ns/q1/job/01DT9323JACNBQ9JESV80G0000?token=01DT931XGSPKNB7E2XFKPY3ZPB"\n')),(0,a.kt)("p",null,"\u66f4\u8be6\u7ec6 API \u8bf4\u660e\u89c1\u9879\u76ee ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/meitu/lmstfy/blob/master/README.md"},"README"),"\uff0c\u76ee\u524d\u6211\u4eec\u63d0\u4f9b\u4e86 PHP/Golang \u4e24\u79cd\u8bed\u8a00 SDK\uff0c\u5176\u4ed6\u8bed\u8a00\u53ef\u4ee5\u76f4\u63a5\u57fa\u4e8e HTTP \u5e93\u5c01\u88c5\u5373\u53ef\u3002"),(0,a.kt)("h2",{id:"\u76d1\u63a7\u6307\u6807"},"\u76d1\u63a7\u6307\u6807"),(0,a.kt)("p",null,"lmstfy \u4efb\u52a1\u961f\u5217\u7684\u53e6\u5916\u4e00\u4e2a\u8bbe\u8ba1\u76ee\u6807\u662f\u63d0\u4f9b\u8db3\u591f\u591a\u7684\u76d1\u63a7\u6307\u6807\uff0c\u9664\u4e86\u4f5c\u4e3a\u76d1\u63a7\u62a5\u8b66\u4e4b\u5916\uff0c\u4e5f\u53ef\u4ee5\u4e3a\u7c7b\u4f3c k8s \u7684 scheduler \u63d0\u4f9b\u53cd\u9988\u6307\u6807\uff0c\u4ee5\u5f53\u524d\u961f\u5217\u5806\u79ef\u60c5\u51b5\u6307\u5bfc\u7cfb\u7edf\u8fdb\u884c\u52a8\u6001\u7f29\u6269\u5bb9\u3002"),(0,a.kt)("p",null,"\u4e1a\u52a1\u6307\u6807:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u751f\u4ea7\u901f\u5ea6"),(0,a.kt)("li",{parentName:"ul"},"\u6d88\u8d39\u901f\u5ea6"),(0,a.kt)("li",{parentName:"ul"},"\u5ef6\u8fdf\u6570\u91cf"),(0,a.kt)("li",{parentName:"ul"},"\u5806\u79ef\u6570\u91cf (queue size)"),(0,a.kt)("li",{parentName:"ul"},"\u5931\u8d25\u6570\u91cf (deadletter size)"),(0,a.kt)("li",{parentName:"ul"},"\u4efb\u52a1\u4ece\u751f\u4ea7\u5230\u88ab\u6d88\u8d39\u7684\u65f6\u95f4\u5206\u5e03 (P50, P95 etc.)")),(0,a.kt)("p",null,"\u6027\u80fd\u76f8\u5173\u6307\u6807:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u751f\u4ea7\u63a5\u53e3\u5ef6\u8fdf (P95)"),(0,a.kt)("li",{parentName:"ul"},"\u6d88\u8d39\u63a5\u53e3\u5ef6\u8fdf (P95)"),(0,a.kt)("li",{parentName:"ul"},"\u5e76\u53d1\u8fde\u63a5\u6570")),(0,a.kt)("h2",{id:"\u672a\u6765\u8ba1\u5212"},"\u672a\u6765\u8ba1\u5212"),(0,a.kt)("p",null,"\u5728\u6211\u4eec\u5f53\u524d\u7684\u4f7f\u7528\u573a\u666f\u4e0b, \u4e00\u4e2a 2G \u7684 redis \u5b9e\u4f8b\u5c31\u80fd\u591f\u652f\u6491\u5343\u4e07\u7ea7\u5de6\u53f3\u7684\u5ef6\u8fdf\u4efb\u52a1\u91cf\u3002\u4f46\u7c7b\u4f3c\u5bf9\u8c61\u5b58\u50a8\u7684\u751f\u547d\u5468\u671f\u7ba1\u7406(\u5bf9\u8c61\u5b58\u50a8\u7684 TTL)\u8fd9\u79cd\u91cf\u5927\u4e14\u5ef6\u65f6\u95f4\u957f\u7684\u573a\u666f\uff0c\u4f7f\u7528 Redis \u5b58\u50a8\u6210\u672c\u6bd4\u8f83\u9ad8\u3002\u540e\u7eed\u4f1a\u8003\u8651\u57fa\u4e8e\u672c\u5730\u6587\u4ef6\u6216\u8005\u4ee5 kvrocks (\u81ea\u7814\u7684 SSD Redis KV) \u4f5c\u4e3a\u5b58\u50a8\uff0c\u5c06\u6570\u636e\u843d\u5230\u78c1\u76d8\u3002kvrocks \u76ee\u524d\u4e5f\u662f\u5f00\u6e90\u72b6\u6001\uff0c\u7f8e\u56fe\u5185\u90e8\u7ebf\u4e0a\u5df2\u7ecf\u90e8\u7f72\u63a5\u8fd1 100 \u4e2a\u5b9e\u4f8b\uff0c\u5916\u90e8\u4e5f\u6709\u4e00\u4e9b\u7c7b\u4f3c\u767d\u5c71\u4e91\u7b49\u516c\u53f8\u5728\u4f7f\u7528\uff0c\u540e\u9762\u4e5f\u4f1a\u8f93\u51fa\u76f8\u5173\u8bbe\u8ba1\u548c\u5b9e\u73b0\u6587\u7ae0\u3002\u6b22\u8fce\u5927\u5bb6\u53bb\u5173\u6ce8\u548c\u4f7f\u7528\uff0c\u66f4\u52a0\u6b22\u8fce issue \u548c PR\u3002"),(0,a.kt)("p",null,"kvrocks Github \u9879\u76ee\u5730\u5740: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/meitu/kvrocks"},"https://github.com/meitu/kvrocks")),(0,a.kt)("p",null,"lmsty \u7684 Github \u9879\u76ee\u5730\u5740: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/meitu/lmstfy"},"https://github.com/meitu/lmstfy")),(0,a.kt)("p",null,"\u5982\u6709\u66f4\u591a\u6280\u672f\u95ee\u9898\u60f3\u8981\u4ea4\u6d41\u53ef\u4ee5\u53d1\u90ae\u4ef6\u7ed9\u6211: ",(0,a.kt)("a",{parentName:"p",href:"mailto:hulk.website@gmail.com"},"hulk.website@gmail.com")))}d.isMDXComponent=!0}}]);