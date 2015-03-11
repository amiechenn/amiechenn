// JavaScript Document

(function($) {       
	$.fn.mySwiper = function(width) {     
		var arrow=true;
		var sel=0;
		
		$(document).ready(function(){
			w=(-width).toString();
			var elems = document.getElementsByClassName('swiper-wrapper');
			for(var j = 0; j < elems.length; j++) {
				elems[j].style.left = w+"px";
			}
			$(".swiper-wrapper").css({"-webkit-transition-duration":"0.5s","transition-duration":"0.5s"});
			$($(".shade_switch").get(0)).addClass("selected");
			$(".arrow").attr("style","visibility:hidden;");
			
		});
		//end--初始属性值赋值
		
		$(document).ready(function(){
			for(var i=0;i<($(".swiper_slide").length-2);i++){
				$($(".shade_switch").get(i)).click(function(index){
					return function(){	
						sel=index;
						w=(-width*(index+1)).toString();
						var elems = document.getElementsByClassName('swiper-wrapper');
						for(var j = 0; j < elems.length; j++) {
							elems[j].style.left = w+"px";
						}
						$(".swiper-wrapper").css({"-webkit-transition-duration":"0.5s","transition-duration":"0.5s"});
						$(".shade_switch").removeClass("selected");
						$($(".shade_switch").get(index)).addClass("selected");
					}
				}(i));
			}
		});
		
		//end--switch 函数
		
		//var i=self.setInterval("flexslide()",5000)
		function flexslide(){
			leftAction()
		}
		//end--自动轮播
		function leftAction(){
			
			if(sel<($(".swiper_slide").length-3)){
				sel++
			}
			else{
				sel=0
			}
				
			if(sel==0){
				w=(-width*($(".swiper_slide").length-1)).toString();
				var elems = document.getElementsByClassName('swiper-wrapper');
				for(var j = 0; j < elems.length; j++) {
					elems[j].style.left = w+"px";
				}
				
				$(".swiper-wrapper").css({"-webkit-transition-duration":"0.5s","transition-duration":"0.5s"});
				$(".shade_switch").removeClass("selected");
				$($(".shade_switch").get(0)).addClass("selected");
						
				setTimeout(function(){
					w=(-width).toString();
					var elems = document.getElementsByClassName('swiper-wrapper');
					for(var j = 0; j < elems.length; j++) {
						elems[j].style.left = w+"px";
					}
					
					$(".swiper-wrapper").css({"-webkit-transition-duration":"0s","transition-duration":"0s"});
				},500)
			}
				
				
				
			for(var i=1;i<($(".swiper_slide").length-2);i++){
				if(sel==i){
					w=(-width*(i+1)).toString();
					
					var elems = document.getElementsByClassName('swiper-wrapper');
					for(var j = 0; j < elems.length; j++) {
						elems[j].style.left = w+"px";
					}
				
					$(".swiper-wrapper").css({"-webkit-transition-duration":"0.5s","transition-duration":"0.5s"})
					$(".shade_switch").removeClass("selected");
					$($(".shade_switch").get(i)).addClass("selected");
				}
			}
			setTimeout(function(){arrow=true;},500);
		}
		//end--leftaction函数
					
		function rightAction(){
			if(sel>0){
					sel--
			}
			else{
				sel=$(".swiper_slide").length-3;
			}
				
			for(var i=0;i<($(".swiper_slide").length-3);i++){
				if(sel==i){
					w=(-width*(i+1)).toString();
					
					var elems = document.getElementsByClassName('swiper-wrapper');
					for(var j = 0; j < elems.length; j++) {
						elems[j].style.left = w+"px";
					}
					$(".swiper-wrapper").css({"-webkit-transition-duration":"0.5s","transition-duration":"0.5s"});
					$(".shade_switch").removeClass("selected");
					$($(".shade_switch").get(i)).addClass("selected");
				}
			}	
			if(sel==$(".swiper_slide").length-3){
				$(".swiper-wrapper").attr("style","left:0px;-webkit-transition-duration:0.5s;","transition-duration:0.5s");
				$(".shade_switch").removeClass("selected");
				$($(".shade_switch").get($(".swiper_slide").length-3)).addClass("selected");
				setTimeout(function(){
					w=(-width*($(".swiper_slide").length-2)).toString();
					var elems = document.getElementsByClassName('swiper-wrapper');
					for(var j = 0; j < elems.length; j++) {
						elems[j].style.left = w+"px";
					}
					
					$(".swiper-wrapper").css({"-webkit-transition-duration":"0s","transition-duration":"0s"});
					},500)
			}
			setTimeout(function(){arrow=true;},500);	
		}
		//end--rightaction 函数
		$(document).ready(function(){
			$(".swiper-container").mouseenter(function(){
				$(".arrow").attr("style","visibility:visible;")
			});
			$(".swiper-container").mouseleave(function(){
				$(".arrow").attr("style","visibility:hidden;")
			});
			$(".arrow_next").click(function(){
				if(arrow==true){
					arrow=false;
					leftAction();
					
				}
			});
			
			$(".arrow_prev").click(function(){
				if(arrow==true){
					arrow=false;
					rightAction();
				};
			});
		
		});
		//end--arrow 函数
	};     
})(jQuery);  

/*通用函数前的函数		
function rightAction(){
	if(sel>0){
			sel--
		}
		else{
			sel=2
		}
		
		
		if(sel==0){
			$(".swiper-wrapper").attr("style","left:-600px;-webkit-transition-duration:0.5s;")
		}
		if(sel==1){
			$(".swiper-wrapper").attr("style","left:-1200px;-webkit-transition-duration:0.5s;")
		}	
		if(sel==2){
			$(".swiper-wrapper").attr("style","left:0px;-webkit-transition-duration:0.5s;")
			setTimeout(function(){
				$(".swiper-wrapper").attr("style","left:-1800px;-webkit-transition-duration:0s;");
			},300)
		}
}
*/
