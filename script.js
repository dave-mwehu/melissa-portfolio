const mediaBase = "assets/";

const mediaFiles = [
  "IMG-20251003-WA0034.jpg",
  "IMG-20260207-WA0001.jpg",
  "IMG-20260207-WA0002.jpg",
  "IMG-20260207-WA0005.jpg",
  "IMG-20260207-WA0006.jpg",
  "IMG-20260207-WA0007.jpg",
  "IMG-20260207-WA0009.jpg",
  "IMG-20260207-WA0011.jpg",
  "IMG-20260207-WA0012.jpg",
  "IMG-20260207-WA0013.jpg",
  "IMG-20260207-WA0016.jpg",
  "IMG-20260207-WA0019.jpg",
  "IMG-20260207-WA0020.jpg",
  "IMG-20260207-WA0021.jpg",
  "IMG-20260207-WA0022.jpg",
  "IMG-20260207-WA0023.jpg",
  "IMG-20260207-WA0024.jpg",
  "IMG-20260207-WA0025.jpg",
  "IMG-20260207-WA0026.jpg",
  "IMG-20260207-WA0028.jpg",
  "IMG-20260207-WA0029.jpg",
  "IMG-20260207-WA0030.jpg",
  "IMG-20260207-WA0031.jpg",
  "IMG-20260207-WA0032.jpg",
  "IMG-20260207-WA0033.jpg",
  "IMG-20260207-WA0034.jpg",
  "IMG-20260207-WA0035.jpg",
  "IMG-20260207-WA0036.jpg",
  "IMG-20260207-WA0037.jpg",
  "IMG-20260207-WA0038.jpg",
  "IMG-20260207-WA0039.jpg",
  "IMG-20260207-WA0040.jpg",
  "IMG-20260207-WA0041.jpg",
  "IMG-20260207-WA0042.jpg",
  "IMG-20260207-WA0043.jpg",
  "IMG-20260207-WA0044.jpg",
  "IMG-20260207-WA0045.jpg",
  "IMG-20260207-WA0046.jpg",
  "IMG-20260207-WA0047.jpg",
  "IMG-20260207-WA0048.jpg",
  "IMG-20260207-WA0049.jpg",
  "IMG-20260207-WA0050.jpg",
  "IMG-20260207-WA0051.jpg",
  "IMG-20260207-WA0052.jpg",
  "IMG-20260207-WA0053.jpg",
  "IMG-20260207-WA0054.jpg",
  "IMG-20260207-WA0055.jpg",
  "IMG-20260207-WA0056.jpg",
  "VID-20260207-WA0008.mp4",
  "VID-20260207-WA0010.mp4",
  "VID-20260207-WA0015.mp4",
  "VID-20260207-WA0017.mp4",
  "VID-20260207-WA0018.mp4",
  "VID-20260207-WA0027.mp4",
  "VID-20260207-WA0058.mp4",
  "VID-20260207-WA0059.mp4",
  "VID-20260207-WA0060.mp4",
  "VID-20260207-WA0061.mp4",
  "VID-20260207-WA0062.mp4",
  "VID-20260207-WA0063.mp4",
  "VID-20260207-WA0064.mp4",
  "VID-20260207-WA0065.mp4",
  "VID-20260207-WA0066.mp4",
  "VID-20260207-WA0067.mp4"
];

const captionOverrides = {
  "IMG-20260207-WA0012.jpg": "Tellement belle",
  "IMG-20260207-WA0013.jpg": "Remise de certification",
  "IMG-20260207-WA0007.jpg": "Mon dessin",
  "IMG-20260207-WA0025.jpg": "Moment de folie",
  "IMG-20260207-WA0055.jpg": "Son amour pour les peluches",
  "IMG-20260207-WA0034.jpg": "Lumière qui reste"
};

const poeticCaptions = [
  "Lumière du matin",
  "Regards tranquilles",
  "Détails qui rassurent",
  "Mouvement doux",
  "Silence habité",
  "Gestes simples",
  "Chaleur légère",
  "Sourire discret",
  "Présence en mouvement",
  "Clarté intérieure",
  "Douceur affirmée",
  "Éclat calme",
  "Respiration lente",
  "Moment suspendu",
  "Tendresse discrète",
  "Ligne de lumière",
  "Équilibre paisible",
  "Voix intérieure",
  "Aura légère",
  "Trace douce",
  "Écoute profonde",
  "Calme partagé",
  "Geste attentif",
  "Lumière d’hiver",
  "Souvenir vivant",
  "Présence apaisante",
  "Simplicité vraie",
  "Nuance humaine",
  "Clarté douce",
  "Élan sincère",
  "Respirer ensemble",
  "Rythme tranquille",
  "Instant sûr",
  "Lueur intime",
  "Cœur posé",
  "Esprit serein"
];

const featuredFiles = new Set(["IMG-20260207-WA0034.jpg"]);

