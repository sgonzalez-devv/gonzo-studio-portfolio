# 📅 Sistema de Citas con Google Meet - Guía de Configuración

## 🎯 Resumen
Este sistema permite a los clientes agendar reuniones contigo directamente desde tu portafolio. Las reuniones se crean automáticamente en Google Calendar con links de Google Meet y se envían invitaciones por email.

## 📋 Pasos de Configuración

### 1. Configurar Google Cloud Console

1. **Ve a Google Cloud Console**: https://console.cloud.google.com/
2. **Crea un nuevo proyecto**:
   - Click en el menú dropdown del proyecto (arriba)
   - Click en "New Project"
   - Nombre: "Gonzo Studio Appointments"
   - Click "Create"

3. **Habilitar APIs necesarias**:
   - Ve a "APIs & Services" > "Library"
   - Busca y habilita: **Google Calendar API**
   - Busca y habilita: **Google Meet API** (opcional, Meet se crea automáticamente con Calendar)

4. **Configurar pantalla de consentimiento OAuth**:
   - Ve a "APIs & Services" > "OAuth consent screen"
   - Selecciona "External"
   - Click "Create"
   - Completa los campos:
     - App name: Gonzo Studio Appointments
     - User support email: tu email
     - Developer contact: tu email
   - Click "Save and Continue"
   - En Scopes, click "Add or Remove Scopes"
   - Busca y agrega:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`
   - Click "Save and Continue"
   - En Test users, agrega tu email
   - Click "Save and Continue"

5. **Crear credenciales OAuth 2.0**:
   - Ve a "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: **Web application**
   - Name: "Gonzo Studio Web Client"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://tu-dominio.com/api/auth/callback/google` (cuando tengas tu dominio)
   - Click "Create"
   - **¡IMPORTANTE!** Guarda el **Client ID** y **Client Secret**

### 2. Obtener Refresh Token

Para que el sistema pueda crear eventos en tu calendario automáticamente, necesitas un refresh token.

1. **Instala la herramienta OAuth2 Playground o usa este script**:

Crea un archivo temporal `get-refresh-token.js`:

```javascript
const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = 'TU_CLIENT_ID_AQUI';
const CLIENT_SECRET = 'TU_CLIENT_SECRET_AQUI';
const REDIRECT_URI = 'http://localhost:3000/api/auth/callback/google';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events'
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent'
});

console.log('Autoriza esta app visitando esta URL:', authUrl);
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Ingresa el código de la URL de callback: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('');
    console.log('¡Éxito! Guarda este refresh token:');
    console.log(tokens.refresh_token);
  } catch (error) {
    console.error('Error obteniendo tokens:', error);
  }
  rl.close();
});
```

2. **Ejecuta el script**:
```bash
node get-refresh-token.js
```

3. **Sigue las instrucciones**:
   - Copia la URL que aparece en la terminal
   - Pégala en tu navegador
   - Autoriza la aplicación
   - Copia el código de la URL de callback
   - Pégalo en la terminal
   - Guarda el **refresh_token** que aparece

### 3. Configurar Variables de Entorno

Edita tu archivo `.env.local` y agrega:

```bash
# Google Calendar API Configuration
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aqui
GOOGLE_CALENDAR_ID=tu_email@gmail.com

# Resend API (para emails de confirmación)
RESEND_API_KEY=tu_resend_api_key_aqui
BUSINESS_EMAIL=work.gonzostudio@outlook.com
```

### 4. Configurar Resend (Servicio de Emails)

1. **Crea una cuenta en Resend**: https://resend.com/signup
2. **Verifica tu dominio** (opcional, puedes usar el dominio de prueba):
   - Ve a "Domains"
   - Click "Add Domain"
   - Sigue las instrucciones para agregar los registros DNS
3. **Obtén tu API Key**:
   - Ve a "API Keys"
   - Click "Create API Key"
   - Copia la key y agrégala a `.env.local`

### 5. Configurar Base de Datos (Supabase)

1. **Ejecuta el script SQL**:
   - Abre Supabase Dashboard
   - Ve a SQL Editor
   - Copia y pega el contenido de `scripts/008_create_appointments.sql`
   - Click "Run"

