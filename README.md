# Coforge RideShare 🚗

Coforge RideShare is a **microservices-based ride-sharing application**
built with Spring Boot. The system separates user management, rides,
bookings, notifications, and service discovery into independent
services.

## 🏗️ Project Architecture

``` text
                         ┌─────────────────┐
                         │    Frontend     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   API Gateway   │
                         └────────┬────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
      │User Service │      │ Ride Service │      │Booking Svc  │
      └─────────────┘      └─────────────┘      └─────────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │Notification Svc │
                         └─────────────────┘

                         ┌─────────────────┐
                         │ Eureka Server   │
                         │Service Discovery│
                         └─────────────────┘
```

## 📁 Project Structure

``` text
Coforge-RideShare/
│
├── api-gateway/
├── booking-service/
├── eureka-server/
├── frontend/
├── notification-service/
├── ride-service/
├── user-service/
├── .gitignore
└── README.md
```

## 🛠️ Tech Stack

### Backend

-   Java
-   Spring Boot
-   Spring Cloud
-   Spring Cloud Gateway
-   Eureka Service Discovery
-   Spring Data JPA
-   REST APIs
-   Maven

### Frontend

-   Frontend application located in `frontend/`
-   Check `frontend/package.json` for the exact framework and scripts.

### Tools

-   IntelliJ IDEA
-   Git & GitHub
-   Maven
-   VS Code

## ✅ Prerequisites

Install the following before running the project:

-   **JDK 17+** (or the Java version specified in the project's
    `pom.xml`)
-   **Git**
-   **Maven** or the included Maven Wrapper
-   **Node.js and npm** if the frontend requires them
-   Any database required by the individual services

Check Java:

``` bash
java -version
```

Check Git:

``` bash
git --version
```

Check Node.js:

``` bash
node -v
npm -v
```

## 📥 Clone the Repository

``` bash
git clone https://github.com/ruchitchaudhary11/Coforge-RideShare.git
cd Coforge-RideShare
```

## ⚙️ Configuration

Each Spring Boot service can have its own configuration.

Before starting the application, check:

``` text
api-gateway/src/main/resources/
booking-service/src/main/resources/
eureka-server/src/main/resources/
notification-service/src/main/resources/
ride-service/src/main/resources/
user-service/src/main/resources/
```

Look for files such as:

``` text
application.properties
application.yml
```

Configure local database credentials, ports, Eureka URLs, API keys, and
other required settings.

### 🔐 Security

**Do not commit secrets to GitHub.**

Do not add real:

-   Database passwords
-   API keys
-   Access tokens
-   JWT secrets
-   `.env` files containing credentials

Use environment variables or local configuration for sensitive values.

## 🚀 Running the Backend

Because this is a microservices application, start the services in the
following order.

### 1. Eureka Server

Open a terminal:

``` bash
cd eureka-server
```

Windows:

``` powershell
.\mvnw spring-boot:run
```

or:

``` bash
mvn spring-boot:run
```

Wait for Eureka Server to start.

### 2. User Service

Open a new terminal:

``` bash
cd user-service
```

Run:

``` powershell
.\mvnw spring-boot:run
```

### 3. Ride Service

``` bash
cd ride-service
```

Run:

``` powershell
.\mvnw spring-boot:run
```

### 4. Booking Service

``` bash
cd booking-service
```

Run:

``` powershell
.\mvnw spring-boot:run
```

### 5. Notification Service

``` bash
cd notification-service
```

Run:

``` powershell
.\mvnw spring-boot:run
```

### 6. API Gateway

Finally:

``` bash
cd api-gateway
```

Run:

``` powershell
.\mvnw spring-boot:run
```

## 🌐 Running the Frontend

Open another terminal:

``` bash
cd frontend
```

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

The terminal will display the local frontend URL.

> If the frontend uses a different command, use the scripts defined in
> `frontend/package.json`.

## 🔄 Recommended Startup Order

``` text
1. Eureka Server
       ↓
2. User Service
       ↓
3. Ride Service
       ↓
4. Booking Service
       ↓
5. Notification Service
       ↓
6. API Gateway
       ↓
7. Frontend
```

## 🔌 Application Flow

The typical request flow is:

``` text
Frontend
   │
   ▼
API Gateway
   │
   ├──► User Service
   ├──► Ride Service
   ├──► Booking Service
   └──► Notification Service

Eureka Server
   │
   └──► Service Discovery
```

Eureka allows the microservices to register themselves and discover
other services without hard-coding every service location.

## 🧪 API Testing

The backend APIs can be tested using tools such as:

-   Postman
-   Insomnia
-   Frontend application

Check the controller classes in each service for the exact endpoints and
HTTP methods.

For example, depending on the current implementation, APIs may include:

``` text
POST /users
POST /login
GET  /users/{id}

POST /rides
GET  /rides

POST /bookings
GET  /bookings
```

Always use the actual controller mappings in the repository as the
source of truth for available endpoints.

## 🗄️ Database Setup

If a service uses a database, create the required local database and
update its configuration.

Example:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/database_name
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Replace the values with your local database configuration.

Do not commit real credentials.

## 🐛 Troubleshooting

### Port already in use

If you get:

``` text
Port XXXX was already in use
```

stop the process using that port or change the service port in its
configuration.

Example:

``` properties
server.port=8081
```

### Eureka registration problem

Check that:

1.  Eureka Server is running.
2.  The service has the correct Eureka URL.
3.  The service port is correct.
4.  The service is configured as a Eureka client where required.

### Maven build problem

Try:

``` bash
mvn clean install
```

or on Windows:

``` powershell
.\mvnw clean install
```

### Frontend dependency problem

Run:

``` bash
npm install
```

and then:

``` bash
npm run dev
```

## 👨‍💻 Git Workflow

Create a feature branch:

``` bash
git checkout -b feature/my-feature
```

After making changes:

``` bash
git add .
git commit -m "Add my feature"
git push origin feature/my-feature
```

## 📌 Important Notes

-   Start Eureka before the other microservices.
-   Check each service's configuration before running it.
-   Make sure required databases are running.
-   Keep API keys and credentials out of GitHub.
-   Use the Maven Wrapper included with each service when available.
-   Check `frontend/package.json` for the frontend's exact commands.

## 👥 Contributors

**Coforge RideShare Team**

## 📄 License

This project is intended for educational and development purposes.
