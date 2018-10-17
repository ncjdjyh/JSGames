//抽象出scene完成具体完成game要做的事
var Scene = function(game) {
    var s = {
        game: game

    }
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    var enableDrag = false

    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })
    game.update = function() {
       s.update()
    }
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, event)
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            log(x, y, 'drag')
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })
    s.draw = function() {
          // draw 背景
          game.context.fillStyle = "#554"
          game.context.fillRect(0, 0, 400, 300)
          // draw
          game.drawImage(paddle)
          game.drawImage(ball)
          // draw blocks
          for (var i = 0; i < blocks.length; i++) {
              var block = blocks[i]
              if (block.alive) {
                  game.drawImage(block)
              }
          }
          // draw labels
          game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = function() {
        if (window.paused) {
            return
        }
        ball.move()
        //判断游戏结束
        if (ball.y > paddle.y) {
            //跳转到游戏结束的场景
            var end = new EndScene(game)
            game.replaceScene(end)
            return 
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                if (intersectHorizontal(ball, block)) {
                    ball.反弹X()
                    console.log('反弹x')
                } else {
                    ball.反弹()
                    console.log("反弹y")
                }
                // 更新分数
                score += 100
            }
        }
    }

    blocks = loadLevel(game, 2)
    return s 
}
