# TasksFlow API

## 1. Descripción del proyecto

TasksFlow es una API REST desarrollada como proyecto final de MongoDB.

La aplicación permite administrar:

* Usuarios.
* Equipos de trabajo.
* Tareas.

La API permite crear, consultar, actualizar y eliminar estos recursos utilizando diferentes endpoints.

El proyecto utiliza **Node.js, Express, MongoDB Atlas y Mongoose**.

---

## 2. Tecnologías utilizadas

* **Node.js:** entorno utilizado para ejecutar el proyecto.
* **Express:** framework utilizado para crear la API REST.
* **MongoDB Atlas:** base de datos utilizada para almacenar la información.
* **Mongoose:** herramienta utilizada para trabajar con MongoDB mediante modelos y validaciones.
* **dotenv:** permite utilizar variables de entorno.
* **Nodemon:** reinicia automáticamente el servidor durante el desarrollo.

---

## 3. ¿Cómo funciona el proyecto?

El proyecto está organizado por capas para separar las responsabilidades.

El recorrido de una solicitud es:

**Cliente → Ruta → Controlador → Modelo → MongoDB**

Por ejemplo, cuando se crea una tarea:

1. El cliente envía una solicitud `POST`.
2. La ruta recibe la solicitud.
3. El controlador procesa los datos.
4. El modelo de Mongoose valida la información.
5. MongoDB guarda la tarea.
6. La API devuelve una respuesta al cliente.

---

## 4. Instalación

Para ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* Una cuenta de MongoDB Atlas

### Paso 1: Instalar las dependencias

Después de abrir la carpeta del proyecto en la terminal, ejecutar:

```bash
npm install
```

### Paso 2: Configurar las variables de entorno

Crear un archivo llamado:

```text
.env
```

En este archivo se coloca la conexión a MongoDB:

```env
MONGODB_URI=mongodb+srv://USUARIO:CONTRASENA@cluster0.s6ppyw6.mongodb.net/
PORT=3000
```

Las credenciales reales deben permanecer únicamente en `.env`.

El archivo `.env` no se sube a GitHub.

### Paso 3: Ejecutar el servidor

Para iniciar el proyecto:

```bash
npm run dev
```

Cuando el servidor se inicia correctamente, estará disponible en:

```text
http://localhost:3000
```

---

## 5. Base de datos

El proyecto utiliza MongoDB Atlas.

La base de datos utilizada es:

```text
tasksflow
```

La conexión se realiza una sola vez cuando inicia el servidor.

Además, se utiliza un pool de conexiones mediante:

```text
maxPoolSize: 10
```

La cadena de conexión se almacena en la variable de entorno:

```text
MONGODB_URI
```

---

# 6. Modelos de la aplicación

El proyecto tiene tres modelos principales.

## Usuario (User)

Representa a las personas que utilizan el sistema.

Sus principales campos son:

* `name`: nombre del usuario.
* `email`: correo electrónico.
* `role`: rol del usuario.

Los roles disponibles son:

```text
admin
manager
member
```

El correo electrónico es obligatorio, debe tener un formato válido y es único.

---

## Equipo (Team)

Representa un equipo de trabajo.

Sus principales campos son:

* `name`: nombre del equipo.
* `description`: descripción.
* `members`: usuarios que pertenecen al equipo.

El campo `members` utiliza una referencia al modelo `User`.

Esto permite relacionar los equipos con sus usuarios.

---

## Tarea (Task)

Representa una tarea que debe realizarse.

Sus principales campos son:

* `title`: título de la tarea.
* `description`: descripción.
* `status`: estado de la tarea.
* `priority`: prioridad.
* `team`: equipo al que pertenece.
* `assignedTo`: usuario asignado.

Los estados disponibles son:

```text
pending
in-progress
completed
```

La prioridad utiliza valores del 1 al 5.

La tarea tiene relaciones con:

* `Team`
* `User`

---

# 7. Operaciones CRUD

Cada uno de los tres recursos tiene las operaciones CRUD completas.

CRUD significa:

* **Create:** crear.
* **Read:** consultar.
* **Update:** actualizar.
* **Delete:** eliminar.

---

# 8. Endpoints de usuarios

### Obtener todos los usuarios

```http
GET /api/users
```

Devuelve la lista de usuarios registrados.

### Obtener un usuario

```http
GET /api/users/:id
```

Ejemplo:

```http
GET /api/users/ID_DEL_USUARIO
```

### Crear un usuario

```http
POST /api/users
```

Ejemplo de información enviada:

```json
{
  "name": "Juan Pérez",
  "email": "juan@gmail.com",
  "role": "member"
}
```

### Actualizar un usuario

```http
PUT /api/users/:id
```

### Eliminar un usuario

```http
DELETE /api/users/:id
```

---

# 9. Endpoints de equipos

### Obtener todos los equipos

```http
GET /api/teams
```

### Obtener un equipo

```http
GET /api/teams/:id
```

