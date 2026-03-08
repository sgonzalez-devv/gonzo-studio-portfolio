// Script para obtener el Refresh Token de Google OAuth2
// Instrucciones:
// 1. Instala googleapis: pnpm add googleapis
// 2. Reemplaza CLIENT_ID y CLIENT_SECRET con tus credenciales
// 3. Ejecuta: node scripts/get-refresh-token.js
// 4. Sigue las instrucciones en la terminal

const { google } = require('googleapis');
const readline = require('readline');

// ⚠️ REEMPLAZA ESTOS VALORES CON TUS CREDENCIALES DE GOOGLE CLOUD CONSOLE
// Las puedes encontrar en tu archivo .env.local
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'TU_CLIENT_ID_AQUI';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'TU_CLIENT_SECRET_AQUI';
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

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   Google OAuth2 Refresh Token Generator                   ║');
console.log('║   Para sistema de citas de Gonzo Studio                   ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('');

// Generar URL de autorización
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent' // Forzar que siempre pida consent para obtener refresh token
});

console.log('PASO 1: Autoriza esta aplicación visitando esta URL:');
console.log('');
console.log(authUrl);
console.log('');
console.log('PASO 2: Después de autorizar, serás redirigido a una URL.');
console.log('        Copia el código de la URL (el parámetro "code")');
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('PASO 3: Pega el código aquí: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║   ¡ÉXITO! Guarda estos tokens en tu archivo .env.local    ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');
    console.log('GOOGLE_REFRESH_TOKEN=' + tokens.refresh_token);
    console.log('');
    
    if (tokens.access_token) {
      console.log('Access Token (temporal, no lo necesitas guardar):');
      console.log(tokens.access_token);
      console.log('');
    }
    
    console.log('⚠️  IMPORTANTE: Guarda el REFRESH_TOKEN en tu .env.local');
    console.log('');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error obteniendo tokens:');
    console.error(error.message);
    console.error('');
    console.error('Verifica que:');
    console.error('1. El CLIENT_ID y CLIENT_SECRET sean correctos');
    console.error('2. El código no haya expirado (pídelo de nuevo)');
    console.error('3. El REDIRECT_URI coincida con el configurado en Google Cloud');
  }
  
  rl.close();
});
