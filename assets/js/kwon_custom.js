$(function(){
    imagesProgress(); //이미지 로딩 소스
    counter();            
});

var dot = $("#dot > ul > li");
var cont = $("#contents > section");
var menuBtn = $(".menu-button.wrap");

dot.click(function(e){
    e.preventDefault();
    var target = $(this);
    var index = target.index();
    var section = cont.eq(index);
    var offset = section.offset().top;
    $("html,body").animate({ scrollTop:offset },600,"easeInOutExpo");
});

//스크롤시 메뉴버튼 색변화
$(window).scroll(function(){
    var wScroll = $(this).scrollTop();
    
    if(wScroll >= cont.eq(0).offset().top){
        menuBtn.removeClass("show");
    }
    if(wScroll >= cont.eq(1).offset().top -600){
        menuBtn.removeClass("show");
        menuBtn.eq(0).addClass("show");
    }
    if(wScroll >= cont.eq(2).offset().top -600){
        menuBtn.removeClass("show");
    }
    if(wScroll >= cont.eq(3).offset().top -600){
        menuBtn.removeClass("show");
        menuBtn.eq(0).addClass("show");
    }
    if(wScroll >= cont.eq(4).offset().top -600){
        menuBtn.removeClass("show");
    }
});

// 메인 버튼 클릭 시
$('a[href^="#"]').on("click",function(e){
    e.preventDefault();
    var target = $( $(this).attr("href") );

    if(target.length){
$("html, body").animate({ scrollTop: target.offset().top },600,"easeInOutExpo");
    }
});

function counter() {
    if ($('.about .count').size()) {
        $c = $('.about .count');

        $c.each(function () {
            var $this = $(this);
            $this.data('target', parseInt($this.html()));
            $this.data('counted', false);
            $this.html('0');
        });

        $(window).on('scroll', function () {
            var speed = 5000;

            $c.each(function (i) {
                var $t = $(this);
                if (!$t.data('counted') && $(window).scrollTop() + $(window).height() >= $t.offset().top) {

                    $t.data('counted', true);

                    $t.animate({
                        dummy: 1
                    }, {
                        duration: speed,
                        step: function (now) {
                            var $this = $(this);
                            var val = Math.round($this.data('target') * now);
                            $this.html(val);
                        },
                        easing: 'easeInOutQuart'
                    });

                    // easy pie
                    $('.pie').easyPieChart({
                        barColor: '#030303',
                        trackColor: '#030303',
                        scaleColor: '#030303',
                        scaleLength: 5,
                        lineWidth: 1,
                        size: 200,
                        lineCap: 'round',
                        animate: { duration: speed, enabled: true }
                    });
                }
            });
        }).triggerHandler('scroll');
    }
}

//imageProgress
function imagesProgress(){
    var $container = $("#progress"),
        $progressBar = $container.find(".bubble"),
        $progressText = $container.find(".progress-text"),
        imgLoad = imagesLoaded("body"),	
        imgTotal = imgLoad.images.length,	
        imgLoaded = 0,										
        current = 0,							
        progressTimer = setInterval(updateProgress, 1000 / 60);

    imgLoad.on("progress", function(){
        imgLoaded++;
    });

    function updateProgress(){
        var target = ( imgLoaded / imgTotal) * 100;

        current += ( target - current) * 0.1;
        $progressText.text( Math.floor(current) + '%' );

        if(current >= 100){
            clearInterval(progressTimer);
            //$container.addClass("progress-complete");
            $progressBar.add($progressText)
                .delay(500)
                .animate({opacity: 0},100,function(){
                    $container.animate({top: '-110%'},1000,'easeInOutQuint');
                });
            $("body").addClass("active");
        }
        if(current > 99.98){
            current = 100;
        }
    }	
}

