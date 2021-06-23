window.__require=function c(t,e,r){function l(o,s){if(!e[o]){if(!t[o]){var n=o.split("/");if(n=n[n.length-1],!t[n]){var a="function"==typeof __require&&__require;if(!s&&a)return a(n,!0);if(i)return i(n,!0);throw new Error("Cannot find module '"+o+"'")}o=n}var h=e[o]={exports:{}};t[o][0].call(h.exports,function(c){return l(t[o][1][c]||c)},h,h.exports,c,t,e,r)}return e[o].exports}for(var i="function"==typeof __require&&__require,o=0;o<r.length;o++)l(r[o]);return l}({game:[function(c,t){"use strict";cc._RF.push(t,"dbfedUGnuxAXpHvUgWQnd9S","game"),cc.Class({extends:cc.Component,properties:{blockBox:cc.Node,ctrlBlockArea:cc.Node,block1:cc.SpriteFrame,block2:cc.SpriteFrame,block3:cc.SpriteFrame,block4:cc.SpriteFrame,block5:cc.SpriteFrame,block6:cc.SpriteFrame,block7:cc.SpriteFrame,block8:cc.SpriteFrame,motionPrefal:cc.Prefab,boomPrefal:cc.Prefab,scoreLabel:cc.Label,gameOver:cc.Node,gameOverScore:cc.Label},test:function(){var c=[];this.testB={x:240.4539643366011,y:-35.084056704043725,level:4};for(var t=0;t<c.length;t++){var e=c[t],r=e.level;aa=new cc.Node("Sprite");var l=aa.addComponent(cc.Sprite);l.sizeMode="CUSTOM",l.spriteFrame=this["block"+r],aa.parent=this.blockBox,aa.setPosition(cc.v2(e.x,e.y));var i=this.blockSize+(r-1)*this.blockSizeAdd;aa.setContentSize(cc.size(i,i)),aa.selfArcHarf=e.selfArcHarf,aa.arc=e.arc,aa.level=r}this.arrToSort()},testClick:function(){this.ctrlBlcokGo(this.testB)},init:function(){this.gameOver.active=!1,this.ctrlBlockArea.destroyAllChildren(),this.blockBox.destroyAllChildren(),this.scoreLabel.string=0,this.colorArr=["",new cc.Color(0,133,255,255),new cc.Color(255,0,20,255),new cc.Color(143,13,216,255),new cc.Color(255,245,0,255),new cc.Color(246,126,7,255),new cc.Color(246,7,88,255),new cc.Color(0,255,5,255)],this.blockSize=40,this.blockSizeAdd=20,this.maxLevel=7,this.canCtrlBlcokLevel=4,this.pi=3.1415926,this.circleRadius=243,this.speedMillisecond=200,this.speedSecond=.2,this.speedMove=.2,this.speedScaleTo=.5,this.ctrlBlock=null,this.clickFlag=!1,this.blockArr=[],this.maxNumInCircle=parseInt(6.28/this.getBlcokArc(this.blockSize+(this.maxLevel-1)*this.blockSizeAdd/2)),this.isGameOver=!1,this.randomBlock={num:0,dir:!0},this.createBlock(!0,1),this.setTouch()},randomNum:function(c){var t=Math.ceil(Math.random()*(2*(c-3)+9));return 1<=t&&t<=3?1:4<=t&&t<=6?2:7<=t&&t<=9?3:10<=t&&t<=11?4:1},romoveMotion:function(){var c;null==(c=this.ctrlBlock.getChildByName("motion"))||c.destroy()},changeCtrlBlock:function(){if(this.ctrlBlock.level<=this.maxLevel){var c=new cc.Node("Sprite"),t=c.addComponent(cc.Sprite);t.sizeMode="CUSTOM",t.spriteFrame=this.ctrlBlock.getChildByName("ctrlBlock").getComponent(cc.Sprite).spriteFrame,c.parent=this.blockBox,c.setPosition(cc.v2(this.ctrlBlock.x,this.ctrlBlock.y)),c.setContentSize(cc.size(this.ctrlBlock.width,this.ctrlBlock.height)),c.level=this.ctrlBlock.level}this.ctrlBlock.destroy(),this.ctrlBlock=this.waitBlcok,this.arrToSort()},createBlock:function(c,t){var e=this,r=t||this.randomNum(this.canCtrlBlcokLevel);this.waitBlcok=new cc.Node("Node"),this.waitBlcok.parent=this.ctrlBlockArea;var l=new cc.Node("Sprite");l.parent=this.waitBlcok,l.name="ctrlBlock";var i=l.addComponent(cc.Sprite);i.sizeMode="CUSTOM",i.spriteFrame=this["block"+r],this.waitBlcok.setPosition(cc.v2(0,0)),this.waitBlcok.setScale(cc.v2(0,0));var o=this.blockSize+(r-1)*this.blockSizeAdd;this.waitBlcok.setContentSize(cc.size(o,o)),l.setContentSize(cc.size(o,o)),this.waitBlcok.selfArcHarf=this.getBlcokArc(o/2)/2,this.waitBlcok.level=r;var s=cc.instantiate(this.boomPrefal);s.parent=this.waitBlcok,s.color=this.colorArr[r],console.log("waitBlcok",this.waitBlcok);var n=cc.scaleTo(this.speedScaleTo,1,1),a=cc.sequence(n,cc.callFunc(function(){var t=cc.instantiate(e.motionPrefal);t.zIndex=-1;var l=t.getComponent(cc.MotionStreak);l.fadeTime=.1,l.stroke=o,l.color=e.colorArr[r],t.parent=e.waitBlcok,c&&(e.ctrlBlock=e.waitBlcok,e.clickFlag=!0)}));this.waitBlcok.runAction(a)},createBlockCheckIsSame:function(c){switch(c){case 1:return c+1;case 2:default:return c-1}},createBlockByCircle:function(c){var t=this,e=this.randomNum(3),r=null;this.randomBlock.dir?e==c[0].level&&(e=this.createBlockCheckIsSame(e)):e==c[c.length-1].level&&(e=this.createBlockCheckIsSame(e));var l=new cc.Node("Node"),i=new cc.Node("Sprite");i.parent=l;var o=i.addComponent(cc.Sprite);o.sizeMode="CUSTOM",o.spriteFrame=this["block"+e],l.setScale(cc.v2(0,0));var s=this.blockSize+(e-1)*this.blockSizeAdd;l.setContentSize(cc.size(s,s)),i.setContentSize(cc.size(s,s)),l.selfArcHarf=this.getBlcokArc(s/2)/2,l.level=e;var n,a=null;if(this.randomBlock.dir)a=c[0].arc-c[0].selfArcHarf-l.selfArcHarf,r=c[c.length-1];else{var h=c.length-1;a=c[h].arc+c[h].selfArcHarf+l.selfArcHarf,r=c[0]}l.arc=a,n=this.getPosition(a,this.circleRadius),l.setPosition(cc.v2(n.x,n.y)),this.isGameOver=c.length>this.maxNumInCircle&&this.checkBlackIsOverlap(r,l),l.parent=this.blockBox;var f=cc.scaleTo(.2,1,1),k=cc.sequence(f,cc.callFunc(function(){if(t.isGameOver)return c.push(l),void t.gameOverAction(r,l,c,[])}));l.runAction(k)},setTouch:function(){this.node.on("touchend",function(c){if(this.clickFlag){var t=c.getLocation();t=this.node.convertToNodeSpaceAR(t),this.ctrlBlcokGo(t),this.randomBlock.num=this.randomBlock.num+1,this.createBlock(!1)}},this)},ctrlBlcokGo:function(c){this.clickFlag=!1;var t=this.getArcAndRadius(c.x,c.y),e=this.getPosition(t.arc,this.circleRadius);this.actionBy=cc.moveTo(this.speedSecond,cc.v2(e.x,e.y)),this.ctrlBlock.arc=t.arc,console.log("\u53d1\u5c04\u6c42\u7684\u4f4d\u7f6exy",{x:e.x,y:e.y,level:this.ctrlBlock.level}),this.checkBlack()},getBlcokArc:function(c){return 4*Math.asin(c/2/this.circleRadius)},getArcAndRadius:function(c,t){var e={};return e.r=Math.sqrt(c*c+t*t),e.arc=Math.atan(t/c),t>0&&c<0?e.arc=e.arc+this.pi:t<0&&c<0?e.arc=e.arc+this.pi:t<0&&c>0&&(e.arc=e.arc+2*this.pi),e},getPosition:function(c,t){var e={};return e.x=t*Math.cos(c),e.y=t*Math.sin(c),e},sortMinToMax:function(c){if(c.length>0){for(var t=0;t<c.length;t++){var e=c[t];e.arc=this.getArcAndRadius(e.x,e.y).arc,e.selfArcHarf=this.getBlcokArc(e.width/2)/2}c=c.sort(function(c,t){return c.arc-t.arc})}return c},sortRightToLeft:function(c){for(var t=0;t<c.length;t++){var e=c[t],r=c[t-1];if((0!=e.x||0!=e.y)&&0!=t&&!this.checkBlockBySide(e,r)){var l=c.slice(0,t);return c.slice(t,c.length).concat(l)}}return c},arrToSort:function(){if(3==this.randomBlock.num){var c=this.blockBox.children;c=this.sortMinToMax(c),c=this.sortRightToLeft(c),this.createBlockByCircle(c),this.randomBlock.num=0,this.randomBlock.dir=!this.randomBlock.dir}if(!this.isGameOver){var t=this.blockBox.children;this.blockArr=this.sortMinToMax(t),this.clickFlag=!0}},checkBlack:function(){var c=this,t=0,e=0,r=null,l=null;if(0!=this.blockArr.length){for(var i=0;i<this.blockArr.length;i++){var o=this.blockArr[i];if(0!=o.x||0!=o.y){var s=this.checkBlackIsInside(o,this.ctrlBlock),n=this.ctrlBlock.selfArcHarf+o.selfArcHarf;if(s){"left"==this.isBlockLfetOrRight(o,this.ctrlBlock)?(n=o.arc-n,t=null,e=2*this.ctrlBlock.selfArcHarf,r=i):(n=o.arc+n,t=2*this.ctrlBlock.selfArcHarf,e=null,r=i==this.blockArr.length-1?0:i+1),this.ctrlBlock.arc=n;var a=this.getPosition(n,this.circleRadius);this.actionBy=cc.moveTo(this.speedSecond,cc.v2(a.x,a.y));var h=cc.sequence(this.actionBy,cc.callFunc(function(){c.romoveMotion()}));return this.ctrlBlock.runAction(h),void this.moveAllBlcok(t,e,r,l)}}}for(var f=0;f<this.blockArr.length;f++){var k=this.blockArr[f];0==k.x&&0==k.y||this.checkBlackIsOverlap(k,this.ctrlBlock)&&("left"==this.isBlockLfetOrRight(k,this.ctrlBlock)?(t=this.getOverlapArc(k,this.ctrlBlock),r=f):(e=this.getOverlapArc(this.ctrlBlock,k),l=f))}if(t||e){var B=cc.sequence(this.actionBy,cc.callFunc(function(){c.romoveMotion()}));this.ctrlBlock.runAction(B),this.moveAllBlcok(t,e,r,l)}else this.moveToNearestBlock()}else{var v=cc.sequence(this.actionBy,cc.callFunc(function(){c.romoveMotion(),c.changeCtrlBlock()}));this.ctrlBlock.runAction(v)}},checkBlackIsInside:function(c,t){if(!this.checkBlackIsOverlap(c,t))return!1;var e=2*this.pi,r=this.pi/2,l=c.arc+c.selfArcHarf,i=c.arc-c.selfArcHarf,o=t.arc+t.selfArcHarf,s=t.arc-t.selfArcHarf;return l>e&&(l-=e),l<0&&(l=e+l),i>e&&(i-=e),i<0&&(i=e+i),o>e&&(o-=e),o<0&&(o=e-o),s>e&&(s-=e),s<0&&(s=e+s),l<r&&i>e-r&&(i-=e,o>e-r&&(o-=e),s>e-r&&(s-=e)),o<r&&s>e-r&&(s-=e,l>e-r&&(l-=e),i>e-r&&(i-=e)),c.width>t.width?l>=o&&i<=s:o>=l&&s<=i},checkBlackIsOverlap:function(c,t){return this.getDelta(c,t).toFixed(6)<(c.selfArcHarf+t.selfArcHarf).toFixed(6)},checkBlockBySide:function(c,t){return!(this.getDelta(c,t).toFixed(6)>(c.selfArcHarf+t.selfArcHarf+1e-5).toFixed(6))},getOverlapArc:function(c,t){return t.selfArcHarf+t.arc-(c.arc-c.selfArcHarf)},reSort:function(c){var t,e=[];return e=this.blockArr.slice(c,this.blockArr.length),t=this.blockArr.slice(0,c),e.concat(t)},splitBlockArr:function(c){for(var t=0;t<c.length;t++){var e=c[t],r=c[t-1];if(0!=e.x||0!=e.y){var l=null,i=null;if(0==t?(l=this.checkBlockBySide(this.ctrlBlock,e),i=this.isBlockLfetOrRight(e,this.ctrlBlock),c.length>1&&this.ctrlBlock.arc-this.ctrlBlock.selfArcHarf<e.arc&&(i="left")):(l=this.checkBlockBySide(r,e),i=this.isBlockLfetOrRight(e,r)),!l||"right"==i||""==i)return{leftArr:c.slice(0,t),rightArr:c.slice(t,c.length).reverse()}}}return{leftArr:c.slice(0,c.length),rightArr:[]}},moveAllBlcok:function(c,t,e,r){var l,i,o=this;null==e&&(e=r+1),l=this.reSort(e);for(var s=[],n=0;n<l.length;n++){var a=l[n];s[n]={x:a.x,y:a.y,level:a.level,acr:a.arc,selfArcHarf:a.selfArcHarf}}console.log("copyArray",s),i=this.splitBlockArr(l),this.isGameOver=l.length>this.maxNumInCircle&&this.checkIsGameOver(i.leftArr,i.rightArr,c,t),this.moveAllBlcokToLeftOrRight("left",c,i.leftArr,function(){if(0==i.rightArr.length){if(o.isGameOver)return;o.moveAllOverCallFun(i.leftArr,i.rightArr)}}),this.moveAllBlcokToLeftOrRight("right",t,i.rightArr,function(){o.isGameOver||o.moveAllOverCallFun(i.leftArr,i.rightArr)})},moveAllBlcokToLeftOrRight:function(c,t,e,r){for(var l=0;l<e.length;l++){var i=e[l],o="left"==c?i.arc+t:i.arc-t;i.arc=o;var s=this.getPosition(o,this.circleRadius),n=cc.moveTo(this.speedMove,cc.v2(s.x,s.y));if(l==e.length-1){var a=cc.sequence(n,cc.callFunc(function(){r&&r()}));i.runAction(a)}else{var h=cc.sequence(n,cc.callFunc(function(){}));i.runAction(h)}}},moveAllOverCallFun:function(c,t){var e=this,r=c.length>0&&this.checkLevel(c[0]),l=t.length>0&&this.checkLevel(t[0]);if(r||l)return r&&l?(c[0].destroy(),c.splice(0,1),t[0].destroy(),t.splice(0,1),void this.ctrlBlockLevelUp("mid",function(){if(c.length>0){var r=e.getOverlapArc(c[0],e.ctrlBlock);e.moveAllBlcokToLeftOrRight("left",r,c,function(){0==t.length&&e.moveAllOverCallFun(c,t)})}if(t.length>0){var l=e.getOverlapArc(e.ctrlBlock,t[0]);e.moveAllBlcokToLeftOrRight("right",l,t,function(){e.moveAllOverCallFun(c,t)})}0==c.length&&0==t.length&&e.moveAllOverCallFun(c,t)})):r?(c[0].destroy(),c.splice(0,1),void this.ctrlBlockLevelUp("right",function(){if(c.length>0){var r;r=c[0].arc>e.ctrlBlock.arc?c[0].arc-e.ctrlBlock.arc-c[0].selfArcHarf-e.ctrlBlock.selfArcHarf:c[0].arc+(2*e.pi-e.ctrlBlock.arc)-c[0].selfArcHarf-e.ctrlBlock.selfArcHarf,e.moveAllBlcokToLeftOrRight("right",r,c,function(){e.ctrlBlock.level>e.maxLevel&&(e.oneBlcokChangeCtrlBlock(),t[0].destroy(),t.splice(0,1)),e.moveAllOverCallFun(c,t)})}else e.moveAllOverCallFun(c,t)})):l?(t[0].destroy(),t.splice(0,1),void this.ctrlBlockLevelUp("left",function(){if(t.length>0){var r;r=e.ctrlBlock.arc>t[0].arc?e.ctrlBlock.arc-t[0].arc-t[0].selfArcHarf-e.ctrlBlock.selfArcHarf:e.ctrlBlock.arc+(2*e.pi-t[0].arc)-t[0].selfArcHarf-e.ctrlBlock.selfArcHarf,e.moveAllBlcokToLeftOrRight("left",r,t,function(){e.ctrlBlock.level>e.maxLevel&&(e.oneBlcokChangeCtrlBlock(),c[0].destroy(),c.splice(0,1)),e.moveAllOverCallFun(c,t)})}else e.moveAllOverCallFun(c,t)})):void 0;setTimeout(function(){e.changeCtrlBlock()},this.speedMillisecond)},isBlockLfetOrRight:function(c,t){if(void 0===t||void 0===c)return"";var e=t.arc,r=e>this.pi?e-this.pi:e+this.pi;return e<=this.pi?c.arc>e&&c.arc<r?"left":"right":c.arc<e&&c.arc>r?"right":"left"},moveToNearestBlock:function(){var c=this.blockArr,t=[],e=this.ctrlBlock.arc;if(1!=c.length)if(e<c[0].arc)(t=this.reSort(0))[0].arc-e<e+(2*this.pi-t[t.length-1].arc)?this.moveToBlockByCircle(t,"right",0):this.moveToBlockByCircle(t,"left",t.length-1);else if(e>c[c.length-1].arc)(t=this.reSort(0))[0].arc+(2*this.pi-e)<e-t[t.length-1].arc?this.moveToBlockByCircle(t,"right",0):this.moveToBlockByCircle(t,"left",t.length-1);else for(var r=0;r<c.length;r++)e>c[r].arc&&e<c[r+1].arc&&((t=this.reSort(r+1))[0].arc-e<e-t[t.length-1].arc?this.moveToBlockByCircle(t,"right",0):this.moveToBlockByCircle(t,"left",t.length-1));else"left"==this.isBlockLfetOrRight(this.ctrlBlock,c[0])?this.moveToBlockByCircle(c,"left",0):this.moveToBlockByCircle(c,"right",0)},moveToBlockByCircle:function(c,t,e){var r=this,l=2*this.pi,i=c[e],o=this.ctrlBlock.selfArcHarf+i.selfArcHarf;(o="right"==t?i.arc-o:i.arc+o)<0&&(o=l+o),o>l&&(o-=l);var s=this.ctrlBlock.arc;this.ctrlBlock.arc=o;var n=Math.abs(o-s);"right"==t?s>this.pi&&o<this.pi&&(n=Math.abs(l-s+o)):o>this.pi&&s<this.pi&&(n=Math.abs(l-o+s));var a=cc.sequence(this.actionBy,cc.callFunc(function(){r.romoveMotion();var l=[],i=cc.callFunc(function(){r.moveToBlockByCircleCallFun(c,e)});if(n>.4)for(var a=parseInt(n/.4),h=0;h<a+1;h++)if(h==a){var f=r.getPosition(o,r.circleRadius),k=cc.moveTo(.1,cc.v2(f.x,f.y));l.push(k),l.push(i)}else{var B="right"==t?s+.4*(h+1):s-.4*(h+1),v=r.getPosition(B,r.circleRadius),u=cc.moveTo(.1,cc.v2(v.x,v.y));l.push(u)}else{var g=r.getPosition(o,r.circleRadius),m=cc.moveTo(r.speedMove,cc.v2(g.x,g.y));l.push(m),l.push(i)}var A=cc.sequence(l);r.ctrlBlock.runAction(A)}));this.ctrlBlock.runAction(a)},moveToBlockByCircleCallFun:function(c,t){var e=this,r=c[t];if(this.checkLevel(r))return 0==t&&1==c.length?(c[0].destroy(),void this.ctrlBlockLevelUp("mid",function(){e.changeCtrlBlock()})):0==t?(c[t].destroy(),c.splice(t,1),void this.ctrlBlockLevelUp("right",function(){var t;c.length>0?(t=c[0].arc-e.ctrlBlock.arc-c[0].selfArcHarf-e.ctrlBlock.selfArcHarf,e.moveAllBlcokToLeftOrRight("right",t,c,function(){e.moveToBlockByCircleCallFun(c,0)})):e.changeCtrlBlock()})):(c[t].destroy(),c.splice(t,1),void this.ctrlBlockLevelUp("left",function(){var r;c.length>0?(r=e.ctrlBlock.arc-c[t-1].arc-c[t-1].selfArcHarf-e.ctrlBlock.selfArcHarf,e.moveAllBlcokToLeftOrRight("left",r,c,function(){e.moveToBlockByCircleCallFun(c,t-1)})):e.changeCtrlBlock()}));this.changeCtrlBlock()},checkLevel:function(c){return c.level==this.ctrlBlock.level},ctrlBlockLevelUp:function(c,t){var e=this;this.ctrlBlock.getChildByName("boom").getComponent(cc.Animation).play(),this.scoreLabel.string=parseInt(this.scoreLabel.string)+parseInt(this.ctrlBlock.level);var r=this.blockSize+this.ctrlBlock.level*this.blockSizeAdd,l=this.getBlcokArc(r/2)/2,i=this.ctrlBlock.arc;"right"==c?i=this.ctrlBlock.arc-this.ctrlBlock.selfArcHarf+l:"left"==c&&(i=this.ctrlBlock.arc+this.ctrlBlock.selfArcHarf-l);var o=this.getPosition(i,this.circleRadius);this.ctrlBlock.getChildByName("ctrlBlock").runAction(cc.scaleTo(.2,0,0)),setTimeout(function(){e.ctrlBlock.level=e.ctrlBlock.level+1,e.ctrlBlock.setPosition(cc.v2(o.x,o.y)),e.ctrlBlock.level<e.maxLevel+1?(e.ctrlBlock.setContentSize(cc.size(r,r)),e.ctrlBlock.getChildByName("ctrlBlock").setContentSize(cc.size(r,r)),e.ctrlBlock.getChildByName("ctrlBlock").getComponent(cc.Sprite).spriteFrame=e["block"+e.ctrlBlock.level],e.ctrlBlock.getChildByName("ctrlBlock").runAction(cc.scaleTo(.2,1,1)),e.ctrlBlock.getChildByName("boom").color=e.colorArr[e.ctrlBlock.level],e.ctrlBlock.selfArcHarf=l,e.ctrlBlock.arc=i):(e.ctrlBlock.setContentSize(cc.size(0,0)),e.ctrlBlock.getChildByName("ctrlBlock").setContentSize(cc.size(0,0)),"right"==c?i-=l:"left"==c&&(i+=l),e.ctrlBlock.arc=i,e.ctrlBlock.selfArcHarf=0),t&&t()},200)},oneBlcokChangeCtrlBlock:function(c){this.ctrlBlock.level=c.level,this.ctrlBlock.setPosition(cc.v2(c.x,c.y)),this.ctrlBlock.setContentSize(cc.size(c.width,c.height)),this.ctrlBlock.getChildByName("ctrlBlock").setContentSize(cc.size(c.width,c.height)),this.ctrlBlock.getChildByName("ctrlBlock").getComponent(cc.Sprite).spriteFrame=c.getComponent(cc.Sprite).spriteFrame,this.ctrlBlock.getChildByName("boom").color=this.colorArr[this.ctrlBlock.level],this.ctrlBlock.selfArcHarf=c.selfArcHarf,this.ctrlBlock.arc=c.arc},getDelta:function(c,t){var e=c.arc-t.arc;return Math.abs(e)>this.pi&&(e=t.arc>this.pi?2*this.pi-t.arc+c.arc:2*this.pi-c.arc+t.arc),Math.abs(e)},gameOverAction:function(c,t,e,r){var l=this,i=cc.repeat(cc.sequence(cc.scaleTo(.5,.7,.7),cc.scaleTo(.5,1,1)),3),o=cc.repeat(cc.sequence(cc.scaleTo(.5,.7,.7),cc.scaleTo(.5,1,1)),2);c.runAction(i),t.runAction(o),setTimeout(function(){if(e.length>0&&r.length>0){e=e.reverse(),r=r.reverse();for(var c=function(c){c==e.length?e.length>=r.length&&setTimeout(function(){l.ctrlBlock.getChildByName("boom").getComponent(cc.Animation).play(),l.ctrlBlock.destroy(),l.gameOverScene()},150*c):setTimeout(function(){l.boomArr(e[c])},150*c)},t=0;t<e.length+1;t++)c(t);for(var i=function(c){c==r.length?r.length>e.length&&setTimeout(function(){l.ctrlBlock.getChildByName("boom").getComponent(cc.Animation).play(),l.ctrlBlock.destroy(),l.gameOverScene()},150*c):setTimeout(function(){l.boomArr(r[c])},150*c)},o=0;o<r.length+1;o++)i(o)}0!=e.length&&0!=r.length||function(){var c=e.length>0?e:r;c=c.reverse();for(var t=function(t){t==c.length?setTimeout(function(){l.ctrlBlock.getChildByName("boom").getComponent(cc.Animation).play(),l.ctrlBlock.destroy(),l.gameOverScene()},150*t):setTimeout(function(){l.boomArr(c[t])},150*t)},i=0;i<c.length+1;i++)t(i)}()},2e3)},boomArr:function(c){var t=cc.instantiate(this.boomPrefal);t.color=this.colorArr[c.level],t.setPosition(cc.v2(c.x,c.y)),t.parent=this.blockBox,t.getComponent(cc.Animation).play(),c.destroy()},checkIsGameOver:function(c,t,e,r){if(c.length>0&&t.length>0){var l=c[c.length-1],i=t[t.length-1];return this.getDelta(l,i)-l.selfArcHarf-i.selfArcHarf<=2*this.ctrlBlock.selfArcHarf&&(this.gameOverAction(l,i,c,t),!0)}if(0==c.length){var o=t[t.length-1],s=this.ctrlBlock;return this.getDelta(o,s)-o.selfArcHarf-s.selfArcHarf<=r&&(this.gameOverAction(o,s,c,t),!0)}if(0==t.length){var n=c[c.length-1],a=this.ctrlBlock;return this.getDelta(n,a)-n.selfArcHarf-a.selfArcHarf<=e&&(this.gameOverAction(n,a,c,t),!0)}},gameOverScene:function(){this.gameOverScore.string=this.scoreLabel.string,this.gameOver.active=!0},clickStart:function(){this.init()},onLoad:function(){this.init()},start:function(){},update:function(){}}),cc._RF.pop()},{}]},{},["game"]);