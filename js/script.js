function goTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function loadCode(file, id, btn) {
  const box = document.getElementById(id);
  const originalLabel = btn.dataset.showLabel || btn.innerText.trim();

  if (!btn.dataset.showLabel) {
    btn.dataset.showLabel = originalLabel;
  }

  if (box.style.display === "block") {
    box.style.display = "none";
    btn.innerText = btn.dataset.showLabel;
    return;
  }

  fetch(file + "?v=" + new Date().getTime())
    .then((response) => response.text())
    .then((data) => {
      box.textContent = data;
      box.style.display = "block";
      btn.innerText = originalLabel.replace(/^Show/i, "Hide");
    })
    .catch(() => {
      box.textContent = "Error loading file.";
      box.style.display = "block";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const topBtn = document.getElementById("topBtn");
  const sections = document.querySelectorAll("main section.container, .hero-panel, .page-banner");
  const questionSections = document.querySelectorAll(".page-library main section.container.my-5");

  sections.forEach((section) => {
    section.classList.add("reveal-section");
  });

  questionSections.forEach((section, index) => {
    if (!section.querySelector(".question-number")) {
      const badge = document.createElement("div");
      badge.className = "question-number";
      badge.textContent = `Question ${index + 1}`;
      section.prepend(badge);
    }

    const alertBox = section.querySelector(".alert");
    const firstStrong = alertBox ? alertBox.querySelector("strong") : null;

    if (firstStrong) {
      const labelText = firstStrong.textContent.trim().toLowerCase().replace(/\s+/g, " ");

      if (labelText === "question:" || labelText === "question :" || labelText === "question") {
        const nextNode = firstStrong.nextSibling;
        firstStrong.remove();

        if (nextNode && nextNode.nodeType === Node.TEXT_NODE) {
          nextNode.textContent = nextNode.textContent.replace(/^\s*:?\s*/, "");
        }
      }
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("revealed"));
  }

  if (topBtn) {
    const toggleTopButton = () => {
      topBtn.classList.toggle("show", window.scrollY > 280);
    };

    toggleTopButton();
    window.addEventListener("scroll", toggleTopButton);
  }
});
