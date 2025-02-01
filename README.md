# Instalaciones recomendadas - Microservicio Auth

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

* [Visual Studio Code](https://code.visualstudio.com/)

* [Node](https://nodejs.org/en)

* [Docker Desktop](https://www.docker.com/get-started)

* [Git](https://git-scm.com/)
```
git config --global user.name "Tu nombre"
git config --global user.email "Tu correo"
```

* [Nest CLI](https://docs.nestjs.com/first-steps)
```
npm i -g @nestjs/cli
```


Opcional
* [Table Plus](https://tableplus.com/)

Descargar imagen de postgres 16
```
docker pull postgres:16.2
```

Para instalar dependencias
```
npm install
```

Para levantar la base de datos
```
npx prisma migrate dev --name init
docker compose up -d 
```

Crear un archivo .env con el siguiente contenido
```
PORT=3002
DATABASE_URL="postgresql://postgres:123456789@localhost:5433/tasksdb?schema=public"
JWT_SECRET=
```



