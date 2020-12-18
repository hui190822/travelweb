(function() {
    //手機選單
    $('.m_menu').on('click', function(e) {
        $('.rwd_menu').stop().slideToggle(300)
        $(this).children().toggleClass('nav_open')
        e.stopPropagation()
    })
    $(document).on('click', function() {
        $('.rwd_menu').stop().slideUp(300)
        nav_cross()
    })

    function nav_cross() {
        $('.m_menu').children().removeClass('nav_open')
    }
    //網頁導覽
    let scrollY = null
    $('.menu>li').on('click', scrollHandler)
    $('.side_bar>ul>li').on('click', scrollHandler)
    $('.quick_menu>.q_link').on('click', scrollHandler)
    $('.rwd_menu>li').on('click', scrollHandler)

    function scrollHandler() {
        let index = $(this).index()
        let target = $('.pin').eq(index).offset().top
        scrollY = target
        nav_cross()
    }
    /*右邊小點點進度顯示*/
    var pins = Array.from(document.querySelectorAll('.pin'))
    var pins_top = pins.map(function(pin) {
        return pin.offsetTop
    })
    $(window).scroll(function() {
        let w_scroll = $(window).scrollTop();
        for (i in pins_top) {
            if (w_scroll >= pins_top[i] * .9) {
                $('.side_bar>ul>li').removeClass('act').eq(i).addClass('act')
            }
        }
    })

    function render() {
        if (scrollY != null) {
            let move = (scrollY - window.scrollY) * .07
            window.scrollTo(0, window.scrollY + move)
            if (Math.abs(move) < 1) {
                scrollY = null
            } //console.log(move)
        }
        requestAnimationFrame(render)
    }
    render()

    $('.scroll_down').on('click', function() {
            $('html,body').stop().animate({ scrollTop: $('.sec_1').outerHeight() }, 800)
        })
        //網頁導覽


    $(".sec_1 iframe").css({ 'width': 1920, 'height': 1080 })
    $(window).resize(function() {
        var vw = $(window).outerWidth()

        if (vw > 1920) {
            $(".sec_1 iframe").css({ 'width': vw, 'height': vw / 16 * 9 })
        } else {
            $(".sec_1 iframe").css({ 'width': 1920, 'height': 1080 })
        }

    }).resize();

    /*最新消息輪播*/
    // setInterval(news, 3000)

    // function news() {
    //     $('.news').animate({ top: -20 }, 500, function() {
    //         $('.news p').eq(0).appendTo('.news')
    //         $('.news').css({ top: 0 })
    //     })
    // }
    /*最新消息輪播*/
    const tab_info = [{
            "title": '臺北擁有濃厚的人文底蘊，鑽進大街小巷內翻索歷史留下的痕跡。走進大稻埕的百年茶坊，親手沖煮回甘可口的茗茶；搭乘高速電梯 37 秒內直達知名世界地標101頂樓，站在台北市中心眺望街景。',
            "inner": '前往中山站，走訪文青小店，探索在地人文特色，品嚐台灣經典美食，蚵仔煎、滷肉飯、臭豆腐、麻辣鍋，在這座充滿多元文化的環境中，放鬆享受友善、溫暖的人文城市。'
        },
        {
            "title": '坐擁國立臺灣美術館、國立自然科學博物館、世界第九大新地標「台中國家歌劇院」與台灣無形文化資產「大甲鎮瀾宮媽祖遶境」，現代與傳統交織出的優雅台中。想要跟隨潮流時，就到台中最熱鬧的勤美誠品綠園道、草悟道這一區，那裡有許多特色小店、咖啡廳、美食。',
            "inner": '想要慵懶地感受都市中的綠意時，就到有「台中市的綠肺」之稱的秋紅谷景觀生態公園吧！想要感受靈感的刺激時，被飽和鮮豔的色彩環繞的彩虹眷村是最佳選擇。'
        },
        {
            "title": '永不褪色的台灣歷史之都台南，是台灣歷史最悠久的都市。見證台灣歷史的安平古堡、赤崁樓，台南第一家百貨公司「林百貨」、奇美博物館，穿梭在古蹟與現代建築中，彷彿穿越了不同的時空。',
            "inner": '由大自然賜與的秘境漁光島、草山月世界、六甲夢之湖更讓人忘卻塵囂，洗淨心靈。說到台南，當然少不了美食，從親民的台灣傳統小吃到精緻典雅的料理，種類多又美味，不負台南美食之都的盛名。'
        }
    ]

    $('.intab').click(function() {
            $(this).siblings().removeClass('intab_active')
            $(this).toggleClass('intab_active')
            let tab_index = $(this).index()
            console.log(tab_index)
            $('.intro h4').css({ opacity: 0 }).text(tab_info[tab_index].title).animate({ opacity: 1 }, 800)
            $('.intro p').css({ opacity: 0 }).text(tab_info[tab_index].inner).animate({ opacity: 1 }, 800)
        })
        //同步序列
    var index = 0

    //淡入動畫
    var wh = 0
    var $pin = $('.map li')
    $(window).scroll(function() {
        wh = $(this).scrollTop();
        if (wh > $('.map').offset().top) {
            for (i in result_data) {
                $pin.eq(i).delay(300 * i).animate({ opacity: 1, }, 500)
            }
        }
        if (wh > $('.direct').offset().top) {
            for (i = 0; i < 2; i++) {
                $('.result_data').eq(i).delay(400 * i).animate({ opacity: 1, }, 500)
            }
            numHandler()
        }

    })

    //data動畫
    const result_data = [{
            'name': '【安平古堡】',
            'addr': '安平區',
            'good': '熱蘭遮城',
            'img': 'img/安平古堡.jpg'
        },
           
        {
            'name': '【七股鹽田】',
            'addr': '七股區',
            'good': '曬鹽場',
            'img': 'img/七股鹽山.jpg'
        },
        {
            'name': '【玉井不老街】',
            'addr': '玉井區',
            'good': '芒果故鄉',
            'img': 'img/玉井.jpg'
        },
        {
            'name': '【台南神學院】',
            'addr': '東區',
            'good': '一把青爆紅',
            'img': 'img/神學院.jpg'
        },
        {
            'name': '【水道博物館】',
            'addr': '山上區',
            'good': '臺灣自來水之父',
            'img': 'img/水道.jpeg'
        },
        {
            'name': '【十鼔文化村】',
            'addr': '仁德區',
            'good': '霍爾的移動城堡',
            'img': 'img/十鼔.jpg'
        },
        {
            'name': '【台南愛國婦人館】',
            'addr': '中西區',
            'good': '日式木造建築',
            'img': 'img/愛國.jpg'
        },
        {
            'name': '【台南地方法院】',
            'addr': '中西區',
            'good': '貓道',
            'img': 'img/法院.jpg'
        },
    ]

    $('.detail_slide').append(
        "<div class='detail_data'></div>"
    )

    $pin.on('click', function() {
        index = $(this).index()
        Handler()
    })

    $('.direct>li').on('click', function() {

        if ($(this).is('.next')) {
            index++
            //index = index < result_data.length ? index++ : 0
        } else if ($(this).is('.prev')) {
            //index = index > 0 ? index-- : result_data.length
            index--
        }
        index = (index + result_data.length) % result_data.length
        Handler()

    })
    $('.guide_circle li').on('click', function() {
        index = $(this).index()
        Handler()
    })

    function Handler() {
        mapHandler()
        slideHandler()
        navHandler()
    }

    function navHandler() {
        $('.guide_circle li').removeClass('li_act').eq(index).addClass('li_act')
    }

    function mapHandler() {
        $pin.removeClass('li_on').eq(index).addClass('li_on')
    }

    function slideHandler() {
        $('.detail_data').eq(1).replaceWith(
            "<div class='detail_data'>" +
            "<div class='detail_contain'>" +
            "<h2>" + result_data[index].name + "</h2>" +
            "<span>" + result_data[index].addr + "</span>" +
            "<hr>" +
            "<h3>特色</h3>" +
            "<h1>" + result_data[index].good + "<span></span></h1>" +
            "<h6>※周一至周五</h6>" +
            "</div>" +
            "<div class='detail_img'><img src='" + result_data[index].img + "' alt=''></div>" +
            "</div>"
        )

        $('.detail_slide').stop().animate({ left: $('.detail_data').outerWidth() * -1 + 'px' }, 400, function() {
            $(this).removeAttr('style')
            $('.detail_data').eq(0).appendTo('.detail_slide')
        })
    }

    function numHandler() {

        $('.count').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 8000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
            $(this).removeClass()
        });
    }

    var tlen = 60; // 超過60個字以"..."取代
    $(".tlen").each(function(i) {
        if ($(this).text().length > tlen) {
            var text = $(this).text().substring(0, tlen - 1) + "...";
            $(this).text(text);
        }
    });


})(jQuery)