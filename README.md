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