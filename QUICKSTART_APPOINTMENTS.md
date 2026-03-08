# 🚀 Inicio Rápido - Sistema de Citas

## ⚡ Configuración Rápida (15 minutos)

### 1️⃣ Google Cloud Console (5 min)
1. Ve a https://console.cloud.google.com/
2. Crea proyecto "Gonzo Studio Appointments"
3. Habilita: Google Calendar API
4. Crea OAuth 2.0 credentials
5. Guarda CLIENT_ID y CLIENT_SECRET

### 2️⃣ Obtener Refresh Token (2 min)
```bash
# Edita el archivo primero con tus credenciales
node scripts/get-refresh-token.js
```

### 3️⃣ Variables de Entorno (2 min)
Agrega a `.env.local`:
```bash
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
GOOGLE_REFRESH_TOKEN=tu_refresh_token
GOOGLE_CALENDAR_ID=tu@email.com
RESEND_API_KEY=tu_resend_key
BUSINESS_EMAIL=work.gonzostudio@outlook.com
```

### 4️⃣ Base de Datos (2 min)
1. Abre Supabase Dashboard > SQL Editor
2. Ejecuta `scripts/008_create_appointments.sql`
3. Authentication > Settings > JWT Expiry = 86400

### 5️⃣ Resend (2 min)
1. Crea cuenta en https://resend.com
2. Crea API Key
3. Agrégala a `.env.local`

### 6️⃣ Probar (2 min)
```bash
pnpm dev
```
Ve a http://localhost:3000/book-appointment

## 📚 Documentación Completa

Para detalles completos, ver `APPOINTMENTS_SETUP.md`

## 🎯 Qué hace este sistema

- ✅ Los clientes agendan citas desde tu portfolio
- ✅ Se crea automáticamente evento en Google Calendar
- ✅ Se genera link de Google Meet automáticamente
- ✅ Se envía invitación al cliente por email
- ✅ Recordatorios automáticos de Google
- ✅ Panel admin para ver y gestionar citas
- ✅ Sesiones de admin expiran en 24 horas

## 🔗 URLs Importantes

- **Agendar cita**: `/book-appointment`
- **Ver citas (admin)**: `/admin/appointments`
- **Login admin**: `/auth/login`

## 📞 Problemas?

Ver sección Troubleshooting en `APPOINTMENTS_SETUP.md`
