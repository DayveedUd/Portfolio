/* =====================================================
   EDIT ME — YOUR INFO
   Update the values below to personalize the site.
   Nothing else in this file needs to change to do that.
===================================================== */
const portfolioData = {
  name: "David",
  title: "Web Developer & Creative Problem Solver",
  bio: "I am a web developer with a background in Chemical Engineering and a growing passion for building for the web.",
  email: "udoinyangdavid2@gmail.com",
  github: "https://github.com/DayveedUd",
  linkedin: "https://linkedin.com/in/david-udoinyang-80632a223",
};

/* =====================================================
   EDIT ME — YOUR PROJECTS
  Add a new project by adding another object to this array.
  `image` should point to the project's landing-page screenshot,
  e.g. "images/project4.png".
===================================================== */
const projects = [
  {
    title: "Hallows Estate",
    description:
      "A residential estate management platform with a public landing page and a private resident portal — bills, maintenance requests, announcements, facility bookings and documents in one place.",
    longDescription:
      "Built for a residential estate, Hallows Estate pairs a public-facing landing page (service inquiries, amenities, FAQs) with a resident portal covering five areas: Bills & Payments, Maintenance & Complaints, Announcements & News, Facilities Booking, and Documents. The backend is a modular Express and Mongoose setup with separate route and model files, handling both admin and resident authentication.",
    image: "images/project1.png",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://hallowsestate.vercel.app/",
    githubUrl: "https://github.com/DayveedUd/Hallows-Estate",
  },
  {
    title: "NIMC Software Unit Corps Member/Intern Database",
    description:
      "An intern and corps member management web app built for the software unit of the National Identity Management Commission (NIMC) — registration, an admin dashboard, and staff profiles.",
    longDescription:
      "A multi-page application built from hand-drawn wireframes for the NIMC's software unit's intern and corps member records: a registration flow, an admin dashboard, and individual employee profile pages. Authentication uses JWT and bcryptjs to protect profile data, with server-side validation on uploaded photos and MongoDB Atlas for storage.",
    image: "images/project2.png",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "bcryptjs"],
    liveUrl: "https://nimc-software-unit-employee.vercel.app/",
    githubUrl: "https://github.com/DayveedUd/NIMC-Software-Unit-Employee",
  },
  {
    title: "The Top Fashion",
    description:
      "A platform for an independent fashion designer to showcase collections and let customers request outfits, browse and get in touch about pieces.",
    longDescription:
      "A web presence built for an independent fashion label — a clean, image-led layout for browsing collections, with a straightforward path for visitors to reach out about a piece they're interested in. Built with a focus on fast load times and a simple content structure the designer can keep up to date.",
    image: "images/project3.png",
    technologies: ["HTML", "CSS", "JavaScript", "MongoDB"],
    liveUrl: "https://the-top-fashion.vercel.app/",
    githubUrl: "https://github.com/DayveedUd/The-Top-Fashion",
  },
];

/* =====================================================
   RENDER PROJECT CARDS
===================================================== */
const projectGrid = document.getElementById("projectGrid");

function renderProjects() {
  projectGrid.innerHTML = projects
    .map((project, index) => {
      const media = `<img class="project-image" src="${project.image}" alt="Screenshot of the landing page for ${project.title}" loading="lazy">`;

      const techTags = project.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("");

      return `
        <article class="project-card" data-project-index="${index}" tabindex="0" role="button" aria-label="View details for ${project.title}">
          <div class="project-card__media">${media}</div>
          <div class="project-card__body">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__desc">${project.description}</p>
            <div class="project-card__tech">${techTags}</div>
            <div class="project-card__actions">
              <a href="${project.liveUrl}" class="btn btn--primary" target="_blank" rel="noopener" onclick="event.stopPropagation()">View Project</a>
              <a href="${project.githubUrl}" class="btn btn--ghost" target="_blank" rel="noopener" onclick="event.stopPropagation()">View Code</a>
            </div>
          </div>
        </article>`;
    })
    .join("");

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openModal(Number(card.dataset.projectIndex)));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(Number(card.dataset.projectIndex));
      }
    });
  });
}

/* =====================================================
   PROJECT MODAL
===================================================== */
const modal = document.getElementById("projectModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalMedia = document.getElementById("modalMedia");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalNote = document.getElementById("modalNote");
const modalLive = document.getElementById("modalLive");
const modalCode = document.getElementById("modalCode");

let lastFocusedElement = null;

function openModal(index) {
  const project = projects[index];
  if (!project) return;

  lastFocusedElement = document.activeElement;

  modalMedia.innerHTML = `<img class="project-image" src="${project.image}" alt="Screenshot of the landing page for ${project.title}">`;

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.longDescription || project.description;
  modalTech.innerHTML = project.technologies
    .map((tech) => `<span class="tech-tag">${tech}</span>`)
    .join("");
  modalNote.textContent = "Built as a real-world tool for an actual user, not a demo.";
  modalLive.href = project.liveUrl;
  modalCode.href = project.githubUrl;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

/* =====================================================
   MOBILE NAV
===================================================== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =====================================================
   SMOOTH SCROLL + STICKY NAV BACKGROUND
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const navWrap = document.querySelector(".nav-wrap");
window.addEventListener("scroll", () => {
  navWrap.classList.toggle("is-scrolled", window.scrollY > 12);
});

/* =====================================================
   ACTIVE NAV LINK ON SCROLL
===================================================== */
const sections = document.querySelectorAll("main > section[id]");
const navLinkEls = document.querySelectorAll("[data-nav-link]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinkEls.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

/* =====================================================
   SCROLL REVEAL ANIMATIONS
===================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

/* =====================================================
   TERMINAL TYPING EFFECT (single hero moment)
===================================================== */
function initTerminalTyping() {
  const output = document.getElementById("typedOutput");
  const cursor = document.getElementById("typedCursor");
  if (!output) return;

  const lines = [
    "Available for focused builds.",
    "Full-stack web applications.",
    "HTML · CSS · JS · Node · MongoDB.",
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    output.textContent = lines[0];
    if (cursor) cursor.style.display = "none";
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentLine = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      output.textContent = currentLine.slice(0, charIndex);
      if (charIndex === currentLine.length) {
        deleting = false;
        setTimeout(() => {
          deleting = true;
          tick();
        }, 1600);
        return;
      }
    } else {
      charIndex--;
      output.textContent = currentLine.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }

    setTimeout(tick, deleting ? 25 : 45);
  }

  tick();
}

/* =====================================================
   APPLY CONTACT INFO FROM portfolioData
===================================================== */
function applyContactInfo() {
  document.getElementById("contactEmail").href = `mailto:${portfolioData.email}`;

  document.getElementById("contactGithub").href = portfolioData.github;

  document.getElementById("contactLinkedin").href = portfolioData.linkedin;
}

/* =====================================================
   INIT
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  applyContactInfo();
  initTerminalTyping();
});