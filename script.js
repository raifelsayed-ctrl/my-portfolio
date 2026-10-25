// Independent image galleries for every project.
document.querySelectorAll(".project-gallery").forEach((gallery) => {
  const images = Array.from(
    gallery.querySelectorAll(".gallery-image")
  );

  const previousButton = gallery.querySelector(".previous");
  const nextButton = gallery.querySelector(".next");
  const counter = gallery.querySelector(".gallery-counter");

  if (images.length === 0) {
    if (previousButton) previousButton.hidden = true;
    if (nextButton) nextButton.hidden = true;
    if (counter) counter.hidden = true;
    return;
  }

  // Ensure that only one image is active initially.
  let current = images.findIndex((image) =>
    image.classList.contains("active")
  );

  if (current < 0) current = 0;

  images.forEach((image, index) => {
    image.classList.toggle("active", index === current);
  });

  function updateGallery() {
    images.forEach((image, index) => {
      image.classList.toggle("active", index === current);
    });

    if (counter) {
      counter.textContent = `${current + 1} / ${images.length}`;
    }

    // Hide navigation arrows when there is only one image.
    const hasMultipleImages = images.length > 1;

    if (previousButton) {
      previousButton.hidden = !hasMultipleImages;
    }

    if (nextButton) {
      nextButton.hidden = !hasMultipleImages;
    }
  }

  function showImage(direction) {
    if (images.length <= 1) return;

    current =
      (current + direction + images.length) % images.length;

    updateGallery();
  }

  if (previousButton) {
    previousButton.addEventListener("click", () => {
      showImage(-1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showImage(1);
    });
  }

  // Enable left/right keyboard navigation when the gallery is focused.
  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showImage(-1);
    } else if (event.key === "ArrowRight") {
      showImage(1);
    }
  });

  updateGallery();
});


// Mobile navigation menu.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const navigationLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  if (!menuToggle || !navigation) return;

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      navigation.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");
      document.body.classList.add("menu-open");
    }
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close the menu with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Reset the mobile menu when switching to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}


// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px 30px 0px"
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}


// Highlight the navigation link for the current section.
const sections = document.querySelectorAll(
  "main section[id]"
);

if ("IntersectionObserver" in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navigationLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// Keep the footer year current.
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
