class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
        this.elements.map(e => {e.draw && e.draw()})
    }
    update() {
        this.elements.map(e => {e.update && e.update()})
    }
    addElement(el) {
         el.scene = this
        this.elements.push(el)
    }
}
