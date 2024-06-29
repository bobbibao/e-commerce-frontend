# E-Commerce Project

## Table of Contents
- [Project Description](#project-description)
- [Links](#links)
- [File Structure](#file-structure)
- [Demo](#demo)
- [Installation](#installation)

## Project Description
This project is a full-featured e-commerce application developed using Spring Boot for the backend and React for the frontend. It includes a user-facing e-commerce platform and an admin dashboard for managing products, orders, and users.

## Links
- [Backend](https://github.com/bobbibao/e-commerce-backend.git)
- [Frontend](https://github.com/bobbibao/e-commerce-frontend.git)
- [Admin Dashboard](https://github.com/bobbibao/e-commerce-dashboard-admin.git)

## File Structure
Here is the file structure of the project:

```java
ecommerce-project/
├── backend/
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/
│ │ │ │ └── com/
│ │ │ │ └── vti/
│ │ │ │ └── ecommerce/
│ │ │ │ ├── ECommerceApplication.java
│ │ │ │ ├── domains/
│ │ │ │ │ └── entities/
│ │ │ │ │ ├── User.java
│ │ │ │ │ └── ... (other entity classes)
│ │ │ │ ├── repositories/
│ │ │ │ │ └── IUserRepository.java
│ │ │ │ │ └── ... (other repository interfaces)
│ │ │ │ ├── services/
│ │ │ │ │ ├── IUserService.java
│ │ │ │ │ └── impl/
│ │ │ │ │ └── UserServiceImpl.java
│ │ │ │ │ └── ... (other service implementations)
│ │ │ │ └── controllers/
│ │ │ │ └── UserController.java
│ │ │ │ └── ... (other controllers)
│ │ │ └── resources/
│ │ │ ├── application.properties
│ │ │ └── ... (other resource files)
│ └── pom.xml
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ ├── index.js
│ └── package.json
└── admin-dashboard/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ ├── index.js
└── package.json
```

## Demo
You can view a demo of the project at the following links:
- [Image Frontend Demo](https://github.com/bobbibao/e-commerce-backend/tree/main/demo/user_interface)
- [Image Admin Dashboard Demo](https://github.com/bobbibao/e-commerce-backend/tree/main/demo/admin_dashboard)


server {
    listen 80;
    server_name 192.168.1.254;

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
    }
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}

