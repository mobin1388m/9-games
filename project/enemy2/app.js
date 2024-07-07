/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 1000
const numberOfEnemies = 20
const enemiesArray = []


let gameframe = 0


class Enemy {
    constructor(numberImage){
        numberImage 
        this.image =new Image()
        this.image.src = `enemy${numberImage}.png`,
        this.speed = Math.random() * 4 + 1 ;
        this.spritwidth = 266,
        this.spritheight =188,
        this.width = this.spritwidth / 2.5 ,
        this.height = this.spritheight / 2.5;
        this.x = Math.random()* (canvas.width - this.width),
        this.y = Math.random() * (canvas.height - this.height)
        this.frame = 0
        this.flapspeed = Math.floor(Math.random() * 3 + 1)
        this.angel = 0
        this.angelspeed = Math.random() * 0.2
        this.curve = Math.random () *7
    }
    update(){
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angel);
        this.angel += 0.05
        if ( this.x + this.width < 0) this.x= canvas.width;
        if(gameframe % this.flapspeed === 0){
            this.frame>4 ?this.frame=0: this.frame++;
        }
    }
    draw(){
        ctx.drawImage( this.image, this.frame* this.spritwidth, 0, this.spritwidth, this.spritheight, this.x, 
            this.y, this.width, this.height)
    }
}

for(let i = 0 ; i < numberOfEnemies ; i ++){
    enemiesArray.push(new Enemy (2))
}


function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    enemiesArray.forEach(enemy => {
        enemy.update()
        enemy.draw()
    })
    gameframe++
    requestAnimationFrame(animate)
}
animate()