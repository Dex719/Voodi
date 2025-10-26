document.body.classList.add('no-scroll');

setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader--hidden');
    }
    document.body.classList.remove('no-scroll'); 
}, 2000); 

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');
    const parallaxBg = document.getElementById('parallax-bg');

    if (header) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            if (parallaxBg) {
                const scale = 1 + scrollY / 1500;
                parallaxBg.style.transform = `scale(${scale})`;
            }
        });
    }

    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.header__nav');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger-menu--active');
            nav.classList.toggle('header__nav--active');
            document.body.classList.toggle('no-scroll');
        });

        const navLinks = nav.querySelectorAll('.header__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger-menu--active');
                nav.classList.remove('header__nav--active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    const modal = document.getElementById('modal');
    const newsletterForm = document.getElementById('newsletter-form');
    const emailField = document.getElementById('newsletter-email');
    
    function openModal() {
        if (modal) {
            modal.classList.add('modal--active');
            document.body.classList.add('no-scroll');
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('modal--active');
            if (!nav.classList.contains('header__nav--active')) {
                 document.body.classList.remove('no-scroll');
            }
        }
    }
    
    if (newsletterForm && emailField) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            if (emailField.value.trim() === '' || !emailField.value.includes('@')) {
                emailField.classList.add('form__field--shake');
                
                setTimeout(() => {
                    emailField.classList.remove('form__field--shake');
                }, 500);

            } else {
                openModal();
                newsletterForm.reset();
            }
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.dataset.close === 'true') {
                closeModal();
            }
        });
    }

    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header');
        
        if (header) {
            header.addEventListener('click', () => {
                const wasActive = item.classList.contains('accordion__item--active');

                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('accordion__item--active');
                });

                if (!wasActive) {
                    item.classList.add('accordion__item--active');
                }
            });
        }
    });

    const tabsContainer = document.querySelector('.tabs');
    
    if (tabsContainer) {
        const tabButtons = tabsContainer.querySelectorAll('.tabs__button');
        const tabPanels = tabsContainer.querySelectorAll('.tabs__panel');

        tabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tabs__button')) {
                const tabName = e.target.dataset.tabName;
                const targetPanel = document.getElementById(tabName);
                
                tabButtons.forEach(btn => btn.classList.remove('tabs__button--active'));
                tabPanels.forEach(panel => panel.classList.remove('tabs__panel--active'));

                e.target.classList.add('tabs__button--active');
                if (targetPanel) {
                    targetPanel.classList.add('tabs__panel--active');
                }
            }
        });
    }


    const counters = document.querySelectorAll('.stats__number');
    const animationDuration = 1000; 

    const runCounter = (counter) => {
        const target = +counter.dataset.target;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            const currentCount = Math.floor(progress * target);

            counter.innerText = currentCount.toLocaleString('en-US');

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                 counter.innerText = target.toLocaleString('en-US') + "+";
            }
        };
        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    runCounter(counter);
                });
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5 
    });
    
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
        
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});