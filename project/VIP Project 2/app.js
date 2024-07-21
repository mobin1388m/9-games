const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 800
canvas.height = 700
let timeToNextraven = 300
let birds = []
class Player{
    constructor(){
        this.image = new Image()
        this.image.src = 'image.jpg'
        this.spritewidth = 700
        this.spriteheight = 710
        this.width = this.spritewidth / 8
        this.height= this.spriteheight / 8
        this.x = Math.random() * 200
        this.y = Math.random() * 100
        this.framex  = 0
        this.framey = 0
        this.maxframe = 3
        this.timer = 0
    }
    update(){
        this.timer++
        if(this.timer % 10 ===0){
            this.framex++
        }
        if(this.framex === this.maxframe){
            this.framey = 1
            this.framex = 0
        }
        this.y++
        this.x++
    }
    draw(){
        ctx.drawImage( this.image, this.spritewidth * this.framex, this.spriteheight * this.framey , this.spritewidth, this.spriteheight, this.x, 
            this.y, this.width, this.height)
    }
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    if(timeToNextraven === 300){
        birds.push(new Player())
        timeToNextraven = 0
    }else{
        timeToNextraven++
    }
    birds.forEach(Object =>{
        Object.draw()
        Object.update()
    })
    requestAnimationFrame(animate)
}
animate()