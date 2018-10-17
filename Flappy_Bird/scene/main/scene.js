class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setUp()
    }
    setUp() {
        this.bg = GuaImage.new(this.game, 'sky')
        this.numberOfEnemies = 20
        this.player = Player.new(this.game, this)
        this.cloud = Cloud.new(this.game)
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)

        this.addEnemies()
    }
	draw() {
		super.draw()
	}
    update() {
        //筛选出还存在的元素
        this.elements = this.filterEnable(this.elements)
        this.player.bullets = this.filterEnable(this.player.bullets)
        this.enemies = this.filterEnable(this.enemies)
		this.enemyAttacked()
        super.update()
    }
    addEnemies() {
        var els = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            var el = Enemy.new(this.game)
            this.addElement(el)
            els.push(el)
        }
        this.enemies = els
    }
    filterEnable(o) {
        return o.filter(e => e.enable)
    }
	enemyAttacked() {
		for (var i = 0; i < this.enemies.length; i++) {
			var e = this.enemies[i]
			for (var j = 0; j < this.player.bullets.length; j++) {
				var b = this.player.bullets[j]
				if (b.collide(e)) {
                    var ps = ParticleSystem.new(this.game)
                    ps.initLocation(b.x, b.y)
                    this.addElement(ps)
					e.kill()
                    b.kill()
				}
			}
		}
	}
}
