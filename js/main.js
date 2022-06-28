//Modelo

//Tablero
(function () {
    self.Board = function (width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
        this.playing = false;
    }

    self.Board.prototype = {
        get elements() {
            //Genero una copia del arreglo de barras.
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();

//Bola
(function(){
    self.Ball = function(x, y, radius, board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.board = board;

        //Si dirección es igual a -1 se mueve hacia la izquierda.
        //Si es igual a 1 se mueve hacia la derecha.
        this.direction = 1;

        board.ball = this;
        this.kind = "circle";
    
    }

    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y * this.direction);
        }
    }
})();

//Barras
(function () {
    self.Bar = function (x, y, width, height, board) {
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
        down: function () {
            this.y += this.speed;
        },
        up: function () {
            this.y -= this.speed;
        },
        toString: function () {
            return "x: " + this.x + " y: " + this.y;
        }
    }
})();


//Vista
(function () {
    self.BoardView = function (canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function(){
            this.ctx.clearRect(0, 0, board.width, board.height)
        },
        draw: function () {
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                //Dibujo el elemento.
                draw(this.ctx, el);
            }
        },
        play: function(){
            //Si playing == true (si el usuario está jugando)
            if(this.board.playing){
                this.clean();
                this.draw();
                this.board.ball.move();
            }
        }
        
    }

    //Helpers methods (función fuera de una clase)
    //Función que dibuja algo en el canvas dependiendo de que tipo sea.
    function draw(ctx, element) {
        switch (element.kind) {
            //Si es cuadrado
            case "rectangle":
                ctx.fillRect(element.x, element.y, element.width, element.height);
                break;
            //Si es círculo
            case "circle":
                ctx.beginPath();
                ctx.arc(element.x, element.y, element.radius, 0, 7);
                ctx.fill();
                ctx.closePath();
                break;
        }
    }
})();

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar2 = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);


document.addEventListener("keydown", function (ev) {
    if (ev.key == "ArrowUp") {
        ev.preventDefault();
        bar.up();
    } else if (ev.key == "ArrowDown") {
        ev.preventDefault();
        bar.down();
    } else if (ev.key == "w") {
        ev.preventDefault();
        bar2.up();
    } else if (ev.key == "s") {
        ev.preventDefault();
        bar2.down();
    } else if (ev.key == " "){
        ev.preventDefault();
        //funciona como toggle.
        board.playing = !board.playing;
    }
});

//Dibujo los elementos en el canvas porque si no lo hago no se muestra nada,
//ya que por defecto playing es igual a false.
board_view.draw();

window.requestAnimationFrame(controller);

//Controlador
function controller() {
    window.requestAnimationFrame(controller);
    board_view.play();
   
}