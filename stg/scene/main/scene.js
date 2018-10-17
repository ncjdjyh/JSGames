class Scene extends GuaScene {
    constructor(game) {
        super(game)
        //this.setup()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = Player.new(this.game, this)
        this.cloud = Cloud.new(this.game)
        this.level = new Level(this.game)

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.level)
        this.addElement(this.player)
    }
	draw() {
		super.draw()
	}
    update() {
        this.elements = this.filterEnable(this.elements)
        this.player.bullets = this.filterEnable(this.player.bullets)
        this.level.enemies = this.filterEnable(this.level.enemies)
		this.checkEnemyAttacked()
        this.checkPlayerAttacked()
        super.update()
    }
    filterEnable(o) {
        return o.filter(e => e.enable)
    }
	checkEnemyAttacked() {
		for (var i = 0; i < this.level.enemies.length; i++) {
			var e = this.level.enemies[i]
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
	checkPlayerAttacked() {
        //每个敌人的子弹是否击中玩家, 玩家是否碰到敌人
        var s = SceneEnd.new(this.game)
        for (var e of this.level.enemies) {
            if (rectIntersects(e, this.player)) {
                this.game.replaceScene(s)
            }
            for (var b of e.bullets) {
                if (b.collide(this.player)) {
                    this.game.replaceScene(s)
                }
            }
        }
    }
}
