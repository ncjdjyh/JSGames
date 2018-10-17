class Level {
    constructor(game) {
        this.game = game
        this.n = 0
        this.chapter = 0
        this.lengthOfLevel = levelConfig.length - 1
        this.setup()
    }
    setup() {
        this.lengthOfChapter = levelConfig[this.n].length - 1
        this.l = levelConfig[this.n][this.chapter]
        this.e0 = this.l.e0
        this.e1 = this.l.e1
        this.e2 = this.l.e2
        this.enable = true
        this.addEnemiesByType(this.e0)
        this.addEnemiesByType(this.e1)
        this.addEnemiesByType(this.e2)
    }
    draw() {
        this.enemies.map(e => e.draw())
    }
    update() {
        if (this.enemies.length == 0) {
            if (this.chapter == this.lengthOfChapter) {
                this.n++
                this.chapter = 0
                if (this.n > this.lengthOfLevel) {
                    var s = new SceneEnd(this.game)
                    this.game.replaceScene(s)
                    return
                }
            } else {
                this.chapter++
            }
            this.setup()
        }
        this.enemies.map(e => e.update())
    }
    addEnemiesByType(e) {
        if (e == null) return
        var els = []
        var self = this
        var type = e.type
        var enemy = null
        for (let i = 0; i < e.count; i++) {
            switch (type) {
                case 0: {
                    enemy = Enemy00.new(this.game)
                    break
                }
                case 1: {
                    enemy = Enemy01.new(this.game)
                    break
                }
            }
            els.push(enemy)
        }
        this.enemies = els
        log('enemies', els)
    }
}