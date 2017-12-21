# AppContactos Andrés Gómez
App contactos para prueba de conocimientos


## Instalación

- Se debe descargar o clonar en repositorio
- Entrar a la carpeta del proyecto desde terminal o cmd y ejecutar el comando `npm install` para añadir todas las dependencias
- Despues de que se descarguen las dependencias entrar al archivo **app.routes.js** que se encuentra en la ruta **www/app/app.routes.js** 
- Dentro del archivo, en la propiedad **.value** reemplazar los valores **email** y **token** por el correo y el token que tiene registrado en su cuenta:
  ~~~
  .value('Credentials',{
           'dirApi': 'https://app.alegra.com/api/v1/contacts/',
            'email': 'TuCorreo@mail.com',
            'token': 'TuToken',
            'Content-Type': 'application/json'
        })
  ~~~
- Ejecutar el comando `ionic serve --lab`
___

Si quieres saber mas de mí visita [Mi página Web](http://pippegz.github.io/)
