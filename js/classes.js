class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image= new Image()
        this.image.src= imageSrc
        this.scale = scale
        this.framesMax= framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 15
        this.offset= offset
        }
    

    draw(){
        c.drawImage(this.image, 
                    this.framesCurrent * (this.image.width/this.framesMax),           
                    0,
                    this.image.width/this.framesMax,
                    this.image.height,
                    this.position.x - this.offset.x, 
                    this.position.y - this.offset.y, 
                    (this.image.width/this.framesMax)*this.scale, 
                    this.image.height*this.scale)
}

    animateFrames(){
        this.framesElapsed++

        if(this.framesElapsed%this.framesHold===0){
        if(this.framesCurrent < this.framesMax - 1){
        this.framesCurrent++
    }else{
        this.framesCurrent = 0
        }
        }

    }
    update(){
        this.draw()
        this.animateFrames()
    }
}

class Fighter extends Sprite{
    constructor({position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites, attackBox= {offset:{}, width: undefined, height: undefined}}){
        super({
            position,
            imageSrc, 
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            } ,
            offset: attackBox.offset,
            width: attackBox.width ,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking = false
        this.health= 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 15
        this.sprites=sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src= sprites[sprite].imageSrc
        }

        
    }



    update(){
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
            this.position.y = 330
        }
        else this.velocity.y += gravity
    }


    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.switchSprite('attack1');
        }
    }   

    switchSprite(sprite) {
        if (this.isAttacking && this.image === this.sprites.attack1.image && this.framesCurrent < this.framesMax - 1) {
            return;
        }
    
        if (this.image === this.sprites.attack1.image && this.framesCurrent >= this.framesMax - 1) {
            this.isAttacking = false;
        }
    
        switch (sprite) {
            case 'idle':
                if (!this.isAttacking && this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if (!this.isAttacking && this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}    