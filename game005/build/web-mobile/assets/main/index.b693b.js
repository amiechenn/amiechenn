window.__require=function o(t,e,r){function c(l,i){if(!e[l]){if(!t[l]){var a=l.split("/");if(a=a[a.length-1],!t[a]){var p="function"==typeof __require&&__require;if(!i&&p)return p(a,!0);if(n)return n(a,!0);throw new Error("Cannot find module '"+l+"'")}l=a}var u=e[l]={exports:{}};t[l][0].call(u.exports,function(o){return c(t[l][1][o]||o)},u,u.exports,o,t,e,r)}return e[l].exports}for(var n="function"==typeof __require&&__require,l=0;l<r.length;l++)c(r[l]);return c}({bgBlock:[function(o,t,e){"use strict";cc._RF.push(t,"0d47eHADOdMQJUbqTGGUszQ","bgBlock");var r,c=this&&this.__extends||(r=function(o,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])})(o,t)},function(o,t){function e(){this.constructor=o}r(o,t),o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),n=this&&this.__decorate||function(o,t,e,r){var c,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(o,t,e,r);else for(var i=o.length-1;i>=0;i--)(c=o[i])&&(l=(n<3?c(l):n>3?c(t,e,l):c(t,e))||l);return n>3&&l&&Object.defineProperty(t,e,l),l};Object.defineProperty(e,"__esModule",{value:!0});var l=cc._decorator,i=l.ccclass,a=l.property,p=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.col=0,t.row=0,t.active=1,t.isBlock=!1,t}return c(t,o),t.prototype.start=function(){},n([a],t.prototype,"col",void 0),n([a],t.prototype,"row",void 0),n([a],t.prototype,"active",void 0),n([a],t.prototype,"isBlock",void 0),n([i],t)}(cc.Component);e.default=p,cc._RF.pop()},{}],game:[function(o,t,e){"use strict";cc._RF.push(t,"db876DdOhNEZ4dZ101aIuIp","game");var r,c=this&&this.__extends||(r=function(o,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])})(o,t)},function(o,t){function e(){this.constructor=o}r(o,t),o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),n=this&&this.__decorate||function(o,t,e,r){var c,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(o,t,e,r);else for(var i=o.length-1;i>=0;i--)(c=o[i])&&(l=(n<3?c(l):n>3?c(t,e,l):c(t,e))||l);return n>3&&l&&Object.defineProperty(t,e,l),l};Object.defineProperty(e,"__esModule",{value:!0});var l=cc._decorator,i=l.ccclass,a=l.property,p=o("./groupNodeClass"),u=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.table=null,t.bgBox=null,t.moveBox=null,t.bgBlock=null,t.groupNode=null,t.pickUpHeight=300,t.blockWidth=50,t.PullDowmArr=[],t.canDesArr=[],t.allBlock=[],t.testNum=0,t}return c(t,o),t.prototype.setBgBlcok=function(){for(var o=0;o<9;o++){for(var t=[],e=0;e<9;e++){var r=cc.instantiate(this.bgBlock);r.parent=this.bgBox,r.getChildByName("1").active=!0,r.getComponent("bgBlock").col=o,r.getComponent("bgBlock").row=e,r.getComponent("bgBlock").active=1,t.push(r)}this.allBlock.push(t)}for(var c=new cc.Color(74,74,74,255),n=!1,l=0;l<3;l++)for(o=0;o<3;o++)for(t=[],c=n?new cc.Color(42,42,42,255):new cc.Color(74,74,74,255),n=!n,e=0;e<3;e++)for(var i=0;i<3;i++)this.allBlock[3*l+e][3*o+i].getChildByName("1").color=c},t.prototype.creatorBlcok=function(){for(var o=0;o<3;o++){var t=p.default(this.testNum,this.blockWidth,this.bgBlock,this.groupNode,this.moveBox,o);if(this.setTouch(t),10==this.testNum)return void(this.testNum=0);this.testNum=this.testNum+1,this.checkGroupNodeCanPullDown(t)||this.changeBlockColor(1,t.getChildByName("groupMid").children)}},t.prototype.touchChangeLocation=function(o){var t=o.getLocation();return this.table.convertToNodeSpaceAR(t)},t.prototype.setTouch=function(o){var t=this;o.on("touchstart",function(e){var r=t.touchChangeLocation(e);o.x=r.x,o.y=r.y,t.groupNodePickUp(o)}),o.on("touchmove",function(e){var r=t.touchChangeLocation(e);o.x=r.x,o.y=r.y,t.check(o)}),o.on("touchend",function(e){var r=t.touchChangeLocation(e);o.x=r.x,o.y=r.y,t.groupNodePullDown(o)}),o.on("touchcancel",function(){})},t.prototype.searchClosestBlock=function(o){for(var t=0;t<this.allBlock.length;t++)for(var e=this.allBlock[t],r=0;r<e.length;r++){var c=e[r],n=this.blockWidth/2;if(c.x-n<=o.x&&o.x<c.x+n&&c.y-n<=o.y&&o.y<c.y+n)return c}return null},t.prototype.changeBlockColor=function(o,t,e){for(var r=function(r){t[r].getComponent("bgBlock").active=o,t[r].children.forEach(function(c){0==o?t[r].getComponent("bgBlock").isBlock&&2==c.name?c.active=!0:t[r].getComponent("bgBlock").isBlock||1!=c.name?c.active=!1:c.active=!0:c.name==o?c.active=!0:c.active=!1,e&&"2"==c.name&&(c.color=e)}),"2"==o&&(t[r].getComponent("bgBlock").isBlock=!0),"1"==o&&(t[r].getComponent("bgBlock").isBlock=!1)},c=0;c<t.length;c++)r(c)},t.prototype.canPullDown=function(o,t){var e=o.getComponent("bgBlock").row,r=o.getComponent("bgBlock").col,c=[],n=t.getComponent("groupNode").typeArr;if(c.push(o),o.getComponent("bgBlock").isBlock)return!1;for(var l=1;l<n.length;l++){var i=e+n[l].row,a=r+n[l].col;if(a<0||a>8||i>8||i<0)return!1;var p=this.allBlock[a][i];if(p.getComponent("bgBlock").isBlock)return!1;c.push(p)}return c},t.prototype.check=function(o){var t={x:o.x,y:o.y+this.pickUpHeight};if(this.PullDowmArr.length>0&&(this.changeBlockColor(1,this.PullDowmArr),this.PullDowmArr=[]),this.canDesArr.length>0){for(var e=0;e<this.canDesArr.length;e++)this.changeBlockColor(0,this.canDesArr[e]);this.canDesArr=[]}var r=this.searchClosestBlock(t);if(r){var c=this.canPullDown(r,o);c&&(this.changeBlockColor(3,c),this.PullDowmArr=c,this.checkBlcokColOrRow())}},t.prototype.groupNodePickUp=function(o){var t=o.getChildByName("groupMid");cc.tween(o).to(.2,{scale:1},{easing:"backOut"}).call(function(){}).start(),cc.tween(t).to(.2,{y:this.pickUpHeight},{easing:"backOut"}).call(function(){}).start(),this.groupBlockScale(t.children,.95)},t.prototype.groupBlockScale=function(o,t){o.forEach(function(o){cc.tween(o).to(.2,{scale:t},{easing:"backOut"}).call(function(){}).start()})},t.prototype.groupNodePullDown=function(o){var t=this;if(this.groupBlockScale(o.getChildByName("groupMid").children,1),this.PullDowmArr.length>0){var e=o.getComponent("groupNode").color;cc.tween(o).to(.2,{x:this.PullDowmArr[0].x,y:this.PullDowmArr[0].y-this.pickUpHeight},{easing:"backOut"}).call(function(){t.changeBlockColor(2,t.PullDowmArr,e),t.PullDowmArr=[],o.destroy(),t.destroyBlock(),setTimeout(function(){0==t.moveBox.children.length&&t.creatorBlcok(),t.checkGroupNodeCanPullDownBy3()},0)}).start()}else{cc.tween(o.getChildByName("groupMid")).to(.3,{y:0},{easing:"backOut"}).call(function(){}).start(),cc.tween(o).to(.2,{scale:.7},{easing:"backOut"}).call(function(){}).start();var r=o.getComponent("groupNode").pos;cc.tween(o).to(.3,{x:r.x,y:r.y},{easing:"backOut"}).call(function(){}).start()}},t.prototype.destroyBlock=function(){if(this.canDesArr.length>0)for(var o=0;o<this.canDesArr.length;o++)this.changeBlockColor(1,this.canDesArr[o])},t.prototype.checkBlcokColOrRow=function(){for(var o=this.allBlock,t=0;t<o.length;t++){for(var e=o[t],r=!0,c=0;c<e.length;c++)if(!(s=e[c].getComponent("bgBlock")).isBlock&&3!=s.active&&4!=s.active){r=!1;break}r&&(this.changeBlockColor(4,e),this.canDesArr.push(e))}for(t=0;t<9;t++){var n=!0,l=[];for(c=0;c<9;c++)if(l.push(o[c][t]),!(s=o[c][t].getComponent("bgBlock")).isBlock&&3!=s.active&&4!=s.active){n=!1;break}n&&(this.changeBlockColor(4,l),this.canDesArr.push(l))}for(var i=0;i<3;i++)for(t=0;t<3;t++){var a=[],p=!0;for(c=0;c<3;c++)for(var u=0;u<3;u++){var s;if(a.push(o[3*i+c][3*t+u]),!(s=o[3*i+c][3*t+u].getComponent("bgBlock")).isBlock&&3!=s.active&&4!=s.active){p=!1;break}}p&&(this.changeBlockColor(4,a),this.canDesArr.push(a))}},t.prototype.checkGroupNodeCanPullDown=function(o){for(var t=0;t<this.allBlock.length;t++)for(var e=this.allBlock[t],r=0;r<e.length;r++)if(this.canPullDown(this.allBlock[t][r],o))return!0;return!1},t.prototype.checkGroupNodeCanPullDownBy3=function(){for(var o=this.moveBox.children,t=0,e=0;e<o.length;e++){var r=o[e];this.checkGroupNodeCanPullDown(r)?this.changeBlockColor(2,r.getChildByName("groupMid").children):(t++,this.changeBlockColor(1,r.getChildByName("groupMid").children))}return t!=o.length},t.prototype.onLoad=function(){this.setBgBlcok(),this.creatorBlcok()},t.prototype.update=function(){},n([a(cc.Node)],t.prototype,"table",void 0),n([a(cc.Node)],t.prototype,"bgBox",void 0),n([a(cc.Node)],t.prototype,"moveBox",void 0),n([a(cc.Prefab)],t.prototype,"bgBlock",void 0),n([a(cc.Prefab)],t.prototype,"groupNode",void 0),n([a],t.prototype,"pickUpHeight",void 0),n([a],t.prototype,"blockWidth",void 0),n([a],t.prototype,"PullDowmArr",void 0),n([a],t.prototype,"canDesArr",void 0),n([a],t.prototype,"allBlock",void 0),n([a],t.prototype,"testNum",void 0),n([i],t)}(cc.Component);e.default=u,cc._RF.pop()},{"./groupNodeClass":"groupNodeClass"}],groupNodeClass:[function(o,t,e){"use strict";cc._RF.push(t,"ab3fcaEgyhIjbySK1ZFNwg9","groupNodeClass"),Object.defineProperty(e,"__esModule",{value:!0});var r={0:[{}],1:[{},{row:1,col:0}],2:[{},{row:0,col:-1}],3:[{},{row:-1,col:0},{row:1,col:0}],4:[{},{row:0,col:-1},{row:0,col:1}],5:[{},{row:0,col:-1},{row:-1,col:0},{row:1,col:0}],6:[{},{row:-1,col:-1},{row:-1,col:0},{row:1,col:0}],7:[{},{row:0,col:-1},{row:0,col:1},{row:1,col:1}],8:[{},{row:-1,col:0},{row:1,col:1},{row:0,col:1}],9:[{},{row:1,col:0},{row:1,col:-1},{row:0,col:1}],10:[{},{row:-1,col:0},{row:-1,col:-1},{row:0,col:-1}]},c=[new cc.Color(120,200,200,255),new cc.Color(20,200,120,255),new cc.Color(20,80,200,255),new cc.Color(180,20,200,255)],n=0;e.default=function(o,t,e,l,i,a){void 0===t&&(t=50);var p=c[n];4==++n&&(n=0);var u=r[o],s=cc.instantiate(l);s.parent=i,s.width=3*t,s.height=3*t,s.scale=.7;var h=a*t*3-3*t;s.position=cc.v3(h,-350),s.getComponent("groupNode").pos={x:h,y:-350},s.getComponent("groupNode").type=1,s.getComponent("groupNode").typeArr=u,s.getComponent("groupNode").color=p;for(var f=s.getChildByName("groupMid"),g=0;g<u.length;g++){var d=cc.instantiate(e);d.parent=f,d.getChildByName("2").active=!0,d.getChildByName("2").color=p;var y=u[g];d.position=0==g?cc.v3(0,0):cc.v3(d.width*y.row,-d.width*y.col)}return s},cc._RF.pop()},{}],groupNode:[function(o,t,e){"use strict";cc._RF.push(t,"a69d36/R31Ay489xSkJ3xf7","groupNode");var r,c=this&&this.__extends||(r=function(o,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(o,t){o.__proto__=t}||function(o,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o[e]=t[e])})(o,t)},function(o,t){function e(){this.constructor=o}r(o,t),o.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}),n=this&&this.__decorate||function(o,t,e,r){var c,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,e):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(o,t,e,r);else for(var i=o.length-1;i>=0;i--)(c=o[i])&&(l=(n<3?c(l):n>3?c(t,e,l):c(t,e))||l);return n>3&&l&&Object.defineProperty(t,e,l),l};Object.defineProperty(e,"__esModule",{value:!0});var l=cc._decorator,i=l.ccclass,a=l.property,p=function(o){function t(){var t=null!==o&&o.apply(this,arguments)||this;return t.type=0,t.typeArr=[],t.pos={},t.color=null,t}return c(t,o),n([a],t.prototype,"type",void 0),n([a],t.prototype,"typeArr",void 0),n([a],t.prototype,"pos",void 0),n([a],t.prototype,"color",void 0),n([i],t)}(cc.Component);e.default=p,cc._RF.pop()},{}]},{},["bgBlock","game","groupNode","groupNodeClass"]);