(function () {
  var DURATION_MS = 360;

  function getHeaderOffset() {
    var header = document.getElementById("main-header");
    if (!header) {
      return 0;
    }

    return (header.offsetHeight || 0) + 8;
  }

  function animateLinearScroll(targetY) {
    var startY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var maxY = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
    var endY = Math.min(Math.max(targetY, 0), maxY);
    var distance = endY - startY;
    var startTime = null;

    function step(now) {
      if (startTime === null) {
        startTime = now;
      }

      var elapsed = now - startTime;
      var progress = Math.min(elapsed / DURATION_MS, 1);
      var nextY = startY + distance * progress;

      window.scrollTo(0, nextY);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function onAnchorClick(event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) {
      return;
    }

    var href = link.getAttribute("href");
    if (!href || href.length <= 1) {
      return;
    }

    var target = document.getElementById(href.slice(1));
    if (!target) {
      return;
    }

    event.preventDefault();

    var targetY =
      target.getBoundingClientRect().top +
      (window.pageYOffset || document.documentElement.scrollTop || 0) -
      getHeaderOffset();

    animateLinearScroll(targetY);
    window.history.replaceState(null, "", href);
  }

  document.addEventListener("click", onAnchorClick);
})();
