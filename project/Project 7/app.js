window.addEventListener('load' , function(){
    const canvas =  document.getElementById('canvas1')
    const ctx = canvas.getContext("2d")
    canvas.width = 1400
    canvas.height = 720
    let enemies = []
    let score = 0 
    let gameOver =false
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
                }else if (e.key === 'Enter' && gameOver)restartGame()
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
            this.gamewidth = gamewidth;
            this.gameheight = gameheight;
            this.width = 200
            this.height = 200
            this.x = 100
            this.y = this.gameheight - this.height
            this.image = document.getElementById('playerImage')
            this.framx = 0 
            this.maxframe = 8
            this.framy = 0
            this.speed = 0
            this.fbs = 20 
            this.frameTimer = 0
            this.frameInterval = 1000/this.fbs
            this.vy = 0
            this.weight = 1
        }
        restart(){
            this.x= 100
            this.y = this.gameheight - this.gamewidth
            this.maxframe = 8
            this.framy = 0
        }
        draw(context){
            context.drawImage(this.image, this.framx * this.width , this.framy * this.height , this.width , this.height , this.x , this.y , this.width , this.height)
        }
        update(input ,deltaTime , enemies){
            enemies.forEach(enemy => {
                const dx = enemy.x - this.x
                const dy = enemy.y - this.y
                const distance =  Math.sqrt(dx * dx + dy * dy)
                if(distance < enemy.width/2 + this.width/2){
                    gameOver = true
                }
            })

            if(this.frameTimer > this.frameInterval){
                if(this.framx >= this.maxframe) this.framx = 0
                else this.framx ++
                this.frameTimer = 0
            }else {
                this.frameTimer +=deltaTime
            }


            if (input.keys.indexOf('ArrowRight') > -1 ){
                this.speed = 5
            }else if (input.keys.indexOf('ArrowLeft') > -1 ){
                this.speed = -5
            }else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()){
                this.vy -= 32
            }
            else {
                this.speed = 0
            }

            this.x += this.speed
            if(this.x < 0 ) this.x = 0;
            else if (this.x > this.gamewidth - this.width) this.x = this.gamewidth - this.width

            this.y += this.vy
            if(!this.onGround()){
                this.vy += this.weight
                this.maxframe = 5
                this.framy = 1
            }else {
                this.maxframe =8
                this.vy = 0
                this.framy = 0
            }
            if(this.y > this.gameheight - this.height) this.y = this.gameheight - this.height
        }
        onGround(){
            return this.y >= this.gameheight - this.height
        }
    }

    class Background {
        constructor(gamewidth , gameheight){
            this.gamewidth = gamewidth
            this.gameheight = gameheight
            this.image = document.getElementById('background')
            this.x = 0
            this.y = 0
            this.width = 2400
            this.height = 720
            this.speed = 7
        }
        draw(context){
            context.drawImage(this.image , this.x , this.y , this.width , this.height)
            context.drawImage(this.image , this.x + this.width  - this.speed , this.y , this.width , this.height)

        }
        update(){
            this.x -= this.speed
            if(this.x < 0 - this.width) this.x = 0
        }
        restart(){
            this.x =0
        }
    }

    class Enemy {
        constructor(gamewidth , gameheight){
            this.gamewidth = gamewidth
            this.gameheight = gameheight 
            this.width = 160
            this.height = 119
            this.image = document.getElementById('enemy')
            this.x = gamewidth
            this.y = this.gameheight - this.height
            this.framex = 0  
            this.maxframe = 5
            this.fbs = 20 
            this.frameTimer = 0
            this.frameInterval = 1000/this.fbs
            this.speed = 8
            this.markedForDeletion = false
        }
        draw(context) {
            context.drawImage(this.image, this.framex * this.width , 0 , this.width , this.height ,  this.x , this.y , this.width , this.height)
        }
        update(deltaTime){
            if(this.frameTimer > this.frameInterval){
                if(this.framex >= this.maxframe)this.framex = 0
                else this.framex++
                this.frameTimer=0
            }else{
                this.frameTimer += deltaTime
            }
            this.x -= this.speed
            if(this.x < 0 - this.width){
                this.markedForDeletion = true
                score++
            }
        }
    }

    function handelEnemies(deltaTime){
        if(enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width ,canvas.height))
            randomEnemyInterval = Math.random() * 100 +500
            enemyTimer = 0
        } else {
            enemyTimer += deltaTime
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx)
            enemy.update(deltaTime)
        })
        enemies = enemies.filter(enemy => !enemy.markedForDeletion)
    }

    function displayStatusText (context) {
        context.textAlign = 'left'
        context.font = '40px Helvetica'
        context.fillStyle ='black'
        context.fillText ('score: '+ score ,20 , 50)
        context.fillStyle ='white'
        context.fillText ('score: '+ score ,22 , 52)
        if(gameOver){
            context.textAlign = 'center'
            context.fillStyle = 'black'
            context.fillText('Game over ,return agian ',canvas.width/2,200)
            context.fillStyle = 'white'
            context.fillText('Game over ,return agian ',canvas.width/2+2,202)
        }
    }

    function restartGame() {
        player.restart()
        background.restart()
        enemies = []
        score = 0 
        gameOver =false
        animate(0)
    }

    const input = new InputHandler()
    const player = new Player(canvas.width ,canvas.height)
    const background = new Background(canvas.width ,canvas.height)

    let lastTime = 0
    let enemyTimer = 0
    let enemyInterval = 1000 
    let randomEnemyInterval = Math.random() * 1000 +500

    function animate(timeStap) {
        const deltaTime = timeStap - lastTime
        lastTime = timeStap
        ctx.clearRect(0,0,canvas.width,canvas.height)
        background.draw(ctx)
        background.update()
        player.draw(ctx)
        player.update(input , deltaTime , enemies)
        handelEnemies(deltaTime)
        displayStatusText(ctx)
        if(!gameOver)requestAnimationFrame(animate)
    }
    animate(0)
})