(function () {
                    var offset = 10;

                    function initButton() {
                        var buttonWrap = document.querySelector('.smooth-back-to-top-button');
                        if (!buttonWrap) return;

                        var isTicking = false;
                        var onScroll = function () {
                            if (isTicking) return;
                            isTicking = true;
                            window.requestAnimationFrame(function () {
                            if (window.scrollY > offset) {
                                buttonWrap.classList.add('active-progress');
                            } else {
                                buttonWrap.classList.remove('active-progress');
                            }
                                isTicking = false;
                            });
                        };

                        window.addEventListener('scroll', onScroll, { passive: true });
                        onScroll();

                        buttonWrap.addEventListener('click', function (e) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        });

                        buttonWrap.addEventListener('keydown', function (e) {
                            if (e.key !== 'Enter' && e.key !== ' ') return;
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        });
                    }

                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', initButton);
                    } else {
                        initButton();
                    }
                })();
