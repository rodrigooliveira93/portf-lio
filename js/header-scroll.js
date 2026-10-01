(function () {
  var header = document.getElementById("main-header");
  if (!header) {
    return;
  }

  var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
  var scrollThreshold = 12;
  var isTicking = false;

  function updateHeader() {
    var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    var scrollDelta = currentScrollTop - lastScrollTop;

    if (Math.abs(scrollDelta) < scrollThreshold) {
      isTicking = false;
      return;
    }

    if (currentScrollTop <= 0) {
      header.classList.remove("header-hidden");
    } else if (scrollDelta > 0) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastScrollTop = currentScrollTop;
    isTicking = false;
  }

  function toggleHeaderOnScroll() {
    if (isTicking) {
      return;
    }

    isTicking = true;
    window.requestAnimationFrame(updateHeader);
  }

  window.addEventListener("scroll", toggleHeaderOnScroll, { passive: true });
})();
