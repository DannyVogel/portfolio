export default defineI18nConfig(() => ({
  legacy: false,
  locale: "EN",
  messages: {
    EN: {
      welcome: "Welcome",
      title: "Frontend Developer",
      description:
        "Driven and hardworking professional seeking to leverage software engineering skills, in combination with general problem-solving skills, languages, and a passion for computers and technology, as a frontend developer.",
      languages: {
        title: "Languages",
        EN: "English",
        ES: "Spanish",
        DE: "German",
        FR: "French",
        CA: "Catalan",
      },
      contact: {
        email: "Copy my email address",
        linkedin: "Go to my LinkedIn profile",
        github: "Go to my GitHub profile",
      },
      copied: "Copied to clipboard!",
      techAndTools: "Technologies and Tools",
    },
    ES: {
      welcome: "Bienvenido",
      title: "Desarrollador Frontend",
      description:
        "Profesional motivado y trabajador que busca aprovechar sus habilidades de ingeniera informática, en combinación con habilidades de resolución de problemas, idiomas y pasión por la informática y la tecnología, como desarrollador frontend.",
      languages: {
        title: "Idiomas",
        EN: "Inglés",
        ES: "Español",
        DE: "Alemán",
        FR: "Francés",
        CA: "Catalán",
      },
      contact: {
        email: "Copiar mi dirección de correo electrónico",
        linkedin: "Ir a mi perfil de LinkedIn",
        github: "Ir a mi perfil de GitHub",
      },
      copied: "¡Copiado al portapapeles!",
      techAndTools: "Tecnologías y Herramientas",
    },
  },
}));
