/* ═══════════════════════════════════════════════
   KINGSLEY EZEKIEL NABLA — Portfolio Scripts
   ═══════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-card, .mosaic-cell').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width  = '56px';
    follower.style.height = '56px';
    follower.style.borderColor = 'rgba(91,95,239,0.9)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width  = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(91,95,239,0.5)';
  });
});

/* ── NAV SCROLL EFFECT ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE NAV TOGGLE ── */
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

// Close on link click
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        siblings.forEach((el, idx) => {
          if (el === entry.target) {
            setTimeout(() => el.classList.add('visible'), 0);
          }
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SKILL BAR ANIMATION ── */
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          setTimeout(() => bar.classList.add('animate'), 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── ACTIVE NAV LINK HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = '#ffffff';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Message sent! ✓';
    btn.style.background = '#22c55e';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ── HERO PARALLAX (subtle) ── */
const heroOrb1 = document.querySelector('.hero-orb-1');
const heroOrb2 = document.querySelector('.hero-orb-2');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroOrb1) heroOrb1.style.transform = `translateY(${scrolled * 0.2}px)`;
  if (heroOrb2) heroOrb2.style.transform = `translateY(${scrolled * 0.12}px)`;
}, { passive: true });

/* ── STAGGER REVEAL for grid items ── */
document.querySelectorAll('.projects-grid, .skills-grid, .process-steps').forEach(grid => {
  const items = grid.querySelectorAll('.reveal');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 80}ms`;
  });
});
