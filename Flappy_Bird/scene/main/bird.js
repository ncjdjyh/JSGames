class Bird extends GuaTransformAnimation {
    constructor(game) {
        var picsHolder = []
        //应该放到配置文件中自动获取
        var birdsAnimationPic =
            [
                'bird_up',
                'bird_mid',
                'bird_down',
            ]
        for (let i = 0; i < birdsAnimationPic.length; i++) {
            var name = birdsAnimationPic[i]
            var img = game.imageByName(name)
            picsHolder.push(img)
        }
        super(game, picsHolder)
        this.game = game
        this.setup()
        this.setupInputs()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.offset = 0
        //设置动画的快慢
        this.setDuration(10)
        this.x = 100
        this.y = 100
        //设置重力, 加速度
        this.gt = 10
        this.factor = 0.1
        this.vt = 2
    }
    draw() {
        super.draw()
    }
    update() {
        super.update()
        this.move(this.offset)
        //更新角度
        if (this.rotate < 45) {
            this.rotate += 5
        }
        //更新受力
        this.vt += this.gt * this.factor
        this.y += this.vt
        if (this.y > 510) {
            this.y = 510
        }
    }
    jump() {
        this.vt = -10
        this.rotate = -45
    }
    move(dis) {
        this.x += dis
    }
    setupInputs() {
        var self = this
        this.game.registerAction('k', function() {
            self.jump()
        })
        this.game.registerAction('a', function() {
            self.offset = -2
            self.flipX = true
        })
        this.game.registerAction('d', function() {
            self.offset = 1
            self.flipX = false
        })
    }
}