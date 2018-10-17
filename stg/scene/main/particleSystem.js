class ParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.duration = 15
        this.numberOfParticles = 20
        this.particles = []
        this.x = 150
        this.y = 200
        this.enable = true
    }
    initLocation(x, y) {
        this.x = x
        this.y = y
    }
    static new (game) {
        return new this(game)
    }
    draw() {
        for (var p of this.particles) {
            p.draw()
        }
    }
    update() {
        this.duration--
        if (this.duration <= 0) {
            //删除
            this.kill()
        }
        //添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = Particle.new(this.game)
            //设置初始化坐标
            var s = 4
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        //更新所有的小火花
        for (var p of this.particles) {
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    kill() {
        this.enable = false
    }
}