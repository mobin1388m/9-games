document.addEventListener('DOMContentLoaded' , function(){
    const canvas =  document.getElementById('canvas1')
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height =800
    
    
    class Game{
        constructor(ctx , width , height){
            this.ctx = ctx
            this.width = width
            this.height = height
            this.enemies = [];
            this.enemyInterval = 1000 
            this.enemyTimer = 0
        }
        update(deltaTime){
            this.enemies = this.enemies.filter(Object => !Object.markedForDeletion)
            if(this.enemyTimer > this.enemyInterval){
                this.#addNewEnemy()
                this.enemyTimer = 0
                console.log(this.enemies);
            }else{
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(Object => Object.update())
        }
        draw(){
            this.enemies.forEach(Object => Object.draw(this.ctx))
        }
        #addNewEnemy(){
            this.enemies.push(new Worm(this))
        }
    }
    
    class Enemy{
        constructor(game){
            this.game = game
            this.markedForDeletion = false
        }
        update(){
            this.x-= this.speed;
            if(this.x < 0 - this.width) this.markedForDeletion = true
        }
        draw(ctx){
            ctx.drawImage(this.image , 0 , 0 , this.spritewidth , this.spriteheight , this.x , this.y , this.width , this.height)
        }
    }
     
    class Worm extends Enemy {
     constructor(game){
        super(game)
        this.spritewidth = 229
        this.spriteheight = 171
        this.image = worm 
        this.x = this.game.width
        this.y = Math.random() * this.game.height
        this.width = this.spritewidth / 2
        this.height = this.spriteheight / 2
        this.speed = Math.random() * 0.1 + 5
        this.frame = 0
     
     }

    }





    const game = new Game(ctx , canvas.width , canvas.height)    

    let lastTime = 1
    function animate(timeStap){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const deltaTime = timeStap - lastTime
        lastTime = timeStap
        game.update(deltaTime)
        game.draw()
        requestAnimationFrame(animate)
    }
    animate(0)
})