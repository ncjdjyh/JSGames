class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        var i = new this(game, text)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, 100, 100)
    }
    increasingTextNumber() {
        this.text = new Number(this.text)
        this.text += 1
    }
}

//草地
class Grounds {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    setup() {
        this.skipCount = 4
        //创建小砖块
        this.numberOfGround = 2
        this.grounds = []
        for (let i = 0; i < this.numberOfGround; i++) {
            var ground = GuaImage.new(this.game, 'ground')
            ground.y = 540
            this.groundWidth = ground.w
            ground.x = i * ground.w
            this.grounds.push(ground)
        }
    }
    update() {
        this.skipCount--
        var offset = 5
        if (this.skipCount == 0) {
            offset = -15
            this.skipCount = 4
        }
        for (let i = 0; i < this.numberOfGround; i++) {
            var g = this.grounds[i]
            g.x -= offset
        }
    }
    draw() {
        for (let i = 0; i < this.numberOfGround; i++) {
            var g = this.grounds[i]
            this.game.drawImage(g)
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.setup()
    }
    setup() {
        this.grounds = Grounds.new(this.game)
        this.sky = GuaImage.new(this.game, 'sky')
        this.bird = Bird.new(this.game)
        this.pipe = Pipe.new(this.game)
        this.label = GuaLabel.new(this.game, '1')

        this.addElement(this.sky)
        this.addElement(this.bird)
        this.addElement(this.pipe)
        this.addElement(this.grounds)
        this.addElement(this.label)
    }
    draw() {
        super.draw()
    }
    update() {
        this.checkPlayerAttacked()
        this.passPipe()
        super.update()
    }
    passPipe() {
        for (var i = 0; i < this.pipe.pipes.length; i++) {
            var p = this.pipe.pipes[i]
            if (this.bird.x == p.getX() + p.getW()) {
                this.label.increasingTextNumber()
            }
        }
    }
    checkPlayerAttacked() {
        for (var i = 0; i < this.pipe.pipes.length; i++) {
            var p = this.pipe.pipes[i]
            if (rectIntersects(p.up, this.bird) ||
                rectIntersects(p.down, this.bird)) {
                var s = SceneEnd.new(this.game)
                this.game.replaceScene(s)
            }
        }
    }
}
