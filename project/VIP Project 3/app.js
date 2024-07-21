const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 700

class InputHandler {
    constructor(){
        this.keys = []
        this.touchy =''
        this.touchTreshold = 30
        window.addEventListener("keydown", e =>{
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') &&
                this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key) 
            }
        })
        window.addEventListener("keyup", e =>{
            if((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') ){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        }) 
    }
}

class Player {
    constructor(gamewidth , gameheight){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.spritewidth = 1000
        this.spriteheight = 1000
        this.width = this.spritewidth / 4
        this.height = this.spriteheight /4
        this.image = new Image()
        this.image.src = 'image.png'
        this.sound = new Audio()
        this.sound.src = 'step.flac'
        this.x = 0
        this.y = canvas.height - this.width
        this.framex = 0
        this.framey = 1
        this.maxframe = 4
        this.timer = 0
        this.speed = 0
        this.vy = 0

    }
    draw(){
        ctx.drawImage( this.image, this.spritewidth * this.framex, this.spriteheight * this.framey , this.spritewidth, this.spriteheight, this.x, 
            this.y, this.width, this.height)
    }
    update(input){
        this.timer++
        if(this.timer % 10 ===0){
            this.framex++
            this.sound.play()
        }
        
        this.x += this.speed
        if (this.x > this.gamewidth - this.width) this.x = this.gamewidth - this.width
        if(this.framex === this.maxframe){
            this.framex = 0
            this.framey = 1
        }

        if (input.keys.indexOf('ArrowRight') > -1 ){
            this.speed = 5
        }else if (input.keys.indexOf('ArrowLeft') > -1 ){
            this.speed = -5
        }else if (input.keys.indexOf('ArrowUp') > -1 ){
            this.framex = 0
        }
        else {
            this.speed = 0
        }
        

    }
}
class Background {
    constructor(gamewidth , gameheight){
        this.gamewidth = gamewidth
        this.gameheight = gameheight
        this.image = new Image()
        this.image.src = 'background.jpg'
        this.x = 0
        this.y = 0
        this.width = 2400
        this.height = 720
        this.speed = 6
    }
    draw(context){
        context.drawImage(this.image , this.x , this.y , this.width , this.height)
        context.drawImage(this.image , this.x + this.width  - this.speed , this.y , this.width , this.height)

    }
    update(input){
        this.x -= this.speed
        if(this.x < 0 - this.width) this.x = 0
        if (input.keys.indexOf('ArrowUp') > -1 ){
            this.x = 0
        }
    }
}

// class Enemy{
//     constructor(){
//         this.width = 23
//         this.height = 43
//         this.x = 0
//         this.y = 0
//         this.image = new Image()
//         this.image.src = 'enemy.png'
//         this.frame = 0
//         this.timer= 0
//         this.maxframe =  4
//     }
//     draw(){
//         ctx.drawImage( this.image, this.width * this.frame, 0, this.width, this.height, this.x, 
//             this.y, this.width, this.height)
//     }
//     update(){
//         this.timer++
//         if(this.timer % 7 ===0){
//             this.frame++
//         }
//         if(this.frame === this.maxframe){
//             this.frame=0
//         }
//     }
// } 

const input = new InputHandler()
const player = new Player(canvas.width ,canvas.height)
const background = new Background(canvas.width ,canvas.height)
// const enemy =new Enemy()

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    background.draw(ctx)
    background.update(input)
    player.draw()
    player.update(input)
    // enemy.draw()
    // enemy.update()
    requestAnimationFrame(animate)
}
animate()