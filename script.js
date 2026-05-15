// Minimal lead storage for landing contact forms.
const SixNineStore = {
  uid: (prefix = 'ID') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  getLandingLeads: () => JSON.parse(localStorage.getItem('sixnine-leads') || '[]'),
  saveLandingLeads: (leads) => localStorage.setItem('sixnine-leads', JSON.stringify(leads)),
};

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const themeButtons = document.querySelectorAll("[data-theme-toggle], [data-theme-toggle-mobile]");

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  localStorage.setItem("sixnine-theme", theme);
  document.querySelector("[data-theme-toggle]")?.setAttribute(
    "aria-label",
    theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
  );
  document.querySelector("[data-theme-toggle-mobile]")?.setAttribute(
    "aria-label",
    theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro",
  );
  const mobileThemeButton = document.querySelector("[data-theme-toggle-mobile]");
  if (mobileThemeButton) {
    mobileThemeButton.textContent = theme === "dark" ? "Modo claro" : "Modo oscuro";
  }
};

setTheme(localStorage.getItem("sixnine-theme") || "light");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(document.body.dataset.theme === "dark" ? "light" : "dark");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

menuButton?.addEventListener("click", () => {
  mobilePanel?.classList.toggle("is-open");
});

mobilePanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobilePanel.classList.remove("is-open");
  });
});

const expandableCards = [...document.querySelectorAll("[data-expand-card]")];

const setExpandedCard = (card) => {
  const group = card.dataset.expandGroup;
  const groupCards = group
    ? expandableCards.filter((item) => item.dataset.expandGroup === group)
    : [card];
  const shouldOpen = !card.classList.contains("is-expanded");

  groupCards.forEach((item) => {
    const isCurrent = item === card && shouldOpen;
    item.classList.toggle("is-expanded", isCurrent);
    item.setAttribute("aria-expanded", String(isCurrent));
  });
};

expandableCards.forEach((card) => {
  card.addEventListener("click", () => setExpandedCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setExpandedCard(card);
    }
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const contactMessage = document.querySelector("[data-contact-message]");
const googleSheetURL = "https://script.google.com/macros/s/AKfycbxYexd7sD_3Mvh4QUX_3JcqAVSyUfALT5lfp_HOh69Kcpqhcz9YyYZW0sjNr0gioeMj/exec";

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.textContent || "Enviar consulta";
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  const searchParams = new URLSearchParams(formData);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
  }
  if (contactMessage) {
    contactMessage.textContent = "";
  }

  const lead = {
    id: SixNineStore.uid("LEAD"),
    createdAt: new Date().toISOString(),
    name: data.nombre,
    email: data.correo,
    phone: "",
    service: data.servicio,
    message: data.mensaje,
    source: "Formulario landing",
    status: "nuevo",
    estimatedValue: 0,
  };

  try {
    await fetch(googleSheetURL, {
      method: "POST",
      body: searchParams,
      mode: "no-cors",
    });

    SixNineStore.saveLandingLeads([lead, ...SixNineStore.getLandingLeads()]);
    contactForm.reset();
    if (contactMessage) {
      contactMessage.textContent = "Consulta enviada con exito. Te responderemos para revisar el proyecto y definir el siguiente paso.";
    }
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    if (contactMessage) {
      contactMessage.textContent = "Hubo un error al enviar la consulta. Intenta nuevamente o escribinos por WhatsApp.";
    }
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
});

const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselSlides = [...document.querySelectorAll(".portfolio-slide")];
const carouselDots = document.querySelector("[data-carousel-dots]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
let activeSlide = 0;

const updateCarousel = (index) => {
  if (!carouselTrack || carouselSlides.length === 0) return;

  activeSlide = (index + carouselSlides.length) % carouselSlides.length;
  carouselTrack.style.transform = `translateX(-${activeSlide * 100}%)`;

  carouselSlides.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === activeSlide);
  });

  carouselDots?.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
};

if (carouselTrack && carouselDots) {
  if (carouselSlides.length <= 1) {
    carouselPrev?.parentElement?.classList.add("is-hidden");
    carouselDots.classList.add("is-hidden");
  }

  carouselSlides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver proyecto ${index + 1}`);
    dot.addEventListener("click", () => updateCarousel(index));
    carouselDots.appendChild(dot);
  });

  carouselPrev?.addEventListener("click", () => updateCarousel(activeSlide - 1));
  carouselNext?.addEventListener("click", () => updateCarousel(activeSlide + 1));
  window.addEventListener("resize", () => updateCarousel(activeSlide));
  updateCarousel(0);
}

const servicesTrack = document.querySelector("[data-services-track]");
const serviceSlides = [...document.querySelectorAll(".service-slide")];
const servicesPrev = document.querySelector("[data-services-prev]");
const servicesNext = document.querySelector("[data-services-next]");
let activeService = 0;
let servicesTimer;

const updateServicesCarousel = (index) => {
  if (!servicesTrack || serviceSlides.length === 0) return;

  const servicesCarousel = servicesTrack.parentElement;
  activeService = (index + serviceSlides.length) % serviceSlides.length;
  servicesCarousel?.scrollTo({
    left: serviceSlides[activeService].offsetLeft - servicesTrack.offsetLeft,
    behavior: "smooth",
  });

  serviceSlides.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === activeService);
  });
};

const restartServicesTimer = () => {
  window.clearInterval(servicesTimer);
  servicesTimer = window.setInterval(() => updateServicesCarousel(activeService + 1), 5000);
};

if (servicesTrack && serviceSlides.length > 0) {
  const moveServices = (index) => {
    updateServicesCarousel(index);
    restartServicesTimer();
  };

  servicesTrack.parentElement?.addEventListener("scroll", () => {
    const servicesCarousel = servicesTrack.parentElement;
    if (!servicesCarousel) return;

    const closestIndex = serviceSlides.reduce((closest, slide, index) => {
      const currentDistance = Math.abs((slide.offsetLeft - servicesTrack.offsetLeft) - servicesCarousel.scrollLeft);
      const closestDistance = Math.abs((serviceSlides[closest].offsetLeft - servicesTrack.offsetLeft) - servicesCarousel.scrollLeft);
      return currentDistance < closestDistance ? index : closest;
    }, activeService);

    activeService = closestIndex;
    serviceSlides.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === activeService);
    });
  }, { passive: true });

  servicesPrev?.addEventListener("click", () => moveServices(activeService - 1));
  servicesNext?.addEventListener("click", () => moveServices(activeService + 1));
  window.addEventListener("resize", () => updateServicesCarousel(activeService));
  updateServicesCarousel(0);
  restartServicesTimer();
}
