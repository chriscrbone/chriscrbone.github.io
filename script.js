/* ================================
   Navigation (mobile)
   ================================ */
// Support both legacy (.mobile-open) and new (.open) classes
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  const toggleMenu = () => {
    const nowOpen = navLinks.classList.toggle('open');
    // keep legacy class for older CSS
    navLinks.classList.toggle('mobile-open', nowOpen);
    hamburger.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close menu after clicking a link (better mobile UX)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open', 'mobile-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================================
   Footer year stamp
   ================================ */
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

/* ================================
   Legacy Projects (card expander)
   Works with: .project .project-toggle + .project-details
   ================================ */
document.querySelectorAll('.project').forEach((card) => {
  const btn = card.querySelector('.project-toggle');
  const details = card.querySelector('.project-details');
  if (!btn || !details) return;

  btn.addEventListener('click', () => {
    const expanded = card.classList.toggle('expanded');
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    // Smooth height animation
    if (expanded) {
      details.style.maxHeight = details.scrollHeight + 'px';
      details.style.opacity = '1';
    } else {
      details.style.maxHeight = null; // revert to CSS
      details.style.opacity = '0';
    }
  });
});

/* ================================
   New Projects (bubble expander)
   Works with: .project-bubble (title always visible),
               .bubble-body (hidden content)
   Click anywhere in the bubble to toggle.
   Only one bubble open at a time.
   ================================ */
(function () {
  const bubbles = Array.from(document.querySelectorAll('.project-bubble'));
  if (!bubbles.length) return;

  const collapseAll = () => {
    bubbles.forEach((b) => {
      b.classList.remove('expanded');
      b.setAttribute('aria-expanded', 'false');
      const body = b.querySelector('.bubble-body');
      if (body) {
        body.style.maxHeight = null;
        body.style.opacity = '0';
      }
    });
  };

  const expand = (bubble) => {
    const body = bubble.querySelector('.bubble-body');
    bubble.classList.add('expanded');
    bubble.setAttribute('aria-expanded', 'true');
    if (body) {
      requestAnimationFrame(() => {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.style.opacity = '1';
      });
    }
  };

  bubbles.forEach((bubble) => {
    // Click anywhere inside the bubble
    bubble.addEventListener('click', () => {
      if (bubble.classList.contains('expanded')) {
        collapseAll();
      } else {
        collapseAll();
        expand(bubble);
      }
    });

    // Keyboard accessibility
    bubble.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (bubble.classList.contains('expanded')) collapseAll();
        else { collapseAll(); expand(bubble); }
      }
      if (e.key === 'Escape') collapseAll();
    });
  });
})();
