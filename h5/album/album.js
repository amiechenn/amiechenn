
$(function() {
		$(window).load(function() {
			"use strict";
			$('.loading-gif').delay().fadeOut('slow');
			$('.preloading').delay().fadeOut('slow');
			$('body').delay(1000);
			$('.black-box').removeClass("hide");
			setTimeout(function(){
		      	$(".black").addClass("hide");
	 		},2000);
			setTimeout(function(){
		      	$(".movetitle").addClass("hide");
	 		},4000);
		});
     })
	//------loading--------	
$(document).ready(function(){
	var music=true;
	$(".music").click(function show(){
	  var audio=document.getElementById("yin");
	  if(music==false){
		  $(".music").attr("style","animation:rotate 2s linear infinite;-webkit-animation:rotate 2s linear infinite");
		   audio.play();
		   music=true;
		  return;
		};
	
	  if(music==true){
		  $(".music").attr("style","");
		  audio.pause();
		  music=false;
		  return;
		};
	});
});

	//------music------
$(document).ready(function(){
	numb=$(".photo").length.toString();
	document.getElementById("pagenumber").innerHTML = numb;
	//------pagenumber------
	equipmentWidth=window.innerWidth.toString();
	document.getElementById('album-box').style.width= equipmentWidth+"px";
	//------equipmentWidth改变轮播album-box宽度------
	var elems = document.getElementsByClassName('photo');
						for(var j = 0; j < elems.length; j++) {
							elems[j].style.width = equipmentWidth+"px";
						}
	//------equipmentWidth 改变图片的宽度-------
	albumWidth=equipmentWidth*($(".photo").length).toString();
	document.getElementById('album').style.width= albumWidth +"px";
	
	
	
	var width=equipmentWidth;
	var i=0;
	$("#album-box").swipe({
		swipeLeft:function(){
			$(".next").addClass("hide");
			if(i!=($(".photo").length-1)){
				i++;
				//---页码改变
				changenumb=(i+1).toString();
				document.getElementById("changepage").innerHTML =  changenumb;
				//---页码改变
				//---相片轮播
				left=-(width*i).toString();
				document.getElementById('album').style.left=left+"px";
				$("#album").css({"-webkit-transition-duration":"0.3s","transition-duration":"0.3s"});
				//---相片轮播
				//---文字轮播
				$($(".text").get(i)).removeClass("hide");
				$(".current").addClass("hide");
				$(".current").removeClass("current");
				$($(".text").get(i)).addClass("current");
				//---文字轮播
				return;
			};
		},
		swipeRight:function(){
			if(i!=0){
				i--;
				//---页码改变
				changenumb=(i+1).toString();
				document.getElementById("changepage").innerHTML =  changenumb;
				//---页码改变
				//---相片轮播
				left=-(width*i).toString();
				document.getElementById('album').style.left=left+"px";
				$("#album").css({"-webkit-transition-duration":"0.3s","transition-duration":"0.3s"});
				//---相片轮播
				//---文字轮播
				$($(".text").get(i)).removeClass("hide");
				$(".current").addClass("hide");
				$(".current").removeClass("current");
				$($(".text").get(i)).addClass("current");
				//---文字轮播
				return;
			};
		},
	});
	//----end photoswipe textchange------
	$(".return").click(function(){
		i=0;
		changenumb=(i+1).toString();
		document.getElementById("changepage").innerHTML =  changenumb;
		hangenumb=(i+1).toString();
		document.getElementById("changepage").innerHTML =  changenumb;
		left=-(width*i).toString();
		document.getElementById('album').style.left=left+"px";
		$("#album").css({"-webkit-transition-duration":"0.3s","transition-duration":"0.3s"});
		$($(".text").get(i)).removeClass("hide");
		$(".current").addClass("hide");
		$(".current").removeClass("current");
		$($(".text").get(i)).addClass("current");
		return;
	});
	//------return-----

});