2. **Configurar tiempo de expiración de sesión**:
   - En Supabase Dashboard, ve a Authentication > Settings
   - Encuentra "JWT Expiry" 
   - Cámbialo a **86400** segundos (24 horas)
   - Click "Save"

### 6. Probar el Sistema

1. **Inicia el servidor de desarrollo**:
```bash
pnpm dev
```

2. **Prueba la página de citas**:
   - Ve a http://localhost:3000/book-appointment
   - Selecciona una fecha futura
   - Selecciona un horario
   - Ingresa tu email
   - Click "Agendar Reunión"

3. **Verifica**:
   - Debe aparecer un mensaje de éxito
   - Revisa tu Google Calendar - debe aparecer el evento
   - Debe haber un link de Google Meet en el evento
   - Debes recibir un email de invitación de Google
   - El evento debe aparecer en `/admin/appointments`

## 🔧 Configuración de Sesión Segura (24 horas)

La configuración ya está lista en el código. Para completarla:

1. **En Supabase Dashboard**:
   - Ve a Authentication > Settings
   - JWT Expiry: **86400** segundos (24 horas)
   - Refresh Token Rotation: **Enabled**
   - Reuse Interval: **10** segundos
   - Click "Save"

2. **Verificar funcionamiento**:
   - Inicia sesión en `/auth/login`
   - Después de 24 horas, deberías ser redirigido al login automáticamente

## 📱 Características Implementadas

✅ **Sistema de citas completo**
- Selección de fecha y hora en calendario interactivo
- Validación de disponibilidad en tiempo real
- Solo días laborables (lunes a viernes)
- Horarios de 9am a 6pm

✅ **Integración con Google Calendar**
- Creación automática de eventos
- Links de Google Meet generados automáticamente
- Invitaciones enviadas al cliente automáticamente
- Recordatorios configurados (1 día antes y 1 hora antes)

✅ **Notificaciones por email**
- Email de confirmación al cliente
- Invitación de Google Calendar
- Recordatorios automáticos de Google

✅ **Panel de administración**
- Ver todas las citas programadas
- Historial de citas pasadas
- Cancelar citas (notifica al cliente)
- Link directo a Google Meet

✅ **Seguridad mejorada**
- Sesiones expiran en 24 horas
- Verificación de sesión en cada request
- Redirección automática al login si expira

## 🎨 Personalización

### Cambiar horarios disponibles

Edita `app/api/appointments/route.ts`, línea ~140:

```typescript
const workingHours = { start: 9, end: 18 }; // Cambia según tus horarios
```

### Cambiar duración de reuniones

Edita `app/api/appointments/route.ts`, línea ~36:

```typescript
durationMinutes: 60, // Cambia a 30, 45, 90, etc.
```

### Cambiar zona horaria

Edita `lib/google-calendar.ts`, líneas donde aparece `'America/Mexico_City'` y cámbiala por tu zona horaria.

### Cambiar días disponibles

Edita `components/appointment-booking.tsx`, línea ~169:

```typescript
disabled={(date) => 
  date < new Date() || 
  date.getDay() === 0 || // Domingo
  date.getDay() === 6    // Sábado
}
```

## 🚀 Deploy

Cuando hagas deploy a Vercel:

1. Agrega todas las variables de entorno en Vercel Dashboard
2. Actualiza los Authorized redirect URIs en Google Cloud Console con tu dominio de producción
3. Actualiza `NEXT_PUBLIC_SITE_URL` con tu dominio

## 🆘 Troubleshooting

### Error: "Failed to create calendar event"
- Verifica que el refresh token sea válido
- Verifica que las APIs estén habilitadas
- Revisa que los scopes sean correctos

### No recibo emails
- Verifica que Resend API Key sea válida
- Verifica que BUSINESS_EMAIL esté configurado
- Los emails de Google Calendar se envían automáticamente

### Los horarios no aparecen
- Verifica que la fecha seleccionada sea futura
- Verifica que no sea fin de semana
- Revisa la consola del navegador por errores

### Sesión no expira
- Verifica la configuración JWT en Supabase
- Limpia las cookies del navegador
- Verifica que el middleware esté funcionando

## 📞 Soporte

Si tienes problemas, revisa:
1. Console del navegador (F12)
2. Logs de Vercel/servidor
3. Supabase logs
4. Google Cloud Console logs

