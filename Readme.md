Links para las solicitudes
http://localhost:3000/apiF/residents
http://localhost:3000/apiN/residents

Con el Flyweight y el pool de conexiones, tu API se volverá más eficiente y reducirá la carga innecesaria de crear y destruir conexiones repetidamente.

Reducción de la sobrecarga de memoria:

En lugar de crear múltiples instancias de un objeto, el patrón Flyweight permite crear instancias compartidas (flyweights). Estos objetos son más ligeros porque comparten el mismo estado interno (que es invariable) y solo mantienen el estado único (que puede cambiar) como parte de su contexto.

Flyweight puede incluir un pool de conexiones. En lugar de abrir y cerrar una conexión para cada solicitud a la base de datos, el sistema mantiene un conjunto de conexiones abiertas que se pueden reutilizar.

Al reducir la cantidad de objetos en memoria y la sobrecarga de conexión, el rendimiento general de la aplicación mejora. Las operaciones de lectura y escritura se vuelven más rápidas debido a la menor necesidad de gestionar múltiples conexiones o instancias.
