/*2016-8-16 chenjunmiao*/
/*
    可输入参数
    'startSpeed' : 0.5,  //*开始移动速度、后面递增
    'increase' : 0.01,  //*加速度递增值，0则为匀速
    'r' : 1,  //*star半径
    'starAmount' : 100,//*star数量
    'starFlash' : 'darkToLight',//*star "glitter"闪烁效果 默认"darkToLight" 由暗到亮
    'backRange' : '' //*以鼠标为中心的的正方形范围--r空为整屏范围
*/

;(function ($) {
    $.fn.starrycanvas = function(options){
        var canvas =  document.getElementById(this.get(0).id);
        var ctx = canvas.getContext('2d');
        var canvas_width =  canvas.width = document.documentElement.clientWidth
        var canvas_height = canvas.height = document.documentElement.clientHeight
        var stars = [] //allstar
        var index = 0 //arr序号
        var centerX = canvas_width/2 //圆心
        var centerY = canvas_height/2 //圆心
        var startSpeedConstant //初始速度容器
        var starAmount = 1//star数量  // new star()//至少执行一次才能获取传入的starAmount

        var getFlashStyle = function(opacitySel,opacity,style){
            var flashStyle = {}
            if(style == 'glitter'){ //透明度 闪烁
                if(opacitySel == 0){//变亮
                    opacity += 0.02
                    if(opacity >= 1){
                        opacitySel = 1
                    }
                }
                if(opacitySel == 1){//变暗
                    opacity -= 0.02
                    if(opacity <= 0.2){
                        opacitySel = 0
                    }
                }
            }
            if(style == 'darkToLight'){//透明度 暗-亮
                if(opacity < 1){
                   opacity += 0.008
                }else{
                    opacity == 1
                }
            }
            flashStyle.opacity = opacity
            flashStyle.opacitySel = opacitySel
            return flashStyle
        }
        //移动函数
        var getMoveStyle = function(starX,starY,startSpeed){
            var nextStep = {}
            nextStep.x2 = (starX-centerX)/Math.sqrt(Math.pow(starX-centerX,2)+Math.pow(starY-centerY,2))*startSpeed//移动的下一步坐标
            nextStep.y2 = (starY-centerY)/Math.sqrt(Math.pow(starX-centerX,2)+Math.pow(starY-centerY,2))*startSpeed
            return nextStep
        }
        //溢出屏幕后重现范围
        var getBackRange = function(backRange){
            var range = {}
            if (backRange == '') {
                range.starX =  Math.random()* canvas_width
                range.starY =  Math.random()* canvas_height
            }else{
                range.starX =  Math.random()*((centerX+backRange)-(centerX-backRange))+(centerX-backRange)//随机数范围：Math.random()*(最大值-最小值)+最小值
                range.starY =  Math.random()*((centerY+backRange)-(centerY-backRange))+(centerY-backRange)
            }
            return range 
        }
        //star
        var star = function(el, options){
            this.$element = el,
            this.defaults = {
                'starX' : Math.random()*canvas_width,  //开始坐标随机
                'starY' : Math.random()*canvas_height,  //开始坐标随机
                'startSpeed' : 0.5,  //*开始移动速度、后面递增
                'increase' : 0.01,  //*加速度递增值，0则为匀速
                'r' : 1,  //*star半径
                'sAngle' : 0,  //画圆的参数
                'eAngle' : 2*Math.PI,  //画圆的参数
                'opacity' : 0,  //透明度
                'opacitySel' : 0 ,//0+；1-判断变暗变亮 flashStyle()使用
                'starAmount' : 100,//*star数量
                'starFlash' : 'darkToLight',//*star "glitter"闪烁效果 默认"darkToLight" 由暗到亮
                'backRange' : '' //*以鼠标为中心的的正方形范围--r空为整屏范围
            }
            index++
            stars[index] = this
            this.options = $.extend({}, this.defaults, options)
            startSpeedConstant =  this.options.startSpeed
            starAmount = this.options.starAmount
        }
        //绘制星星
        star.prototype.draw = function(){
            //x轴移动
            var options = this.options
            //中心移动
            if(options.starX > canvas_width || options.starY > canvas_height || options.starY < 0 ||options.x < 0){
                options.opacity = 0
                options.startSpeed = startSpeedConstant
                var range = getBackRange(options.backRange)//溢出屏幕返回位置
                options.starX = range.starX
                options.starY = range.starY
            }else{
                options.startSpeed += options.increase//+加速度
                var nextStep = getMoveStyle(options.starX,options.starY,options.startSpeed)//移动轨迹
                options.starX += nextStep.x2
                options.starY += nextStep.y2
            }
            var flash = getFlashStyle(options.opacitySel,options.opacity,options.starFlash)
            options.opacity = flash.opacity
            options.opacitySel = flash.opacitySel
            
            ctx.beginPath();
            ctx.arc(options.starX,options.starY,options.r,options.sAngle,options.eAngle);
            ctx.fillStyle = 'rgba(255,255,255,'+ options.opacity +')';
            ctx.fill();
        }

        //new star
        for(var i = 0;i<starAmount;i++){
            new star(this,options)
        }
        function loop(){
            document.onmousemove = function(e){
                centerX = e.clientX
                centerY = e.clientY
            }
            ctx.clearRect(0, 0, canvas_width,canvas_height);
            for ( var i in stars ) {
                stars[i].draw();
            }
            window.requestAnimationFrame(loop);
        }

        loop()
    }
})(jQuery);
