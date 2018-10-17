class Cloud extends GuaImage {
    constructor(game) {
        super(game, 'cloud')
        this.setUp()
    }
    setUp() {
        this.x = 50
		this.y = 50
		this.speed = 1
    }
    update() {
        this.y += config.cloud_speed
        // this.y += this.speed
        if (this.y > 600) {1
            this.setUp()
        }
    }
}
