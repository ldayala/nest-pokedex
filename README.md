<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Ejecutar en desarrollo
1. Clonar repositorio.
2. Ejecutar el siguiente comando

```bash
# for install all dependecies

$ npm install
```
3. Tener nest cli instalado.
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos.
```
docker-compose up -d
```
5. Contruir  la base de datos con la semilla.
```
http://localhost:3000/api/v2/seed   GET
```


## Stack used
* MongoDB
* Nest
