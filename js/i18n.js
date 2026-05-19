const translations = {
  en: {
    hero_top_text:
      "Our full website is launching soon — but we're already here for early conversations.",
    hero_title: "Tech Philosophy:",
    hero_title_2: "Digital clarity <br />for your business",
    hero_description:
      "We help businesses turn scattered tools, manual work, and technical uncertainty into practical digital solutions that support day-to-day operations.",
    hero_email: "hello@techphistudio.de",
    hero_button: "Drop us an email",
    middle_header_1: "A thoughtful digital partner",
    middle_header_2: "for growing businesses",
    curve_text_1:
      "Many businesses know something in their operations needs to improve, but the way forward is often unclear. Tools multiply, processes become inefficient, and technology starts to feel heavier instead of more helpful.",
    curve_text_2:
      '<span class="curve-company-name">Tech Philosophy</span> was created to change that. We design and implement <span class="curve-highlight">practical digital solutions</span> that bring more clarity, reduce repetitive tasks, and give businesses more time for <span class="curve-highlight">what matters most</span>.',
    central_vector_text_1:
      'From answers <span class="central-vector-span-text">to action</span>',
    central_vector_text_2:
      'We make that <span class="central-vector-span-text">shift</span>',
    central_vector_main_text:
      'AI that changes how your<br /><span class="central-vector-main-span-text">business works</span>',
    what_we_help_upper_1:
      "AI is becoming useful for many SMEs as a knowledge tool for research and summaries, but the real value starts when it moves from answers to action — triggering workflows, updating systems, generating documents, and eliminating busywork.",
    what_we_help_upper_2:
      "We help businesses make that shift in a practical, compliant way, with attention to GDPR, digital sovereignty, and long-term operational fit.",
    what_we_help_header:
      'What we <span class="what-we-help-header-span">help with</span>',
    learn_about_1: "Solution strategy and digital roadmaps",
    learn_about_2: "Websites, digital products, and e-commerce",
    learn_about_3: "Practical AI solutions and automations",
    learn_about_4: "IT setup, workflows, and operational infrastructure",
    learn_about_5: "Ongoing support and optimization",
    about_header_title: "Built by founders<br /> who understand both",
    about_header_title2: "operations and<br /> technology",
    about_quote:
      '"We started this studio to build the kind of digital partner we always wished existed: thoughtful, technically strong, honest about what works, and focused on solutions that genuinely help businesses move forward."',
    project_header_1: "Have a project",
    project_header_2: "in mind?",
    contact_header: "Drop us an email",
    contact_location: "Cologne",
    copy_right: "All rights reserved © Tech Philosophy 2026",
  },
  de: {
    hero_top_text:
      "Unsere vollstaendige Website startet in Kuerze – fuer ein erstes Gespraech stehen wir Ihnen jedoch bereits heute gerne zur Verfuegung",
    hero_title: "Tech Philosophy:",
    hero_title_2: "Digitale Klarheit <br />für Ihr Business",
    hero_description:
      "Wir unterstützen Unternehmen dabei, eine Vielzahl unübersichtlicher Tools, manuelle Arbeitsschritte und technische Unsicherheiten in praktische digitale Lösungen zu verwandeln, die den Geschäftsalltag erleichtern.",
    hero_email: "hello@techphistudio.de",
    hero_button: "Schreiben Sie uns",
    middle_header_1: "Ein durchdachter digitaler Partner",
    middle_header_2: "für wachsende Unternehmen",
    curve_text_1:
      "Viele Unternehmen wissen, dass ihre operativen Prozesse optimiert werden müssen, doch der richtige Weg dorthin ist oft unklar. Tools nehmen überhand, Prozesse werden ineffizient und Technologie fühlt sich oft belastender an, statt eine echte Hilfe zu sein.",
    curve_text_2:
      '<span class="curve-company-name">Tech Philosophy</span> wurde gegründet, um dies zu ändern. Wir konzipieren und implementieren <span class="curve-highlight">praxisorientierte digitale Lösungen</span>, die für mehr Klarheit sorgen, repetitive Aufgaben reduzieren und Unternehmen wieder mehr Zeit für <span class="curve-highlight">das Wesentliche</span> verschaffen.',
    central_vector_text_1:
      'Von der Antwort <span class="central-vector-span-text">zur Umsetzung</span>',
    central_vector_text_2:
      'Wir gestalten <span class="central-vector-span-text">diesen Wandel</span>',
    central_vector_main_text:
      'KI, die Ihren<br /><span class="central-vector-main-span-text">Geschäftsalltag verändert</span>',
    what_we_help_upper_1:
      "Für viele kleine und mittelständische Unternehmen ist KI bereits als Wissens-Tool für Recherchen und Zusammenfassungen nützlich. Der wahre Mehrwert entsteht jedoch erst, wenn KI vom reinen Wissensmanagement zum Handeln übergeht: durch automatisierte Workflows, Systemaktualisierungen, Dokumentenerstellung und die Eliminierung zeitraubender Routineaufgaben.",
    what_we_help_upper_2:
      "Wir begleiten Unternehmen bei diesem Wandel – praxisnah, rechtskonform unter Berücksichtigung der DSGVO, mit Fokus auf digitale Souveränität und langfristige operative Stabilität.",
    what_we_help_header:
      'Unsere <span class="what-we-help-header-span">Schwerpunkte</span>',
    learn_about_1: "Strategische Beratung und digitale Roadmaps",
    learn_about_2: "Websites, digitale Produkte und E-Commerce-Lösungen",
    learn_about_3: "Praxisorientierte KI-Lösungen und Automatisierungen",
    learn_about_4: "IT-Setup, Prozess-Workflows und operative Infrastruktur",
    learn_about_5: "Laufende Betreuung und Optimierung",
    about_header_title: "Gegründet von Experten,<br /> ",
    about_header_title2:
      "<span class='about-header-title2-font'>die</span> Operations und<br /> Technologie verstehen",
    about_quote:
      '"Wir haben dieses Studio ins Leben gerufen, um den digitalen Partner zu schaffen, den wir uns selbst immer gewünscht hätten: durchdacht, technisch versiert, ehrlich in der Einschätzung des Machbaren und fokussiert auf Lösungen, die Unternehmen wirklich voranbringen."',
    project_header_1: "Haben Sie ein Projekt",
    project_header_2: "im Sinn?",
    contact_header: "Schreiben Sie uns",
    contact_location: "Köln",
    copy_right: "Alle Rechte vorbehalten © Tech Philosophy 2026",
  },
};

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  document.querySelectorAll(".language-option").forEach((el) => {
    el.classList.toggle("active", el.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  const middleHeader1 = document.querySelector(".middle-header-1");
  const middleHeader2 = document.querySelector(".middle-header-2");
  const projectHeader1 = document.querySelector(".title-1");
  const projectHeader2 = document.querySelector(".title-2");
  const heroTitle2 = document.querySelector(".hero-title-2");
  const curveText = document.querySelector(".curve-text");
  const curveTextTwo = document.querySelector(".curve-text-two");
  const centralVectorText1 = document.querySelector(".text-1");
  const centralVectorText2 = document.querySelector(".text-2");
  const centralVectorSpanText = document.querySelectorAll(
    ".central-vector-span-text",
  );
  const whatWeHelpUpper = document.querySelectorAll(".what_we_help_upper");
  const whatWeHelpContainerUpperText = document.querySelector(
    ".what-we-help-container-upper-text",
  );
  const whatWeHelpHeader = document.querySelector(".what-we-help-header");
  const whatWeHelpHeaderSpan = document.querySelector(
    ".what-we-help-header-span",
  );
  const aboutHeaderTitle = document.querySelector(".header-title");
  const aboutHeaderTitle2 = document.querySelector(".header-title2");

  if (lang === "de") {
    middleHeader1.style.fontSize = "clamp(22px, 6vw, 100px)";
    middleHeader2.style.fontSize = "clamp(26px, 6.8vw, 100px)";
    projectHeader1.style.fontSize = "clamp(36px, 8vw, 120px)";
    projectHeader2.style.fontSize = "clamp(36px, 8vw, 120px)";
    // heroTitle2.style.fontSize = 'clamp(32px, 4.2vw, 80px)';

    if (window.innerWidth <= 480) {
      middleHeader1.style.fontSize = "clamp(1.625rem, 12vw, 5rem)";
      middleHeader2.style.fontSize = "clamp(1.625rem, 12vw, 5rem)";

      heroTitle2.style.fontSize = "clamp(2.4rem, 6vw, 3rem)";

      heroTitle2.style.fontSize = "clamp(2.4rem, 6vw, 3rem)";

      curveText.style.fontSize = "clamp(0.875rem, 4vw, 1.25rem)";
      curveTextTwo.style.fontSize = "clamp(0.875rem, 4vw, 1.25rem)";

      centralVectorText1.style.fontSize = "clamp(14px, 5vw, 26px)";
      centralVectorText2.style.fontSize = "clamp(14px, 5vw, 26px)";
      centralVectorSpanText.forEach((el) => {
        el.style.fontSize = "clamp(14px, 5vw, 26px)";
      });
      whatWeHelpUpper.forEach((el) => {
        el.style.fontSize = "clamp(14px, 4vw, 26px)";
      });
      whatWeHelpContainerUpperText.style.top = "20%";

      whatWeHelpHeader.style.fontSize = "clamp(1.875rem, 6vw, 2.3rem)";
      whatWeHelpHeaderSpan.style.fontSize = "clamp(1.875rem, 6vw, 2.3rem)";

      aboutHeaderTitle.style.fontSize = "clamp(1.625rem, 5.5vw, 2rem)";
      aboutHeaderTitle2.style.fontSize = "clamp(1.75rem, 6vw, 2.2rem)";
      aboutHeaderTitle2.style.marginTop = "0%";
      aboutHeaderTitle2.style.textAlign = "left";
    }
  }

  if (window.innerWidth <= 480) {
    if (lang === "de") {
      document.querySelector(".central-vector-main-text").innerHTML =
        'KI, die Ihren <span class="central-vector-main-span-text">Geschäftsalltag verändert</span>';
      centralVectorText1.style.fontSize = "clamp(20px, 7.6vw, 37px)";
    } else {
      document.querySelector(".central-vector-main-text").innerHTML =
        'AI that changes how<br /> your <span class="central-vector-main-span-text"> business works</span>';
    }
  }
  if (window.innerWidth <= 480) {
    if (lang === "de") {
      document.querySelector(".hero-top-text").innerHTML =
        "Unsere vollstaendige Website startet in Kuerze – fuer ein erstes Gespraech stehen wir Ihnen jedoch bereits heute gerne zur Verfuegung";
    } else {
      document.querySelector(".hero-top-text").innerHTML =
        "Our full website is launching soon —<br /> but we're already here for early conversations.";
    }
  }
  if (window.innerWidth <= 480) {
    if (lang === "de") {
      document.querySelector(".title-1").innerHTML =
        "Haben <br />Sie ein Projekt";
    } else {
      document.querySelector(".title-1").innerHTML = "Have <br />a project";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".language-option").forEach((el) => {
    el.addEventListener("click", () => applyTranslations(el.dataset.lang));
  });

  const saved = localStorage.getItem("lang");
  applyTranslations(saved === "de" ? "de" : "en");
});
