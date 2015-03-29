// JavaScript Document
function is_mobile() { 
     var regex_match = /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i; 
  var u = navigator.userAgent; 
       if (null == u) { 
             return true; 
       } 
       var result = regex_match.exec(u); 

       if (null == result) { 
             return false 
       } else { 
             return true 
       } 
 } 
 if (is_mobile()) { 
       document.location.href= 'https://amiechenn.github.io/amiechenn/h5/h5demo/h5demo.html'; 
 }
//设备监测

$(document).ready(function(){
	//----***navleft***----
	for(var pro=0;pro<=$(".nav-left-item").length;pro++){
		$($(".nav-left-item").get(pro)).mouseenter(function(index){
			return function(){
				$($(".nav-left-item").get(index)).addClass("nav-left-active");
				for(var i=0;i<=$(".nav-left-item").length;i++){
					if (i==index) continue;
							$($(".nav-left-item").get(i)).removeClass("nav-left-active");
				}
			}
        }(pro));
	}
	$(".nav-left-item").mouseleave(function(){
		$(".nav-left-item").removeClass("nav-left-active");
	});
	//-----***navleft***-----
	//-----***slide***-----
	var width=560;
	var sel=0;
	function itemSlide(index){
		left=-(width)*index.toString();
				document.getElementById('slide-main-id').style.left=left+"px";
			for(var j=0;j<=$(".item").length;j++){
				if (j==index) continue;
				$($(".item").get(j)).removeClass("slide-on");
			};
			$($(".item").get(index)).addClass("slide-on");
	};
	
	for(var slide=0;slide<=$(".item").length;slide++){
		$($(".item").get(slide)).click(function(index){
			return function(){
				itemSlide(index);
			sel=index+1;
			};
		}(slide));
	};
	//---slide-item-end
	autoslide=setInterval(function(){
		if(sel<($(".item").length-1)){
			itemSlide(sel);
			sel++;
			return;
		};
		if(sel==($(".item").length-1)){//防止最后一张停留加倍的时间
			itemSlide(sel);
			sel=0;
			return;
		};
	},5000);
	//-----***slide***-----
	//-----***booking***-----
	for(var page=0;page<$(".page-name").length;page++){
		$($(".page-name").get(page)).click(function(index){
			return function(){
				$($(".page").get(index)).addClass("page-on");
				for(var p=0;p<=$(".page-name").length;p++){
					if (p==index) continue;
					$($(".page").get(p)).removeClass("page-on");
					$(".page-inblock-name").removeClass("current");//点击page，全部inblock变隐藏；
					$(".first").addClass("current");//每个page的一张显示
				};	
			};
			
		}(page));
	};
	//---booking page end
	for(var inblock=0;inblock<$(".page-inblock-name").length;inblock++){
		$($(".page-inblock-name").get(inblock)).click(function(index){
			return function(){
				$($(".page-inblock-name").get(index)).addClass("current");
				for(var n=0;n<=$(".page-inblock-name").length;n++){
					if (n==index) continue;
					$($(".page-inblock-name").get(n)).removeClass("current");
				};	
			};
			
		}(inblock));
	}
	//----***booking***----
	//----***pagination***----
	var more=false
	$(".more").click(function(){
		if(more==false){
			$(".pagination-heared-content").css({"height":"150px"});
			more=true;
			$(".more").html("<b>收起</b>");
			return;
		};
		if(more==true){
			$(".pagination-heared-content").css({"height":"50px"});
			more=false;
			$(".more").html("<b>更多</b>");
			return;
		};
	});
	//----pagination-heared end
	var pageCur=0;
	var unmberWidth=24;
	function pagerslide(index){
		$($(".pager").get(index)).addClass("pager-on");
		$($(".number").get(index)).addClass("num-on");
		for(m=0;m<=$(".pager").length;m++){
			if (m==index) continue;
			$($(".pager").get(m)).removeClass("pager-on");
			$($(".number").get(m)).removeClass("num-on");
		};
		pageCur=index;
	};
	//----pagerslide 函数
	function numberSlide(index){
		paginatorLeft=(-unmberWidth*(index-2)).toString();
		document.getElementById("paginator-number").style.left= paginatorLeft + "px"; 
	};
	//----numberSlide 函数
	$(".frist-page").click(function(){
		pagerslide(0);
		numberSlide(2);
		
	});
	//-----首页button end
	$(".last-page").click(function(){
		last=$(".pager").length-1;
		pagerslide(last);
		numberSlide(last-2);
		
	});
	//-----尾页buttom end
	$(".next").click(function(){
		
		if(pageCur<$(".pager").length-1){
			pageCur++;
			pagerslide(pageCur);
			if(pageCur>2 && pageCur<$(".pager").length-2){//标签在第4页到倒数第二页的时候标签移动
				numberSlide(pageCur);
			};
			return;
		};
	});
	$(".prev").click(function(){
		if(pageCur>0){
			pageCur--;
			pagerslide(pageCur);
			if(pageCur>1 && pageCur<$(".pager").length-2){//标签在第3页到倒数第二页的时候标签移动
				numberSlide(pageCur);
			};
			return;
		};
	});
	//---next prev end
	for(num=0;num<$(".number").length;num++){
		$($(".number").get(num)).click(function(index){
			return function(){
				pagerslide(index);
				if(index>1 && index<$(".pager").length-2){//标签在第3页到倒数第二页的时候标签移动
					numberSlide(index);
				};
			};
		}(num));
	}
	//----number end
	//----***pagination***----
	//----***pager-img text***----
	for(var movetxt=0;movetxt<$(".pager-item").length;movetxt++){
		$($(".pager-item").get(movetxt)).mouseenter(function(index){
			return function(){
				$($(".move-txt").get(index)).css({"top":"125px"});
			};
		}(movetxt));
	}
	
	
	$(".pager-item").mouseleave(function(){
			$(".move-txt").css({"top":"155px"});
	});
	
});