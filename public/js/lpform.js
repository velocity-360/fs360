window.App = window.App || {};
window.App.Aside = (function ($) {
    'use strict';

    var learnMore = function () {
        $('#lpf-header .learn-more').click(function(){
            $('html, body').animate({
                scrollTop: $('#lpf-header header').height()
            }, 500);
            return false;
        })
    }

    var handleAsideToggle = function () {
        $('#lpf-content .aside-toggle').click(function () {
            $('body').toggleClass('aside-opened');
        });
    };

    var handleAsideTogglePosition = function () {
        var $asideToggle = $('#lpf-content main > .aside-toggle');

        $(window).scroll(function () {
            var positionTop = $(window).scrollTop();
            var headerPositionBottom = $('#lpf-header header').height();

            if (positionTop > headerPositionBottom) {
                $asideToggle.addClass('fixed');
            } else {
                $asideToggle.removeClass('fixed');
            }
        });
    };

    var handleAsideLinkClick = function () {
        var $asideArticleLinks = $('#lpf-content aside li a');

        $('#lpf-content aside a').click(function (e) {
            if ($(this).parent().is('li')) {
                e.preventDefault();

                var id = $(this).attr('href'),
                    $targetElement = $(id);

                $asideArticleLinks.removeClass('active');
                $(this).addClass('active');

                if ($targetElement.length) {
                    var scrollTo = $targetElement.offset().top - 130,
                        isFirstSection = !$targetElement.prev().length,
                        $header = $('#lpf-header header');

                    if (isFirstSection) {
                        scrollTo = $header.offset().top + $header.outerHeight();
                    }

                    $('html, body').animate({
                        scrollTop: scrollTo
                    }, 500);
                }
                //window.console.log(history.state);
                history.pushState({}, '', location.protocol+'//'+location.host+location.pathname + id);
            }

            $('body').removeClass('aside-opened');
        });
    };

    var handleStickyAside = function () {
        var $aside = $('#lpf-content aside'),
            $nav = $('#lpf-content aside nav'),
            isNotHighEnough = function () {
                return $(window).height() < $nav.outerHeight() || !window.matchMedia('(min-width: 992px)').matches;
            };

        $(window).scroll(function () {
            if (isNotHighEnough()) {
                $aside.removeClass('sticky');
                return;
            }

            var positionTop = $(window).scrollTop(),
                headerPositionBottom = $('#lpf-header header').height();

            $aside.toggleClass('sticky', positionTop > headerPositionBottom);
        });

        $(window).resize(function () {
            if (isNotHighEnough()) {
                $aside.removeClass('sticky');
            }
        });
    };

    var handleActiveAsideLink = function () {
        var $asideArticleLinks = $('#lpf-content aside li a'),
            $articles = $('#lpf-content article[id]');

        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop() + 220,
                $visibleArticle = null;

            $articles.each(function () {
                if (scrollTop > $(this).offset().top) {
                    $visibleArticle = $(this);
                }
            });

            // last element
            if ($(document).height() - $(window).scrollTop() - $(window).height() < $articles.last().outerHeight() * 3/5) {
                $visibleArticle = $articles.last();
            }

            // first element
            if (!$visibleArticle) {
                $visibleArticle = $articles.first();
            }

            var $visibleLink = $asideArticleLinks.filter('[href="#' + $visibleArticle.attr('id') + '"]');
            if ($visibleLink) {
                $asideArticleLinks.removeClass('active');
                $visibleLink.addClass('active');
            }
        });
        return false;
    };

    var closeFooter = function () {
        var $closeFooter = $('#lpf-footer .close-footer');

        $closeFooter.click(function(e){
            $('footer#lpf-footer').addClass('footer-closed');
            if(e.target.classList[1]==='fa-times') e.preventDefault();
        });
    };

    var handleSyllabusTab = function () {
        var maxWeeks = 17,
            divider1Position = 4,
            divider2Position = 11,
            openedTab = 1,
            $syllabus = $('#lpf-content article.syllabus'),
            $weekNumbers = $syllabus.find('.week-numbers'),
            $weekNumbersXs = $syllabus.find('.week-numbers-xs'),
            $weekNumbersElements = $weekNumbers.find('li'),
            $weekNumbersXsElements = $weekNumbersXs.find('li'),
            $weekProgress = $syllabus.find('.week-progress'),
            $weekProgressStep = $weekProgress.find('.step'),
            $weekProgressDivider1 = $weekProgress.find('.divider1'),
            $weekProgressDivider2 = $weekProgress.find('.divider2'),
            $headLinks = $syllabus.find('.head a'),
            $contents = $syllabus.find('.contents > li'),
            $dividerWeekNumberElement1 = $weekNumbersElements.eq(divider1Position),
            $dividerWeekNumberElement2 = $weekNumbersElements.eq(divider2Position),
            $lastWeekNumberElement = $weekNumbersElements.eq(maxWeeks - 1);

        var openTab = function (tabIndex, silent) {
            var $tabLink = $headLinks.eq(tabIndex),
                start = $tabLink.data('start'),
                duration = $tabLink.data('duration'),
                title = $tabLink.data('name'),
                end = start + duration - 1 <= 17 ? start + duration - 1 : 17,
                weekNumbersOffsetLeft = $weekNumbers.offset().left,
                weekNumbersXsOffsetLeft = $weekNumbersXs.offset().left,
                weekProgressWidth = $weekProgress.width(),
                startTagOffsetLeft = $weekNumbersElements.eq(start - 1).offset().left,
                endTagOffsetLeft = $weekNumbersElements.eq(end).offset().left,
                endTagWidth = $weekNumbersElements.eq(end).width(),
                stepPositionLeft = startTagOffsetLeft - weekNumbersOffsetLeft,
                stepWidth = endTagOffsetLeft - startTagOffsetLeft;

            $headLinks.removeClass('active');
            $tabLink.addClass('active');

            if($(document).width() < 768) {
                stepPositionLeft = $weekNumbersXsElements.eq(tabIndex).offset().left - weekNumbersXsOffsetLeft;
                stepWidth = $weekNumbersXsElements.eq(tabIndex).width();
            } else {
                // handle progress
                if (stepPositionLeft > 20) {
                    stepPositionLeft -= $lastWeekNumberElement.width() * 3 / 5;
                } else {
                    stepPositionLeft = 0;
                    stepWidth -= endTagWidth * 1 / 3
                }

                if (end == maxWeeks - 1) {
                    stepWidth = weekProgressWidth - stepPositionLeft;
                }
            }


            $weekProgressStep
                .text(title)
                .css('left', stepPositionLeft)
                .css('width', stepWidth);

            // set last divider
            // $weekProgressDivider1.css('left',
            //     // $dividerWeekNumberElement1.offset().left
            //     // - weekNumbersOffsetLeft
            //     // - $lastWeekNumberElement.width() * 3 / 5
            // );

            // handle content
            if (silent) return;

            $contents.hide();
            $contents.eq(tabIndex).fadeIn();
        };

        $headLinks.click(function () {
            if (openedTab == $headLinks.index(this)) return;

            openedTab = $headLinks.index(this);
            openTab(openedTab);
        });

        $(window).resize(function () {
            openTab(openedTab, true);
        });

        setTimeout(function () {
            openTab(openedTab);
        }, 100);
    };

    var handleProjectsCategories = function () {
        var $projects = $('#lpf-content article.projects'),
            $categories = $projects.find('.categories a'),
            $contents = $projects.find('.contents > li'),
            $playerId = $projects.find('#youtube'),
            $defaultVideos = ["https://www.youtube.com/embed/icvT69OvuRs", "https://www.youtube.com/embed/sVJ3vTde7nQ", "https://www.youtube.com/embed/GpGTYp_G9VE"];

        var openCategory = function (categoryIndex) {
            $categories.removeClass('active');
            $categories.eq(categoryIndex).addClass('active');

            $contents.hide();
            $contents.eq(categoryIndex).fadeIn();
        };

         $(".fit-vids-container").fitVids();

        $categories.click(function () {
            openCategory($categories.index(this));
            // $(this).addClass("active");
            //  $(this).siblings().removeClass("active");
             var videoUrl = $defaultVideos[$categories.index(this)];
             // console.log(videoUrl);
             $(".ytplayer").each(function(i, el) {
                 var src = $(el).attr("src");
                 // debugger;
                 $(el).attr("src", "");
                 var player = $(el);
                 setTimeout(function() {
                     // $(el).attr("src", src); //hack to stop
                     // $(".projects .contents li")[i].find("#youtube-player").attr("src", videoUrl);
                     player.attr("src", $defaultVideos[i]);
                 })
             });
        });

        openCategory(0);
    };

    var handleFaqQuestions = function () {
        var $faq = $('#lpf-content article.faq'),
            $questions = $faq.find('.questions'),
            $questionsElements = $questions.find('> li'),
            $questionsLink = $questionsElements.find('h3 a'),
            $questionsElementsAnswers = $questionsElements.find('> p');

        $questionsLink.click(function () {
            var $li = $(this).closest('li'),
                isOpened = $li.hasClass('opened');

            $questionsElements.removeClass('opened');
            $questionsElementsAnswers.slideUp();

            if (!isOpened) {
                $li.addClass('opened');
                $li.find('> p').slideDown();
            }
        });
    };

    var videoSelect = function () {
        $("#lpf-content .project").on("click", function () {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            var videoUrl = $(this).data("youtube");
            console.log(videoUrl);
            $(this).parents('#fs-projects-longform').find("#youtube-player").attr("src", videoUrl);
        });
        $(".fit-vids-container").fitVids();
    }

    var pressCarousel = function () {
        $('#lpf-content .press-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            //variableWidth: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

    var hiringCarousel = function () {
        $('#lpf-content .hiring-carousel').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

    $(document).ready(function () {
        handleAsideToggle();
        handleAsideTogglePosition();
        handleAsideLinkClick();
        handleStickyAside();
        handleActiveAsideLink();
        handleSyllabusTab();
        handleProjectsCategories();
        handleFaqQuestions();
        closeFooter();
        learnMore();
        videoSelect();
        pressCarousel();
        hiringCarousel();
    });

}(jQuery));