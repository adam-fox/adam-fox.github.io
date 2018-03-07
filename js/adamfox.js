function isScrolledIntoFullView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function isScrolledIntoTopView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemTop <= docViewBottom);
}

$(window).resize(function() {
	if($(window).width() < 1024){
		$('.description').css('transform', 'translate( 0px, 0px)');
	} else {
		$('.description').each(function () {
			if (isScrolledIntoTopView(this) === true) {
				$(this).css('transform', 'translate( 0px, ' + ($(window).scrollTop() + $(window).height() - $(this).parent().offset().top) / 8.5  + 'px )');
			}	
		});
	}
});

$(window).scroll(function() {
	if($(window).width() >= 1024){
		$('.description').first().css('transform', 'translate( 0px, ' + $(window).scrollTop() / 10  + 'px )');
		
		$('.description').slice(1).each(function () {
			if (isScrolledIntoTopView(this) === true) {
				$(this).css('transform', 'translate( 0px, ' + ($(window).scrollTop() + $(window).height() - $(this).parent().offset().top) / 8.5 + 'px )');
			}	
		});
	}
			
/*
	if (isScrolledIntoFullView("#project1") === true) {
		$("body").addClass('project1'); 
		$('#bg_main').fadeOut(1000);
	} else if (isScrolledIntoFullView("#project2") === true) {
		$("body").removeClass('project1');
		$("body").addClass('project2');
	} else {
		$("body").removeClass('project2');
	}
		
*/	
	$('.social').each(function () {
		if (isScrolledIntoTopView(this) === true) {
			$(this).children('a').addClass('in-view');
		}
	});
	
	if (isScrolledIntoFullView('.expertise > ul > li:nth-child(1) > div') === true) {
		$('.expertise > ul > li > div').each(function(i){
			var row = $(this);
			setTimeout(function() {
				row.addClass('in-view');
			}, 100*i);
		});
	}
	
	$('.history > ul > li').each(function () {
		if (isScrolledIntoTopView(this) === true) {
			$(this).prev().addClass('line-animation');
			$(this).addClass('in-view');
		}
	});

	
	var scrollTop = $(window).scrollTop();
	
	if($("header").offset().top - $(window).scrollTop() <= 0) {
		$("header").addClass("on");
		$('#bg_main').fadeOut(1000);
	} 
	if($(window).scrollTop() <= 0) {
		$("header").removeClass("on");
		$('#bg_main').fadeIn();
	}
	
/*
	$('#bg_main').css({
		opacity: function() {
			var elementHeight = $(this).height();
			return (elementHeight - (scrollTop)) / elementHeight;
		}
	}); 
*/

});

/*
$(document).ready(function () {
    var classes = new Array ('desktop', 'mobile', 'tablet');
    var length = classes.length;
    var links = $('.browser').slice(1);

    $.each( links, function(key, value) {
	    var theClass = classes[ Math.floor ( Math.random() * length ) ];
        $(value).addClass(theClass);
    });
    
    $(links).each(function () {
	    if($(this).hasClass("desktop")) {
	        $(this).parent().find(".plus").addClass("disabled");
        } else if ($(this).hasClass("mobile")) {
        	$(this).parent().find(".minus").addClass("disabled");
        	$(this).parent().find("span").text("Mobile");
        } else {
	        $(this).parent().find("span").text("Tablet");
        }
	});
});
*/

$("header > .wrapper > .logo_af").click(function() {
	$("html, body").animate({ scrollTop: "0px" });
});


$(".btn_menu").click(function() {
	$(this).toggleClass('on');
	$('nav > ul').toggleClass('on');
	$('.logo_af').toggleClass('hidden');
	$('.logo_circle').toggleClass('hidden');
});

$(".browser:even").click(function() {
	var browser = $(this);
	browser.css("transform","translate( -" + (window.innerWidth + 300) / 2 + "px ,0)");
	setTimeout(function() {
		browser.children('img').hide();
		browser.css("transform","translate(0,0)");
    }, 350);
});


$(".browser:odd").click(function() {
	var browser = $(this);
	browser.css("transform","translate( " + (window.innerWidth + 300) / 2 + "px ,0)");
	setTimeout(function() {
		browser.children('img').hide();
		browser.css("transform","translate(0,0)");
    }, 350);
});


$(".main").click(function() {
	$('html, body').animate({ scrollTop: $("#experience").offset().top - 120 }, 2000);
});

var animationEvent = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

$(".btn").click(function () {
	if(!$(this).hasClass("disabled")) {
		$(this).addClass('on');
		$(this).one(animationEvent, function(event) {
			$(this).removeClass('on');
		});
	}
});

$(".plus").click(function() {
	$(this).parent().children(".minus").removeClass("disabled");
	if($(this).parent().parent().parent().children(".browser").hasClass("mobile")) {
		$(this).parent().parent().parent().children(".browser").removeClass("mobile");
		$(this).parent().parent().parent().children(".browser").addClass("tablet");
		$(this).parent().children("span").text("Tablet");
	} else if($(this).parent().parent().parent().children(".browser").hasClass("tablet")) {
		$(this).parent().parent().parent().children(".browser").removeClass("tablet");
		$(this).parent().parent().parent().children(".browser").addClass("desktop");
		$(this).parent().children("span").text("Desktop");
		$(this).addClass("disabled");
	}
});

$(".minus").click(function() {
	$(this).parent().children(".plus").removeClass("disabled");
	if($(this).parent().parent().parent().children(".browser").hasClass("tablet")) {
		$(this).parent().parent().parent().children(".browser").removeClass("tablet");
		$(this).parent().parent().parent().children(".browser").addClass("mobile");
		$(this).parent().children("span").text("Mobile");
		$(this).addClass("disabled");
	} else if($(this).parent().parent().parent().children(".browser").hasClass("mobile")) {
	} else {
		$(this).parent().parent().parent().children(".browser").removeClass("desktop");
		$(this).parent().parent().parent().children(".browser").addClass("tablet");
		$(this).parent().children("span").text("Tablet");
	}
});

/*
 $(function(){
	$('.browser').okshadow({
		color: 'rgba(0,0,0,.5)',
		xMax: 2000,
		yMax: 2000,
		yOffset: 100,
		fuzzMin: 500,
		fuzzMax: 500,
	});
});
*/