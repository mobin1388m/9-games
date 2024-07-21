export default class InputHandler{
    constructor(){
        this.lastkey = ''
        window.addEventListener('keydown' , (e) =>{
            switch(e.key){
                case "ArrowLeft" :
                    this.lastkey = "PRESS left"
                    break
                case "ArrowRight":
                    this.lastkey = "PRESS right"
                    break
            }
        })
        window.addEventListener('keyup' , (e) =>{
            switch(e.key){
                case "ArrowLeft" :
                    this.lastkey = "RELLEASE left"
                    break
                case "ArrowRight":
                    this.lastkey = "RELLEASE right"
                    break
            }
        })
    }
}