/* movimento.js — movimento DESTE site, reproduzido do site de referência (Kit de Design, seção "Movimento").
   A referência (choosetotransform.com) quase não se move: sem entrada de seção, sem efeito ligado à rolagem,
   cabeçalho que rola com a página. O que ela tem (hover de botão que enche de bronze em 0,1s e o fade do menu do
   celular em 0,4s) está no style.css. Aqui fica só o acordeão das dúvidas, que a referência não tem: abertura com
   altura suave de ~300ms (o ícone "+" gira 45° pelo CSS). Tudo respeita prefers-reduced-motion. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.acordeao details').forEach(function (det) {
    var resumo = det.querySelector('summary');
    var corpo = det.querySelector('.acordeao__resposta');
    if (!resumo || !corpo) return;
    var animando = false;
    resumo.addEventListener('click', function (e) {
      e.preventDefault();
      if (animando) return;
      animando = true;
      var abrir = !det.open;
      if (abrir) det.open = true;
      var alvo = corpo.scrollHeight;
      var anim = corpo.animate(
        abrir
          ? [{ height: '0px', opacity: 0 }, { height: alvo + 'px', opacity: 1 }]
          : [{ height: alvo + 'px', opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: 300, easing: 'ease' }
      );
      anim.onfinish = function () {
        if (!abrir) det.open = false;
        animando = false;
      };
    });
  });
})();

/* Âncoras: o cabeçalho é absoluto (rola com a página, como na referência), então o deslocamento negativo que o
   main.js passa ao Lenis sobra. Zera aqui; o respiro acima do título vem do scroll-margin do base.css. */
(function () {
  'use strict';
  if (window.__lenis && window.__lenis.options) window.__lenis.options.anchors = { offset: 0 };
})();
