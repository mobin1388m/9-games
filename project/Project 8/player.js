import { standleft , standright } from "./state.js"
export default class Player {
    constructor(gameWidth , gameHeight){
        this.gamewidth = gameWidth
        this.gameheight = gameHeight
        this.states = [new standleft(this), new standright(this)]
        this.currentstate= this.states[0]
        this.width = 200
        this.height = 181.3
        this.image = document.getElementById('dogImage')
        this.x = this.gamewidth/2 - this.width/2
        this.y = this.gameheight - this.height
        this.framex = 0
        this.framey = 0
    }
    draw(context){
        context.drawImage(this.image , this.width * this.framex , this.height * this.framey , this.width, this.height , this.x , this.y , this.width , this.height , this.x , this.y)
    }
    update(input){
        this.currentstate.handelinput(input)
    }
    setState(state){
        this.currentstate = this.states[state]
        this.currentstate.enter()
    }
}