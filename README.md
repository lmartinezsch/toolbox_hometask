# Toolbox Home Task

Este proyecto es parte de la tarea de Toolbox y se enfoca en el desarrollo de una API para interactuar con archivos y datos externos.

## Requisitos previos

Asegúrate de tener instalado Node.js en tu sistema. Puedes descargarlo desde [aquí](https://nodejs.org/).

## Configuración inicial

1. Clona este repositorio en tu máquina local usando `git clone`.
2. Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

   ```plaintext
   APP_PORT=3001
   TBX_EXTERNAL_API=https://echo-serv.tbxnet.com
   TBX_EXTERNAL_TOKEN="Bearer aSuperSecretKey"
    ```

## Instalación de dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```
npm install
```

## Ejecutar el proyecto
Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```npm start
```

El servidor estará disponible en http://localhost:3001.

