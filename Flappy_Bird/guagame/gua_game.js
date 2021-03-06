// 瓜
class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })
        this.init()
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    //这里的img是guaImage
    drawImage(img) {
        this.context.drawImage(img.texture, img.x, img.y)
    }
    drawTransformImage(img) {
        var ctx = this.context
        var x2 = img.w / 2
        var y2 = img.h / 2
        var warpX = x2 + img.x
        var warpY = y2 + img.y
        var flipX = img.flipX ? -1 : 1
        var flipY = img.flipY ? -1 : 1
        ctx.save()
        ctx.translate(warpX, warpY)
        ctx.scale(flipX, flipY)

        ctx.rotate(img.rotate * Math.PI / 180)
        ctx.translate(-x2, -y2)

        ctx.drawImage(img.texture, 0, 0)
        ctx.restore()
    }
    // update
    update() {
        window.fps = config.fps.value
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    //
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        // events
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    imageByName(name) {
        var g = this
        // log('image by name', g.images)
        var img = g.images[name]
        return img
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
      /*  setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)*/
      g.runloop()
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene) {
        this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function() {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后, 调用 run
                loads.push(1)
                log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
