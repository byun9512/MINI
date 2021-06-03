$(document).ready(function(){
	/* 새 창으로 열기 */
	$("a[href^='http']").attr('target','_blank');
	
	/* 리사이즈 */
	$(window).trigger('resize');
	$(window).resize(function() {
		wi = $(window).width();
		ht = $(window).height();
		$("#container section").css({height:ht});
		$("#sub_container section").css({width:wi});
	}).resize();
	
	/* 상단 메뉴 */
	// 상단 메뉴 밑 라인
	$("#header_menu li").mouseover(function() {
		$(this).children("i").stop().animate({width:"100%"});
	});
	$("#header_menu li").mouseout(function() {
		$(this).children("i").stop().animate({width:"0"});
	});
	
	// 상단 메뉴 로고 클릭 시 최상단으로 이동
	$("#header h1 img").click(function() {
		$("window, html").stop(true).animate({scrollTop:0}, 1200);
	});
	
	/* 슬라이드 */ 
	// 슬라이드 (자동)
	$("#slide>li:gt(0)").hide();
	var i = 0; 
	var slide;
	$(window).load(function() {startSlide();});
	
	// 슬라이드 시작 기능
	function startSlide() {
		slide = setInterval(function(){
			var next = (i+1) % 3;
			$("#slide>li").eq(i).fadeOut();
			$("#slide>li").eq(next).fadeIn(400);
			$("#slide>li>ul").eq(next).addClass("translate");
			$("#slide>li>ul").eq(i).removeClass("translate");
			i = next;
		}, 6000);
	}
	// 슬라이드 멈춤 기능
	function stopSlide() {clearInterval(slide);}
		
	// 슬라이드 (수동)
	$(".btn_prev").click(function() {
		stopSlide();
		var prev = (i-1) % 3;
		$("#slide>li").eq(i).fadeOut();
		$("#slide>li").eq(prev).fadeIn(400);
		$("#slide>li>ul").eq(prev).addClass("translate");
		$("#slide>li>ul").eq(i).removeClass("translate");
		i = prev;
	});
	$(".btn_next").click(function() {
		stopSlide();
		var next = (i+1) % 3;
		$("#slide>li").eq(i).fadeOut();
		$("#slide>li").eq(next).fadeIn(400);
		$("#slide>li>ul").eq(next).addClass("translate");
		$("#slide>li>ul").eq(i).removeClass("translate");
		i = next;
	});
	$(".btn_prev, .btn_next").click(function() {
		startSlide();
	});
	
	// 슬라이드 버튼 오버 시
	$(".btn_prev").mouseover(function() {
		$(this).css({opacity:"0"});
		$(this).next(".btn_prev_hover").css({opacity:"1"});
	});
	$(".btn_prev").mouseout(function() {
		$(this).css({opacity:"1"});
		$(this).next(".btn_prev_hover").css({opacity:"0"});
	});
	$(".btn_next").mouseover(function() {
		$(this).css({opacity:"0"});
		$(this).next(".btn_next_hover").css({opacity:"1"});
	});
	$(".btn_next").mouseout(function() {
		$(this).css({opacity:"1"});
		$(this).next(".btn_next_hover").css({opacity:"0"});
	});
	
	/* 갤러리 부분 */
	// 갤러리 마우스 오버 시
	$(".gallery_one li").mouseenter(function() {
		$(this).find("i").stop(true).animate({width:"100%"}, 500);
		$(this).find("span").stop(true).animate({bottom:"-23px"}, 100);
	});
	$(".gallery_one li").mouseleave(function() {
		$(this).find("i").stop(true).animate({width:0}, 500);
		$(this).find("span").stop(true).animate({bottom:"-123px"}, 100);
	});
	$(".gallery_two li").mouseenter(function() {
		$(this).find("i").stop(true).animate({width:"100%"}, 500);
		$(this).find("span").stop(true).animate({bottom:"-42px"}, 100);
	});
	$(".gallery_two li").mouseleave(function() {
		$(this).find("i").stop(true).animate({width:0}, 500);
		$(this).find("span").stop(true).animate({bottom:"-132px"}, 100);
	});
	
	// 서브 섹션 밑으로 펼치기
	$("#sub_container section").each(function(list) {
		$(this).css({top:list*970});
	});
	
	// 메인 섹션 위에서 마우스 휠을 움직이면 살짝쿵해도 화면이 바뀜
	$("#main_page").mousewheel(function(e, delta) {
		e.preventDefault();
		if (delta < 0) {
			var next = $("#sub_page").offset().top;
			$("window, html").stop(true).animate({scrollTop:next}, 1000);
		}
	});
	$("#sub_page").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#main_page").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000);
		} else if (delta < 0) {
			var next = $("#car_ex1").offset().top;
			$("window, html").stop(true).animate({scrollTop:next}, 1000, function() {
				$("#car_ex1").addClass("on");
				$("#car_ex1").siblings().removeClass("on");
				$("#container article strong").fadeIn();
			});
		}
	});
	$("#car_ex1").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#sub_page").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000, function() {
				$("#container section").removeClass("on");
				$("#container article strong").fadeOut();
			});
		} else if (delta < 0) {
			var next = $("#car_ex2").offset().top;
			$("window, html").stop(true).animate({scrollTop:next}, 1000, function() {
				$("#car_ex2").addClass("on");
				$("#car_ex2").siblings().removeClass("on");
				$("#left_menu li").eq(1).addClass("on");
				$("#left_menu li").eq(1).siblings().removeClass("on");
			});
		}
	});
	$("#car_ex2").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#car_ex1").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000, function() {
				$("#car_ex1").addClass("on");
				$("#car_ex1").siblings().removeClass("on");
				$("#left_menu li").eq(0).addClass("on");
				$("#left_menu li").eq(0).siblings().removeClass("on");
			});
		} else if (delta < 0) {
			var next = $("#car_ex3").offset().top;
			$("window, html").stop(true).animate({scrollTop:next}, 1000, function() {
				$("#car_ex3").addClass("on");
				$("#car_ex3").siblings().removeClass("on");
				$("#left_menu li").eq(2).addClass("on");
				$("#left_menu li").eq(2).siblings().removeClass("on");
			});
		}
	});
	$("#car_ex3").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#car_ex2").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000, function() {
				$("#car_ex2").addClass("on");
				$("#car_ex2").siblings().removeClass("on");
				$("#left_menu li").eq(1).addClass("on");
				$("#left_menu li").eq(1).siblings().removeClass("on");
			});
		} else if (delta < 0) {
			var next = $("#car_ex4").offset().top;
			$("window, html").stop(true).animate({scrollTop:next}, 1000, function() {
				$("#car_ex4").addClass("on");
				$("#car_ex4").siblings().removeClass("on");
				$("#left_menu li").eq(3).addClass("on");
				$("#left_menu li").eq(3).siblings().removeClass("on");
			});
		}
	});
	$("#car_ex4").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#car_ex3").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000, function() {
				$("#car_ex3").addClass("on");
				$("#car_ex3").siblings().removeClass("on");
				$("#left_menu li").eq(2).addClass("on");
				$("#left_menu li").eq(2).siblings().removeClass("on");
			});
		} else if (delta < 0) {
			var next = $("#car_ex5").offset().top;
			$("window, html").stop(true).animate({scrollTop:next}, 1000, function() {
				$("#car_ex5").addClass("on");
				$("#car_ex5").siblings().removeClass("on");
				$("#left_menu li").eq(4).addClass("on");
				$("#left_menu li").eq(4).siblings().removeClass("on");
			});
		}
	});
	$("#car_ex5").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#car_ex4").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000, function() {
				$("#car_ex4").addClass("on");
				$("#car_ex4").siblings().removeClass("on");
				$("#left_menu li").eq(3).addClass("on");
				$("#left_menu li").eq(3).siblings().removeClass("on");
			});
		} else if (delta < 0) {
			var next = $("#footer").offset().top;
			$("window, html").stop(true).animate({scrollTop:next-500}, 1000, function() {
				$("#container section").removeClass("on");
				$("#left_menu li").removeClass("on");
				$("#container article strong").fadeOut();
			});
		}
	});
	$("#footer").mousewheel(function(e, delta) {
		e.preventDefault();
		if(delta > 0) {
			var prev = $("#car_ex5").offset().top;
			$("window, html").stop(true).animate({scrollTop:prev}, 1000, function() {
				$("#car_ex5").addClass("on");
				$("#car_ex5").siblings().removeClass("on");
				$("#left_menu li").eq(4).addClass("on");
				$("#left_menu li").eq(4).siblings().removeClass("on");
				$("#container article strong").fadeIn();
			});
		}
	});
	
	// 메인 섹션 우측 부분 클릭 시 서브 섹션으로 화면 전환
	$("#container article strong").click(function() {
		var wi = $("#sub_container section").offset().left;
		$("window, html").stop(true).animate({left:-wi}, 1000);
		$("#left_menu").stop(true).animate({left:"-340px"}, 300);
	});
	
	// 서브 섹션 좌측 부분 클릭 시 메인 섹션으로 화면 전환
	$("#sub_container article strong").click(function() {
		var wi = $("#container section").offset().left;
		$("window, html").stop(true).animate({left:wi+1920}, 1000);
		$("#left_menu").delay(700).animate({left:"-20px"}, 500);
	});
	
	// 메인 섹션 우측 부분 마우스 오버, 아웃 시
	$("#container article strong").mouseenter(function() {
		$("#sub_container section").css({boxShadow:"20px 0 80px 60px #000"});
	});
	$("#container article strong").mouseleave(function() {
		$("#sub_container section").css({boxShadow:"none"});
	});
	
	// 서브 섹션 설명 그림 오버 시 설명창 생성
	$(".keyword>li>img").mouseenter(function() {
		$(this).parent().siblings().children("p, span").removeClass("keyfade");
		$(this).parent().children("p, span").addClass("keyfade");
	});
	
	// 왼쪽 메뉴 버튼 클릭 시
	$("#left_menu li:eq(0)").click(function(e) {
		e.preventDefault();
		var carEx1 = $("#carEx1").offset().top;
		$("#left_menu li:eq(0)").addClass("on");
		$("#left_menu li:eq(0)").siblings().removeClass("on");
		$("window, html").animate({scrollTop:carEx1}, 700, function() {
			$("#carEx1").addClass("on");
			$("#carEx1").siblings().removeClass("on");
		});
	});
	$("#left_menu li:eq(1)").click(function(e) {
		e.preventDefault();
		var carEx2 = $("#car_ex2").offset().top;
		$("#left_menu li:eq(1)").addClass("on");
		$("#left_menu li:eq(1)").siblings().removeClass("on");
		$("window, html").animate({scrollTop:carEx2}, 700, function() {
			$("#car_ex2").addClass("on");
			$("#car_ex2").siblings().removeClass("on");
		});
	});
	$("#left_menu li:eq(2)").click(function(e) {
		e.preventDefault();
		var carEx3 = $("#car_ex3").offset().top;
		$("#left_menu li:eq(2)").addClass("on");
		$("#left_menu li:eq(2)").siblings().removeClass("on");
		$("window, html").animate({scrollTop:carEx3}, 700, function() {
			$("#car_ex3").addClass("on");
			$("#car_ex3").siblings().removeClass("on");
		});
	});
	$("#left_menu li:eq(3)").click(function(e) {
		e.preventDefault();
		var carEx4 = $("#container #car_ex4").offset().top;
		$("#left_menu li:eq(3)").addClass("on");
		$("#left_menu li:eq(3)").siblings().removeClass("on");
		$("window, html").animate({scrollTop:carEx4}, 700, function() {
			$("#car_ex4").addClass("on");
			$("#car_ex4").siblings().removeClass("on");
		});
	});
	$("#left_menu li:eq(4)").click(function(e) {
		e.preventDefault();
		var carEx5 = $("#car_ex5").offset().top;
		$("#left_menu li:eq(4)").addClass("on");
		$("#left_menu li:eq(4)").siblings().removeClass("on");
		$("window, html").animate({scrollTop:carEx5}, 700, function() {
			$("#car_ex5").addClass("on");
			$("#car_ex5").siblings().removeClass("on");
		});
	});
		
	/* 스크롤를 내릴 시 */
	$(window).on("scroll", function() {
	// 마우스 휠을 움직일 때 왼쪽 메뉴
		var scrollNum = parseInt($(window).scrollTop());
		if (scrollNum > 1800 && scrollNum < 6000) {
			$("#left_menu").stop(true).animate({left:"-20px"}, 500);
		} else {
			$("#left_menu").stop(true).animate({left:"-340px"}, 300);
		}
		
		// 마우스 휠을 움직일 때 상단 메뉴바 + 스크롤 다운 애니메이션
		if (scrollNum > 200) {
			$("#header").stop(true).animate({backgroundColor:"#000"});
			$("#slide_button p, .btn_scrolldown").css({opacity:"0"});
		} else {
			$("#header").stop(true).animate({backgroundColor:"transparent"});
			$("#slide_button p").css({opacity:"0.9"});
			$(".btn_scrolldown").css({opacity:"0.8"});
		}
		
		// 2번째 메인 섹션으로 올 시 갤러리 페이드 인 / 아웃
		if (scrollNum > 900 && scrollNum < 1600) {
			$(".gallery li").eq(0).animate({left:0, opacity:"1"});
			$(".gallery li").eq(1).animate({left:0, opacity:"1"});
			$(".gallery li").eq(2).delay(300).animate({top:"50px", opacity:"1"});
			$(".gallery li").eq(3).delay(300).animate({top:"400px", opacity:"1"});
			$(".gallery li").eq(4).delay(600).animate({top:"50px", opacity:"1"});
			$(".gallery li").eq(5).delay(600).animate({right:"20px", opacity:"1"});
			$(".gallery li").eq(6).delay(600).animate({top:"510px", opacity:"1"});
		} else {
			$(".gallery li").eq(0).stop(true).animate({left:"-40px", opacity:"0"});
			$(".gallery li").eq(1).stop(true).animate({left:"-40px", opacity:"0"});
			$(".gallery li").eq(2).stop(true).animate({top:"10px", opacity:"0"});
			$(".gallery li").eq(3).stop(true).animate({top:"440px", opacity:"0"});
			$(".gallery li").eq(4).stop(true).animate({top:"10px", opacity:"0"});
			$(".gallery li").eq(5).stop(true).animate({right:"-20px", opacity:"0"});
			$(".gallery li").eq(6).stop(true).animate({top:"550px", opacity:"0"});
		}
	});
	
	/* 설명창에서는 스크롤 막기 */
	$("#sub_container, #header").on("scroll touchmove mousewheel", function(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	// 윈도우 창에서 키보드 키 값 막기
	/*
		32번 : 스페이스 바
		33번 : 페이지 업		34번 : 페이지 다운
		35번 : 엔드				36번 : 홈
		37번 : ←		38번 : ↑		39번 : →		40번 : ↓
	*/
	window.addEventListener("keydown", function(e) {
		if([32, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
			e.preventDefault();
		}
	}, false);
});
