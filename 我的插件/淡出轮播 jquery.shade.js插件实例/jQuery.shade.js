// JavaScript Document
//var  auto=self.setInterval("autoShade()",3000)
var sel=0;

function autoShade(){
	if(sel<$(".shade-silde").length){
		$($(".shade-silde").get(sel)).addClass("curr");
	
		for(var j=0;j<$(".shade-silde").length;j++){
			if (j==sel) continue;
			$($(".shade-silde").get(j)).removeClass("curr");
		}	
		$(".shade-container").trigger("select");
		sel++;	
		
	}
		
	else{sel=0}
	
}
$(document).ready(function(){
	$(".shade-silde").attr("style","z-index:0;opacity:1");
	$($(".shade-silde").get(0)).attr("style","z-index:1;opacity:1");
	
	$(".shade-container").select(function(){
  		$(".curr").attr("style","z-index:1;opacity:0.3");
    	$(".curr").animate({opacity:1},function(){
			$(".shade-silde:not(.curr)").attr("style","z-index:0;opacity:0");
			
		});
		
	});
	

	
	for(i=0;i<$(".shade-silde").length;i++){
		$($(".shade-switch").get(i)).mouseenter( function(index){//
			return function() {//
				
				
				handle = setTimeout(function(){
					$(".curr").attr("style","z-index:0;opacity:1");
					$($(".shade-silde").get(index)).addClass("curr");
					$(".shade-switch").removeClass("selected");
					$($(".shade-switch").get(index)).addClass("selected");
			
					for(var j=0;j<$(".shade-silde").length;j++){
						if (j==index) continue;
						$($(".shade-silde").get(j)).removeClass("curr");
					}
					
					$(".shade-container").trigger("select");
					sel=index+1;
				},500);
			
			};
		}(i)).mouseleave(function(){
				clearTimeout(handle);			
		});
		
	}	
	
	
	
		/*for(var i=0;i<$(".shade-silde").length;i++){	
		$($(".shade-switch").get(i)).mouseenter(function(){
			$($(".shade-silde").get(i)).addClass("curr");
		
			for(var j=0;j<$(".shade-silde").length;j++){
				if (j==i) continue;
				$($(".shade-silde").get(j)).removeClass("curr");
			}	
			$(".shade-container").trigger("select");
		
			
		});
	}*/

/*
	$($(".shade-switch").get(1)).mouseenter(function(){
		$($(".shade-silde").get(1)).addClass("curr");
		$($(".shade-silde").get(0)).removeClass("curr");
		$($(".shade-silde").get(2)).removeClass("curr");
		$(".shade-container").trigger("select")
	});



	$($(".shade-switch").get(2)).mouseenter(function(){
		$($(".shade-silde").get(2)).addClass("curr");
		$($(".shade-silde").get(0)).removeClass("curr");
		$($(".shade-silde").get(1)).removeClass("curr");
		$(".shade-container").trigger("select")
	});

	*/
});

