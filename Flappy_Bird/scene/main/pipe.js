class PipePair {
    constructor(game, x) {
        this.game = game
        this.x = x
        this.setup()
        this.__init()
    }
    setup() {
        this.up = {}
        this.down = {}
        //管道纵向间距
        this.pipeVertSpace = 150
    }
    __init() {
        var p1 = GuaTransformImage.new(this.game, 'pipe')
        var p2 = GuaTransformImage.new(this.game, 'pipe')
        p1.x = this.x
        p2.x = this.x
        p1.flipY = true
        this.up = p1
        this.down = p2
        this.generatePipeY()
    }
    transformX(x) {
        //log(this.up)
        this.up.x += x
        this.down.x += x
    }
    getX() {
        return this.up.x
    }
    getW() {
        return this.up.w
    }
    generatePipeY() {
        this.up.y = randomBetween(0, -200)
        this.down.y = this.up.y + this.up.h + this.pipeVertSpace
    }
    draw() {
        this.up.draw()
        this.down.draw()
    }
}

class Pipe {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.pipes = []
        //管道距离鸟的初始值
        this.initialDistance = 300
        //管道横向间距
        this.pipeHorizonSpace = 200
        //生成管道, 三列, 上下各一个
        for (let i = 0; i < 3; i++) {
            var pair = new PipePair(this.game, i * this.pipeHorizonSpace + this.initialDistance)
            this.pipes.push(pair)
        }
    }
    static new(game) {
        var i = new Pipe(game)
        return i
    }
    draw() {
        for (var p of this.pipes) {
            // log(p.up.x, p.down.x)
            p.draw()
        }
    }
    update() {
        this.pipeVertSpace = config.pipeVertSpace.value
        for (let i = 0; i < this.pipes.length; i++) {
            var p = this.pipes[i]
            p.transformX(-2)
            if (p.getX() < -50) {
                p.transformX(600)
                p.generatePipeY()
            }
        }
    }
}