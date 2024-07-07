const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const collisionsCnvas = document.getElementById('collisionsCnvas')
const collisionsCtx = collisionsCnvas.getContext('2d')
collisionsCnvas.width = window.innerWidth
collisionsCnvas.height = window.innerHeight

let timeToNextraven = 0
let ravenInterval = 500
let lastTime = 0
let ravens = []

let score = 0
ctx.font = "50px Impact"

class Raven {
    constructor(){
        this.image = new Image()
        this.image.src = 'raven.png'
        this.spritewidth = 271
        this.spriteheight = 194
        this.sizeModifier = Math.random() * 0.6 + 0.4
        this.width = this.spritewidth * this.sizeModifier
        this.height = this.spriteheight * this.sizeModifier
        this.height = 50
        this.x = canvas.width
        this.y = Math.random() * canvas.height - this.height
        this.directionx = Math.random() * 5 + 3
        this.directiony = Math.random() * 5 - 2.5
        this.markedForDeletion = false
        this.frame = 0
        this.maxframe = 4
        this.timesinceflap = 0
        this.framelapIntervall = Math.random() * 50 +50
        this.randomColors = [Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)]
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2]+ ')' ;

    }
    update(deltatime){
        this.x -= this.directionx;
        this.y += this.directiony
        if(this.y < 0 || this.y > canvas.height - this.height){
            this.directiony = this.directiony * -1
        }
        if(this.x < 0 - this.width ) this.markedForDeletion = true;

        this.timesinceflap+= deltatime
        if(this.timesinceflap > this.framelapIntervall){
            if(this.frame > this.maxframe) this.frame = 0
            else this.frame++
            this.timesinceflap=0
        }

    }
    draw(){
        collisionsCtx.fillStyle = this.color;
        collisionsCtx.fillRect(this.x ,this.y , this.width , this.height)
        ctx.drawImage(this.image,this.frame * this.spritewidth , 0 , this.spritewidth , this.spriteheight , this.x , this.y , this.width ,  this.height)
    }
}
const explosions = [] 

class Explosion{
    constructor(x,y,size){
        this.image = new Image()
        this.image.src = 'boom.png'
        this.spritewidth = 200
        this.spriteheight = 179
        this.size = size
        this.x = x
        this.y = y
        this.frame = 0
        this.sound = new Audio()
        this.sound.src = 'Fire impact 1.wav' 
        this.timeSinceLastFrame = 0
        this.frameInterval =  200
        this.markedForDeletion = false
    }
    update(deltatime){
        if (this.frame === 0) this.sound.play()
        this.timeSinceLastFrame+= deltatime
        if(this.timeSinceLastFrame > this.frameInterval){
            this.frame++
            if(this.frame> 5 ) this.markedForDeletion = true;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.spritewidth * this.frame , 0 , this.spritewidth , this.spriteheight , this.x ,
             this.y , this.size , this.size)
    }
}




function drawScore(){
    ctx.fillStyle = 'black'
    ctx.fillText('score:' + score,50,75)
    ctx.fillStyle = 'white'
    ctx.fillText('score:' + score,55,80)
}


window.addEventListener('click',function(e) {
    const detecPixelColor =collisionsCtx.getImageData(e.x,e.y,1,1)
    console.log(detecPixelColor);
    const pc = detecPixelColor.data
    ravens.forEach(Object => {
        if(Object.randomColors[0] === pc[0] && Object.randomColors[1] === pc[1] && Object.randomColors[2] === pc[2]){
            
            Object.markedForDeletion = true
            score++
            explosions.push(new Explosion(Object.x,Object.y,Object.width))
            console.log(explosions)
        }
            
        })
})



function animate(timestamp){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    collisionsCtx.fillRect(0,0, canvas.width, canvas.height)

    let deltatime = timestamp - lastTime
    lastTime = timestamp
    timeToNextraven += deltatime
    if(timeToNextraven > ravenInterval){
        ravens.push(new Raven())
        timeToNextraven=0
    };
    drawScore();
    [...ravens, ...explosions].forEach( Object => Object.update(deltatime));
    [...ravens, ...explosions].forEach( Object => Object.draw())
    ravens = ravens.filter(Object => !Object.markedForDeletion)
    // explosions = explosions.filter(Object => !Object.markedForDeletion)


    requestAnimationFrame(animate)
}
animate(0)