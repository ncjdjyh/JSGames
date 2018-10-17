class Bullet extends GuaImage {
    //position是一个存放位置的对象{x: x, y: y}
    constructor(game) {
        super(game, 'bullet')
        this.setUp()
    }
    setUp() {
        this.speed = 4
    }
    initPosition(x, y) {
        this.x = x
        this.y = y
    }
    initSpeed(speed) {
        this.speed = speed
    }
    update() {
        if (this.y < 0 || this.y > 600) {
            this.enable = false
        }
        this.y -= this.speed
    }
    kill() {
        this.enable = false
    }
    collide(b) {
        return this.enable && b.enable && (rectIntersects(this, b) || rectIntersects(b, this))
    }
}

