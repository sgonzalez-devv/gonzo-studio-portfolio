export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Crafting Digital Excellence",
      subtitle:
        "We transform ideas into powerful digital solutions. From web applications to custom software, we bring your vision to life.",
      cta: "View Our Work",
      ctaSecondary: "Get in Touch",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Explore our latest work and discover how we help businesses thrive in the digital world.",
      viewProject: "View Project",
      viewAll: "View All Projects",
      noProjects: "No projects yet. Check back soon!",
    },
    about: {
      title: "About Us",
      subtitle: "We are a passionate team dedicated to creating exceptional digital experiences.",
      mission: {
        title: "Our Mission",
        description:
          "To empower businesses with innovative technology solutions that drive growth, enhance user experiences, and create lasting value in the digital landscape.",
      },
      vision: {
        title: "Our Vision",
        description:
          "To be the leading force in digital transformation, recognized globally for our creativity, technical excellence, and commitment to client success.",
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Innovation",
            description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
          },
          {
            title: "Quality",
            description: "Excellence is non-negotiable. We deliver polished, robust solutions that exceed expectations.",
          },
          {
            title: "Collaboration",
            description: "We work closely with our clients, treating their goals as our own to achieve shared success.",
          },
          {
            title: "Integrity",
            description: "Transparency and honesty guide every interaction. We build trust through consistent delivery.",
          },
        ],
      },
    },
    contact: {
      title: "Let's Build Something Amazing",
      subtitle: "Ready to start your next project? We'd love to hear from you.",
      form: {
        name: "Your Name",
        email: "Email Address",
        message: "Your Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "Something went wrong. Please try again.",
      },
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Crafting digital excellence, one project at a time.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Nosotros",
      contact: "Contacto",
    },
    hero: {
      title: "Creando Excelencia Digital",
      subtitle:
        "Transformamos ideas en soluciones digitales poderosas. Desde aplicaciones web hasta software personalizado, damos vida a tu vision.",
      cta: "Ver Nuestro Trabajo",
      ctaSecondary: "Contactanos",
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Explora nuestro trabajo mas reciente y descubre como ayudamos a las empresas a prosperar en el mundo digital.",
      viewProject: "Ver Proyecto",
      viewAll: "Ver Todos los Proyectos",
      noProjects: "Aun no hay proyectos. Vuelve pronto!",
    },
    about: {
      title: "Sobre Nosotros",
      subtitle: "Somos un equipo apasionado dedicado a crear experiencias digitales excepcionales.",
      mission: {
        title: "Nuestra Mision",
        description:
          "Empoderar a las empresas con soluciones tecnologicas innovadoras que impulsen el crecimiento, mejoren las experiencias de usuario y creen valor duradero en el panorama digital.",
      },
      vision: {
        title: "Nuestra Vision",
        description:
          "Ser la fuerza lider en transformacion digital, reconocidos globalmente por nuestra creatividad, excelencia tecnica y compromiso con el exito del cliente.",
      },
      values: {
        title: "Nuestros Valores",
        items: [
          {
            title: "Innovacion",
            description: "Constantemente superamos limites y adoptamos nuevas tecnologias para ofrecer soluciones de vanguardia.",
          },
          {
            title: "Calidad",
            description: "La excelencia no es negociable. Entregamos soluciones pulidas y robustas que superan las expectativas.",
          },
          {
            title: "Colaboracion",
            description: "Trabajamos estrechamente con nuestros clientes, tratando sus objetivos como propios para lograr el exito compartido.",
          },
          {
            title: "Integridad",
            description: "La transparencia y la honestidad guian cada interaccion. Construimos confianza a traves de una entrega consistente.",
          },
        ],
      },
    },
    contact: {
      title: "Construyamos Algo Increible",
      subtitle: "Listo para comenzar tu proximo proyecto? Nos encantaria saber de ti.",
      form: {
        name: "Tu Nombre",
        email: "Correo Electronico",
        message: "Tu Mensaje",
        submit: "Enviar Mensaje",
        sending: "Enviando...",
        success: "Mensaje enviado con exito! Te responderemos pronto.",
        error: "Algo salio mal. Por favor intenta de nuevo.",
      },
    },
    footer: {
      rights: "Todos los derechos reservados.",
      tagline: "Creando excelencia digital, un proyecto a la vez.",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.en;
