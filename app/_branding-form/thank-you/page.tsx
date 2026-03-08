import Link from "next/link";
import { Check, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "¡Gracias! | Gonzo Studio",
  description: "Hemos recibido tu información",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <Card className="text-center">
          <CardHeader className="space-y-6 pb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl mb-2">
                ¡Gracias por compartir!
              </CardTitle>
              <CardDescription className="text-base">
                Hemos recibido toda tu información
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4 text-left">
              <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-sm mb-1">Revisa tu email</p>
                  <p className="text-sm text-muted-foreground">
                    Te enviamos un resumen de tu información y nos pondremos en contacto contigo pronto.
                  </p>
                </div>
              </div>
              
              <div className="p-4 border border-border rounded-lg">
                <h3 className="font-semibold mb-2">¿Qué sigue?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">1.</span>
                    <span>Revisaremos tu información en detalle</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">2.</span>
                    <span>Te contactaremos para agendar una llamada</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">3.</span>
                    <span>Comenzaremos a trabajar en tu marca</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild variant="outline" className="gap-2 flex-1">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </Link>
              </Button>
              <Button asChild className="gap-2 flex-1">
                <Link href="/#projects">
                  Ver proyectos
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground pt-4">
              Si no recibes nuestro email en los próximos minutos, revisa tu carpeta de spam 
              o contáctanos directamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
