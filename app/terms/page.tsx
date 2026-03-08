import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Términos de Servicio</h1>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            {/* Introducción */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Bienvenido a Gonzo Studio</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estos Términos de Servicio ("Términos") rigen tu acceso y uso del sitio web de Gonzo Studio 
                y nuestros servicios de diseño y branding. Al acceder o usar nuestro sitio web, aceptas estar 
                sujeto a estos Términos. Si no estás de acuerdo con estos Términos, por favor no uses nuestro sitio.
              </p>
            </section>

            {/* Servicios */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Nuestros Servicios</h2>
              <p className="text-muted-foreground leading-relaxed">
                Gonzo Studio ofrece servicios profesionales de diseño gráfico, branding e identidad visual, incluyendo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Diseño de identidad de marca (logotipos, paletas de colores, tipografías)</li>
                <li>Diseño de materiales de marketing y promocionales</li>
                <li>Consultoría de branding y estrategia visual</li>
                <li>Diseño web y digital</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Los servicios específicos, plazos de entrega y precios se acordarán individualmente para cada proyecto.
              </p>
            </section>

            {/* Uso del sitio web */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Uso del Sitio Web</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">2.1 Uso Permitido</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Puedes usar nuestro sitio web para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Ver nuestro portafolio y servicios</li>
                    <li>Agendar consultas con nosotros</li>
                    <li>Enviar solicitudes de información sobre proyectos</li>
                    <li>Contactarnos para servicios de diseño</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">2.2 Uso Prohibido</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No puedes usar nuestro sitio web para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Copiar, reproducir o distribuir nuestro contenido sin permiso</li>
                    <li>Usar nuestros diseños o trabajos para tus propios proyectos sin autorización</li>
                    <li>Realizar actividades ilegales o fraudulentas</li>
                    <li>Intentar acceder a áreas restringidas del sitio</li>
                    <li>Enviar spam o contenido malicioso</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Propiedad intelectual */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Propiedad Intelectual</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">3.1 Contenido del Sitio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Todo el contenido de este sitio web (textos, gráficos, logotipos, imágenes, diseños) es 
                    propiedad de Gonzo Studio y está protegido por leyes de derechos de autor. No puedes usar, 
                    copiar o distribuir ningún contenido sin nuestro permiso expreso por escrito.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">3.2 Trabajos de Cliente</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Para proyectos de cliente, los derechos de propiedad se transferirán según lo acordado en el 
                    contrato específico del proyecto. Generalmente:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Los derechos se transfieren al cliente una vez completado el pago final</li>
                    <li>Gonzo Studio retiene el derecho de mostrar el trabajo en su portafolio</li>
                    <li>Los archivos fuente se entregan según lo acordado en el contrato</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">3.3 Uso de Portafolio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos reservamos el derecho de mostrar todos los trabajos completados en nuestro portafolio, 
                    sitio web, redes sociales y materiales de marketing, salvo que el cliente solicite 
                    específicamente confidencialidad.
                  </p>
                </div>
              </div>
            </section>

            {/* Proceso de trabajo */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Proceso de Trabajo</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">4.1 Consulta Inicial</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ofrecemos consultas iniciales gratuitas de 1 hora por Google Meet para discutir tu proyecto 
                    y necesidades.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">4.2 Propuesta y Contrato</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Después de la consulta, proporcionaremos una propuesta detallada que incluye:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Alcance del proyecto</li>
                    <li>Entregables específicos</li>
                    <li>Cronograma estimado</li>
                    <li>Precio total y condiciones de pago</li>
                    <li>Número de revisiones incluidas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">4.3 Pagos</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Se requiere un depósito del 50% para iniciar el proyecto</li>
                    <li>El 50% restante se paga al completar el proyecto</li>
                    <li>Los pagos se realizan por transferencia bancaria o método acordado</li>
                    <li>Los archivos finales se entregan después del pago completo</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">4.4 Revisiones</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada proyecto incluye un número específico de rondas de revisión (generalmente 2-3). 
                    Revisiones adicionales pueden tener un costo extra según lo acordado.
                  </p>
                </div>
              </div>
            </section>

            {/* Cancelaciones y reembolsos */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Cancelaciones y Reembolsos</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">5.1 Cancelación por el Cliente</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Puedes cancelar reuniones agendadas con al menos 24 horas de anticipación</li>
                    <li>Los depósitos de proyectos no son reembolsables una vez iniciado el trabajo</li>
                    <li>Se facturará el trabajo completado hasta la fecha de cancelación</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">5.2 Cancelación por Gonzo Studio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Nos reservamos el derecho de rechazar o cancelar proyectos que:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Violen nuestros principios éticos o valores</li>
                    <li>Estén fuera de nuestro alcance de servicios</li>
                    <li>Involucren contenido ilegal o inapropiado</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-2">
                    En estos casos, se reembolsará el depósito completo si no se ha iniciado trabajo.
                  </p>
                </div>
              </div>
            </section>

            {/* Garantías y limitaciones */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Garantías y Limitaciones</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">6.1 Garantía de Servicio</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Garantizamos que nuestro trabajo será:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Original y creado específicamente para tu proyecto</li>
                    <li>De alta calidad profesional</li>
                    <li>Entregado en los formatos acordados</li>
                    <li>Libre de derechos de terceros</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-2">6.2 Limitación de Responsabilidad</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Gonzo Studio no será responsable de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Daños indirectos o consecuenciales derivados del uso de nuestros diseños</li>
                    <li>Problemas técnicos con plataformas de terceros (hosting, redes sociales, etc.)</li>
                    <li>Resultados de negocio o marketing derivados del uso de nuestros diseños</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Confidencialidad */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Confidencialidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos comprometemos a mantener la confidencialidad de toda la información que compartas con nosotros 
                durante el proceso de consulta y diseño. No compartiremos tu información con terceros sin tu 
                consentimiento, excepto cuando sea necesario para completar el proyecto (por ejemplo, proveedores 
                de impresión).
              </p>
            </section>

            {/* Comunicaciones */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Comunicaciones</h2>
              <p className="text-muted-foreground leading-relaxed">
                Al usar nuestros servicios o agendar una consulta, aceptas recibir comunicaciones de nosotros por:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Email (confirmaciones, actualizaciones de proyecto, recordatorios)</li>
                <li>Google Calendar (invitaciones y recordatorios de reuniones)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Puedes optar por no recibir comunicaciones de marketing en cualquier momento, pero las 
                comunicaciones relacionadas con proyectos activos son necesarias para el servicio.
              </p>
            </section>

            {/* Modificaciones */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Modificaciones de los Términos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios entrarán 
                en vigor inmediatamente después de su publicación en esta página. Es tu responsabilidad revisar 
                estos Términos periódicamente. El uso continuado de nuestro sitio después de los cambios 
                constituye tu aceptación de los nuevos Términos.
              </p>
            </section>

            {/* Ley aplicable */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Ley Aplicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estos Términos se rigen por las leyes aplicables de México. Cualquier disputa relacionada con 
                estos Términos o nuestros servicios se resolverá mediante negociación amistosa. Si no se puede 
                llegar a un acuerdo, las partes acuerdan someterse a la jurisdicción de los tribunales competentes.
              </p>
            </section>

            {/* Divisibilidad */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Divisibilidad</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones 
                restantes continuarán en pleno vigor y efecto.
              </p>
            </section>

            {/* Contacto */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Contacto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tienes preguntas sobre estos Términos de Servicio, por favor contáctanos:
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

            {/* Aceptación */}
            <section className="space-y-4 border-t pt-8">
              <p className="text-muted-foreground leading-relaxed font-medium">
                Al usar nuestro sitio web o servicios, confirmas que has leído, entendido y aceptado estos 
                Términos de Servicio en su totalidad.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
