//Modelo

//Tablero
(function () {
    self.Board = function(width, height){
            this.width = width;
            this.height = height;
            this.playing = false;
            this.game_over = false;
            this.bars = [];
            this.ball = null;
        }
    
    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }
})();

//Barras
(function(){
    self.Bar = function(x,y,width,height,board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.speed = 10;

        //indica de que forma geométrica es la barra para dibujarla en el canvas
        this.kind = "rectangle";
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + " y: " + this.y;
        }
    }
})();

//Vista
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        draw: function(){
            for(var i = this.board.elements.length -1; i >= 0; i--){
                var el = this.board.elements[i];
                //Dibujo el elemento.
                draw(this.ctx, el);
            }
        }
    }

    //Helpers methods (función fuera de una clase)
    //Función que dibuja algo en el canvas dependiendo de que tipo sea.
    function draw(ctx, element){
        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                //Si es cuadrado
                case "rectangle":
                    ctx.fillRect(element.x, element.y, element.width, element.height);
                    break;
            }
        }      
    }
})();

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);

document.addEventListener("keydown", function(ev){
    if(ev.key == "ArrowUp"){
        bar.up();
    }else if(ev.key = "ArrowDown"){
        bar.down();
    }
    console.log("" + bar);
});

self.window.addEventListener("load", main);

//Controlador
function main(){
    board_view.draw();
}