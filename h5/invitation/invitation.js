
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

//创建和初始化地图函数：
    function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(113.32521,23.092393),17);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }
    function addMapOverlay(){
      var markers = [
        {content:"珠区广州大道南788号广一电商园2号楼",title:"广州e贷",imageOffset: {width:0,height:3},position:{lat:23.095435,lng:113.321716}}
      ];
      for(var index = 0; index < markers.length; index++ ){
        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
        })});
        var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
        var opts = {
          width: 200,
          title: markers[index].title,
          enableMessage: false
        };
        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
        marker.setLabel(label);
        addClickHandler(marker,infoWindow);
        map.addOverlay(marker);
      };
    }
    //向地图添加控件
    function addMapControl(){
      var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
      scaleControl.setUnit(BMAP_UNIT_METRIC);
      map.addControl(scaleControl);
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:3});
      map.addControl(navControl);
      var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:false});
      map.addControl(overviewControl);
    }
    var map;
      initMap();
