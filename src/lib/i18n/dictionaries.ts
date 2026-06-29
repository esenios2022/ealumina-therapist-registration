import type { Locale } from "@/lib/i18n/config";

export const dictionaries = {
  es: {
    nav: {
      testimonios: "Testimonios",
      login: "Iniciar sesión",
      signup: "Crear cuenta",
      library: "Biblioteca",
      talkToAgent: "Hablar con el agente",
      leaveTestimonial: "Dejar testimonio",
      admin: "Admin",
      logout: "Salir",
    },
    landing: {
      heroTitle: "Meditaciones y limpiezas energéticas guiadas, cuando las necesites",
      heroSubtitle:
        "Videos y audios grabados con comandos cuánticos para trabajar la parte emocional, además de procesos más profundos para situaciones puntuales. Antes de empezar, un agente te va a preguntar qué te trae hoy hasta acá.",
      ctaStart: "Empezar ahora",
      featuresTitle: "¿Qué vas a encontrar?",
      features: [
        {
          title: "Meditaciones de 5 a 20 minutos",
          text: "Sesiones cortas para el día a día y procesos más largos cuando necesites algo más profundo.",
        },
        {
          title: "Comandos cuánticos",
          text: "Trabajo específico para la parte emocional: ansiedad, bloqueos, sostén en momentos difíciles.",
        },
        {
          title: "Limpieza energética",
          text: "Pensado especialmente para terapeutas: soltar lo que se absorbe en el consultorio entre sesión y sesión.",
        },
        {
          title: "Video o audio, como prefieras",
          text: "Mismo contenido en dos formatos — mirá el video o simplemente escuchá el audio.",
        },
        {
          title: "Un agente te recibe primero",
          text: "Antes de entrar a la biblioteca, una breve conversación para entender qué te trae hoy y guiarte a lo que necesitás en ese momento.",
        },
        {
          title: "Contenido protegido",
          text: "Los videos y audios no se pueden descargar ni compartir el link — es para tu uso personal dentro de la plataforma.",
        },
      ],
      benefits: [
        {
          title: "Para terapeutas",
          text: "Limpiá tu energía entre sesiones y liberá las cargas que absorbés del consultorio.",
        },
        {
          title: "Para pacientes",
          text: "Acceso guiado por tu terapeuta para sostenerte entre encuentros, cuando lo necesites.",
        },
        {
          title: "Para la comunidad",
          text: "Meditaciones y comandos cuánticos para quienes vienen trabajando en frecuencia con nosotros.",
        },
      ],
      pricingTitle: "Suscripción mensual",
      pricingSubtitle:
        "Acceso completo a la biblioteca de meditaciones y audios, sin límite de reproducciones.",
      uruguayLabel: "Uruguay",
      uruguayUnit: "pesos uruguayos / mes",
      brazilLabel: "Brasil",
      brazilUnit: "reales / mes",
      ctaCreateAccount: "Crear cuenta",
      footerTestimonials: "Ver testimonios",
    },
    auth: {
      brand: "Terra Araras",
      loginTitle: "Iniciar sesión",
      signupTitle: "Crear cuenta",
      nameLabel: "Nombre",
      emailLabel: "Email",
      passwordLabel: "Contraseña",
      loginButton: "Ingresar",
      loginLoading: "Ingresando...",
      signupButton: "Crear cuenta",
      signupLoading: "Creando...",
      noAccount: "¿No tenés cuenta?",
      createOne: "Creá una",
      hasAccount: "¿Ya tenés cuenta?",
      signIn: "Iniciá sesión",
      loginError: "Email o contraseña incorrectos.",
      signupError: "No se pudo crear la cuenta.",
    },
    dashboard: {
      inactiveTitle: "Tu suscripción no está activa",
      inactiveText:
        "Activá tu suscripción mensual para acceder a la biblioteca de meditaciones y audios.",
      priceLine: "$555 UYU/mes (Uruguay) · R$44/mes (Brasil)",
      videos: "Videos",
      audios: "Audios",
      emptyContent: "Todavía no hay contenido acá.",
    },
    intake: {
      greeting: "Hola, bienvenida/o a Terra Araras. ¿Qué te trae hoy hasta acá?",
      placeholder: "Escribí tu mensaje...",
      send: "Enviar",
      typing: "Escribiendo...",
      error: "Tuvimos un problema técnico. ¿Podés intentar de nuevo?",
    },
    testimonialForm: {
      title: "Dejá tu testimonio",
      subtitle:
        "Contá tu experiencia con Terra Araras. Lo revisamos antes de publicarlo en la página pública de testimonios.",
      placeholder: "Escribí tu testimonio...",
      submit: "Enviar testimonio",
      sending: "Enviando...",
      saved: "¡Gracias! Tu testimonio quedó pendiente de aprobación.",
      error: "No se pudo guardar, probá de nuevo.",
    },
    contentDetail: {
      noFile: "Este contenido todavía no tiene archivo cargado.",
    },
    testimoniosPage: {
      back: "← Volver",
      title: "Testimonios",
      subtitle: "Lo que cuentan quienes ya usan Terra Araras.",
      empty: "Todavía no hay testimonios publicados.",
      fallbackName: "Usuario",
    },
    audioPlayer: {
      loading: "Cargando audio...",
      loadError: "No se pudo cargar el audio. Probá de nuevo.",
    },
    whatsapp: {
      button: "Consultar por WhatsApp",
      message: "Hola! Quiero suscribirme a Terra Araras, ¿cómo hago el pago?",
    },
  },
  pt: {
    nav: {
      testimonios: "Depoimentos",
      login: "Entrar",
      signup: "Criar conta",
      library: "Biblioteca",
      talkToAgent: "Falar com o agente",
      leaveTestimonial: "Deixar depoimento",
      admin: "Admin",
      logout: "Sair",
    },
    landing: {
      heroTitle: "Meditações e limpezas energéticas guiadas, quando você precisar",
      heroSubtitle:
        "Vídeos e áudios gravados com comandos quânticos para trabalhar a parte emocional, além de processos mais profundos para situações específicas. Antes de começar, um agente vai perguntar o que te trouxe até aqui hoje.",
      ctaStart: "Começar agora",
      featuresTitle: "O que você vai encontrar?",
      features: [
        {
          title: "Meditações de 5 a 20 minutos",
          text: "Sessões curtas para o dia a dia e processos mais longos quando precisar de algo mais profundo.",
        },
        {
          title: "Comandos quânticos",
          text: "Trabalho específico para a parte emocional: ansiedade, bloqueios, apoio em momentos difíceis.",
        },
        {
          title: "Limpeza energética",
          text: "Pensado especialmente para terapeutas: soltar o que se absorve no consultório entre uma sessão e outra.",
        },
        {
          title: "Vídeo ou áudio, como preferir",
          text: "Mesmo conteúdo em dois formatos — assista ao vídeo ou apenas escute o áudio.",
        },
        {
          title: "Um agente te recebe primeiro",
          text: "Antes de entrar na biblioteca, uma breve conversa para entender o que te trouxe hoje e te guiar para o que você precisa nesse momento.",
        },
        {
          title: "Conteúdo protegido",
          text: "Os vídeos e áudios não podem ser baixados nem o link compartilhado — é para seu uso pessoal dentro da plataforma.",
        },
      ],
      benefits: [
        {
          title: "Para terapeutas",
          text: "Limpe sua energia entre sessões e libere as cargas que você absorve do consultório.",
        },
        {
          title: "Para pacientes",
          text: "Acesso guiado pelo seu terapeuta para te sustentar entre encontros, quando precisar.",
        },
        {
          title: "Para a comunidade",
          text: "Meditações e comandos quânticos para quem já vem trabalhando em frequência conosco.",
        },
      ],
      pricingTitle: "Assinatura mensal",
      pricingSubtitle:
        "Acesso completo à biblioteca de meditações e áudios, sem limite de reproduções.",
      uruguayLabel: "Uruguai",
      uruguayUnit: "pesos uruguaios / mês",
      brazilLabel: "Brasil",
      brazilUnit: "reais / mês",
      ctaCreateAccount: "Criar conta",
      footerTestimonials: "Ver depoimentos",
    },
    auth: {
      brand: "Terra Araras",
      loginTitle: "Entrar",
      signupTitle: "Criar conta",
      nameLabel: "Nome",
      emailLabel: "E-mail",
      passwordLabel: "Senha",
      loginButton: "Entrar",
      loginLoading: "Entrando...",
      signupButton: "Criar conta",
      signupLoading: "Criando...",
      noAccount: "Não tem conta?",
      createOne: "Crie uma",
      hasAccount: "Já tem conta?",
      signIn: "Entre",
      loginError: "E-mail ou senha incorretos.",
      signupError: "Não foi possível criar a conta.",
    },
    dashboard: {
      inactiveTitle: "Sua assinatura não está ativa",
      inactiveText:
        "Ative sua assinatura mensal para acessar a biblioteca de meditações e áudios.",
      priceLine: "$555 UYU/mês (Uruguai) · R$44/mês (Brasil)",
      videos: "Vídeos",
      audios: "Áudios",
      emptyContent: "Ainda não há conteúdo aqui.",
    },
    intake: {
      greeting: "Olá, seja bem-vindo(a) à Terra Araras. O que te traz até aqui hoje?",
      placeholder: "Escreva sua mensagem...",
      send: "Enviar",
      typing: "Escrevendo...",
      error: "Tivemos um problema técnico. Você pode tentar de novo?",
    },
    testimonialForm: {
      title: "Deixe seu depoimento",
      subtitle:
        "Conte sua experiência com a Terra Araras. Nós revisamos antes de publicar na página pública de depoimentos.",
      placeholder: "Escreva seu depoimento...",
      submit: "Enviar depoimento",
      sending: "Enviando...",
      saved: "Obrigado! Seu depoimento ficou pendente de aprovação.",
      error: "Não foi possível salvar, tente de novo.",
    },
    contentDetail: {
      noFile: "Este conteúdo ainda não tem arquivo carregado.",
    },
    testimoniosPage: {
      back: "← Voltar",
      title: "Depoimentos",
      subtitle: "O que dizem quem já usa a Terra Araras.",
      empty: "Ainda não há depoimentos publicados.",
      fallbackName: "Usuário",
    },
    audioPlayer: {
      loading: "Carregando áudio...",
      loadError: "Não foi possível carregar o áudio. Tente de novo.",
    },
    whatsapp: {
      button: "Consultar pelo WhatsApp",
      message: "Olá! Quero assinar a Terra Araras, como faço o pagamento?",
    },
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = typeof dictionaries.es;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
