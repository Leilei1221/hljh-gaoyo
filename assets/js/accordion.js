/**
 * accordion.js — 手風琴展開/收合
 * smooth max-height transition
 */
(function () {
  'use strict';

  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(function (accordion) {
    const header = accordion.querySelector('.accordion-header');
    const body = accordion.querySelector('.accordion-body');

    if (!header || !body) return;

    // 設定初始高度
    body.style.maxHeight = '0';

    header.addEventListener('click', function () {
      const isOpen = accordion.classList.contains('open');

      // 關閉其他（可選：若需要只開一個取消此區塊）
      // accordions.forEach(function(other) {
      //   if (other !== accordion && other.classList.contains('open')) {
      //     other.classList.remove('open');
      //     other.querySelector('.accordion-body').style.maxHeight = '0';
      //   }
      // });

      if (isOpen) {
        // 關閉
        accordion.classList.remove('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        // 強制觸發 reflow
        body.offsetHeight; // eslint-disable-line no-unused-expressions
        body.style.maxHeight = '0';
        header.setAttribute('aria-expanded', 'false');
      } else {
        // 開啟
        accordion.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        header.setAttribute('aria-expanded', 'true');

        // 動畫結束後設為 auto（允許內容高度變動）
        body.addEventListener('transitionend', function onEnd() {
          if (accordion.classList.contains('open')) {
            body.style.maxHeight = 'none';
          }
          body.removeEventListener('transitionend', onEnd);
        });
      }
    });

    // 初始 ARIA
    header.setAttribute('aria-expanded', 'false');
    const bodyId = 'accordion-body-' + Math.random().toString(36).slice(2, 7);
    body.setAttribute('id', bodyId);
    header.setAttribute('aria-controls', bodyId);
  });

})();
