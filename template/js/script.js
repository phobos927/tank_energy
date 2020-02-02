
$(function(){
	function copyJquery(button, container){
		$(button).click(function() {
			var $temp = $("<input>");
			$("body").append($temp);
			$temp.val($(container).text()).select();
			document.execCommand("copy");
			$temp.remove();			
			successShow();
		});
	}

	//copyJquery('.wallet', '.wallet');
	
	
	
	function successShow(){
		$('.head-success-copy').addClass('show');
		setTimeout(successHide, 2000);
	}

	function successHide(){
		$('.head-success-copy').removeClass('show');
	}

});

function empty(val){
	if(val==undefined || val==NaN || val==null || val==''){
		return true;
	} else{
		return false;
	}
}
$(function() {

	$('form').submit(function(e) {
		var bitrix = $(this).data('bitrix');
		if(bitrix!=true){
			var fd = new FormData(this);
			if($(this).is('[name="file"]')){
				var $file = $('[name="file"]');
				if(!empty($file.prop('files')[0])){
					fd.append('file', $file.prop('files')[0]);
					var file_size = $file.prop('files')[0].size/1050578;
				} else{
					var file_size = 0;
				}
			}


			var $form = $(this);
			var $form_item = this;
			var rBlock = $form.data('result');
			if(!empty(rBlock)){
				var rAns = $form.find(".result-form").html();			
			}
			var confirm = $form.data('confirm');

			var isConfirm = true;

			if(confirm===true){			
				isConfirm = false;			
				var submit_txt = $('.submit-txt').text();
				smoke.confirm (submit_txt, function (result) {						
					isConfirm = result;	
					if(isConfirm){
						var fd = new FormData($form_item);
						$.ajax({
							type: $form.attr('method'),
							url: $form.attr('action'),
							data: fd,
							processData: false,
							contentType: false,
							success: function (res, status, jx) {

								if(res.code=='success'){
									$form.html('<span class="success-form">Заявка успешно отправлена</span>');
									if(!empty(rBlock)){
										$(rBlock).html(rAns);
									}	
									$form.find('.error').hide();
									if(!empty(res.redirect)){
										location = '/personal/';
									}
								} else{
								//console.log(res.errors);
								$form.find('.error').show();
								$form.find('.error').html(res.errors);
								var errors = $form.find('.error').text();
								if(errors.length<1){
									$form.find('.error').show();
									$form.find('.error').html('Неизвестная ошибка!');
								}
							}
						},
						error: function(res){
							console.log('fail');							
							$form.find('.error').html('Неизвестная ошибка!');
						}
					});


					}

				});
				isConfirm = false;
			} else{
				isConfirm = true;
			}



			if(isConfirm){
				var fd = new FormData($form_item);
				$.ajax({
					type: $form.attr('method'),
					url: $form.attr('action'),
					data: fd,
					processData: false,
					contentType: false,
					success: function (res) {

						console.log(res);
						if(res.code=='success'){
							$form.html('<span class="success-form">Заявка успешно отправлена</span>');
							if(!empty(rBlock)){
								$(rBlock).html(rAns);
							}	
							$form.find('.error').hide();
							if(!empty(res.redirect)){
								location = res.redirect;
							}
						} else{
							$form.find('.error').show();
							$form.find('.error').html(res.errors);
							var errors = $form.find('.error').text();								
							if(errors.length<1){
								$form.find('.error').show();
								$form.find('.error').html('Неизвестная ошибка!');
							}
						}
					},
					error: function(res){
						console.log('fail');				
						$form.find('.error').html('Неизвестная ошибка!');
					}
				});
			}


			e.preventDefault(); 
			return false;
		} else{
			return true;
		}
	});

	$('.input-block input').on('input', function(){
		var val_input = $(this).val();
		if(!empty(val_input)){
			$(this).addClass('focus');
			$(this).closest(".input-block").addClass('active-block');
		} else{
			$(this).removeClass('focus');
			$(this).closest(".input-block").removeClass('active-block');
		}
	});	
	$('.input-block input').on('focusin', function(){
		$(this).closest(".input-block").addClass('active-block');
	});	
	$('.input-block input').on('focusout', function(){
		if(empty($(this).val())){
			$(this).closest(".input-block").removeClass('active-block');
		}

	});	
});
$(function(){
	var active_code_phone = $('.phone-code__item.active').data('mask');
	if(!empty(active_code_phone)){
		$(".phone-input input").mask(active_code_phone);
	} else{
		$(".phone-input input").mask("+7 (999) 999-9999");
	}
	
	
	$('.phone-input input').on('focusin', function() {		
		$(this).addClass('focus');
		$(this).closest(".input-block").addClass('active-block');
	});
	$('.phone-input input').on('focusout', function() {		
		if(empty($(this).val()) || $(this).val()=='+7 (___) ___-____'){
			$(this).removeClass('focus');
			$(this).closest(".input-block").removeClass('active-block');
		}
	});
	$('.phone-code__item').click(function(){
		var ncode = $(this).data('phone');
		$('[name="phone"]').val(ncode);
		$('.phone-code__item').removeClass('active');
		$(this).addClass('active');
		var mask_format = $(this).data('mask');
		$('.phone-input input').unmask().mask(mask_format);
	});
	$('.phone-code__list').click(function(){
		$(this).toggleClass('active');
	});

	$('input[inputmode="numeric"]').on('input', function(){
		if(this.value.match(/[^0-9]/g)){
			this.value = this.value.replace(/[^0-9]/g, "");
		};
	});

});

