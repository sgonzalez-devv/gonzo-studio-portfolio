import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Política de Privacidad</h1>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* Introducción */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Introducción</h2>
              <p className="text-muted-foreground leading-relaxed">
                En Gonzo Studio, nos tomamos muy en serio la privacidad de nuestros clientes y visitantes. 
                Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos tu información personal 
                cuando visitas nuestro sitio web o utilizas nuestros servicios de diseño y branding.
              </p>
            </section>

            {/* Información que recopilamos */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Información que Recopilamos</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">1. Información que nos proporcionas directamente</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Formularios de contacto:</strong> Nombre, email, información del proyecto</li>
                    <li><strong>Sistema de citas:</strong> Nombre, email, fecha y hora preferida, notas sobre tu proyecto</li>
                    <li><strong>Formulario de branding:</strong> Información detallada sobre tu marca y proyecto</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">2. Información recopilada automáticamente</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Datos de navegación:</strong> Páginas visitadas, tiempo de permanencia, enlaces clickeados</li>
                    <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, dispositivo, sistema operativo</li>
                    <li><strong>Cookies:</strong> Para mejorar tu experiencia y recordar tus preferencias</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cómo usamos tu información */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Cómo Usamos tu Información</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Responder a tus consultas y solicitudes de información</li>
                <li>Agendar y gestionar reuniones contigo</li>
                <li>Proporcionar nuestros servicios de diseño y branding</li>
                <li>Enviar confirmaciones, recordatorios y comunicaciones relacionadas con el servicio</li>
                <li>Mejorar nuestro sitio web y experiencia de usuario</li>
                <li>Analizar tendencias y comportamiento de usuarios para mejorar nuestros servicios</li>
              </ul>
            </section>

            {/* Compartir información */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Compartir tu Información</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>No vendemos ni alquilamos tu información personal a terceros.</strong> Solo compartimos 
                tu información con:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Google Calendar/Meet:</strong> Para agendar y gestionar reuniones contigo</li>
                <li><strong>Servicios de email:</strong> Para enviarte confirmaciones y comunicaciones</li>
                <li><strong>Proveedores de hosting:</strong> Para mantener nuestro sitio web funcionando</li>
                <li><strong>Requerimientos legales:</strong> Si es necesario por ley o para proteger nuestros derechos</li>
              </ul>
            </section>

            {/* Seguridad */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Seguridad de tus Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información 
                personal contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
                <li>Almacenamiento seguro en servidores protegidos</li>
                <li>Acceso restringido a información personal solo para personal autorizado</li>
                <li>Monitoreo regular de nuestros sistemas de seguridad</li>
              </ul>
            </section>

            {/* Tus derechos */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Tus Derechos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Acceder</strong> a la información personal que tenemos sobre ti</li>
                <li><strong>Rectificar</strong> información inexacta o incompleta</li>
                <li><strong>Eliminar</strong> tu información personal (derecho al olvido)</li>
                <li><strong>Oponerte</strong> al procesamiento de tus datos</li>
                <li><strong>Portabilidad</strong> de tus datos a otro servicio</li>
                <li><strong>Retirar tu consentimiento</strong> en cualquier momento</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Para ejercer cualquiera de estos derechos, contáctanos en{" "}
                <a href="mailto:work.gonzostudio@outlook.com" className="text-primary hover:underline">
                  work.gonzostudio@outlook.com
                </a>
              </p>
            </section>

            {/* Cookies */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. 
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo. Usamos cookies para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Mantener tus preferencias (como idioma y tema)</li>
                <li>Analizar el tráfico y uso del sitio web</li>
                <li>Recordar tu sesión de administrador (si aplicable)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Puedes configurar tu navegador para rechazar cookies, pero esto puede afectar la funcionalidad del sitio.
              </p>
            </section>

            {/* Retención de datos */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Retención de Datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos 
                descritos en esta política, a menos que la ley requiera o permita un período de retención más largo. 
                Los datos de proyectos completados se conservan durante 3 años para referencia histórica.
              </p>
            </section>

            {/* Enlaces externos */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Enlaces a Sitios de Terceros</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro sitio web puede contener enlaces a sitios de terceros (como Instagram o Google Meet). 
                No somos responsables de las prácticas de privacidad de estos sitios. Te recomendamos leer las 
                políticas de privacidad de cada sitio que visites.
              </p>
            </section>

            {/* Menores de edad */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Menores de Edad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nuestros servicios están dirigidos a empresas y profesionales. No recopilamos intencionalmente 
                información de menores de 18 años. Si eres padre/madre y crees que tu hijo nos ha proporcionado 
                información personal, contáctanos para que podamos eliminarla.
              </p>
            </section>

            {/* Cambios */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Cambios a esta Política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos sobre cambios 
                significativos publicando la nueva política en esta página y actualizando la fecha de "Última 
                actualización". Te recomendamos revisar esta política periódicamente.
              </p>
            </section>

            {/* Contacto */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tienes preguntas o inquietudes sobre esta Política de Privacidad o nuestras prácticas de datos, 
                por favor contáctanos:
              </p>
              <div className="bg-secondary/50 p-6 rounded-lg space-y-2">
                <p className="font-medium">Gonzo Studio</p>
                <p className="text-muted-foreground">
                  Email:{" "}
                  <a href="mailto:work.gonzostudio@outlook.com" className="text-primary hover:underline">
                    work.gonzostudio@outlook.com
                  </a>
                </p>
                <p className="text-muted-foreground">
                  Instagram:{" "}
                  <a 
                    href="https://instagram.com/gonzostudio.co" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @gonzostudio.co
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
