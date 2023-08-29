const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = innerHeight;
canvas.width = innerWidth;

// canvas settings
ctx.fillStyle= 'white';
ctx.strokeStyle = 'white';

// particle blue print 
class Particle{
    constructor(effect){
        this.effect = effect;
        this.x = Math.floor(Math.random() * this.effect.width);
        this.y = Math.floor(Math.random() * this.effect.height);
        this.history = [{x:this.x,y:this.y}];
        this.speedX;
        this.speedY;
        this.speedModifier = Math.floor(Math.random() * 5 + 1);
        this.maxLength = Math.floor(Math.random()*200 + 10);
        this.timer = this.maxLength * 2;
        this.angle = 0;
    }
    draw(context){
        context.beginPath();
        context.moveTo(
            this.history[0].x,
            this.history[0].y
            );
        for (let c = 0; c < this.history.length; c++) {
            context.lineTo(this.history[c].x,this.history[c].y);    
        }
        context.stroke()
    }
    update(){
        this.timer--;
        
        if (this.timer >= 1) {
            let x = Math.floor(this.x / this.effect.cellSize); 
            let y = Math.floor(this.y / this.effect.cellSize); 
            let index = y * this.effect.cols + x;
            this.angle = this.effect.flowField[index];
            
            this.speedX = Math.cos(this.angle);
            this.speedY = Math.sin(this.angle);
            this.x += this.speedX * this.speedModifier;
            this.y += this.speedY * this.speedModifier;

            this.history.push({x:this.x,y:this.y})
            if (this.history.length > this.maxLength) {
                this.history.shift()
            }

        }else if (this.history.length > 1) {
            this.history.shift()
        }else{
            this.reset()
        }

    }
    reset(){
        this.x = Math.floor(Math.random()* this.effect.width);
        this.y = Math.floor(Math.random()* this.effect.height);
        this.history = [{x:this.x,y:this.y}]
        this.timer = this.maxLength * 2;
        
    }
    
}
// effect blue print
class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        // array to store particles
        this.particle = [];
        // amount of particles to display
        this.particlesAmount = 385;
        // create cell 
        this.cellSize = 10;
        this.rows;
        this.cols;
        this.flowField = [];
        // curve and zoom property
        this.curve = 3;
        this.zoom = .35;
        // initalize 
        this.init()
        // debug mode
        this.debug = false

        // adding event listener
        window.addEventListener('keydown',e=>{
            if (e.key === 'd') this.debug = !this.debug;
        })
        window.addEventListener('resize',e=>{
            this.resize(e.target.innerWidth,e.target.innerHeight);
        })

    }
    init(){
        // create flow field
        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle)
            }
        }
        // create particles
        this.particle = [];
        for (let i = 0; i < this.particlesAmount; i++) {
            this.particle.push(new Particle(this))
        }
    }
    drawGrid(context){
        context.save()
        context.lineWidth= .3
        for (let a = 0; a < this.cols; a++) {
            context.beginPath();
            context.moveTo(this.cellSize * a , 0);
            context.lineTo(this.cellSize * a,this.height);
            context.stroke()
        }
        for (let a = 0; a < this.cols; a++) {
            context.beginPath();
            context.moveTo(0, this.cellSize * a);
            context.lineTo(this.width,this.cellSize * a);
            context.stroke()
        }
        context.restore()
        console.log('re');
    }
    resize(width,height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }
    render(context){
        if (this.debug) this.drawGrid(context);
        this.particle.forEach(e=>{
            e.draw(context);
            e.update();
        })
    }

}

const effect = new Effect(canvas);

const animation = ()=>{
    ctx.clearRect(0,0,innerWidth,innerHeight)
    effect.render(ctx)
    requestAnimationFrame(animation);
}
animation()