$(function(){
	$('input').each(function(){
		if(!empty($(this).val())){
			$(this).addClass('focus');
		}
		
	});
	
	$('.menu-open').click(function(){
		$('.menu-dd-container').toggleClass('show');
		$('.bg-black-menu').fadeToggle(300);
	});
	$(document).mouseup(function (e) {
		if (e.which != 1) return false;
		var div = $(".menu-dd-container");
		var button = $('.menu-open');
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			if (!button.is(e.target) && button.has(e.target).length === 0) {
				$('.menu-dd-container').removeClass('show');
				$('.bg-black-menu').fadeOut(300);
			}
		}
	});
	
	$('.date-input input').click(function(){
		$('.date-input input').focus();
	});

	$('.file-input input').change(function() {

		if ($(this).val() != ''){
			$('.file-label').text($(this)[0].files[0].name);
		} 
		else{
			$('.file-label').text('Прикрепить файл');
		} 
	});





	$('a[href*="#"]').bind('click', function (e) {
		var fixed_offset = 70;
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 500);
		e.preventDefault();

		var stateObj = { path: "#"+this.hash };
		history.pushState(stateObj, "", location.protocol + '//' + location.host + location.pathname + this.hash);
	});

	$(document).ready(function() { 
		$("a[href^=http]").each(
			function(){
				if(this.href.indexOf(location.hostname) == -1) {
					$(this).attr('target', '_blank');
				}
			})
	});

	/*$('.menu-item').click(function(){
		$('.menu-item').removeClass('active');
		$(this).addClass('active');
	});*/



});

var origOffsetY = 0;
$(document).ready(function(){
	var menu = $('.header-fixed-top');
	origOffsetY = $('.top-0').offset().top;
});
$(document).scroll(function(e){
	origOffsetY = $('.top-0').offset().top;		
	var scrollTop = $(document).scrollTop();	
	
	if(scrollTop > origOffsetY){
		$('.header-fixed-top').removeClass('navbar-static-top').addClass('navbar-fixed-top');
	} else {
		$('.header-fixed-top').removeClass('navbar-fixed-top').addClass('navbar-static-top');
	}
	
	$('section').each(function(){
		if ($(document).scrollTop() + $(window).height() > $(this).offset().top && $(document).scrollTop() - $(this).offset().top < $(this).height()){
			//console.log($(this).attr('id'));
			//window.location.hash = ($(this).attr('id'));
			var stateObj = { path: "#"+this.hash };
			history.pushState(stateObj, "", location.protocol + '//' + location.host + location.pathname + '#'+$(this).attr('id'));
			var b_hash = '#'+$(this).attr('id');
			
			$('.menu-item').each(function(){

				if($(this).attr('href')==window.location.hash){
					$(this).addClass('active');
				}	 else{
					$(this).removeClass('active');
				}			

			});
		} else {
			//console.log(window.location.hash);
		}
	});
	
	

});

$(function(){
	$('.owl-main').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		dots: true,
		items:1,
		dotsContainer: '.custom-dots',
	});

	$('.mobile-menu-open').click(function(){
		$('.mobile-menu').toggleClass('active');
	});
	$('.menu-item').click(function(){
		$('.mobile-menu').removeClass('active');
	});
});