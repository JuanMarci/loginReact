# 🔐 Módulo de Autenticación de Usuarios

Este proyecto implementa un sistema de login que valida credenciales contra una base de datos MySQL utilizando Spring Boot como backend y una interfaz HTML responsiva con pestañas para el frontend.

---

## 🧱 Estructura del Proyecto

usuarios-evidencia/ ├── backend-springboot/ │ ├── src/... │ ├── pom.xml │ └── application.properties ├── frontend-html/ │ └── login.html


---

## ⚙️ Tecnologías utilizadas

- Java 17
- Spring Boot 3.x
- Spring Web + Spring Data JPA
- MySQL (MariaDB compatible)
- HTML5 + CSS3 + JavaScript
- Postman para pruebas

---

## 🔧 Configuración de Base de Datos

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dbusuarios
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect
Tabla:

sql
CREATE TABLE usuarios (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  clave VARCHAR(100)
);
🚀 Cómo ejecutar el proyecto
Asegúrate de tener MySQL y NetBeans funcionando correctamente.

Crea la base de datos dbusuarios y añade usuarios de prueba.

Ejecuta la clase UsuariosApplication.java en NetBeans.

Abre Postman y prueba el endpoint:

POST http://localhost:9090/api/login
Body:
{
  "nombre": "Juan Marcillo",
  "clave": "1234"
}
🧪 Frontend HTML interactivo
Archivo: login.html

Permite ingresar nombre y clave

Si el login es exitoso, muestra un panel con pestañas:

✨ Inicio

📊 Estadísticas (cargadas desde la base de datos)

👤 Perfil de usuario

Incluye botón de “Cerrar sesión”

📡 Endpoints disponibles
Método	Ruta	Descripción
POST	/api/login	Valida credenciales del usuario
GET	/api/estadisticas	Devuelve estadísticas del sistema

Conclusión
Este proyecto demuestra el desarrollo de un módulo backend funcional y un frontend simple,
conectado mediante HTTP. Permite practicar separación de capas, solicitudes fetch, manejo de sesiones,
y presentación visual clara de la lógica del sistema.