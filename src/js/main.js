import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'
import GLightbox from 'glightbox'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Swiper from 'swiper'
import { Navigation, Pagination } from 'swiper/modules';

// Register GSAP plugins //
gsap.registerPlugin(ScrollTrigger)

//Tooltips //
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

//Actual Year
const d = new Date();
let year = d.getFullYear();
document.getElementById("year").innerHTML = year;


//Glightbox//
document.addEventListener('DOMContentLoaded', () => {
    if (typeof GLightbox !== 'undefined') {
      const lightbox = GLightbox({
        loop: true,
        zoomable: false
      });
    }
  });



//LENIS//

const lenis = new Lenis({
  smooth: true,
  prevent: (node) => 
    node.classList.contains('overlay') || 
    node.classList.contains('cky-modal') || 
    node.closest('.overlay') || 
    node.closest('.cky-modal')
});


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

gsap.ticker.lagSmoothing(0);


// SWIPER //

const swiper = new Swiper('.swiper-bars', {
  modules: [Navigation, Pagination],
  autoHeight: true,
  touchRatio: 0,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
          const slideName = document.querySelectorAll('.swiper-slide')[index].dataset.name;
          return `<span class="${className}">${slideName}</span>`;
      },
  },
  on: {
      init: function() {
          animateSlideContent(this.slides[this.activeIndex]);
      },
      slideChange: function() {
          animateSlideContent(this.slides[this.activeIndex]);
      }
  }
});

function animateSlideContent(slide) {
  const tl = gsap.timeline();
  const leftCol = slide.querySelector('.left-col');
  const img = slide.querySelector('.swiper-img');

  tl.fromTo(leftCol.children, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" }
  )
  .fromTo(img,
      { x: 100, opacity: 0, rotation: 45, },
      { x: 0, opacity: 1, rotation: 0, duration: 1, ease: "circ.out" },
      "-=0.5"
  );
}


// GSAP JS //

// MENU//
var menu = document.querySelector('.btn-menu');
let menuOpen = false;

const showAnim = gsap.from('.sticky-menu', { 
  yPercent: -100,
  paused: true,
  duration: 0.2
}).progress(1);

ScrollTrigger.create({
  start: "top top",
  end: "max",
  toggleClass: {className: 'sticky-menu--scrolled', targets: '.sticky-menu'},
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse()
  }
});

var tl = gsap.timeline({
  paused: true,
  onComplete: () => menuOpen = true,
  onReverseComplete: () => menuOpen = false
})

tl.to(".overlay", {
  right: 0,
  duration: 0.3,
  ease: "power2.inOut"
})

tl.from(".nav-item", {
  x: 100,
  duration: 0.3,
  stagger: 0.3,
  opacity: 0,
  ease: "back.out(1.7)"
})

tl.from(".social", {
  y: 50,
  duration: 0.3,
  opacity: 0,
  ease: "power2.out"
})

tl.from(".close", {
  x: 50,
  duration: 0.3,
  opacity: 0,
  ease: "power2.out"
})

menu.addEventListener("click", function(e) {
  e.preventDefault();
  
  if (menuOpen) {
    tl.reverse();
  } else {
    tl.play();
  }
});


document.addEventListener('click', function(e) {
  if (menuOpen && (!e.target.closest('.overlay') || e.target.closest('.close'))) {
    tl.reverse();
  }
});



// MENU END //


// ANIMACE //

//default//
// ANIMACE //

//default//
if (document.querySelector('.left-slide')) {
  gsap.from('.left-slide', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.left-slide',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

if (document.querySelector('.right-slide')) {
  gsap.from('.right-slide', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.right-slide',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

if (document.querySelector('.top-slide')) {
  gsap.from('.top-slide', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.top-slide',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}



// bars main img
if (document.querySelector('.image-stack')) {
    gsap.from(['.image-stack .bars', '.image-stack .ovoce'], {
        scale: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.8
    });

    gsap.to('.image-stack .ovoce', {
        scrollTrigger: {
            trigger: '.bar-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: window.innerWidth > 768 ? -100 : -30
    });

    gsap.to('.image-stack .bars', {
        scrollTrigger: {
            trigger: '.bar-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: window.innerWidth > 768 ? 100 : 30
    });
}
if (document.querySelector('.nude-bar')) {
  gsap.from('.nude-bar', {
      scrollTrigger: {
          trigger: '#why',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
      },
      y: window.innerWidth > 768 ? 100 : -30
  });
}

if (document.querySelector('.bars-line')) {
  gsap.to(".left-scroll", {
      xPercent: -5,
      ease: "none",
      scrollTrigger: {
          trigger: ".bars-line",
          scrub: 1,
          start: "top bottom",
          end: "+=2000"
      },
  });
    
  gsap.to(".right-scroll", {
      xPercent: 5,
      ease: "none",
      scrollTrigger: {
          trigger: ".bars-line",
          scrub: 1,
          start: "top bottom",
          end: "+=2000"
      },
  });
}

// FOOTER //

if (document.querySelector('.bar-footer')) {
  gsap.to(".bar-footer", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
          trigger: ".bars-footer",
          scrub: 1,
          start: "bottom bottom",
          end: "+=500"
      },
  });
}

// HOME //
if (document.querySelector('.hero')) {
  // bars main img
  gsap.from(['.bar'], {
      y: 200,
      ease: "none",
      stagger: 0.5,
      opacity: 0
  });

  gsap.to(".bar", {
    yPercent: -20,
    rotate: 5,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        scrub: 1,
        start: "bottom bottom",
        end: "bottom top"
    },
});

  gsap.from(['.img-title'], {
    scale: 0,
    ease: "bounce.out",
    opacity: 0,
    duration: 2
});

gsap.fromTo(".img-title", 
  { scale: 1 },
  { 
    scale: 0.8,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      scrub: 1,
      start: "bottom bottom",
      end: "bottom top"
    }
  }
);

gsap.fromTo('.try-again, .cool, .maxx-taste', 
  { rotate: 10 },
  { 
    rotate: -10,
    ease: "none",
    duration: 2,
    repeat: -1,
    yoyo: true
  }
);
}

//Protein//
if (document.querySelector('.protein')) {
  gsap.fromTo('.bar-protein', 
    { scale: 0.5 },
    { 
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".protein",
        scrub: 1,
        start: "top bottom",
        end: "-20% top"
      }
    }
  );
}

//musli//
if (document.querySelector('.musli')) {
  gsap.fromTo('.bar-m', 
    { xPercent: 80 },
    { 
      xPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".musli",
        scrub: 1,
        start: "top bottom",
        end: "-20% top"
      }
    }
  );
}

//MAX//
if (document.querySelector('.img-max')) {
  gsap.fromTo('.img-max .bar-max', 
    { rotate: 0 },
    { 
      rotate: -25,
      ease: "none",
      scrollTrigger: {
        trigger: ".max",
        scrub: 1,
        start: "top bottom",
        end: "-20% top"
      }
    }
  );

  gsap.fromTo('.img-max .blesky', 
    { rotate: -25 },
    { 
      rotate: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".max",
        scrub: 1,
        start: "top bottom",
        end: "-20% top"
      }
    }
  );
}


// KONTAKTY //
if (document.querySelector('.contact')) {
  // bars main img
  gsap.from(['.contact-card'], {
      y: 100,
      ease: "none",
      stagger: 0.5,
      opacity: 0
  });
}