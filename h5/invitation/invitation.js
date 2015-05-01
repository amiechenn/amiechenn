
$(function() {
		$(window).load(function() {
			"use strict";
			$('.loading-gif').delay().fadeOut('slow');
			$('.preloading').delay().fadeOut('slow');
			$('body').delay(1000);
			$(".bannerone").removeClass("hide");
		});
     })
	 	//------loading--------	
var page=0;
var slide=true;//防止连续滑动，当settimeout动作完成时才能继续滑动。
$(document).ready(function(){
	$(".page").swipe({
		swipeUp:function(){
			if(page!=($(".page").length-1)&&slide==true){
				slide=false;
				$($(".page").get(page+1)).removeClass("hide");
				$($(".page").get(page+1)).addClass("page-movefrombottom current");
				$($(".page").get(page)).addClass("page-movetotop");
				setTimeout(function(){
					$($(".page").get(page+1)).removeClass("page-movefrombottom");
					$($(".page").get(page)).removeClass("page-movetotop");
					$($(".page").get(page)).removeClass("current");
					$($(".page").get(page)).addClass("hide");
					page++;
					slide=true;
				},600);
				if(page==($(".page").length-2)){
					$(".top").addClass("hide");
				}
				return;
			};
			
		},
		swipeDown:function(){
			if(page!=0&&slide==true){
				slide=false;
				$($(".page").get(page-1)).removeClass("hide");
				$($(".page").get(page-1)).addClass("page-movefromtop current");
				$($(".page").get(page)).addClass("page-movetobottom");
				setTimeout(function(){
					$($(".page").get(page-1)).removeClass("page-movefromtop");
					$($(".page").get(page)).removeClass("page-movetobottom");
					$($(".page").get(page)).removeClass("current");
					$($(".page").get(page)).addClass("hide");
					page--;
					slide=true;
				},600);
				if(page==($(".page").length-1)){
					$(".top").removeClass("hide");
				}
				return;
			};
		},
	});
});
var music=true;
$(".music-box").click(function show(){
	
  var audio=document.getElementById("yin");
  if(music==false){
	 audio.play();
	  $(".music-off").addClass("hide");
	  $(".music-on").removeClass("hide");
	  music=true;
	  return;
	};
  if(music==true){
	  audio.pause();
	  $(".music-off").removeClass("hide");
	  $(".music-on").addClass("hide");
	  music=false;
	  return;
	};
});
