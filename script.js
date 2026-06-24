/* ==========================================================
   MURTAZA MIRZA — PORTFOLIO SCRIPTS
   Theme toggle, scroll effects, reveal animations, cursor.
   ========================================================== */

(function () {
  'use strict';

  /* ---------- 1. THEME TOGGLE ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  // Load saved preference or respect system
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initialTheme);

  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- 2. NAV SCROLL STATE ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. MOBILE MENU ---------- */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  burger?.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu?.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      mobileMenu?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  /* ---------- 4. SCROLL REVEAL (Intersection Observer) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ---------- 5. CUSTOM CURSOR (desktop only) ---------- */
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    // Smooth follower
    const animate = () => {
      fx += (mx - fx) * 0.15;
      fy += (my - fy) * 0.15;
      follower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    animate();

    // Hover states
    const hoverTargets = document.querySelectorAll('a, button, .project, .skill-card, .process__step');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => follower.classList.add('hover'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
  }

  /* ---------- 6. SMOOTH ANCHOR SCROLL (fallback for older browsers) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ---------- 7. ACTIVE NAV LINK HIGHLIGHT ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__menu a');

  if ('IntersectionObserver' in window && sections.length) {
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.style.color =
                link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => navIO.observe(s));
  }

  /* ---------- 8. CONSOLE GREETING ---------- */
  console.log(
    '%c◐ Murtaza Mirza — Portfolio',
    'font: 600 16px Inter, sans-serif; color: #5eaafd;'
  );
  console.log(
    '%cDesigned & built with care in Jhelum, Pakistan.',
    'color: #888; font-size: 12px;'
  );
})();
