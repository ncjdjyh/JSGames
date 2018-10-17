/*
var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Number(k))
        }
    })
}
*/

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        spark: 'img/spark.png',
        cloud: 'img/cloud.png',
        enemy00: 'img/enemy00.png',
        enemy01: 'img/enemy01.png',
        enemy02: 'img/enemy02.png',
    //    flappy_bird图片
        bird_up: 'img/bird/redbird-downflap.png',
        bird_mid: 'img/bird/redbird-midflap.png',
        bird_down: 'img/bird/redbird-upflap.png',
        birdSky: 'img/bird/sky.png',
        pipe: 'img/bird/pipe-green.png',
        ground: 'img/bird/ground.png'
    }
    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    //enableDebugMode(game, true)
}

__main()
