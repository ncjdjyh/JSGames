class Player extends GuaImage {
    constructor(game, scene) {
        super(game, 'player')
        this.game = game
        this.scene = scene
        this.speed = 10
        this.x = 200
        this.y = 500
        this.bullets = []
        this.coolDown = 5
		this.setUpInputs()
    }
	setUpInputs() {
		var s = this
		this.game.registerAction('a', function(){
            s.moveLeft()
		})
		this.game.registerAction('d', function(){
            s.moveRight()
		})
        this.game.registerAction('w', function(){
            s.moveUp()
        })
        this.game.registerAction('s', function(){
            s.moveDown()
        })
		this.game.registerAction('j', function(){
            s.fire()
		})
	}
    update() {
        this.speed = config.player_speed
        if (this.coolDown > 0) {
            this.coolDown--
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    fire() {
        if (this.coolDown == 0) {
            this.coolDown = 5
            var bullet = Bullet.new(this.game)
            bullet.initPosition(this.x + this.w / 2 - 5, this.y - 10)
            this.game.scene.addElement(bullet)
			this.bullets.push(bullet)
        }     
    }
}