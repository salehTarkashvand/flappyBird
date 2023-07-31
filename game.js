import {DEGREE} from "/utils.js" 
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
    draw : function(){
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x,this.y,this.w,this.h)
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
    }

}
var fg = {
    sx : 276 ,
    sy : 0 ,
    w  : 224 ,
    h  : 112 ,
    x  : 0 ,
    y  : can.height - 112 ,
    draw : function(){
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x,this.y,this.w,this.h)
      c.drawImage(sprite,this.sx,this.sy,this.w ,this.h ,this.x + this.w ,this.y,this.w,this.h)
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
debugger
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
            if (this.speed < this.jump) {
                this.rotation = DEGREE(-25)
                
            } else { 
                this.rotation = DEGREE(90)
            }
        }
        if (this.y + this.h/2 >= can.height - fg.h ) {
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
    }

}


function draw(){
    c.fillStyle = "#70c5ce"
    c.fillRect(0 , 0 , can.width , can.height)
    bg.draw()
    fg.draw()
    bird.draw()
    getReady.draw()
    gameOver.draw()
}
function update(){
    bird.update()

}
function animate(){
    update()
    draw()
    frames ++
    requestAnimationFrame(animate)
}
animate()