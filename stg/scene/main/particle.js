class Particle extends GuaImage {
    constructor(game) {
        super(game, 'spark')
        this.game = game
        this.setup()
    }
    setup() {
        this.life = 8
    }
    draw() {
        super.draw()
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
}