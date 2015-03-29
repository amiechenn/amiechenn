

$(document).ready(function(){  
	$("html").niceScroll({  
		cursorcolor:"#e04d47",  
		cursoropacitymax:1,  
		touchbehavior:false,  
		cursorwidth:"10px",  
		cursorborder:"0",  
		cursorborderradius:"5px"  
	});  
})  

//回到顶部按钮
$(function () {
    $.scrollUp({
        scrollName: 'scrollUp',      
        scrollDistance: 300,        
        scrollFrom: 'top',          
        scrollSpeed: 300,            
        easingType: 'linear',       
        animation: 'fade',           
        animationSpeed: 200,        
        scrollTrigger: false,       
        scrollTarget: false,         
        scrollText: '',
        scrollTitle: false,         
        scrollImg: false,            
        activeOverlay: false,        
        zIndex: 2147483647,        
    });
});

//锚点平滑滚动(非插件)
$(function(){
	$(".navbar-nav a").click(function(){
		$("html,body").animate({ scrollTop:$($(this).attr("href")).offset().top},1000
		);
		return false
	});
});

//loading
$(function() {
	$(window).load(function() {
		"use strict";
		$('.loading-gif').delay().fadeOut('slow');
		$('.preloading').delay().fadeOut('slow');
		$('body').delay(500);
	});
});

//lightGallery
$(document).ready(function() {
	$(".lightgallery").lightGallery({
		loop:true,
		auto:true,
		pause:4000,
	});
});
//正则表达式

function checkFrom(){
	$(".error").css({"display":"none"});
	var email=document.getElementById("email").value;
	var password=document.getElementById("password").value;
	var re=/^[a-zA-Z0-9]\w{5,10}$/;
	var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if(reg.test(email)!=true){
		$("#emailerror").css({"display":"block"});
	}
	if(re.test(password)!=true){
		$("#passworderror").css({"display":"block"});
	}
	if(reg.test(email)&&re.test(password)){
		alert("登陆成功")
		return true;
	}
	
};