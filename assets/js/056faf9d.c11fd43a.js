"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7770],{3905:function(t,e,r){r.d(e,{Zo:function(){return c},kt:function(){return k}});var n=r(7294);function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r,n,a={},i=Object.keys(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||(a[r]=t[r]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}var p=n.createContext({}),s=function(t){var e=n.useContext(p),r=e;return t&&(r="function"==typeof t?t(e):o(o({},e),t)),r},c=function(t){var e=s(t.components);return n.createElement(p.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},m=n.forwardRef((function(t,e){var r=t.components,a=t.mdxType,i=t.originalType,p=t.parentName,c=l(t,["components","mdxType","originalType","parentName"]),m=s(r),k=a,f=m["".concat(p,".").concat(k)]||m[k]||u[k]||i;return r?n.createElement(f,o(o({ref:e},c),{},{components:r})):n.createElement(f,o({ref:e},c))}));function k(t,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var p in e)hasOwnProperty.call(e,p)&&(l[p]=e[p]);l.originalType=t,l.mdxType="string"==typeof t?t:a,o[1]=l;for(var s=2;s<i;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},500:function(t,e,r){r.r(e),r.d(e,{assets:function(){return c},contentTitle:function(){return p},default:function(){return k},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return u}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],l={author:"hulk",title:"\u5982\u4f55\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap",slug:"posts-how-to-impl-bitmap-on-disk-kv",tags:["Redis","Bitmap","Storage"]},p=void 0,s={permalink:"/posts-how-to-impl-bitmap-on-disk-kv",source:"@site/blog/2021-07-27-how-to-impl-bitmap-on-disk-kv.md",title:"\u5982\u4f55\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap",description:"\u5927\u90e8\u5206\u5f00\u53d1\u5bf9 Bitmap \u5e94\u8be5\u90fd\u4e0d\u964c\u751f\uff0c\u9664\u4e86\u4f5c\u4e3a Bloom Filter \u5b9e\u73b0\u7684\u5b58\u50a8\u4e4b\u5916\uff0c\u8bb8\u591a\u6570\u636e\u5e93\u4e5f\u6709\u63d0\u4f9b Bitmap \u7c7b\u578b\u7684\u7d22\u5f15\u3002\u5bf9\u4e8e\u5185\u5b58\u578b\u7684\u5b58\u50a8\u6765\u8bf4\uff0cBitmap \u53ea\u662f\u4e00\u4e2a\u7279\u6b8a\u7c7b\u578b(bit)\u7684\u7a00\u758f\u6570\u7ec4\uff0c\u64cd\u4f5c\u5185\u5b58\u4e0d\u4f1a\u5e26\u6765\u8bfb\u5199\u653e\u5927\u95ee\u9898(\u6307\u7684\u662f\u7269\u7406\u8bfb\u5199\u7684\u6570\u636e\u91cf\u8fdc\u5927\u4e8e\u903b\u8f91\u7684\u6570\u636e\u91cf), Redis \u5c31\u662f\u5728\u5b57\u7b26\u4e32\u7c7b\u578b\u4e0a\u652f\u6301 bit \u7684\u76f8\u5173\u64cd\u4f5c\uff0c\u800c\u5bf9\u4e8e Kvrocks \u8fd9\u79cd\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0\u7684\u5b58\u50a8\u5219\u4f1a\u662f\u6bd4\u8f83\u5927\u6311\u6218\uff0c\u672c\u7bc7\u6587\u7ae0\u4e3b\u8981\u8ba8\u8bba\u7684\u5176\u5b9e\u662f\u300c\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap \u8981\u5982\u4f55\u51cf\u5c11\u78c1\u76d8\u8bfb\u5199\u653e\u5927\u300d",date:"2021-07-27T00:00:00.000Z",formattedDate:"July 27, 2021",tags:[{label:"Redis",permalink:"/tags/redis"},{label:"Bitmap",permalink:"/tags/bitmap"},{label:"Storage",permalink:"/tags/storage"}],readingTime:11.125,truncated:!0,authors:[{name:"hulk"}],frontMatter:{author:"hulk",title:"\u5982\u4f55\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap",slug:"posts-how-to-impl-bitmap-on-disk-kv",tags:["Redis","Bitmap","Storage"]},prevItem:{title:"Monitoring Go apps with Distributed Tracing and OpenTelemetry",permalink:"/monitoring-go-apps-with-distributed-tracing-and-opentelemetry"},nextItem:{title:"Kvrocks \u4e00\u6b3e\u5f00\u6e90\u7684\u4f01\u4e1a\u7ea7\u78c1\u76d8KV\u5b58\u50a8\u670d\u52a1",permalink:"/intro-opensource-kvrocks"}},c={authorsImageUrls:[void 0]},u=[{value:"\u4e3a\u4ec0\u4e48\u4f1a\u4ea7\u751f\u8bfb\u5199\u653e\u5927",id:"\u4e3a\u4ec0\u4e48\u4f1a\u4ea7\u751f\u8bfb\u5199\u653e\u5927",level:2},{value:"\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap",id:"\u57fa\u4e8e\u78c1\u76d8-kv-\u5b9e\u73b0-bitmap",level:2},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",level:2},{value:"References",id:"references",level:2}],m={toc:u};function k(t){var e=t.components,r=(0,a.Z)(t,o);return(0,i.kt)("wrapper",(0,n.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u5927\u90e8\u5206\u5f00\u53d1\u5bf9 Bitmap \u5e94\u8be5\u90fd\u4e0d\u964c\u751f\uff0c\u9664\u4e86\u4f5c\u4e3a Bloom Filter \u5b9e\u73b0\u7684\u5b58\u50a8\u4e4b\u5916\uff0c\u8bb8\u591a\u6570\u636e\u5e93\u4e5f\u6709\u63d0\u4f9b Bitmap \u7c7b\u578b\u7684\u7d22\u5f15\u3002\u5bf9\u4e8e\u5185\u5b58\u578b\u7684\u5b58\u50a8\u6765\u8bf4\uff0cBitmap \u53ea\u662f\u4e00\u4e2a\u7279\u6b8a\u7c7b\u578b(bit)\u7684\u7a00\u758f\u6570\u7ec4\uff0c\u64cd\u4f5c\u5185\u5b58\u4e0d\u4f1a\u5e26\u6765\u8bfb\u5199\u653e\u5927\u95ee\u9898(\u6307\u7684\u662f\u7269\u7406\u8bfb\u5199\u7684\u6570\u636e\u91cf\u8fdc\u5927\u4e8e\u903b\u8f91\u7684\u6570\u636e\u91cf), Redis \u5c31\u662f\u5728\u5b57\u7b26\u4e32\u7c7b\u578b\u4e0a\u652f\u6301 bit \u7684\u76f8\u5173\u64cd\u4f5c\uff0c\u800c\u5bf9\u4e8e Kvrocks \u8fd9\u79cd\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0\u7684\u5b58\u50a8\u5219\u4f1a\u662f\u6bd4\u8f83\u5927\u6311\u6218\uff0c\u672c\u7bc7\u6587\u7ae0\u4e3b\u8981\u8ba8\u8bba\u7684\u5176\u5b9e\u662f\u300c",(0,i.kt)("strong",{parentName:"p"},"\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap")," \u8981",(0,i.kt)("strong",{parentName:"p"},"\u5982\u4f55\u51cf\u5c11\u78c1\u76d8\u8bfb\u5199\u653e\u5927\u300d")),(0,i.kt)("h2",{id:"\u4e3a\u4ec0\u4e48\u4f1a\u4ea7\u751f\u8bfb\u5199\u653e\u5927"},"\u4e3a\u4ec0\u4e48\u4f1a\u4ea7\u751f\u8bfb\u5199\u653e\u5927"),(0,i.kt)("p",null,"\u8bfb\u5199\u653e\u5927\u7684\u4e3b\u8981\u662f\u6765\u6e90\u4e8e\u4e24\u65b9\u9762:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"\u786c\u4ef6\u5c42\u9762\u7684\u6700\u5c0f\u8bfb\u5199\u5355\u5143"),(0,i.kt)("li",{parentName:"ul"},"\u8f6f\u4ef6\u5c42\u9762\u5b58\u50a8\u7ec4\u7ec7\u65b9\u5f0f")),(0,i.kt)("p",null,"\u786c\u4ef6\u5c42\u9762\u4e00\u822c\u662f\u7531\u4e8e\u6700\u5c0f\u8bfb\u5199\u5355\u5143\u5e26\u6765\u7684\u8bfb\u5199\u653e\u5927\uff0c\u4ee5 SSD \u4e3a\u4f8b\uff0c\u8bfb\u5199\u7684\u6700\u5c0f\u5355\u4f4d\u662f\u9875(\u4e00\u822c\u662f 4KiB/8KiB/16KiB)\u3002\u5373\u4f7f\u5e94\u7528\u5c42\u53ea\u5199\u5165\u4e00\u4e2a\u5b57\u8282\uff0c\u5728\u78c1\u76d8\u4e0a\u5b9e\u9645\u4f1a\u5199\u5165\u4e00\u4e2a\u9875\uff0c\u8fd9\u4e5f\u5c31\u662f\u6211\u4eec\u6240\u8bf4\u7684\u5199\u653e\u5927\uff0c\u53cd\u4e4b\u8bfb\u4e5f\u662f\u4e00\u6837\u3002\u53e6\u5916\uff0cSSD \u4fee\u6539\u6570\u636e\u4e0d\u662f\u5728\u9875\u5185\u4f4d\u7f6e\u539f\u5730\u4fee\u6539\u800c\u662f Read-Modify-Write \u7684\u65b9\u5f0f\uff0c\u4fee\u6539\u65f6\u9700\u8981\u5c06\u539f\u6765\u7684\u6570\u636e\u8bfb\u51fa\u6765\uff0c\u4fee\u6539\u4e4b\u540e\u518d\u5199\u5230\u65b0\u9875\uff0c\u8001\u7684\u78c1\u76d8\u9875\u7531 GC \u8fdb\u884c\u56de\u6536\u3002\u6240\u4ee5\uff0c\u5373\u4f7f\u5bf9\u540c\u4e00\u9875\u7684\u4e00\u5c0f\u5757\u6570\u636e\u53cd\u590d\u4fee\u6539\u4e5f\u4f1a\u7531\u4e8e\u786c\u4ef6\u672c\u8eab\u673a\u5236\u800c\u9020\u6210\u5199\u653e\u5927\u3002\u7c7b\u4f3c\u4e8e\u5982\u4e0b:"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/ssd-rmw.png",alt:"image"})),(0,i.kt)("p",null,"\u7531\u6b64\u53ef\u89c1\uff0c\u5927\u91cf\u968f\u673a\u5c0f io \u8bfb\u5199\u5bf9\u4e8e SSD \u78c1\u76d8\u6765\u8bf4\u662f\u5f88\u4e0d\u53cb\u597d\u7684\uff0c\u9664\u4e86\u5728\u6027\u80fd\u65b9\u9762\u6709\u6bd4\u8f83\u5927\u7684\u5f71\u54cd\u4e4b\u5916\uff0c\u9891\u7e41\u64e6\u5199\u4e5f\u4f1a\u4e25\u91cd\u5bfc\u81f4 SSD \u7684\u5bff\u547d(\u968f\u673a\u8bfb\u5199\u5bf9 HDD \u540c\u6837\u4e0d\u53cb\u597d\uff0c\u9700\u8981\u4e0d\u65ad\u5bfb\u9053\u548c\u5bfb\u5740)\u3002LSM-Tree \u5c31\u662f\u901a\u8fc7\u5c06\u968f\u673a\u5199\u5165\u53d8\u6210\u987a\u5e8f\u6279\u91cf\u5199\u5165\u6765\u7f13\u89e3\u8fd9\u7c7b\u95ee\u9898\u3002"),(0,i.kt)("p",null,"\u8f6f\u4ef6\u5c42\u9762\u7684\u8bfb\u5199\u653e\u5927\u4e3b\u8981\u6765\u81ea\u4e8e\u6570\u636e\u7ec4\u7ec7\u65b9\u5f0f\uff0c\u4e0d\u540c\u7684\u5b58\u50a8\u7ec4\u7ec7\u65b9\u5f0f\u6240\u5e26\u6765\u7684\u8bfb\u5199\u653e\u5927\u7a0b\u5ea6\u4e5f\u4f1a\u6709\u5f88\u5927\u7684\u5dee\u5f02\u3002\u8fd9\u91cc\u4ee5 RocksDB \u4e3a\u4f8b\uff0cRocksDB \u662f Facebook \u57fa\u4e8e Google LevelDB \u4e4b\u4e0a\u5b9e\u73b0\u4e86\u591a\u7ebf\u7a0b\uff0cBackup \u4ee5\u53ca Compaction \u7b49\u8bf8\u591a\u5f88\u5b9e\u7528\u7684\u529f\u80fd\u3002RocksDB \u7684\u6570\u636e\u7ec4\u7ec7\u65b9\u5f0f\u662f LSM-Tree\uff0c\u5728\u89e3\u51b3\u78c1\u76d8\u5199\u5165\u65b9\u6cd5\u95ee\u9898\uff0c\u672c\u8eab\u7684\u6570\u636e\u5b58\u50a8\u4e5f\u5e26\u6765\u4e86\u4e00\u4e9b\u7a7a\u95f4\u653e\u5927\u95ee\u9898\u3002\u4e0b\u9762\u53ef\u4ee5\u7b80\u5355\u770b\u4e00\u4e0b LSM-Tree \u662f\u5982\u4f55\u7ec4\u7ec7\u6570\u636e:"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/lsm-tree.png",alt:"image"})),(0,i.kt)("p",null,"LSM-Tree \u6bcf\u6b21\u5199\u5165\u90fd\u4f1a\u4ea7\u751f\u4e00\u6761\u8bb0\u5f55\uff0c\u6bd4\u5982\u4e0a\u56fe x \u5148\u540e\u5199\u4e86 4 \u6b21\uff0c\u5206\u522b\u662f 0\uff0c1\uff0c2\uff0c3\u3002\u5982\u679c\u5355\u770b x \u8fd9\u4e2a\u53d8\u91cf\uff0c\u8fd9\u91cc\u76f8\u5f53\u4e8e\u6709 4 \u500d\u7684\u7a7a\u95f4\u653e\u5927\uff0c\u8fd9\u4e9b\u91cd\u590d\u7684\u8bb0\u5f55\u4f1a\u5728 compaction \u7684\u65f6\u5019\u8fdb\u884c\u56de\u6536\u3002\u540c\u6837\uff0c\u5220\u9664\u4e5f\u662f\u901a\u8fc7\u63d2\u5165\u4e00\u6761 value \u4e3a\u7a7a\u7684\u8bb0\u5f55\u6765\u5b9e\u73b0\u3002 LSM-Tree \u6bcf\u4e00\u5c42\u7a7a\u95f4\u5927\u5c0f\u662f\u9010\u5c42\u9012\u589e\uff0c\u5f53\u5bb9\u91cf\u5927\u5c0f\u5f53\u5c42\u6700\u5927\u65f6\u4f1a\u89e6\u53d1 compaction \u5408\u5e76\u5230\u4e0b\u4e00\u5c42\uff0c\u4ee5\u6b64\u7c7b\u63a8\u3002\u5047\u8bbe Level 0 \u6700\u5927\u5b58\u50a8\u5927\u5c0f\u662f M Bytes\uff0c\u9010\u5c42\u6309\u7167 10 \u500d\u589e\u957f\u4e14\u6700\u5927 7 \u5c42\uff0c\u7406\u8bba\u4e0a\u7a7a\u95f4\u653e\u5927\u7684\u5927\u7ea6\u662f 1.111111 \u500d\u3002\u8ba1\u7b97\u516c\u5f0f\u5982\u4e0b:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},"\u7a7a\u95f4\u653e\u5927\u7387 = (1 + 10 + 100 +1000 + 10000 + 100000 + 1000000) * M / (1000000 * M) \n")),(0,i.kt)("p",null,"\u4f46\u5728\u5b9e\u9645\u573a\u666f\u4e2d\uff0c\u7531\u4e8e\u6700\u540e\u4e00\u5c42\u4e00\u822c\u65e0\u6cd5\u8fbe\u5230\u6700\u5927\u503c\uff0c\u6240\u4ee5\u653e\u5927\u7a7a\u95f4\u7387\u6bd4\u8fd9\u4e2a\u7406\u8bba\u503c\u5927\u4e0d\u5c11\uff0c\u5177\u4f53\u5728 RocksDB \u7684\u6587\u6863\u91cc\u9762\u4e5f\u6709\u63d0\u8fc7\uff0c\u5177\u4f53\u89c1: ",(0,i.kt)("a",{parentName:"p",href:"https://rocksdb.org/blog/2015/07/23/dynamic-level.html"},"https://rocksdb.org/blog/2015/07/23/dynamic-level.html")),(0,i.kt)("p",null,"\u53e6\u5916\uff0c\u7531\u4e8e RocksDB \u8bfb\u5199\u90fd\u662f\u4ee5 KV \u4e3a\u5355\u4f4d\uff0cValue \u8d8a\u5927\u5e26\u6765\u7684\u8bfb\u5199\u653e\u5927\u5c31\u53ef\u80fd\u8d8a\u5927\u3002\u4e3e\u4e2a\u4f8b\u5b50\uff0c\u5047\u8bbe\u6709\u4e00\u4e2a Value \u4e3a 10 MiB \u7684 JSON\uff0c\u5982\u679c\u8981\u4fee\u6539\u8fd9\u4e2a key \u4e2d\u7684\u4e00\u4e2a\u5b57\u6bb5\uff0c\u90a3\u4e48\u9700\u8981\u628a\u6574\u4e2a JSON \u8bfb\u51fa\u6765\uff0c\u4fee\u6539\u540e\u518d\u91cd\u65b0\u5199\u56de\u53bb\uff0c\u5c31\u4f1a\u5bfc\u81f4\u5de8\u5927\u7684\u8bfb\u5199\u653e\u5927\u3002\u6709\u4e00\u7bc7 paper\u300cWiscKey: Separating Keys from Values in SSD-conscious Storage\u300d\u5c31\u662f\u901a\u8fc7 Key/Value \u5206\u79bb\u7684\u65b9\u5f0f\u6765\u4f18\u5316 LSM-Tree \u5927 KV \u7684\u6765\u51cf\u5c11 Compaction \u65f6\u5e26\u6765\u5199\u653e\u5927\u7684\u95ee\u9898\u3002TiKV \u91cc\u9762\u7684 titan \u5c31\u662f\u57fa\u4e8e Wiskey \u8bba\u6587\u4f18\u5316 RocksDB \u5728\u5927 KV \u573a\u666f\u7684\u5199\u653e\u5927\u95ee\u9898\uff0cRocksDB \u4e5f\u5728\u793e\u533a\u7248\u672c\u91cc\u9762\u5b9e\u73b0\u8fd9\u4e2a\u529f\u80fd\uff0c\u4e0d\u8fc7\u8fd8\u662f\u5b9e\u9a8c\u6027\u7684\u9636\u6bb5\u3002"),(0,i.kt)("h2",{id:"\u57fa\u4e8e\u78c1\u76d8-kv-\u5b9e\u73b0-bitmap"},"\u57fa\u4e8e\u78c1\u76d8 KV \u5b9e\u73b0 Bitmap"),(0,i.kt)("p",null," Kvrocks \u662f\u57fa\u4e8e RocksDB \u4e4b\u4e0a\u5b9e\u73b0\u7684\u517c\u5bb9 Redis \u534f\u8bae\u7684\u78c1\u76d8\u5b58\u50a8\uff0c \u9700\u8981\u652f\u6301 Bitmap \u529f\u80fd\uff0c\u6240\u4ee5\u5c31\u9700\u8981\u5728\u78c1\u76d8 KV \u4e4b\u4e0a\u5b9e\u73b0 Bitmap \u7684\u529f\u80fd\u3002\u800c\u5927\u90e8\u5206\u4f7f\u7528 Bitmap \u7684\u573a\u666f\u90fd\u662f\u4f5c\u4e3a\u7a00\u758f\u6570\u7ec4\u6765\u7528\uff0c\u610f\u5473\u7740\u7b2c\u4e00\u6b21\u5199\u5165\u7684 offset \u4e3a 1\uff0c\u4e0b\u6b21\u7684 offset \u53ef\u80fd\u5c31\u662f 1000000000 \u751a\u81f3\u66f4\u5927\uff0c\u6240\u4ee5\u5728\u5b9e\u73b0 Bitmap \u5c31\u4f1a\u9762\u4e34\u4e0a\u8ff0\u8bfb\u5199\u548c\u7a7a\u95f4\u653e\u5927\u95ee\u9898\u3002"),(0,i.kt)("p",null,"\u4e00\u79cd\u6700\u7b80\u5355\u7684\u5b9e\u73b0\u65b9\u5f0f\u662f\u4ecd\u7136\u628a\u6574\u4e2a Bitmap \u4f5c\u4e3a\u4e00\u4e2a Value\uff0c\u8bfb\u5199\u65f6\u5c06 Value \u8bfb\u53d6\u5230\u5185\u5b58\u4e2d\u518d\u56de\u5199\u3002\u8fd9\u79cd\u5b9e\u73b0\u867d\u7136\u5f88\u7b80\u5355\uff0c\u4f46\u4e00\u4e0d\u5c0f\u5fc3\u53ef\u80fd\u5bfc\u81f4 value \u5de8\u5927\uff0c\u5355\u4e2a Value \u5927\u5c0f\u4e0a GiB \u90fd\u662f\u53ef\u80fd\u7684\u3002\u9664\u4e86\u5b58\u5728\u6709\u6548\u7a7a\u95f4\u5229\u7528\u7387\u95ee\u9898\u4e4b\u5916\uff0c\u53ef\u80fd\u4f1a\u76f4\u63a5\u5bfc\u81f4\u6574\u4e2a\u670d\u52a1\u4e0d\u53ef\u7528(\u9700\u8981\u8bfb\u5199\u6574\u4e2a Value)\u3002Pika \u91cc\u9762\u7684 Bitmap \u5c31\u662f\u8fd9\u79cd\u5b9e\u73b0\uff0c\u4f46\u9650\u5236\u6700\u5927\u7684 Value \u4e3a 128 KiB\uff0c\u9650\u5236 Value \u5927\u5c0f\u867d\u7136\u907f\u514d\u4e0a\u8ff0\u7684\u6781\u7aef\u60c5\u51b5\uff0c\u4f46\u4f1a\u5927\u5927\u9650\u5236 Bitmap \u7684\u4f7f\u7528\u573a\u666f\uff0c\u751a\u81f3\u662f\u65e0\u6cd5\u4f7f\u7528\u3002"),(0,i.kt)("p",null,"\u65e2\u7136\u77e5\u9053\u6838\u5fc3\u95ee\u9898\u662f\u7531\u4e8e\u5355\u4e2a KV \u8fc7\u5927\u5bfc\u81f4\uff0c \u90a3\u4e48\u6700\u76f4\u63a5\u7684\u65b9\u5f0f\u5c31\u662f\u5c06 Bitmap \u62c6\u5206\u6210\u591a\u4e2a KV\uff0c\u7136\u540e\u63a7\u5236\u5355\u4e2a KV \u5927\u5c0f\u5728\u5408\u7406\u8303\u56f4\u4e4b\u5185\uff0c \u90a3\u4e48\u8bfb\u5199\u5e26\u6765\u7684\u653e\u5927\u4e5f\u662f\u76f8\u5bf9\u53ef\u63a7\u3002\u5728\u5f53\u524d Kvrocks \u7684\u5b9e\u73b0\u91cc\u9762\u662f\u6309\u7167\u6bcf\u4e2a KV \u4e3a 1 KiB \u6765\u5212\u5206\uff0c\u76f8\u5f53\u4e8e\u6bcf\u4e2a value \u53ef\u4ee5\u5b58\u653e 8192 bits\u3002\u7b97\u6cd5\u793a\u610f\u56fe\u5982\u4e0b:"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/bitmap-split.png",alt:"image"})),(0,i.kt)("p",null,"\u4ee5 ",(0,i.kt)("inlineCode",{parentName:"p"},"setbit foo 8192002 1")," \u4e3a\u4f8b\uff0c\u5b9e\u73b0\u7684\u6b65\u9aa4\u5982\u4e0b:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"\u8ba1\u7b97 ",(0,i.kt)("inlineCode",{parentName:"li"},"8192002"),' \u8fd9\u4e2a offset \u5bf9\u5e94\u6240\u5728\u7684 key, \u56e0\u4e3a Kvrocks \u662f\u6309\u7167 1 KiB \u4e00\u4e2a value\uff0c\u90a3\u4e48\u6240\u5728 key \u7684\u7f16\u53f7\u5c31\u662f 8192002/(1024*8) = 1000\uff0c\u6240\u4ee5\u5c31\u53ef\u4ee5\u77e5\u9053\u8fd9\u4e2a offset \u5e94\u8be5\u5199\u5230 "foo" + 1000 \u8fd9\u4e2a key \u5bf9\u5e94\u7684 value \u91cc\u9762'),(0,i.kt)("li",{parentName:"ol"},"\u63a5\u7740\u4ece RocksDB \u91cc\u9762\u53bb\u83b7\u53d6\u8fd9\u4e2a key \u5bf9\u5e94\u7684 value"),(0,i.kt)("li",{parentName:"ol"},"\u8ba1\u7b97\u8fd9\u4e2a offset \u5728\u5206\u6bb5\u91cc\u9762\u7684\u504f\u79fb\uff0c8192002%8291 \u7b49\u4e8e 2\uff0c\u7136\u540e\u628a value \u4e2d\u504f\u79fb\u4e3a 2 \u7684 bit \u4f4d\u8bbe\u7f6e\u4e3a 1"),(0,i.kt)("li",{parentName:"ol"},"\u6700\u540e\u5c06 value \u56de\u5199\u5230 RocksDB")),(0,i.kt)("p",null,"\u8fd9\u79cd\u5b9e\u73b0\u6bd4\u8f83\u5173\u952e\u7684\u4e00\u4e2a\u7279\u70b9\u662f Bitmap \u5bf9\u5e94\u7684 KV \u53ea\u5728\u6709\u5199\u5165\u7684\u65f6\u5019\u624d\u4f1a\u771f\u6b63\u5199\u5230 RocksDB \u91cc\u9762\u3002\u5047\u8bbe\u6211\u4eec\u53ea\u6267\u884c\u8fc7\u4e24\u6b21 setbit \uff0c\u5206\u522b\u662f  ",(0,i.kt)("inlineCode",{parentName:"p"},"setbit foo 1 1"),"  \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"setbit foo 8192002 1")," \uff0c\u90a3\u4e48 RocksDB \u91cc\u9762\u53ea\u4f1a\u6709 foo:0 \u548c foo:1000 \u8fd9\u4e24\u4e2a key\uff0c\u5b9e\u9645\u7684\u5199\u5165 KV \u603b\u5171\u4e5f\u53ea\u6709 2 KiB\u3002\u521a\u597d\u4e5f\u53ef\u4ee5\u5b8c\u7f8e\u9002\u5e94 Bitmap \u8fd9\u79cd\u7a00\u758f\u6570\u7ec4\u7684\u573a\u666f\uff0c\u4e0d\u4f1a\u56e0\u4e3a\u7a00\u758f\u5199\u5165\u800c\u5e26\u6765\u7a7a\u95f4\u653e\u5927\u7684\u95ee\u9898\u3002"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u8fd9\u4e2a\u60f3\u6cd5\u4e5f\u548c Linux \u7684\u865a\u62df\u5185\u5b58/\u7269\u7406\u5185\u5b58\u6620\u5c04\u7b56\u7565\u7c7b\u4f3c\uff0c\u6bd4\u5982\u6211\u4eec malloc \u7533\u8bf7\u4e86 1GiB \u7684\u5185\u5b58\uff0c\u64cd\u4f5c\u7cfb\u7edf\u4e5f\u53ea\u662f\u5206\u914d\u4e00\u7247\u865a\u62df\u5185\u5b58\u5730\u5740\u7a7a\u95f4\uff0c\u53ea\u6709\u5728\u771f\u6b63\u5199\u5165\u7684\u65f6\u5019\u624d\u4f1a\u89e6\u53d1\u7f3a\u9875\u4e2d\u65ad\u53bb\u5206\u914d\u7269\u7406\u5185\u5b58(\u76ee\u524d\u6b63\u5e38\u5185\u5b58\u9875\u5927\u5c0f\u662f 4KiB)\u3002\u4e5f\u5c31\u662f\u5982\u679c\u5185\u5b58\u9875\u6ca1\u6709\u88ab\u5199\u8fc7\uff0c\u53ea\u8bfb\u4e5f\u4e0d\u4f1a\u4ea7\u751f\u7269\u7406\u5185\u5b58\u5206\u914d\u3002")),(0,i.kt)("p",null,"GetBit \u4e5f\u662f\u7c7b\u4f3c\uff0c\u5148\u8ba1\u7b97 offset \u6240\u5728\u7684 key\uff0c\u7136\u540e\u4ece RocksDB \u8bfb\u53d6\u8fd9\u4e2a key, \u5982\u679c\u4e0d\u5b58\u5728\u5219\u8bf4\u660e\u8fd9\u6bb5\u6ca1\u6709\u88ab\u5199\u8fc7\uff0c\u76f4\u63a5\u8fd4\u56de 0\u3002\u5982\u679c\u5b58\u5728\u5219\u8bfb\u53d6 Value\uff0c\u8fd4\u56de\u5bf9\u5e94 bit \u7684\u503c\u3002\u53e6\u5916\uff0c\u5728\u5b9e\u73b0\u4e0a\u4e5f\u5355\u4e2a KV \u5b9e\u9645\u5b58\u50a8\u5927\u5c0f\u4e5f\u662f\u7531\u76ee\u524d\u5199\u5165\u6700\u5927\u7684 offset \u51b3\u5b9a\uff0c\u5e76\u4e0d\u662f\u6709\u5199\u5165\u5c31\u4f1a\u5206\u914d 1024 KiB\uff0c\u8fd9\u6837\u4e5f\u53ef\u4ee5\u4e00\u5b9a\u7a0b\u5ea6\u4f18\u5316\u5355\u4e2a KV \u5185\u7684\u8bfb\u5199\u653e\u5927\u95ee\u9898\u3002\u5b9e\u73b0\u53ef\u53c2\u8003: ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/KvrocksLabs/kvrocks/blob/unstable/src/redis_bitmap.cc"},"https://github.com/KvrocksLabs/kvrocks/blob/unstable/src/redis_bitmap.cc")),(0,i.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,i.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\u57fa\u4e8e\u5185\u5b58\u548c\u78c1\u76d8\u4e4b\u4e0a\u53bb\u5b9e\u73b0\u540c\u4e00\u4e2a\u529f\u80fd\uff0c\u9664\u4e86\u4e0d\u540c\u7c7b\u578b\u5b58\u50a8\u4ecb\u8d28\u672c\u8eab\u7684\u901f\u5ea6\u5dee\u5f02\u4e4b\u5916\uff0c\u95ee\u9898\u548c\u6311\u6218\u662f\u5b8c\u5168\u4e0d\u4e00\u6837\u7684\u3002\u5bf9\u4e8e\u78c1\u76d8\u7c7b\u578b\u7684\u670d\u52a1\uff0c\u9700\u8981\u4e0d\u65ad\u53bb\u4f18\u5316\u968f\u673a\u8bfb\u5199\u548c\u7a7a\u95f4\u653e\u5927\u95ee\u9898\uff0c\u9664\u4e86\u5bf9\u4e8e\u8f6f\u4ef6\u672c\u8eab\u719f\u6089\u4e4b\u5916\uff0c\u540c\u6837\u9700\u8981\u4e86\u89e3\u786c\u4ef6\u8bbe\u5907\u3002"),(0,i.kt)("p",null,"\u53e6\u5916\uff0cKvrocks \u4f5c\u4e3a\u57fa\u4e8e\u78c1\u76d8 KV \u4e4b\u4e0a\u517c\u5bb9 Redis \u534f\u8bae\u5b58\u50a8\u670d\u52a1\uff0c\u6700\u7ecf\u5e38\u88ab\u95ee\u5230\u662f\u8ddf\u5176\u4ed6\u529f\u80fd\u7c7b\u4f3c\u7684\u670d\u52a1\u6709\u4ec0\u4e48\u533a\u522b\uff1f\u7b80\u5355\u6765\u8bf4\uff0c\u6700\u5927\u7684\u5dee\u5f02\u5728\u4e8e\u4e0d\u540c\u9879\u76ee\u7ef4\u62a4\u8005\u5728\u529f\u80fd\u8bbe\u8ba1\u4e0a\u7684\u5dee\u5f02\uff0c\u4e0d\u540c\u8bbe\u8ba1\u4f1a\u8ba9\u529f\u80fd\u770b\u4f3c\u4e00\u6837\u7684\u670d\u52a1\u5728\u8868\u73b0\u4e0a\u5b8c\u5168\u4e0d\u4e00\u6837\u3002\u6240\u4ee5\uff0c\u6700\u597d\u7684\u65b9\u5f0f\u5c31\u662f\u901a\u8fc7\u4ee3\u7801\u53bb\u4e86\u89e3\u9879\u76ee\u7684\u8bbe\u8ba1\u548c\u95ee\u9898\u3002"),(0,i.kt)("p",null,"\u6b22\u8fce\u5927\u5bb6\u626b\u7801\u5173\u6ce8 ",(0,i.kt)("strong",{parentName:"p"},"\u300cKvrocks \u5b98\u65b9\u793e\u533a\u300d"),"\u516c\u4f17\u53f7\u5e76\u56de\u590d: ",(0,i.kt)("strong",{parentName:"p"},"\u8fdb\u7fa4"),"\uff0c\u6765\u52a0\u5165\u6211\u4eec\u7684\u5fae\u4fe1\u7fa4\uff01"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/qrcode.jpg",alt:"image"})),(0,i.kt)("h2",{id:"references"},"References"),(0,i.kt)("p",null,"[1][https://rocksdb.org/blog/2015/07/23/dynamic-level.html]","(",(0,i.kt)("a",{parentName:"p",href:"https://rocksdb.org/blog/2015/07/23/dynamic-level.html"},"https://rocksdb.org/blog/2015/07/23/dynamic-level.html"),")"),(0,i.kt)("p",null,"[2][https://www.usenix.org/system/files/conference/fast16/fast16-papers-lu.pdf]","(",(0,i.kt)("a",{parentName:"p",href:"https://www.usenix.org/system/files/conference/fast16/fast16-papers-lu.pdf"},"https://www.usenix.org/system/files/conference/fast16/fast16-papers-lu.pdf"),")"),(0,i.kt)("p",null,"[3][https://github.com/KvrocksLabs/kvrocks]","(",(0,i.kt)("a",{parentName:"p",href:"https://github.com/KvrocksLabs/kvrocks"},"https://github.com/KvrocksLabs/kvrocks"),")"),(0,i.kt)("p",null,"[4][https://github.com/facebook/rocksdb]","(",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/rocksdb"},"https://github.com/facebook/rocksdb"),")"),(0,i.kt)("p",null,"[5][https://github.com/tikv/titan]","(",(0,i.kt)("a",{parentName:"p",href:"https://github.com/tikv/titan"},"https://github.com/tikv/titan"),")"))}k.isMDXComponent=!0}}]);