const parseMediaMeta = (fileName) => {
  const dateMatch = fileName.match(/-(\d{8})-/);
  const seqMatch = fileName.match(/WA(\d+)/i);
  const date = dateMatch ? Number(dateMatch[1]) : 0;
  const seq = seqMatch ? Number(seqMatch[1]) : 0;
  return { date, seq };
};

const galleryItems = mediaFiles
  .slice()
  .sort((a, b) => {
    const metaA = parseMediaMeta(a);
    const metaB = parseMediaMeta(b);
    if (metaA.date !== metaB.date) {
      return metaA.date - metaB.date;
    }
    return metaA.seq - metaB.seq;
  })
  .map((fileName, index) => {
    const caption =
      captionOverrides[fileName] ||
      poeticCaptions[index % poeticCaptions.length];
    return {
      type: fileName.toLowerCase().endsWith(".mp4") ? "video" : "image",
      src: fileName,
      caption,
      featured: featuredFiles.has(fileName)
    };
  });

const galleryGrid = document.querySelector("#galleryGrid");

const toTitle = (fileName) =>
  fileName
    .replace(/(IMG|VID)-/i, "")
    .replace(/\.(jpg|mp4)$/i, "")
    .replace(/-/g, " ")
    .trim();

const createGalleryItem = (item) => {
  const figure = document.createElement("figure");
  figure.className = "gallery-item fade-up";
  if (item.featured) {
    figure.classList.add("featured");
  }

  const captionText = item.caption || toTitle(item.src);

  if (item.type === "video") {
    const video = document.createElement("video");
    video.dataset.src = `${mediaBase}${item.src}`;
    video.controls = true;
    video.preload = "none";
    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });
    video.addEventListener("mouseleave", () => {
      video.pause();
    });
    figure.appendChild(video);
  } else {
    const img = document.createElement("img");
    img.dataset.src = `${mediaBase}${item.src}`;
    img.alt = captionText;
    img.loading = "lazy";
    figure.appendChild(img);
  }

  const caption = document.createElement("figcaption");
  caption.textContent = captionText;
  figure.appendChild(caption);
  return figure;
};

if (galleryGrid) {
  galleryItems.forEach((item) => {
    galleryGrid.appendChild(createGalleryItem(item));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const media = entry.target.querySelector("img, video");
      if (media && media.dataset && media.dataset.src) {
        media.src = media.dataset.src;
        media.removeAttribute("data-src");
        if (media.tagName.toLowerCase() === "video") {
          media.load();
        }
      }

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

const revealElements = document.querySelectorAll(
  ".card, .panel, .gallery-item, .hero-content, .hero-media, .section-heading"
);

const staggerTargets = document.querySelectorAll(
  ".card, .panel, .gallery-item"
);

staggerTargets.forEach((el, index) => {
  el.style.transitionDelay = `${index * 60}ms`;
});

revealElements.forEach((el) => {
  el.classList.add("fade-up");
  observer.observe(el);
});

const heroImage = document.querySelector(".hero-media img");
let lastKnownScroll = 0;
let ticking = false;

const handleParallax = () => {
  const offset = Math.min(lastKnownScroll * 0.1, 40);
  if (heroImage) {
    heroImage.style.transform = `translateY(${offset}px)`;
  }
  ticking = false;
};

if (heroImage) {
  heroImage.classList.add("parallax");
  window.addEventListener(
    "scroll",
    () => {
      lastKnownScroll = window.scrollY || window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(handleParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

const secretToggle = document.querySelector(".secret-toggle");
const footerReveal = document.querySelector(".footer-reveal");
const secretSection = document.querySelector("#secret");
const themeToggle = document.querySelector(".theme-toggle");

const toggleSecret = (trigger) => {
  if (!secretSection || !trigger) {
    return;
  }

  const isHidden = secretSection.hasAttribute("hidden");
  if (isHidden) {
    secretSection.removeAttribute("hidden");
    requestAnimationFrame(() => {
      secretSection.classList.add("revealed");
    });
    secretSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    secretSection.classList.remove("revealed");
    secretSection.setAttribute("hidden", "");
  }
  trigger.setAttribute("aria-expanded", String(isHidden));
};

if (secretToggle) {
  secretToggle.addEventListener("click", () => toggleSecret(secretToggle));
}

if (footerReveal) {
  footerReveal.addEventListener("click", () => toggleSecret(footerReveal));
}

const applyTheme = (theme) => {
  document.body.classList.remove("theme-dark", "theme-light");
  if (theme === "dark") {
    document.body.classList.add("theme-dark");
  }
  if (theme === "light") {
    document.body.classList.add("theme-light");
  }
  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.textContent = isDark ? "mode clair" : "mode sombre";
  }
};

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(storedTheme || (prefersDark ? "dark" : "light"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    const nextTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}
