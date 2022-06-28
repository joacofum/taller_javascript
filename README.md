# Taller de javascript
## Primer commit
- Creación de carpetas para la vista y para los objetos. En vista se creó un index.html que contendrá el canvas (un rectángulo sobre el 
cual se podrá jugar al ping pong luego) y en la carpeta js se crearon los objetos que serán utilizados para que el juego funcione
correctamente. De momento se tiene un modelo llamado Board, una vista llamada BoardView y una especie de controlador en la función main donde se instancian los objetos.

## Segundo commit
- A lo anteriormente creado en el primer commit se le agrega la creación del objeto Barra (Bar). Se crearon los métodos up y down en la barra pero de momento están vacíos,
su funcionalidad será permitir que la barra se mueva hacia arriba o hacía abajo en el Canvas. Además se definió un método draw en BoardView que permite dibujar un elemento
en el Canvas dependiendo de qué tipo sea. Al utilizar esta función, de momento se crea la Barra en el Canvas, pero se sigue sin tener el objeto Bola (Ball) creado, es decir,
es nulo.

## Tercer commit
- A lo anteriormente mencionado se finalizaron las funciones up() y down(). Además se agregó un método toString() en Barra (Bar) para poder ver si las coordenadas de la barra
se están actualizando correctamente. Aunque las coordenadas se están actualizando, no se está volviendo a redibujar el canvas por lo que aunque se utilicen
las teclas de arriba y abajo del teclado, no se verá el resultado en pantalla.
Por último cabe destacar que al agregar un evento cuando se presione una tecla en el index.html, se tuvo que modificar "ev.KeyCode" ya que el atributo KeyCode se encuentra obsoleto. 
En este caso se utilizará "ev.key" para capturar la tecla que está presionando el usuario.

## Cuarto commit
- A lo anteriormente creado se agrega una función BoardView que se llama play, se encarga de ejecutar todo lo que tenga que ver conque el juego deba funcionar. En este caso tiene que
limpiar y tiene dibujar el Canvas. A futuro debe chequear la coalisión de Ball con las Barras. Se creo el objeto Ball y se dibuja este objeto en el Canvas.
Por último se agregó la funcionalidad de que se capturen las teclas del segundo jugador (segunda barra), se capturan las teclas "W" y "S".

