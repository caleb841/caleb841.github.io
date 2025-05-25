const toggleBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});


const observers = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.3 });

observers.forEach(el => observer.observe(el));





  


const scrollElements = document.querySelectorAll('.service-box, .portfolio-box');

const observerOptions = {
  threshold: 0.2
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Ajoute un délai d'animation basé sur l'index
      entry.target.style.animationDelay = `${index * 0.1}s`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

scrollElements.forEach(el => {
  el.classList.add('animate-on-scroll');
  scrollObserver.observe(el);
});


  





















  
const animateObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const el = entry.target;

      // ⭐ Animation pour service-box et portfolio-box
      if (el.classList.contains('service-box') || el.classList.contains('portfolio-box')) {
        el.classList.add('visible');
        el.style.animationDelay = `${index * 0.1}s`;
      }

      // ✨ Animation pour étoiles
      if (el.classList.contains('stars')) {
        el.classList.add('visible');
      }

      obs.unobserve(el);
    }
  });
}, { threshold: 0.2 });

// 🔄 Sélection de tous les éléments à observer
const elementsToAnimate = document.querySelectorAll(
  '.service-box, .portfolio-box, .stars'
);

// ▶️ Observation
elementsToAnimate.forEach(el => animateObserver.observe(el));



  


const words = ["Charisme.", "Pertinence.", "Éloquence."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  const textElement = document.querySelector(".text");

  if (!textElement) return;

  if (isDeleting) {
    // Effacement plus rapide que l'écriture
    typeSpeed = 50;
    charIndex--;
  } else {
    // Écriture plus lente
    typeSpeed = 150;
    charIndex++;
  }

  textElement.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex === currentWord.length) {
    // Pause à la fin du mot
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    // Petite pause avant le prochain mot
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

// Démarrer l'animation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', type);










function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer pour démarrer l'animation des compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = {
                companiesCount: 20,   // 20+ entreprises
                clientsCount: 98,     // 98% de clients satisfaits
                yearsCount: 25       // 25+ ans d'expérience
            };

            Object.entries(counters).forEach(([id, value]) => {
                const element = document.getElementById(id);
                if (element) {
                    animateCounter(element, 0, value, 2000);
                }
            });

            counterObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

// Observer la section des compteurs
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    counterObserver.observe(counterSection);
}







  document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const modal = document.getElementById('confirmationModal');
  const closeBtn = document.getElementById('closeModal');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        modal.style.display = 'flex';
      } else {
        alert("Une erreur est survenue lors de l'envoi.");
      }
    } catch {
      alert("Erreur réseau.");
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

// Animation au scroll pour les formations
document.addEventListener('DOMContentLoaded', function() {
    const formationCards = document.querySelectorAll('.formation-card');
    const formationTitle = document.querySelector('.formations .section-title');

    // Ajouter l'attribut order à chaque carte
    formationCards.forEach((card, index) => {
        card.style.setProperty('--order', index + 1);
    });

    // Créer l'observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observer le titre et les cartes
    if (formationTitle) observer.observe(formationTitle);
    formationCards.forEach(card => observer.observe(card));
});

// Animation au scroll pour le formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const contactTitle = document.querySelector('.contact .section-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observer le titre et le formulaire
    if (contactTitle) observer.observe(contactTitle);
    if (contactForm) observer.observe(contactForm);
});
