/**
 * Variety of Businesses — Slick carousel (enterprise-mobile page)
 */
(function ($) {
  'use strict';
  if (!$ || !$.fn || !$.fn.slick) return;

  function init() {
    $('[data-variety-slider]').each(function () {
      var $el = $(this);
      if ($el.hasClass('slick-initialized')) return;
      $el.slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2800,
        pauseOnHover: true,
        responsive: [
          { breakpoint: 1200, settings: { slidesToShow: 5 } },
          { breakpoint: 992, settings: { slidesToShow: 4 } },
          { breakpoint: 768, settings: { slidesToShow: 3 } },
          { breakpoint: 560, settings: { slidesToShow: 2 } },
        ],
      });
    });
  }

  $(init);
})(window.jQuery);