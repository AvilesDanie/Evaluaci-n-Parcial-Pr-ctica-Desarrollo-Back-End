https://github.com/AvilesDanie/Evaluaci-n-Parcial-Pr-ctica-Desarrollo-Back-End.git

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/AvilesDanie/Evaluaci-n-Parcial-Pr-ctica-Desarrollo-Back-End.git
```


### 2. Crear una cuenta en Twilio

Regístrate en Twilio
```bash
https://www.twilio.com/en-us
```
Obten el SID de la cuenta y el Auth Token


### 3. Configurar el Sandbox de WhatsApp
En la consola de Twilio, navega a la sección de `WhatsApp message` y registrar tu número de teléfono.

### 4. Actualizar las credenciales en el código
En el archivo `\Backend\controllers\tareaController.ts` Reemplaza los valores `<sid>` y `<token>` por los proporcionados por Twilio.

### 5. Ejecutar el proyecto
Ejecutar el comando en backend y frontend
```bash
npm run dev
```
