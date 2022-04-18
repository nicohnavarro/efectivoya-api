# API EfectivoYa 


## Introduccion

Esta API fue desarrollada para manejar el inicio de sesion de los usuarios de EfectivoYa, mas adelante comentaremos como utilizarla,
como setear diferentes ambientes y enunciaremos los diferentes endpoints con sus funcionalidades


## Usage

Instalar dependecias
`npm install`

Crear archivo .env 
`Solicitar variables de entorno`

Ejemplo de archivo .env
```
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

DATABASE_HOST=127.0.0.1
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
DATABASE_NAME=name

AUTH_SECRET=secret
AUTH_TTL=15m

EMAIL=emailsender
EMAIL_PASSWORD=app-password

LANDING_URL=localhost:4000
```

### Run command

Para levantar el proyecto de manera local utilizar el comando:
`npm run dev`


## Test


## Endpoints

### Auth

`POST` Login: `http://localhost:3000/api/v1/email/login` 

Payload: 
```
{
    "email":string,
    "password":string
}
```

`POST` LoginWithApp: `http://localhost:3000/api/v1/email/loginWithApp` 

Payload: 
```
{
    "email":string
}
```

`POST` Register: `http://localhost:3000/api/v1/email/register` 

Payload: 
```
{
    "email":string
}
```

`POST` Verify: `http://localhost:3000/api/v1/email/verify` 

    Set header Autorization with token

### Users 

`POST` Check cedula: `http://localhost:3000/api/v1/user/checkCedula` 

Payload: 
```
{
    "cedula":string,
    "email":string
}
```

`POST` Save Password: `http://localhost:3000/api/v1/user/savePassword` 

Payload: 
```
{
    "email":string,
    "password":string
}
```

`POST` Save Cedula: `http://localhost:3000/api/v1/user/saveCedula` 

Payload: 
```
{
    "id":number,
    "cedula":string,
    "celular":string
}
```


`POST` Pass OTP: `http://localhost:3000/api/v1/user/savePassOtp` 

Payload: 
```
{
    "id":number
}
```

`POST` Pass Score: `http://localhost:3000/api/v1/user/savePassScore` 

Payload: 
```
{
    "id":number
}
```

`POST` Save Segmento: `http://localhost:3000/api/v1/user/saveSegmento` 

Payload: 
```
{
    "id":number,
    "segmento":string
}
```

`POST` Save Status: `http://localhost:3000/api/v1/user/saveStatus` 

Payload: 
```
{
    "id":number,
    "status":string
}
```

`POST` Forgot Password: `http://localhost:3000/api/v1/user/forgotPassword` 

Payload: 
```
{
    "email":string
}
```

`POST` Reset Password: `http://localhost:3000/api/v1/user/resetPassword` 

Payload: 
```
{
    "email":string,
    "resetCode": string,
    "password":string,
    "passwordConfirmation":string
}
```
