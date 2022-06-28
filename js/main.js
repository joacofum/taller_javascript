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

        //Ángulo de rebote
        this.bounce_angle = 0;

        //Máximo ángulo de rebote
        this.max_bounce_angle = Math.PI / 12;

        this.speed = 3;

        board.ball = this;
        this.kind = "circle";
    
    }

    self.Ball.prototype = {
        move: function(){
            this.x += (this.speed_x * this.direction);
            this.y += (this.speed_y * this.direction);
        },
        collision: function(bar){
            //Reacciona a la colisión con una barra que se recibe como parámetro.
            //Calcular el ángulo en el que va a moverse la pelota, cambiar la dirección dependiendo la barra.
            var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if (this.x > (this.board.width / 2)) {
                this.direction = -1;
                this.speed += 1;
            }else {
                this.direction = 1;
                this.speed += 1;
            }
        },
        get width(){
            return this.radius * 2;
        },
        get height(){
            return this.radius * 2;
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
                this.check_collisions();
                this.board.ball.move();
            }
        },
        check_collisions: function(){
            for (var i = this.board.bars.length -1; i >= 0; i--){
                var bar = this.board.bars[i];
                if(hit(bar, this.board.ball)){
                    this.board.ball.collision(bar);
                }
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

    //Otro helper para chequear si la pelota choca contra la barra.
    function hit(a, b) {
        //Revisa si a colisiona con b
        var hit = false;

        //Colisiones horizontales
        if (b.x + b.width >= a.x && b.x < a.x + a.width) {
            //Colisiones verticales
            if (b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }

        //Colisión de a con b
        if (b.x <= a.x && b.x + b.width >= a.x + a.width) {

            if (b.y <= a.y && b.y + b.height >= a.y + a.height)
                hit = true;
        }

        //Colision de b con a
        if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
            if (a.y <= b.y && a.y + a.height >= b.y + b.height)
                hit = true;
        }
        return hit;
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