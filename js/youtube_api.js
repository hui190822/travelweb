var playerInfoList = [{
        video_name: 'player_0',
        videoId: 'JmCEspVNo9E',
        controls: '0',
        autoplay: '1'
    },
    {
        video_name: 'player_1',
        videoId: 'J3ZA-zWXULg',
        controls: '0',
        autoplay: '1'
    },
    {
        video_name: 'player_2',
        videoId: 'EanoPOT6xBU',
        controls: '0',
        autoplay: '1'
    },
    {
        video_name: 'player_3',
        videoId: 'AR1nvf315yY',
        controls: '0',
        autoplay: '1'
    },
    {
        video_name: 'player_4',
        videoId: 'eMATXtRnKOM',
        controls: '0',
        autoplay: '1'
    }
]
var cooperInfoList = [{
    video_name: 'cooper_0',
    videoId: 'UMrG2x-Lrd0',
    autoplay: '0',
    controls: '1',
    title: '方荷生 里長',
    intro: '臺北市中正區忠勤里辦公處 里長 / 社團法人臺北市臻佶祥社會服務協會 理事長'
}]

function onYouTubeIframeAPIReady() {
    if (typeof playerInfoList === 'undefined') return;

    for (var i = 0; i < playerInfoList.length; i++) {
        var curplayer = createPlayer(playerInfoList[i]); // 創造數個playrs
        players[i] = curplayer;
    }
    for (var i = 0; i < cooperInfoList.length; i++) {
        var cooplayer = createPlayer(cooperInfoList[i]); // 創造數個playrs
        coopers[i] = cooplayer;
    }
}

var players = new Array();
var coopers = new Array();

function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.video_name, { // 創造數個playrs回傳至players陣列
        height: 360,
        width: 640,
        videoId: playerInfo.videoId,
        controls: playerInfo.controls,
        playerVars: {
            autoplay: playerInfo.autoplay,
            showinfo: '0',
            mute: '1',
            loop: '1',
            playlist: playerInfo.videoId,
        }
    });
}
//console.log(players)

for (i = 0; i < playerInfoList.length; i++) {
    $('.player_list').eq(i).append("<div id='player_" + i + "'></div></div>")
}

for (i = 0; i < cooperInfoList.length; i++) {
    $('.coo_player').eq(i).append("<div id='cooper_" + i + "'></div></div>")
    $('.coo_intro').replaceWith(
        "<div class='coo_intro'>" +
        "<h3>" + cooperInfoList[i].title + "</h3>" +
        "<p>" + cooperInfoList[i].intro + "</p></div>")
}

var now = 0,
    next = 0
var pos = { left: '' }
var prePos = { left: '100%' }
var pasPos = { left: '-100%' }
var animationtime = 400

$('.player_list').css(pasPos).eq(0).css(pos)
$('.process>ul>li').on('click', nextHandler)

function nextHandler() {
    if ($(this).index() == now) return false
    next = $(this).index()

    $('.player_list').eq(now).stop().animate(pasPos, animationtime)
        .end().eq(next).css(prePos).stop().animate(pos, animationtime)

    $(this).children().addClass('process_on').parents()
        .siblings().children().removeClass('process_on')
    now = next

    for (i in players) players[i].stopVideo()
    players[now].playVideo()

}

//手機切換
$('.mobile_next').click(function() {
    now = (now + players.length) % players.length
    next = now + 1
    next = next < 5 ? next : 0
    $('.player_list').eq(now).stop().animate(pasPos, animationtime)
        .end().eq(next).css(prePos).stop().animate(pos, animationtime)
    now++
})


//hidden video
$('.sec_5 .on_video').on('click', function(e) {
    $('.hidden_video').stop().fadeIn()
})

$('.coo_player').css(pasPos).eq(0).css(pos)
$('.direct>li').on('click', coo_nextHandler)
$('.dot>ul>li').on('click', dotHandler)
$('.video_close').on('click', function() {
    $('.hidden_video').stop().fadeOut()
    for (i in coopers) coopers[i].stopVideo()
})

function coo_nextHandler() {
    if ($(this).is('.next')) {
        next++
    } else if ($(this).is('.prev')) {
        next--
    }
    next = (next + $('.coo_player').length) % $('.coo_player').length
    console.log(next)
    Handler()
}

function dotHandler() {
    if ($(this).index() == now) return false
    next = $(this).index()
    Handler()
}

function Handler() {
    $('.coo_player').eq(now).stop().animate(pasPos, animationtime)
        .end().eq(next).css(prePos).stop().animate(pos, animationtime)
    $('.dot>ul>li').removeClass('act').eq(next).addClass('act')
    now = next
    for (i in coopers) coopers[i].stopVideo()
}