# Front End Prueba Marvel

Este proyecto necesita un archivo .env en el directorio raíz (al lado de jsconfig.json). El archivo .env debe
tener la siguiente variable de entorno.

`REACT_APP_API_HOST_URL=http://abcd.efg:1234`

Donde `abdc.efg` es la url del backend y `1234` es el puerto (si es usado).

Instrucciones para correr el proyecto localmente:

```
npm install
touch .env
echo REACT_APP_API_HOST_URL=http://mi-url-backend >> .env
npm start
````

**NOTA: El primer inicio de sesión (o registro) tardará unos minutos debido a está "despertando" la base de datos de Azure.**

---

Guillermo Agudelo - 2025
