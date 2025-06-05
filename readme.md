# PROYECTO_RESERVAS_SSTRATEGY

Sistema de reservas para empresas, desarrollado con Angular (frontend) y Spring Boot (backend). Permite gestionar citas, clientes, servicios y la integración con Google Calendar.

Repositorio oficial: [https://github.com/CharlyLizard/PROYECTO_RESERVAS_SSTRATEGY](https://github.com/CharlyLizard/PROYECTO_RESERVAS_SSTRATEGY)

---

## Características principales

- Gestión de citas y calendario para clientes y administradores.
- Administración de servicios y categorías.
- Gestión de clientes y proveedores.
- Integración con Google Calendar para usuarios con correo Gmail.
- Panel de administración con edición y eliminación de citas.
- Soporte para diferentes zonas horarias.
- Interfaz moderna y responsive.

---

## Requisitos previos

- **Node.js** (v18 o superior recomendado)
- **Angular CLI** (`npm install -g @angular/cli`)
- **Java 17** o superior
- **Maven**
- **SQL Server** (imprescindible, el proyecto está preparado para este motor)
- **SSMS** (SQL Server Management Studio) o Azure Data Studio para ejecutar scripts SQL

---

## Instalación

### 1. Clona el repositorio

```sh
git clone https://github.com/CharlyLizard/PROYECTO_RESERVAS_SSTRATEGY.git
cd PROYECTO_RESERVAS_SSTRATEGY
```

### 2. Configura la base de datos (SQL Server)

- Crea una base de datos llamada `Sstrategy` en tu instancia de SQL Server.
- Ejecuta el script de creación y datos iniciales:

```sh
# Desde SSMS o Azure Data Studio, abre y ejecuta:
scripts bases de datos/script2.sql
```

> **Nota importante:**  
> - El usuario y contraseña de la base de datos deben coincidir con los definidos en `backend/src/main/resources/application.properties`.
> - Por defecto, la conexión es:
>   ```
>   spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=Sstrategy;encrypt=false;trustServerCertificate=true
>   spring.datasource.username=admin123
>   spring.datasource.password=admin123
>   ```
> - Si cambias estos valores, actualízalos tanto en SQL Server como en el archivo de configuración.

### 3. Backend (Spring Boot)

```sh
cd backend
./mvnw spring-boot:run
```
El backend se iniciará en [http://localhost:8080](http://localhost:8080).

### 4. Frontend (Angular)

```sh
cd client
npm install
ng serve
```
El frontend estará disponible en [http://localhost:4200](http://localhost:4200).

---

## Uso

- Accede a la aplicación en [http://localhost:4200](http://localhost:4200).
- Como administrador, puedes gestionar citas, servicios, clientes y proveedores desde el panel de administración.
- Los usuarios pueden reservar citas, que se reflejan en el calendario.
- Si el correo del usuario es de Gmail, se ofrece la opción de añadir la cita a Google Calendar.

---

## Estructura del proyecto

```
backend/                  # Código Java Spring Boot (API REST)
client/                   # Código Angular (frontend)
scripts bases de datos/   # Scripts SQL para la base de datos (SQL Server)
```

---

## Scripts de base de datos

El script principal es:

- [`scripts bases de datos/script2.sql`](scripts%20bases%20de%20datos/script2.sql)

Incluye la creación de tablas, relaciones y datos por defecto para SQL Server.

---

## Notas adicionales

- Puedes modificar la configuración de la base de datos en `backend/src/main/resources/application.properties`.
- El sistema está preparado para ampliaciones y personalizaciones según las necesidades de la empresa.
- Si necesitas adaptar la base de datos a otro motor distinto de SQL Server, revisa el script SQL y los parámetros de conexión en el backend.

---

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias, mejoras o corrección de errores.

---

## Autor

- Carlos Martín Salvatierra  
- Álvaro Cimadevilla

---

¿Dudas o soporte? Abre un issue en el repositorio o contacta a los autores.
