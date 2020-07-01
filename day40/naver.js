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
	// 로그인창 밑의 박스
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

	// 오늘 읽을만한 글 박스 밑의 좌우 움직임
		// 오늘 읽을만한 글 아래의 색상박스가 이동하는것
		$('.cate-item').click(function(e){
			e.preventDefault();
			$('.cate-item').attr('aria-selected','flase');
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
		$('.icon-cate-prev').click(function(e){
			e.preventDefault();
			if($('.cate-item[aria-selected=true]').parent('tab-change')){
				$('.list-category').animate({'margin-left':'0px'},1000,)
			}
			if($('.cate-item[aria-selected=true]').hasClass('tab-cho')){
				$('.list-category').animate({'margin-left':'-750px'},1000,)
			}
			$('.cate-item[aria-selected=true]').attr('aria-selected','flase').parent().prev().find('.cate-item').attr('aria-selected','true');
			themeBtnView();
			themeBodyView()
		})
		$('.icon-cate-next').click(function(e){
			e.preventDefault();
			if($('.cate-item[aria-selected=true]').hasClass('tab-movie')){
				$('.list-category').animate({'margin-left':'-750px'},1000,)
			}
			if($('.cate-item[aria-selected=true]').hasClass('tab-move')){
				$('.list-category').animate({'margin-left':'-1500px'},1000,)
			}
			$('.cate-item[aria-selected=true]').attr('aria-selected','flase').parent().next().find('.cate-item').attr('aria-selected','true');
			themeBtnView();
			themeBodyView()
		})
// 쇼핑 옆의 상품/쇼핑몰/MEN을 클릭했을때 동작하는 것
		$('.shop-header .tab').click(function(e){
			e.preventDefault();
			$('.shop-header .tab').attr('aria-selected','false');
			$(this).attr('aria-selected','true');
			shopView();
			tabRandom();
			var target =$(this).attr('data-target');
			if(target=='mall'){
				$('.group-mall').addClass('display-none')
			}else{
				$('.group-mall').removeClass('display-none')
			}
		})
// 쇼핑창 밑의 컴텐츠
		var cnt =1;
		var max = 19;
		$('.box-page-next').click(function(e){
			e.preventDefault();
			if(cnt!=max){
				$('.num-box-current').text(cnt+1);
				if($('.list-goods[aria-selected=true]').addClass('tab-movie')){
					$('.list-goods').animate({'margin-bottom':'-834px'},1000,)
				}
				// $('.list-goods[aria-selected=true]').animate({'margin-bottom':'-834px'}, 0,)
				$('.cate-item[aria-selected=true]').attr('aria-selected','flase').parent().next().find('.cate-item').attr('aria-selected','true');
	
				cnt++;

			}
		})
		$('.box-page-prev').click(function(e){
			e.preventDefault();
			if(cnt!=max){
				$('.num-box-current').text(cnt-1);	
				cnt--;
			}
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
		$('.box-theme-wrap .btn-cate-prev').removeClass('display-none');
		$('.box-theme-wrap .btn-cate-next').removeClass('display-none');
		// 
		if($('.cate-item').first().attr('aria-selected') == 'true'){
			$('.btn-cate-prev').addClass('display-none');
		}
		if($('.cate-item').last().attr('aria-selected') == 'true'){
			$('.btn-cate-next').addClass('display-none');
		}
	}
	// 선택한 것과 같은 내용의 바디를 연결
	themeBodyView();
	function themeBodyView(){
		var target =$('.cate-item[aria-selected=true').attr('data-target');
		$('.box-theme-body .box-body').addClass('display-none');
		$('.box-theme-body>.'+target).removeClass('display-none');
	}

	// 선택한 상품/쇼핑몰/MEN에 효과를 주기 위한 function
	function shopView(){
		var target = $('.shop-tab .tab[aria-selected=true').attr('data-target');
		$('.list-goods-wrap>div').addClass('display-none');
		$('.list-goods-wrap>.'+target).removeClass('display-none');
	}
	shopView();
	// mall-area에서 랜덤으로 4개의 색상이 진해지는 결과를 내기 위한 function 
	function tabRandom(){
		var arr =[];
		$('.link-mall').removeClass('random')
		for(;arr.length<4;){
			var r =getRandom(1,12);
			if(arr.indexOf(r) >= 0){
			// 해당 값이 있는지 없는지 확인
				continue;
			}
			arr.push(r);
			if(r<=6){
				$('.mall-area').eq(0).find('.link-mall').eq(r-1).addClass('random');
			}else{
				$('.mall-area').eq(1).find('.link-mall').eq(r-7).addClass('random');
			}
		}
	}
	tabRandom();
	// 랜덤function
	function getRandom(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	
})