### Crear un equipo

```http
POST /api/teams
```

Ejemplo:

```json
{
  "name": "Equipo Backend",
  "description": "Equipo encargado del desarrollo backend"
}
```

### Actualizar un equipo

```http
PUT /api/teams/:id
```

### Eliminar un equipo

```http
DELETE /api/teams/:id
```

---

# 10. Endpoints de tareas

### Obtener todas las tareas

```http
GET /api/tasks
```

### Obtener una tarea

```http
GET /api/tasks/:id
```

### Crear una tarea

```http
POST /api/tasks
```

Ejemplo:

```json
{
  "title": "Configurar API",
  "description": "Preparar los endpoints del proyecto",
  "status": "pending",
  "priority": 5,
  "team": "ID_DEL_EQUIPO"
}
```

### Actualizar una tarea

```http
PUT /api/tasks/:id
```

Ejemplo para marcar una tarea como completada:

```json
{
  "status": "completed"
}
```

### Eliminar una tarea

```http
DELETE /api/tasks/:id
```

---

# 11. Consulta avanzada

La API incluye una consulta avanzada para las tareas.

Permite utilizar:

* Filtros.
* Ordenamiento.
* Paginación.

Ejemplo:

```http
GET /api/tasks?status=pending&sort=-priority&page=1&limit=10
```

Esta consulta significa:

* Mostrar solamente tareas con estado `pending`.
* Ordenarlas por prioridad de mayor a menor.
* Mostrar la página número 1.
* Mostrar un máximo de 10 tareas.

La respuesta también informa:

* Cantidad total de tareas.
* Página actual.
* Cantidad de resultados por página.
* Cantidad total de páginas.

---

# 12. Validaciones

Los modelos utilizan validaciones de Mongoose.

Por ejemplo:

* Los campos obligatorios no pueden estar vacíos.
* El email debe tener un formato válido.
* El email de un usuario no puede repetirse.
* Los roles deben pertenecer a los valores permitidos.
* Los estados de las tareas deben ser válidos.
* La prioridad debe estar entre 1 y 5.
* Los nombres y descripciones tienen límites de caracteres.

Además, se utilizan mensajes personalizados para informar al usuario cuál es el problema.

---

# 13. Manejo de errores

El proyecto utiliza un middleware centralizado para manejar los errores.

### Error 400 — Solicitud incorrecta

Se utiliza cuando los datos enviados son inválidos o cuando el ID tiene un formato incorrecto.

Ejemplo:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "ID no válido"
}
```

### Error 404 — Recurso no encontrado

Se utiliza cuando se solicita un usuario, equipo o tarea que no existe.

Ejemplo:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Usuario no encontrado"
}
```

### Error 409 — Registro duplicado

Se utiliza cuando se intenta crear un registro que viola un campo único.

Por ejemplo, registrar un usuario utilizando un email que ya existe.

Ejemplo:

```json
{
  "success": false,
  "statusCode": 409,
  "message": "Ya existe un registro con ese valor único"
}
```

### Error 500 — Error interno

Se utiliza para errores inesperados del servidor.

---

# 14. Pruebas de la API

El proyecto incluye el archivo:

```text
requests.http
```

Este archivo contiene ejemplos para probar los diferentes endpoints.

Incluye pruebas de:

* Crear usuarios.
* Consultar usuarios.
* Actualizar usuarios.
* Eliminar usuarios.
* Crear equipos.
* Consultar equipos.
* Actualizar equipos.
* Eliminar equipos.
* Crear tareas.
* Consultar tareas.
* Actualizar tareas.
* Eliminar tareas.
* Consulta avanzada.
* Error 400.
* Error 404.
* Error 409.

---

# 15. Estructura del proyecto

```text
MongoDB-Trabajo-Final/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   ├── teamController.js
│   └── taskController.js
│
├── middleware/
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Team.js
│   └── Task.js
│
├── routes/
│   ├── userRoutes.js
│   ├── teamRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .env.example
├── .gitignore
├── requests.http
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# 16. Seguridad

Las credenciales de MongoDB no están escritas directamente en los archivos del proyecto.

El archivo `.env` contiene las credenciales reales y está incluido en `.gitignore`.

El archivo `.env.example` solamente muestra la estructura necesaria para configurar las variables de entorno y no contiene credenciales reales.

---

# 17. Flujo principal de demostración

Para demostrar el funcionamiento completo del proyecto se puede realizar el siguiente flujo:

1. Crear un equipo.
2. Crear un usuario.
3. Asociar el usuario al equipo.
4. Crear varias tareas.
5. Consultar las tareas.
6. Utilizar la consulta avanzada.
7. Actualizar una tarea.
8. Cambiar su estado a `completed`.
9. Eliminar una tarea.
10. Mostrar el resultado en MongoDB Atlas.

---

## Autor

**Lissenny Rodriguez**

Proyecto final de MongoDB utilizando Node.js, Express, Mongoose y MongoDB Atlas.
