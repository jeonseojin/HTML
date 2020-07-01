$(function(){
	var defaultMenu = ['사전','뉴스','증권','부동산','지도','영화','뮤직','책','웹툰'];
	var defaultMenuLink 
	= ['https://dict.naver.com/',
		'https://news.naver.com/',
		'https://finance.naver.com/',
		'https://land.naver.com/',
		'https://map.naver.com/v5/?c=14139734.6171725,4507639.6434387,15,0,0,0,dh',
		'https://movie.naver.com/',
		'https://vibe.naver.com/about',
		'https://book.naver.com/',
		'https://comic.naver.com/index.nhn'
	]
	var selectMenu = [];
	var selectMenuLink = [];
	var allMenuLink = ['모든 링크가 위에처럼 있어야함'];
	var tmpMenu = [];
	$('html').scrollTop(0);
	$('.btn-container-whale').click(function(e){
		$('.box-whale').addClass('display-none');
		//3일동안 보지 않기 버튼을 클릭했을 때 URL에 #이 붙는걸 방지
		e.preventDefault();
	})
	//자동 완성 버튼을 클릭하면 
	$('.btn-auto-search').click(function(){
		//자동 완성 기능이 활성화/비활성화
		$('.box-auto-box').toggleClass('display-none');
		//자동 완성 버튼 모양을 위로/아래로
		$('.icon-auto-search').toggleClass('active');
	})
	$('.link-auto-close').click(function(e){
		$('.btn-auto-search').click();
		e.preventDefault();
	})
	//더보기/접기 버튼 클릭
	$('.btn-more').click(function(){
		$('.box-group-keyword').toggleClass('display-none');
		$('.box-service-menu.display').toggleClass('display-none');
		$('.box-container-servicelist').toggleClass('display-none');
		$('.btn-more').toggleClass('display-none');
		if($(this).hasClass('fold')){
			initMenu();
		}
	})
	//메뉴설정에서 메뉴 선택시
	$('.box-serivce-check').click(function(){
		var selMenu = $(this).text();
		//이미 선택된 메뉴를 클릭해서 선택을 해제하는 경우
		if(tmpMenu.indexOf(selMenu)>=0){
			tmpMenu.splice(tmpMenu.indexOf(selMenu),1);
			$(this).find('input').prop('checked',false);
		}
		//메뉴를 선택한 경우
		else{
			if(tmpMenu.length == 5){
				alert('최대5개까지 설정할 수 있습니다.');
				return;
			}
			tmpMenu.push(selMenu);
			//선택된 요소의 자손 중 input태그의 checked속성을 true로 설정
			$(this).find('input').prop('checked',true);
		}
		$(this).find('.icon-check').toggleClass('checked');
		var cnt = 0;
		var max = 5;
		$('.box-menu-black').each(function(){
			if(cnt < tmpMenu.length){
				$(this).removeClass('box-empty select');
				$(this).find('.link-menu-black').text(tmpMenu[cnt]);
			}else{
				if(cnt == tmpMenu.length && cnt < max){
					$(this).addClass('select');	
				}else{
					$(this).removeClass('select');	
				}
				$(this).addClass('box-empty');
				$(this).find('.link-menu-black').text('');
			}
			cnt++;
		})
	})
	//메뉴 설정 버튼 클릭
	$('.btn-menu-set').click(function(){
		$('.box-service-menu.display').addClass('display-none');
		$('.box-service-menu.set').removeClass('display-none');
		$('.box-container-servicelist .container.display').addClass('display-none');
		$('.box-container-servicelist .container.set').removeClass('display-none');
		//검은색 메뉴 박스 부분
		var cnt = 0;
		var max = 5;
		$('.box-menu-black').each(function(){
			if(cnt < selectMenu.length){

			}
			else if(cnt < max){
				if(selectMenu.length == cnt)
					$(this).addClass('select');	
				$(this).addClass('box-empty');
				$(this).find('.link-menu-black').text('');
				$(this).removeClass('display-none');
			}else{
				$(this).addClass('display-none')
			}
			cnt++;
		})
		$('.box-service-check input').each(function(){
			var isChecked = $(this).prop('checked');
			if(isChecked){
				$(this).siblings('.icon-check').addClass('checked')
			}
		})
	})
	//저장 버튼
	$('.btn-service-save').click(function(){
		selectMenu = tmpMenu.slice();
		$('.fold').click();
	})
	$('.fold').click(function(){
		$('.box-menu-black').removeClass('box-empty select');
		var cnt = 0;
		var max = 5;
		$('.box-menu-black').each(function(){
			if(selectMenu.length != 0){
				if(cnt >= selectMenu.length)
					$(this).addClass('display-none');
			}else{
				$(this).removeClass('display-none');
				$(this).find('.link-menu-black').text(defaultMenu[cnt]);
			}
			cnt++;
		});
		//기본 메뉴에서 메뉴 설정 클릭 후 메뉴를 선택 후 접기 버튼을 클릭하거나
		//메뉴 설정 클릭 후 메뉴를 선택하지 않고 접기 버튼을 클릭
	})
	$('.btn-service-init').click(function(){
		alert('초기설정으로 돌아갑니다.');
		selectMenu = [];
		$('.box-service-check>input').prop('checked', false);
		$('.fold').click();
	})
	// 언론 타이틀메뉴
	$('.btn-set').click(function(){
		if(!$(this).hasClass('not')){
			$('.btn-set>i').removeClass('set');
			$(this).find('i').addClass('set');
		}
	})
	$('.btn-set').hover(function(){
		$(this).find('i').toggleClass('hover');
	})
	// 언론사 이름을 호버할경우 구독/기사보기 보이기 
	$('.box-thumb-area').hover(function(){
		$(this).find('img').toggleClass('display-none');
		$(this).find('.box-thumb').toggleClass('display-none');	
	})
	$('.box-thumb>a').hover(function(){
		$(this).toggleClass('active');
		$(this).siblings().toggleClass('disable')
	})
	// 로그인 밑의 창 움직이는 것
	$('.btn-nav-prev').click(function(){
		if(!$('.box-card-nav>.card').is(':animated')){
			$('.box-card-nav>.card').last().detach().prependTo('.box-card-nav').css('margin-left','-281px');
			$('.box-card-nav>.card').first().animate({'margin-left':'0px'},1000)
		}

	})
	$('.btn-nav-next').click(function(e){
		if(!$('.box-card-nav>.card').is(':animated')){
		$('.box-card-nav>.card').first().animate({'margin-left':'-281px'},1000,function(){
			$(this).detach().appendTo('.box-card-nav').removeAttr('style');
		})
		}
	})
	// 오늘 읽을만한 글 아래의 색상박스가 이동하는것
	$('.box-theme-wrap .btn-tab').click(function(e){
		e.preventDefault();
		$('.box-theme-wrap .btn-tab').attr('aria-selected','flase');
		$(this).attr('aria-selected','true');
		themeBtnView();
		themeBodyView()
		/*  attr = 속성(태그 안에 있는 속성들을 의미)
		$('선택자').attr('속성명','값A') : 해당 요소의 속성값의 값을 값A로 설정
		$('선택자').attr('속성명'): 해당 요소의 속성의 값을 가져옴
		prop = 비슷한 효과를 냄(나중에 자세히 설명)
		$('선택자').prop('속성명','값A') : 해당 요소의 속성값의 값을 값A로 설정
		$('선택자').prop('속성명'): 해당 요소의 속성의 값을 가져옴
		*/
	})
	$('.box-theme-wrap .btn-prev').click(function(e){
		e.preventDefault();
		if($('.btn-tab[aria-selected=true]').hasClass('tab-job')){
			$('.list-category').animate({'margin-left':'0px'},1000,)
		}
		if($('.btn-tab[aria-selected=true]').hasClass('tab-book')){
			$('.list-category').animate({'margin-left':'-750px'},1000,)
		}
		if($('.btn-tab[aria-selected=true]').hasClass('tab-show')){
			$('.list-category').animate({'margin-left':'-1500px'},1000,)
		}
		$('.btn-tab[aria-selected=true]').attr('aria-selected','flase').parent().prev().find('.btn-tab').attr('aria-selected','true');
		themeBtnView();
		themeBodyView()
	})
	$('.box-theme-wrap .btn-next').click(function(e){
		e.preventDefault();
		if($('.btn-tab[aria-selected=true]').hasClass('tab-movie')){
			$('.list-category').animate({'margin-left':'-750px'},1000,)
		}
		if($('.btn-tab[aria-selected=true]').hasClass('tab-marry')){
			$('.list-category').animate({'margin-left':'-1500px'},1000,)
		}
		if($('.btn-tab[aria-selected=true]').hasClass('tab-farm')){
			$('.list-category').animate({'margin-left':'-2250px'},1000,)
		}
		$('.btn-tab[aria-selected=true]').attr('aria-selected','flase').parent().next().find('.btn-tab').attr('aria-selected','true');
		themeBtnView();
		themeBodyView()
	})
	$('.box-shop-header .tab').click(function(e){
		e.preventDefault();
		$('.box-shop-header .tab').attr('aria-selected','false');
		$(this).attr('aria-selected','true');
		shopView();
		tabRandom();
		var target =$(this).attr('data-target');
		if(target=='mall'){
			$('.box-shop-middle').addClass('display-none')
		}else{
			$('.box-shop-middle').removeClass('display-none')
		}
	})
	$('.box-shop-control>.box-btn>a').click(function(e){
		// a태그의 링커나 싱커 효과를 막아주는 역할 -> 페이지 변동이 없도록 막아주는 것
		e.preventDefault();
		// var currentObj = $('.box-shop-control>.box-num>.current-num'); 변경전(활용적으로 변경)
		var currentObj = $(this).parents('.box-shop-control').find('.box-num>.current-num');
		// 현재 페이지의 번호를 가져옴
		var current = currentObj.text();
		// 문자열을 정수로 변환하는 parseInt함수
		current = parseInt(current);
		var change;
		// var max = $('.box-shop-control>.box-num>.max-num').text(); 변경전(재사용성 있게 변경)
		var max = $(this).parents('.box-shop-control').find('.box-num>.max-num').text();
		max=parseInt(max);
		// 이전버튼인 경우, 해당 버튼은 btn-prev 클래스를 가지고 있음
		if($(this).hasClass('btn-prev')){
			change =current-1;
			if(change==0)
				change=max;
		}
			// 다음버튼메뉴
		else{
			change=current+1;
			if(change==max+1)
				change=1;
		}		
		currentObj.text(change);
	})












	function initMenu(){
		$('.box-service-menu.display').addClass('display-none');
		$('.box-service-menu.set').addClass('display-none');
		$('.box-container-servicelist .container.display').removeClass('display-none');
		$('.box-container-servicelist .container.set').addClass('display-none');
		//메뉴 설정에서 선택된 체크박스를 전부 해제
		$('.icon-check').removeClass('checked');
	}
	themeBtnView();
	// 보여지는 것과 보여지지 않는 구역 나눔의 역할(언터의 위치에서 클릭버튼이 사라지게하는 코드)
	function themeBtnView(){
		// 우선 display-none을 삭제
		$('.box-theme-wrap .btn-prev').removeClass('display-none');
		$('.box-theme-wrap .btn-next').removeClass('display-none');
		// 
		if($('.box-theme-wrap .btn-tab').first().attr('aria-selected') == 'true'){
			$('.box-theme-wrap .btn-prev').addClass('display-none');
		}
		if($('.box-theme-wrap .btn-tab').last().attr('aria-selected') == 'true'){
			$('.box-theme-wrap .btn-next').addClass('display-none');
		}
	}
	themeBodyView();
	function themeBodyView(){
		var target =$('.btn-tab[aria-selected=true').attr('data-target');
		$('.box-theme-body .box-body').addClass('display-none');
		$('.box-theme-body>.'+target).removeClass('display-none');
	}

	/*오른쪽 네번째 컨텐츠에서 상품/쇼핑몰/MEN이 선택되면 선택된 내용에 맞는 box-shop-body가 보이도록하는 함수*/
	function shopView(){
		var target = $('.box-shop-header .tab[aria-selected=true').attr('data-target');
		/*└ aria-selected의 값이 true인 data-target을 가져옴*/
		$('.box-shop-body>div').addClass('display-none');
		$('.box-shop-body>.'+target).removeClass('display-none');
	}
	shopView();
	function tabRandom(){
		var arr =[];
		$('.box-shop-middle>.box-mall>.link-mall').removeClass('random')
		for(;arr.length<4;){
			var r =getRandom(1,12);
			if(arr.indexOf(r) >= 0){
			// 해당 값이 있는지 없는지 확인
				continue;
			}
			arr.push(r);
			if(r<=6){
				$('.box-shop-middle>.box-mall').eq(0).find('.link-mall').eq(r-1).addClass('random');
			}else{
				$('.box-shop-middle>.box-mall').eq(1).find('.link-mall').eq(r-7).addClass('random');
			}
		}
	}
	tabRandom();
	function getRandom(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
})