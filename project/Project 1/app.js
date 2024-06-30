const dropDown = document.getElementById("animations")
dropDown.addEventListener('change', function(e){
    playerState = e.target.value
})

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const playerImage = new Image()
playerImage.src =  'shadow_dog.png'
const spritWIdth = 575
const spritHeight = 523
let playerState = 'idle'
let gameFrame =0
const staggerFrames = 5 
const spritAnimations = []
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name:"jump",
        frames:7
    },
    {
        name:"fall",
        frames:7
    },
    {
        name:"run",
        frames:9
    },
    {
        name:"dizzy",
        frames:11
    },
    {
        name:"sit",
        frames:5
    },
    {
        name:"roll",
        frames:7
    },
    {
        name:"bite",
        frames:7
    },
    {
        name:"ko",
        frames:12
    },
    {
        name:"gethit",
        frames:4
    }
]
animationStates.forEach((state, index)=>{
    let frames = {
        loc:[],
    }
    for(let j=0; j<state.frames; j++){
        let positionx = j * spritWIdth 
        let positiony = index * spritHeight;
        frames.loc.push({x: positionx,y: positiony})
    }

    spritAnimations[state.name] = frames 
})
console.log(spritAnimations);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    let position = Math.floor(gameFrame/staggerFrames) % spritAnimations[playerState].loc.length
    let framex = spritWIdth * position
    let framey = spritAnimations[playerState].loc[position].y
    ctx.drawImage(playerImage ,framex ,framey ,spritWIdth ,spritHeight ,0 ,0 ,spritWIdth ,spritHeight )
    gameFrame++
    requestAnimationFrame(animate)
    console.log(position);
}


animate()