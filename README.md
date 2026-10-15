# Hydro Heart Portal

Quiero un proyecto muy muy sencillo de una interfaz gráfica que el código html sea muy facil de explicar. El proyecto debe tener como pagina principal un cuadro y dentro del cuadro de color blanco y de fondo azul marino claro. A la derecha un espacio para ponerle una imagen al codigo y al lado izquierdo un boton de inicio de sesión o registro. El boton de registro debe pedir nombre, usuario y la contraseña, confirmar contraseña y debe verificar que solo se usan letras, numeros y puntos y comas. Y no debe dejar generar una contraseña que no tenga alguno de estos 3 elementos y verificar si en la base de datos ya existe el usuario ingresado. 

en el iniciar sesión, debe consultar la base de datos pendiente por anclarle de firebase que consulte usuario y contraseña y permita el ingreso.

La pestaña a la que ingresa en caso de tener las credenciales correctas debe tener únicamente 3 gráficas que se actualicen en tiempo real de la base de datos, una de pH, otra de trubidez y otra de temperatura con iconos que representen estos 3. La interfaz nuevamente debe mantenerse muy sencilla en todas las partes y los 3 html que se obtengan de esto deben ser con código sencillo y de facil conexion a firebase

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://hydro-heart-portal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/87a20b68-7288-41ef-bb19-b663753d31b3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
