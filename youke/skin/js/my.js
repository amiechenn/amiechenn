		/*导航切换*/
		$(document).ready(function() {	
		
			$.jqsxfg51nav = function(jqsxfg51navhover) {
				$(jqsxfg51navhover).prepend("<span></span>"); 
				
				$(jqsxfg51navhover).each(function() { 
					var linkText = $(this).find("a").html(); 
					$(this).find("span").show().html(linkText); 
				}); 
				
				$(jqsxfg51navhover).hover(function() {	
					$(this).find("span").stop().animate({ 
						marginTop: "-40" 
					}, 250);
				} , function() { 
					$(this).find("span").stop().animate({
						marginTop: "0" 
					}, 250);
				});	
			};
			$.jqsxfg51nav("#nav li");
		
        	/*产品中心切换*/
		
		
			$.jqsxfg51nav = function(jqsxfg51navhover) {
				$(jqsxfg51navhover).prepend("<span></span>"); 
				
				$(jqsxfg51navhover).each(function() { 
					var linkText = $(this).find("a").html(); 
					$(this).find("span").show().html(linkText); 
				}); 
				
				$(jqsxfg51navhover).hover(function() {	
					$(this).find("span").stop().animate({ 
						marginTop: "-48" 
					}, 250);
				} , function() { 
					$(this).find("span").stop().animate({
						marginTop: "0" 
					}, 250);
				});	
			};
			$.jqsxfg51nav("#nav2 li");
		});
