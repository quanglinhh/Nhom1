"use strict";

//=> Class Definition
var AppConfig = AppConfig || {};

$(function () {
    AppConfig = {
        //=> Initialize function to call all functions of the class
        init: function () {
            AppConfig.appRouting();
            AppConfig.initAppScrollbars();
            AppConfig.langCheckedToApply();
            AppConfig.search();
            AppConfig.buttonClickEvents();
            AppConfig.initTheme();
            AppConfig.reInitFunction();
        },

        //=> Reinitialize powerful functions of app
        reInitFunction: function () {
            AppConfig.initSlickCarousel();
            AppConfig.materialTab();
            AppConfig.initCountdown();
            AppConfig.addFavorite();
            AudioPlayer.init();
            Analytics.init();
        },

        //=> Handle app routing when page url change
        appRouting: function () {
            var $document = $(document);
            $document.on('click', 'a:not(.load-page):not(.external)', function (e) {
                e.preventDefault();

                var _this = $(this);
                var url = _this.attr('href') !== 'undefined' ?  _this.attr('href') : null ;
                if (url && AppConfig.filterLink(url)) {
                    AppConfig.ajaxLoading(url);
                }
            });
        },

        //=> Filter link a page link or not
        filterLink: function (link) {
            if(link === null) {
                return false;
            } else if(link.substr(0, 1) === '#') {
                return false;
            } else if(link.length >= 10 && link.substr(0,10).toLowerCase() === 'javascript') {
                return false;
            } else if(link.length < 1) {
                return false;
            }

            return true;
        },

        //=> Ajax loading for html pages
        ajaxLoading: function (url) {
            var History = window.history;
            History.pushState("", "", url);

            $.ajax({
                url: url,
                context: document.body
            }).done(function (response) {
                var content = $('<div>' + response + '</div>');
                changeTitle(content);
                replaceImageBanner(content);
                replaceContent(content);
                setActiveClass();
            }).fail(function(jqXHR, textStatus){
                alert('Something went wrong. Please try again');
                return false;
            });

            // Change old title with new one
            function changeTitle(newContent) {
                $('head title').html(newContent.find('title').html());
            }

            // Replace old page banner with new one
            function replaceImageBanner(newContent) {
                var $banner = $('.banner');
                var bannerClass = $banner.attr('class');
                $banner.removeClass(bannerClass.split(' ')[1]);
                $banner.addClass(newContent.find('.banner').attr('class'));
            }

            // Replace old page html with new one
            function replaceContent(newContent) {
                $('#appRoute').html(newContent.find('#appRoute').html());
                $('#wrapper').animate({scrollTop:0}, 'fast');
                Analytics.init();
                AppConfig.reInitFunction();
            }

            // Set active class on nav link when page url change
            function setActiveClass() {
                var $navLink = $('#sidebar .nav-link');
                $navLink.removeClass('active');
                $navLink.each(function () {
                    if (url === $(this).attr('href')) {
                        $(this).addClass('active');
                    }
                })
            }
        },

        //=> Initialize theme settings
        initTheme: function () {
            $('body').themeSettings();
        },

        //=> Languages checked unchecked for apply button disable and enable
        langCheckedToApply: function () {
            var $langCheckbox = $('#lang .custom-control-input');
            $langCheckbox.on('change', function () {
                $('#langApply').prop('disabled', !$langCheckbox.filter(':checked').length);
            }).trigger('change');
        },

        //=> Initialize app scrollbars
        initAppScrollbars: function () {
            $('[data-scrollable="true"]').each(function () {
                var ps = new PerfectScrollbar(this, {
                    wheelSpeed: 0.5,
                    swipeEasing: true,
                    wheelPropagation: false,
                    minScrollbarLength: 40,
                    suppressScrollX: true
                });
            });
        },

        //=> Slick carousel
        slickCarousel: function (carousel, itemXl, itemLg, itemMd, itemSm) {
            var $carousel = $(carousel);
            var prev = '<button class="btn-prev btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-left"></i></button>';
            var next = '<button class="btn-next btn btn-pill btn-air btn-default btn-icon-only"><i class="la la-angle-right"></i></button>';

            // Set slick carousel
            $carousel.slick({
                arrows: true,
                dots: false,
                infinite: false,
                slidesToShow: itemXl,
                slidesToScroll: 1,
                speed: 1000,
                prevArrow: prev,
                nextArrow: next,

                // Breakpoints
                responsive: [
                    {
                        breakpoint: 1440,
                        settings: {
                            slidesToShow: itemLg
                        }
                    },

                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: itemMd
                        }
                    },

                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: itemSm
                        }
                    },

                    {
                        breakpoint: 380,
                        settings: {
                            slidesToShow: 1,
                            arrows: false
                        }
                    }
                ]
            });
        },

        //=> Initialize app slick carousel
        initSlickCarousel: function () {
            AppConfig.slickCarousel('.carousel-item-4', 4, 3, 2, 1);

            AppConfig.slickCarousel('.carousel-item-5', 5, 4, 3, 2);

            AppConfig.slickCarousel('.carousel-item-6', 6, 5, 4, 2);
        },

        //=> App basic buttons click events
        buttonClickEvents: function () {
            $('#toggleSidebar').on('click', function () {
                $body.toggleClass('iconic-sidebar');
            });

            $('#openSidebar').on('click', function (e) {
                e.stopPropagation();
                $body.removeClass('open-search');
                $body.addClass('open-sidebar');
                $sidebarBackdrop.addClass('show');
                $headerBackdrop.removeClass('show');
            });

            $('#hideSidebar').on('click', function () {
                $body.removeClass('open-sidebar');
                $sidebarBackdrop.removeClass('show');
            });

            $('#playList').on('click', function () {
                $body.toggleClass('open-right-sidebar');
            });
        },

        //=> Config search ui events
        search: function () {
            var $search = $('#searchForm #searchInput');

            $search.on('click', function (e) {
                e.stopPropagation();
                $body.addClass('open-search');
                $headerBackdrop.addClass('show');
            });

            $body.on('click', function () {
                $body.removeClass('open-search');
                $headerBackdrop.removeClass('show');
            });
        },

        //=> Material tabs
        materialTab: function () {
            var lineClassName = 'tabs-link-line';
            var $activeLink = $('.line-tabs .nav-item .active');
            var $lineTabsItem = $('.line-tabs .nav-item');

            var line = "<span class='" + lineClassName + "'></span>";
            $('.line-tabs').append(line);

            var activePos = $activeLink.position(),
                activeWidth = $activeLink.parent().width();
            $('.' + lineClassName).stop().css({
                width: activeWidth
            });

            $lineTabsItem.on("click", function() {
                activePos = $(this).position();
                activeWidth = $(this).width();
                $(this).parent().parent().find('.' + lineClassName).stop().css({
                    left: activePos.left,
                    width: activeWidth
                });
            });
        },

        //=> Initialize countdown
        initCountdown: function () {
            var $countdown = $(".countdown");
            var DATE = new Date();
            DATE.setDate(DATE.getDate() + 5);

            $countdown.countdown(DATE, function (event) {
                $(this).html(
                    event.strftime(
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%D</div>' +
                        '</div>' +
                        '<span class="time-separate">:</span>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%H</div>' +
                        '</div>' +
                        '<span class="time-separate">:</span>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%M</div>' +
                        '</div>' +
                        '<span class="time-separate">:</span>' +
                        '<div class="timer-wrapper">' +
                        '<div class="timer-data">%S</div>' +
                        '</div>'
                    )
                );
            });
        },

        //=> Add favorite
        addFavorite: function () {
            var $favorite = $('.favorite');
            var heart = '<li><span class="badge badge-pill badge-danger"><i class="la la-heart"></i></span></li>';

            $favorite.on('click', function (e) {
                e.stopPropagation();
                var $this = $(this);
                var info = $this.closest('.custom-card--info');
                var labels = info.find('.custom-card--labels');

                if (labels.length && !info.find('.custom-card--labels li .la-heart').length) {
                    labels.append(heart);
                } else {
                    var $labels = '<ul class="custom-card--labels d-flex">' +
                        heart +
                        '</ul>';
                    info.prepend($labels);
                }
            })
        }
    };

    var $body = $('body'),
        $headerBackdrop = $('.header-backdrop'),
        $sidebarBackdrop = $('.sidebar-backdrop');

    //=> Call class at document ready
    $(document).ready(AppConfig.init);
});

//=> Loader
$(window).on('load', function () {
    $('#loading').fadeOut(1000);
    $('#login').modal('show');
});

$('#wrapper').on("scroll", function() {
    $('#header').toggleClass('scrolled', $(this).scrollTop() > 80);
});
