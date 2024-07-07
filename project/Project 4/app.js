/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 500
canvas.height = 700
const explosions = [] 
let canvasPosition = canvas.getBoundingClientRect()
class Explosion{
    constructor(x,y){
        this.x = x
        this.y = y
        this.spritewidth = 200
        this.spriteheight = 179
        this.width = this.spritewidth / 2
        this.height = this.spriteheight / 2 
        this.image = new Image()
        this.image.src = 'boom.png'
        this.frame = 0
        this.timer = 0
    }
    update(){
        this.timer++
        if(this.timer % 10 === 0){
            this.frame++
        }
    }
    draw(){
        ctx.drawImage(this.image, this.spritewidth * this.frame , 0 , this.spritewidth , this.spriteheight , this.x ,
             this.y , this.width , this.height)
    }
}

window.addEventListener('click' , function(e){
    let positionx = e.x - canvasPosition.left - 25
    let positiony = e.y - canvasPosition.top - 25
    explosions.push(new Explosion(positionx,positiony))
})

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i = 0 ; i < explosions.length ; i ++){
        explosions[i].update()
        explosions[i].draw()
    }
    requestAnimationFrame(animate)
}

animate()