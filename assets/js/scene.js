/**
 * scene.js — 首頁場景視差 + 卡片入場動畫
 */
(function () {
  'use strict';

  // 檢查是否偏好減少動畫
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 視差滾動 ---
  const layerMountain = document.querySelector('.layer-mountain');
  const layerMid = document.querySelector('.layer-mid');
  const layerSky = document.querySelector('.layer-sky');

  let ticking = false;
  let lastScrollY = 0;

  function updateParallax() {
    const scrollY = lastScrollY;

    if (layerSky) {
      layerSky.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
    }
    if (layerMountain) {
      layerMountain.style.transform = 'translateY(' + (scrollY * 0.1) + 'px)';
    }
    if (layerMid) {
      layerMid.style.transform = 'translateY(' + (scrollY * 0.05) + 'px)';
    }

    ticking = false;
  }

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking && !prefersReducedMotion) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  if (!prefersReducedMotion) {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- 卡片入場動畫 (IntersectionObserver) ---
  const cards = document.querySelectorAll('.func-card');

  if ('IntersectionObserver' in window && cards.length > 0) {
    const cardObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // 加入 visible class，觸發 CSS 動畫
            entry.target.classList.add('visible');
            // 只觸發一次
            cardObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    cards.forEach(function (card) {
      cardObserver.observe(card);
    });
  } else {
    // fallback：直接顯示
    cards.forEach(function (card) {
      card.classList.add('visible');
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }

  // --- 下載項目動畫 ---
  const downloadItems = document.querySelectorAll('.download-item');

  if ('IntersectionObserver' in window && downloadItems.length > 0) {
    const dlObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            setTimeout(function () {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0)';
            }, i * 60);
            dlObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    downloadItems.forEach(function (item) {
      if (!prefersReducedMotion) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-12px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      }
      dlObserver.observe(item);
    });
  }

})();
