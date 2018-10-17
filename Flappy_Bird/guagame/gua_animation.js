class GuaAnimation {
    //pics是一个存放动画图片的数组
    constructor(game, picsHolder) {
        this.picsHolder = picsHolder
        this.game = game
        this.x = 0
        this.y = 0
        this.__init()
    }
    static new(game, picsHolder) {
        var i = new this(game, picsHolder)
        return i
    }
    __init() {
        this.texture = this.picsHolder[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.index = 0
    }
    setDuration(duration) {
        this.duration = duration
        this.tempDuration = duration
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {
        //循环播放
        this.duration--
        if (this.duration == 0) {
            this.duration = this.tempDuration
            this.index = (this.index + 1) % this.picsHolder.length
            this.texture = this.picsHolder[this.index]
        }
    }
}

class GuaTransformAnimation extends GuaAnimation {
    constructor(game, picsHolder) {
        super(game, picsHolder)
        this.game = game
        this.picsHolder = picsHolder
        this.setup()
    }
    setup() {
        this.rotate = 0
        this.flipX = false
        this.flipY = false
    }
    draw() {
        this.game.drawTransformImage(this)
    }
}
