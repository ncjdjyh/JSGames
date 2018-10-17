class GuaTransformImage extends GuaImage {
    constructor(game, name) {
        super(game, name)
    }
    __init() {
        this.flipX = false
        this.flipY = false
        this.rotate = 0
    }
    draw() {
        this.game.drawTransformImage(this)
    }
}