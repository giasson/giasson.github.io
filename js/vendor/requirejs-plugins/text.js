define(["module"],function(module){"use strict";var e,t,n=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],r=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,i=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,a="undefined"!=typeof location&&location.href,o=a&&location.protocol&&location.protocol.replace(/\:/,""),s=a&&location.hostname,l=a&&(location.port||void 0),c=[],d=module.config&&module.config()||{};return e={version:"2.0.5",strip:function(e){if(e){e=e.replace(r,"");var t=e.match(i);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:d.createXhr||function(){var e,t,r;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){r=n[t];try{e=new ActiveXObject(r)}catch(i){}if(e){n=[r];break}}return e},parseName:function(e){var t,n,r,i=!1,a=e.indexOf("."),o=0===e.indexOf("./")||0===e.indexOf("../js/");return-1!==a&&(!o||a>1)?(t=e.substring(0,a),n=e.substring(a+1,e.length)):t=e,r=n||t,a=r.indexOf("!"),-1!==a&&(i="strip"===r.substring(a+1),r=r.substring(0,a),n?n=r:t=r),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(t,n,r,i){var a,o,s,l=e.xdRegExp.exec(t);return l?(a=l[2],o=l[3],o=o.split(":"),s=o[1],o=o[0],!(a&&a!==n||o&&o.toLowerCase()!==r.toLowerCase()||(s||o)&&s!==i)):!0},finishLoad:function(t,n,r,i){r=n?e.strip(r):r,d.isBuild&&(c[t]=r),i(r)},load:function(t,n,r,i){if(i.isBuild&&!i.inlineText)return void r();d.isBuild=i.isBuild;var c=e.parseName(t),u=c.moduleName+(c.ext?"."+c.ext:""),h=n.toUrl(u),f=d.useXhr||e.useXhr;!a||f(h,o,s,l)?e.get(h,function(n){e.finishLoad(t,c.strip,n,r)},function(e){r.error&&r.error(e)}):n([u],function(t){e.finishLoad(c.moduleName+"."+c.ext,c.strip,t,r)})},write:function(t,n,r){if(c.hasOwnProperty(n)){var i=e.jsEscape(c[n]);r.asModule(t+"!"+n,"define(function () { return '"+i+"';});\n")}},writeFile:function(t,n,r,i,a){var o=e.parseName(n),s=o.ext?"."+o.ext:"",l=o.moduleName+s,c=r.toUrl(o.moduleName+s)+".js";e.load(l,r,function(){var n=function(e){return i(c,e)};n.asModule=function(e,t){return i.asModule(e,c,t)},e.write(t,l,n,a)},a)}},"node"===d.env||!d.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(t=require.nodeRequire("fs"),e.get=function(e,n){var r=t.readFileSync(e,"utf8");0===r.indexOf("﻿")&&(r=r.substring(1)),n(r)}):"xhr"===d.env||!d.env&&e.createXhr()?e.get=function(t,n,r,i){var a,o=e.createXhr();if(o.open("GET",t,!0),i)for(a in i)i.hasOwnProperty(a)&&o.setRequestHeader(a.toLowerCase(),i[a]);d.onXhr&&d.onXhr(o,t),o.onreadystatechange=function(){var e,i;4===o.readyState&&(e=o.status,e>399&&600>e?(i=new Error(t+" HTTP status: "+e),i.xhr=o,r(i)):n(o.responseText))},o.send(null)}:("rhino"===d.env||!d.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java)&&(e.get=function(e,t){var n,r,i="utf-8",a=new java.io.File(e),o=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a),i)),l="";try{for(n=new java.lang.StringBuffer,r=s.readLine(),r&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),n.append(r);null!==(r=s.readLine());)n.append(o),n.append(r);l=String(n.toString())}finally{s.close()}t(l)}),e});