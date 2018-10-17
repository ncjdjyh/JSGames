class BaseEnemy extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.__init()
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 150)
        this.addBullets()
    }
    __init() {
        this.initTimeGap(40)
        this.bullets = []
        this.speed = randomBetween(2, 5)
    }
    initTimeGap(gap) {
        this.initialTimeGap = gap
        this.bulletsTimeGap = gap
    }
    addBullets() {
        var bullet = Bullet.new(this.game, 'bullet')
        bullet.initPosition(this.x + this.w / 2 - 5, this.y + this.h)
        bullet.initSpeed(-(this.speed + 2))
        this.bullets.push(bullet)
        //log(this.game)
        this.game.scene.addElement(bullet)
    }
    update() {
        this.updateBullets()
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    updateBullets() {
        this.bulletsTimeGap--
        if (this.bulletsTimeGap == 0) {
            this.addBullets()
            this.bulletsTimeGap = this.initialTimeGap
        }
    }
    kill() {
        this.enable = false
    }
}

class Enemy00 extends BaseEnemy {
    constructor(game) {
        super(game, 'enemy00')
    }
    update() {
        super.update()
    }
}

class Enemy01 extends BaseEnemy {
    constructor(game) {
        super(game, 'enemy01')
        this.setup()
    }
    setup() {
        this.initTimeGap(20)
        this.speed = randomBetween(2, 5)
        var random = randomBetween(0, 4)
        var x = 0
        random >= 2 ? x = -50 : x = 450
        this.initX = x
        this.x = x
        this.y = randomBetween(0, 150)
    }
    update() {
        this.updateBullets()
        var s = this.speed
        //log (this.x)
        if (this.initX < 0) {
            this.x += s
        } else {
            this.x -= s
        }
        if (this.x > 450 || this.x < -50) {
            this.setup()
        }
    }
}

