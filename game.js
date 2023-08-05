import {DEGREE , getRandomNumberBytowNumber} from "/utils.js" 
// add canvas 

var can = document.getElementById("mycanvas");
var c = can.getContext("2d");

var frames = 0 ;

var sprite = new Image()
sprite.src = "img/sprite.png"

var state = {
    current : 0 ,
    getReady : 0 ,
    game : 1 ,
    over : 2
}

// add click handler for state

function clickHandler () {
    switch (state.current) {
        case state.getReady:
            state.current = state.game
            break;
    
        case state.game:
            bird.flap()
            break;
    
        default:
            bird.rotation = 0 ;
            bird.speed = 0 ;
            pipes.position = []
            state.current = state.getReady
            break;
    }    
}
document.addEventListener("click",clickHandler)
document.addEventListener("keydown" , (e)=>{
 if (e.which == 32) {
    clickHandler()
 }
})

var bg = {
    sx : 0 ,
    sy : 0 ,
    w  : 275 ,
    h  : 226 ,
    x  : 0 ,
    y  : can.height - 226 ,
    dx : 2 ,
    draw : function(){
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x ,this.y,this.w,this.h)
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
      
    },
    update :function(){
       
        if (frames % 10 == 0 && state.current !== state.over ) {
            bg.x = (bg.x - this.dx)  % (this.w/2)
        }
                
    }

}

var pipes = {
    top :{
        sX : 553,
        sY : 0
    },
    bottom:{
        sX : 502,
        sY : 0
    },
    w : 53,
    h : 400,
    dx : 2,
    gap : 80,
    position : [],
    maxYPos : -150 ,
    draw : function() {
        for (let i = 0; i < this.position.length ; i++) {
            let p = this.position[i];

            let topYPos = p.y ;
            let bottomYPos = p.y + this.h + this.gap;

            c.drawImage(sprite,this.top.sX,this.top.sY,this.w ,this.h ,p.x,topYPos,this.w,this.h)
            c.drawImage(sprite,this.bottom.sX,this.bottom.sY,this.w ,this.h ,p.x,bottomYPos,this.w,this.h)
                    
           }
        
    },
    upadte : function() {
        if(state.current != state.game ){return};
        if(frames % 100 == 0){
            this.position.push({
                x : can.width ,
                // y :this.maxYpose * getRandomNumberBytowNumber(-150,1)
                y : this.maxYPos * (Math.random()+1)
        })
    }
        for (let i = 0; i < this.position.length ; i++) {
        let p = this.position[i];
            p.x -= this.dx
            let bottomPipesPosition = p.y + this.h + this.gap ;
        if (bird.x + bird.redius > p.x &&
             bird.x - bird.redius < p.x + this.w &&
              bird.y - bird.redius < p.y + this.h &&
               bird.y +bird.redius > p.y  ) {

                state.current = state.over
            
        }
        if (bird.x + bird.redius > p.x &&
             bird.x - bird.redius < p.x + this.w &&
              bird.y - bird.redius < bottomPipesPosition + this.h &&
               bird.y +bird.redius > bottomPipesPosition  ) {

                state.current = state.over
            
        }
        if (p.x + this.w <= 0) {
            pipes.position.shift()
            
        }
        

        }
                
    }
}
var fg = {
    sx : 276 ,
    sy : 0 ,
    w  : 224 ,
    h  : 112 ,
    x  : 0 ,
    y  : can.height - 112 ,
    dx : 2 ,
    draw : function(){
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x,this.y,this.w,this.h)
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
    },
    update :function(){
        if (state.current == state.game ) {
            fg.x = (fg.x - this.dx) % (this.w/2)            
        }
    }

}
var getReady = {
    sx : 0 ,
    sy : 228 ,
    w  : 173 ,
    h  : 152 ,
    x  : can.width/2 - 173/2 ,
    y  : 80,
    draw : function(){
        if (state.current == state.getReady) {
            c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x,this.y,this.w,this.h)
        }
      
      // c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
    }

}
var gameOver = {
    sx : 175 ,
    sy : 228 ,
    w  : 225 ,
    h  : 202 ,
    x  : can.width/2 - 228/2 ,
    y  : 90,
    draw : function(){
        if (state.current == state.over) {
            c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x,this.y,this.w,this.h)
        }
     
      // c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
    }

}

var score = {
    best : 0 ,
    value : 0 ,
    draw : function () {
        c.fillStyle = "#FFF";
        c.strokeStyle = "#000"
        
        if (state.current == state.game) {
            c.lineWidth = 2 ,
            c.font = "25px IMPACT"

            c.fillText(this.value , can.width/2 , 50)
            c.strokeText(this.value , can.width/2 , 50)
            
        } else if (state.current == state.over){
            c.font = "25px IMPACT"

            c.fillText(this.value , 225 , 186)
            c.strokeText(this.value , 225 , 186)
            
            c.fillText(this.best , 225 , 228)
            c.strokeText(this.best , 225 , 228)
            
        }
        
        
    }
}


var bird = {
    animation : [
        {sx : 276,sy : 112},
        {sx : 276,sy : 139},
        {sx : 276,sy : 164},
        {sx : 276,sy : 139}
    ]
    ,
    w  : 34 ,
    h  : 26 ,
    x  : 50 ,
    y  : 150 ,
    speed : 0 ,
    gravity : 0.25 ,
    jump : 4.6,
    rotation : 0 ,
    animationIndex : 0 ,
    redius : 12 ,
    draw : function(){
        var bird = this.animation[this.animationIndex]
        c.save();
        c.translate(this.x , this.y)
        c.rotate(this.rotation)
        c.drawImage(sprite,bird.sx,bird.sy,this.w ,this.h , -this.w/2 ,-this.h/2,this.w,this.h)
        c.restore()
      // c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
    },
    update : function(){
        var period = state.current == state.getReady ? 10 : 5 ;
        this.animationIndex += frames % period == 0 ? 1 : 0 ;
        this.animationIndex = this.animationIndex % this.animation.length
        
        if (state.current == state.getReady) {
            this.y = 150
            
        } else {
            this.speed += this.gravity
            this.y += this.speed
            // this.x += this.speed
            if (this.speed < this.jump) {
                this.rotation = DEGREE(-25)
                
            } else { 
                this.rotation = DEGREE(90)
            }
    
        }
        if (this.y + this.h/2 >= can.height - fg.h) {
            this.y = can.height - fg.h - this.h/2
            this.animationIndex = 0;

            if (state.current == state.game) {
                state.current = state.over  
    
            }
        }
        
    }
    ,
    flap : function(){
        this.speed = - this.jump ;
        // this.x += this.jump + 10
    }

}


function draw(){
    c.fillStyle = "#70c5ce"
    c.fillRect(0 , 0 , can.width , can.height)
    bg.draw()
    pipes.draw()
    fg.draw()
    bird.draw()
    getReady.draw()
    gameOver.draw()
    score.draw()
}
function update(){
    bird.update()
    fg.update()
    bg.update()
    pipes.upadte()

}
function animate(){
    update()
    draw()
    frames ++
    requestAnimationFrame(animate)
}
animate()