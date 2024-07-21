export const states = {
    STANDING_LEFT: 0 ,
    STANDING_RIGHT : 1,
}
class state{
    constructor(state){
        this.state = state
    }
}

export class standleft extends state {
    constructor(player){
        super('STANDING LEFT')
        this.player = player
    }
    enter(){
        this.player.framey = 1
    }
    handelinput(input){
        if(input ===  'PRESS right')this.player.setState(states.STANDING_RIGHT)
    }
}

export class standright extends state {
    constructor(player){
        super('STANDING RIGHT')
        this.player = player
    }
    enter(){
        this.player.framey = 0
    }
    handelinput(input){
        if(input ===  'PRESS left') this.player.setState(states.STANDING_LEFT)
    }
}