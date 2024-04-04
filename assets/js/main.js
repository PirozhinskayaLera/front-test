"use strict";

$(document).ready(function($)  {
    console.log('true');

    $('[data-fancybox]').fancybox({
        closeExisting: true,
        clickOutside: true,
        touch: false,
        smallBtn: false,
        toolbar: false
    })

    $('.phonemask').mask('+7 (999) 999-99-99');
    $('.phonemask').on('mouseenter', function() {
        $(this).attr('placeholder', '+7 (___) ___-__-__');
    })
    $('.phonemask').on('mouseleave', function() {
        $(this).attr('placeholder', '+7       -         -     *');
    })
    
    $(".input-field").on('focusin', function () {
        if($(this).attr('type') !== 'checkbox'){
            let parent = $(this).parent();
            parent[0].querySelector('.input-text').style.opacity = 1;

            $(this).removeClass('input__error');
            parent[0].querySelector('.input--error').innerHTML = '';
        }
        
    })
    $(".input-field").on('focusout',function () {
        if($(this).attr('type') !== 'checkbox'){
            let parent = $(this).parent();
            parent[0].querySelector('.input-text').style.opacity = 0;
        }
    })

    $(".input-checkbox input").on('click', function () {
        let btn = $(this).closest('form').find('.btn');
        let checkbox = $(this).is(':checked');
        if (checkbox) {
            $(btn).removeAttr('disabled');
        } else {
            $(btn).attr('disabled', 'true');
        }
    });

    $("[data-tab-id='1']").addClass('active');
    $("[data-tab-content='1']").fadeIn();

    $('.development-tools__nav-item').on('click', function() {
        let tabId = $(this).attr('data-tab-id');
        $(".development-tools__nav-item").removeClass('active');
        $(this).addClass('active');

        $(".development-tools__tab-section").hide();
        $('[data-tab-content=' + tabId + "]").fadeIn();
    });

    $('.faq__item-title-btn').on('click', function() {
        let content = $(this).closest('.faq__item').find('.faq__item-content');
        
        if (content.css('display') !== 'none') {
            $(this).find('path').attr('d', 'M18 30.3723H41 M30 18.3723L30 41.3723');
            content.slideUp();
        } else {
            $(this).find('path').attr('d', 'M18 30.3723H41');
            content.slideDown();
        }
    });

    $('.header__hamburger').on('click', function() {
        let menu = $(this).closest('.header__wrap').find('.header__mobile');
        
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            menu.css('left', '-480');
            setTimeout(function () {
                menu.css('display', 'none');
            }, 100);
            if ($(window).width() <= 480) $('body').css('overflow-y', 'scroll'); 
        } else {
            $(this).addClass('active');
            menu.css('display', 'flex');
            setTimeout(function () {
                menu.css('left', '0');
            }, 100); 
            if ($(window).width() <= 480) $('body').css('overflow-y', 'hidden'); 
        }
    });

    $('form').on('submit', function() {
        let btn = $(this).find('.btn');
        let btnText = btn.text();
        btnLoading('start', btn);
        event.preventDefault();

        let formData = $(this).find('.input-field');
        let valid = true;
        $.each(formData, function(){
            let id = $(this).attr('id');
            
            let validText = $(this).closest('form').find('[data-validate-text=' + id + "]")[0];
            if ($(this).attr('data-required') && $(this).val() == '') {
                $(this).addClass('input__error');
                $(this).closest('form').find('[data-validate-text=' + id + "]");
                if (validText) validText.innerHTML = 'Поле не заполнено';
                valid = false;
            } else {
                $(this).removeClass('input__error');
                if (validText) validText.innerHTML = ' ';
            }
        });

        setTimeout(function () {
            if (valid !== false) {
                formData.val('');
                $.fancybox.close();
                $.fancybox.open({
                    src : '#modal-success'
                });
            }
            btnLoading('finish', btn, btnText);
        }, 1000)
        
    });
    var btnLoading = function (action, elem, text) {
        console.log(elem);
        if (action == 'start') {
            elem.addClass('loading');
            elem.html('<span class="loader__btn"></span><span class="loader__btn"></span><span class="loader__btn"></span>');
            elem.find('.loader__btn').css('display', 'inline-block')
        } else {
            elem.removeClass('loading');
            elem.text(text);
            elem.find('.loader__btn').css('display', 'none')
        }
        
    }

    var swiper = new Swiper('.development-tools .swiper', {
        spaceBetween: 20,
        slidesPerView: 'auto',
        watchOverflow: true,
        setWrapperSize: true,
        freeMode: true,
        navigation: {
          nextEl: '.development-tools .swiper-button-next',
          prevEl: '.development-tools .swiper-button-prev',
        },
        breakpoints: {
            768: {
                spaceBetween: 40,
            }
        }
      });

      var swiper1 = new Swiper('.slider .swiper', {
        spaceBetween: 20,
        slidesPerView: 2,
        pagination: {
            el: '.slider .swiper-pagination',
            clickable: true,
          },
      });
  

      if ($('.contacts__cart')) {
            ymaps.ready(function () {
                let icon = {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: 'assets/img/icons/point.svg',
                    // Размеры метки.
                    iconImageSize: [48, 48],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-5, -38]
                }
                var myMap = new ymaps.Map('map', {
                        center: [53.429718, 58.990685],
                        zoom: 17
                    }, {
                        searchControlProvider: 'yandex#search'
                    }),
                    myPlacemarkMgn = new ymaps.Placemark(myMap.getCenter(), {
                        hintContent: 'г. Магнитогорск, ул. Строителей, 26',
                    }, icon),

                    myPlacemarkSpb = new ymaps.Placemark([59.905588, 30.266452], {
                        hintContent: 'Санкт-Петербург, Бумажная 16к1 оф 432',
                    }, icon),

                    myPlacemarkChel = new ymaps.Placemark([55.139144, 61.397442], {
                        hintContent: 'г. Челябинск, ул. Доватора, 9 оф.27',
                    }, icon);

                myMap.geoObjects
                    .add(myPlacemarkMgn)
                    .add(myPlacemarkSpb)
                    .add(myPlacemarkChel);
            });
      }
    
})

