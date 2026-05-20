/**
 * nav.js — 導覽列互動
 * Mobile nav drawer + active page highlight
 */
(function () {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('nav-drawer');
  const overlay = document.getElementById('nav-overlay');

  // --- Mobile Nav Toggle ---
  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    overlay.classList.add('visible');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('visible');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      const isOpen = drawer && drawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  // Click overlay to close
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // ESC key to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });

  // Click outside to close
  document.addEventListener('click', function (e) {
    if (!drawer || !toggle) return;
    const isOpen = drawer.classList.contains('open');
    if (isOpen && !drawer.contains(e.target) && !toggle.contains(e.target)) {
      closeDrawer();
    }
  });

  // --- Active Page Highlight ---
  function highlightActive() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    // Desktop nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const linkFile = href.split('/').pop() || 'index.html';
      if (linkFile === filename || (filename === '' && linkFile === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Mobile drawer links
    const drawerLinks = document.querySelectorAll('.nav-drawer a');
    drawerLinks.forEach(function (link) {
      const href = link.getAttribute('href') || '';
      const linkFile = href.split('/').pop() || 'index.html';
      if (linkFile === filename || (filename === '' && linkFile === 'index.html')) {
        link.style.color = 'var(--rust)';
        link.style.fontWeight = '700';
        link.style.borderLeftColor = 'var(--rust)';
      }
    });
  }

  highlightActive();

})();
