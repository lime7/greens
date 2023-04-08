"use strict";

// import Swiper from 'swiper';

import {
    Swiper,
    Navigation,
    Pagination,
    Scrollbar,
    EffectCoverflow
} from 'swiper';

Swiper.use([Navigation, Pagination, Scrollbar, EffectCoverflow]);

import { fslightbox } from 'fslightbox';

import { gsap, ScrollTrigger } from "gsap/all";

window.addEventListener('DOMContentLoaded', function() {

  console.log("S>>>");
  
  // Sidebar Trigger
  const sidebarTrigger = document.querySelectorAll(".js-sidebar-trigger"),
    sidebarCloseBtn = document.querySelector("[data-close]");

   // console.log(sidebar);

  sidebarTrigger?.forEach(btn => {
  	const name = btn.dataset.sidebar;
  	const sidebar = document.querySelector(".js-sidebar-" + name);
    btn.addEventListener("click", function(e){
    	e.preventDefault();
    	opensidebar(sidebar);
    });
  });

  sidebarCloseBtn?.forEach(btn => {
  	const name = btn.dataset.sidebar;
  	const sidebar = document.querySelector(".js-sidebar-" + name);
    btn.addEventListener("click", function(e){
    	e.preventDefault();
    	closesidebar(sidebar);
    });
  });

  function opensidebar(el) {
    el.classList.add("translate-x-0");
    el.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  }

  function closesidebar(el) {
    el.classList.add("translate-x-full");
    el.classList.remove("translate-x-0");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function(e) {
    sidebarTrigger?.forEach(btn => {
      const name = btn.dataset.sidebar;
      const sidebar = document.querySelector(".js-sidebar");
      const sidebarName = document.querySelector(".js-sidebar-" + name);

      if (!btn.contains(e.target)) {
        closesidebar(sidebarName);
      }
    });
  });


  // Scroll to Top
  function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  const btnToTop = document.getElementById("js-to-top");

  btnToTop.addEventListener("click", scrollToTop);



  // Swiper fith filter
  filterSelection('all');  

  var filterSwiper = new Swiper('.swiper-filter', {
    slidesPerView: 4
  });

  var productSwiper = new Swiper('.swiper-product', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: false,
    freeMode: true,
    spaceBetween: 0,
    // slidesOffsetAfter: 50,
    // slidesOffsetBefore: -12,
    // parallax: true,
    // speed: 1000,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true
  });

  function filterSelection(filterName) {
    var li, i;
    li = document.getElementsByClassName('swiper-slide');
    if (filterName == 'all') filterName = '';
    for (i = 0; i < li.length; i++) {
      removeClass(li[i], ' block');
      if (li[i].className.indexOf(filterName) > -1)
        addClass(li[i], ' block');
    }
  }

  function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += ' ' + arr2[i];
      }
    }
  }

  function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(' ');
  }

  const btns = document.querySelectorAll('.swiper-btn');
  btns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      var current = document.getElementsByClassName('swiper-btn-active');
      current[0].className = current[0].className.replace(
        ' swiper-btn-active',
        ''
      );

      btn.className += ' swiper-btn-active';

      const name = btn.dataset.trigger;

      filterSelection(name);

      // productSwiper.update();

      productSwiper.updateSize();
      productSwiper.updateSlides();
      productSwiper.updateProgress();
      productSwiper.updateSlidesClasses();
      productSwiper.slideTo(0);
      productSwiper.scrollbar.updateSize();
    });
  });


  // Swiper Reviews
  var reviewsSwiper = new Swiper('.swiper-reviews', {
    slidesPerView: 1,
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="block w-4 h-4 mr-6 cursor-pointer bg-secondary ' + className + '">' + "</span>";
      }
    }
  });

  var partnersSwiper = new Swiper('.swiper-partners', {
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="block w-2 h-2 mr-3 cursor-pointer bg-secondary ' + className + '">' + "</span>";
      }
    },
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 0,
      }
    }
  });


  // Counters with scroll to section
  var count = document.getElementsByClassName("count");
    var inc = [];
    function intervalFunc() {
      for (let i = 0; i < count.length; i++) {
        inc.push(1);
        if (inc[i] != count[i].getAttribute("max-data")) {
            inc[i]++;
        }
        count[i].innerHTML = inc[i];
      }
    }

    var countersSection = document.getElementById("js-counters");
    window.onscroll = function () {
      var timer = setInterval(() => {
        var topElm = countersSection.offsetTop;
        var btmElm = countersSection.offsetTop + countersSection.clientHeight;
        var top_screen = window.pageYOffset;
        var bottom_screen = window.pageYOffset + window.innerHeight;
        if ((bottom_screen > topElm) && (top_screen < btmElm)) {
            intervalFunc();
        } else {
            clearInterval(timer);
        }
      }, 500);
    };


  // DD Catalog
  const jsDdCatalog = document.getElementById("js-dd-catalog");

  function openCatalog() {
    if(!jsDdCatalog.classList.contains('block')){
      jsDdCatalog.classList.remove('hidden');
      jsDdCatalog.classList.add('block');
    } else {
      jsDdCatalog.classList.remove('block');
      jsDdCatalog.classList.add('hidden');
    }
  }

  const jsDdBtn = document.querySelector(".js-dd-btn");

  jsDdBtn.addEventListener("click", function(e){
    e.preventDefault();

    openCatalog();
  });

  document.addEventListener("click", function(e) {
    if (!jsDdBtn.contains(e.target)) {
      jsDdCatalog.classList.remove('block');
      jsDdCatalog.classList.add('hidden');
    }
  });

  // Quantity
  function increaseCount(e, el) {
    var input = el.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }

  function decreaseCount(e, el) {
    var input = el.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;
    }
  }

  const jsBtnsIncrease = document.querySelectorAll(".js-increase");
  const jsBtnsDecrease = document.querySelectorAll(".js-decrease");

  jsBtnsIncrease.forEach(btn => {
    btn.addEventListener("click", function(e){
      increaseCount(e, this);
    });
  });

  jsBtnsDecrease.forEach(btn => {
    btn.addEventListener("click", function(e){
      decreaseCount(e, this);
    });
  });

  // Remove order product
  function deleteOrder(el){
    el.parentNode.parentNode.parentNode.remove();
  }

  const jsBtnsOrderDelete = document.querySelectorAll(".js-product-delete");

  jsBtnsOrderDelete.forEach(btn => {
    btn.addEventListener("click", function(e){
      deleteOrder(this);
    });
  });

  // Btn active
  const jsBtns = document.querySelectorAll(".js-btn");

  jsBtns.forEach(btn => {
    btn.addEventListener("click", function(e){
      e.preventDefault();

      if(!btn.classList.contains("bg-gray")){
        btn.classList.remove("bg-orange-600", "text-white");
        btn.classList.add("bg-gray", "text-dark");
      } else {
        btn.classList.remove("bg-gray", "text-dark");
        btn.classList.add("bg-orange-600", "text-white");
      }
    });
  });


  

});




// gsap Animation
function animateFrom(elem, direction) {
  if (elem.played === true) {
    return;
  }
  elem.played = true;
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {
    x: x,
    y: y,
    autoAlpha: 0
  }, {
    duration: 1.7,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: "expo",
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {
    autoAlpha: 0
  });
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() {
        animateFrom(elem)
      },
      // onEnterBack: function() { animateFrom(elem, -1) },
      // onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });


  // gsap Header anim
  const showAnim = gsap.from('.js-header', { 
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
  });


});