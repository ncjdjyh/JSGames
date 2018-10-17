class GuaImage {
    constructor(game, name) {
        this.texture = game.imageByName(name)
        this.game = game
		this.enable = true
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        if (this.enable) {
            this.game.drawImage(this)
        }
    }
    update() {

    }
}
