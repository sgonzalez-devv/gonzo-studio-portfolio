# 🚀 PASOS SIGUIENTES - Sistema de Citas

## ✅ Lo que ya está configurado:

1. ✅ Google Client ID y Client Secret en `.env.local`
2. ✅ Código completo del sistema de citas
3. ✅ Base de datos lista (solo falta ejecutar el SQL)
4. ✅ Todas las dependencias instaladas

---

## 📋 PASOS QUE DEBES COMPLETAR:

### PASO 1: Obtener el Google Refresh Token

Este token permite que el sistema cree eventos en tu calendario automáticamente.

**Opción 1: Usar variables de entorno (Recomendado)**

El script leerá automáticamente de tu `.env.local`:

```bash
cd "/Users/sgonzalezfx/Desktop/Gonzo Studio Portfolio"
GOOGLE_CLIENT_ID=$(grep GOOGLE_CLIENT_ID .env.local | cut -d '=' -f2) \
GOOGLE_CLIENT_SECRET=$(grep GOOGLE_CLIENT_SECRET .env.local | cut -d '=' -f2) \
node scripts/get-refresh-token.js
```

**Opción 2: Editar el script temporalmente**

1. Abre `scripts/get-refresh-token.js`
2. Reemplaza `TU_CLIENT_ID_AQUI` y `TU_CLIENT_SECRET_AQUI` con tus credenciales
3. Ejecuta: `node scripts/get-refresh-token.js`
4. **IMPORTANTE:** No hagas commit de este archivo con tus credenciales

**Sigue las instrucciones:**

1. Se abrirá una URL en la terminal
2. Cópiala y pégala en tu navegador
3. Inicia sesión con tu cuenta de Google (work.gonzostudio@outlook.com o la que uses para Google Calendar)
4. Autoriza la aplicación
5. Te redirigirá a una URL como: `http://localhost:3000/api/auth/callback/google?code=XXXXXX`
6. Copia el código que aparece después de `code=`
7. Pégalo en la terminal
8. Copia el REFRESH_TOKEN que aparece
9. Actualiza tu `.env.local`:

```bash
GOOGLE_REFRESH_TOKEN=el_token_que_copiaste
```

---

### PASO 2: Configurar Resend (Servicio de Emails)

Para enviar emails de confirmación:

1. **Ve a:** https://resend.com/signup
2. **Crea una cuenta** con tu email
3. **Verifica tu email**
4. **Ve a "API Keys"** en el dashboard
5. **Click "Create API Key"**
6. **Copia la API Key**
7. **Actualiza tu `.env.local`:**

```bash
RESEND_API_KEY=re_tu_api_key_aqui
```

**Nota:** Resend te permite enviar 100 emails gratis al día. Para producción, deberás verificar tu dominio.

---

### PASO 3: Crear tabla de Appointments en Supabase

1. **Ve a:** https://app.supabase.com/
2. **Abre tu proyecto** (brfuijluachdjnkeousb)
3. **Ve a "SQL Editor"**
4. **Abre el archivo:** `scripts/008_create_appointments.sql`
5. **Copia todo el contenido**
6. **Pégalo en el SQL Editor de Supabase**
7. **Click "Run"**

---

### PASO 4: Configurar tiempo de sesión en Supabase (24 horas)

1. **En Supabase Dashboard, ve a:** Authentication > Settings
2. **Busca "JWT Expiry"**
3. **Cámbialo a:** `86400` segundos (24 horas)
4. **Busca "Refresh Token Rotation"** y actívalo
5. **Reuse Interval:** `10` segundos
6. **Click "Save"**

---

### PASO 5: Probar el sistema

Una vez completados los pasos anteriores:

```bash
cd "/Users/sgonzalezfx/Desktop/Gonzo Studio Portfolio"
pnpm dev
```

**Prueba estas URLs:**

1. **Agendar cita:** http://localhost:3000/book-appointment
   - Selecciona una fecha futura
   - Selecciona un horario
   - Ingresa tu email
   - Agenda la reunión

2. **Ver citas en admin:** http://localhost:3000/admin/appointments
   - Verás todas las citas agendadas
   - Podrás cancelarlas desde ahí

3. **Verifica tu Google Calendar:**
   - El evento debe aparecer
   - Debe tener un link de Google Meet
   - Debes recibir un email de Google

---

## 🔧 Verificar que todo funciona:

### Checklist:

- [ ] El refresh token está en `.env.local`
- [ ] Resend API key está en `.env.local`
- [ ] Tabla appointments existe en Supabase
- [ ] JWT Expiry configurado a 24 horas
- [ ] Puedo agendar una cita desde /book-appointment
- [ ] La cita aparece en Google Calendar
- [ ] La cita aparece en /admin/appointments
- [ ] Recibo email de Google con invitación
- [ ] El link de Google Meet funciona

---

## 📝 Notas importantes:

1. **Google Calendar ID:** Usa el email de tu cuenta de Google (por defecto es tu email de Gmail)

2. **Zona horaria:** El sistema está configurado para 'America/Mexico_City'. Si necesitas cambiarlo, edita `lib/google-calendar.ts`

3. **Horarios disponibles:** 9am - 6pm, Lunes a Viernes. Puedes cambiarlo en `app/api/appointments/route.ts`

4. **Duración de reuniones:** 60 minutos por defecto. Puedes cambiarlo en el mismo archivo.

5. **Emails opcionales:** Aunque Resend es opcional (Google Calendar ya envía invitaciones), es recomendable configurarlo para tener emails personalizados.

---

## 🆘 Si algo no funciona:

1. **Verifica las variables de entorno:** todas deben estar en `.env.local`
2. **Revisa la consola del navegador** (F12) por errores
3. **Revisa los logs del servidor** en la terminal
4. **Verifica que las APIs estén habilitadas** en Google Cloud Console
5. **Verifica que el refresh token sea válido** (no haya expirado)

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sistema de citas estará funcionando y los clientes podrán:

- ✅ Ver tu disponibilidad en tiempo real
- ✅ Agendar reuniones directamente
- ✅ Recibir invitaciones automáticas
- ✅ Unirse a reuniones por Google Meet
- ✅ Recibir recordatorios automáticos

Y tú podrás:

- ✅ Ver todas las citas desde tu dashboard
- ✅ Gestionar las citas
- ✅ Cancelar citas (notifica automáticamente al cliente)
- ✅ Ver todo sincronizado en tu Google Calendar
