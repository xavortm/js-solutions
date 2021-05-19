"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Collect all HTML nodes we need to make the slider work:
  var sliders = document.querySelectorAll(".js-slider"); // And simple enough, run the slider function for each one.

  sliders.forEach(function (slider) {
    simpleSlider(slider, {
      dots: true
    });
  });
}, false);

function simpleSlider(slider, options) {
  options = Object.assign({
    loop: false,
    equalHeights: false,
    dots: false
  }, options);
  var slides = slider.querySelectorAll(".slider-item");
  var slidesWrapper = slider.querySelector(".slider-slides");
  var dotsWrapper = slider.querySelector(".slider-dots");
  var navPrev = slider.querySelector(".js-slide-prev");
  var navNext = slider.querySelector(".js-slide-next");
  var currentSlidePosition = 0;
  var slidesCount = slides.length - 1; // becauase we count from 0

  var initActive = function initActive() {
    var hasCurrentSet = false;
    slides.forEach(function (slide, index) {
      if (slide.classList.contains("is-current")) {
        hasCurrentSet = slide.classList.contains("is-current");
        currentSlidePosition = index;
      }
    });
    !hasCurrentSet && slides[0].classList.add("is-current");
  };

  var setActive = function setActive(newSlide) {
    var dots = dotsWrapper.querySelectorAll("li");
    slides.forEach(function (slide) {
      return slide.classList.remove("is-current");
    });
    dots.forEach(function (dot) {
      return dot.classList.remove("is-current");
    });
    slides[newSlide].classList.add("is-current");
    dots[newSlide].classList.add("is-current");
  };

  var handleNavigation = function handleNavigation() {
    if (!navPrev && !navNext) {
      return;
    }

    navPrev.addEventListener("click", function (event) {
      currentSlidePosition -= 1;

      if (currentSlidePosition < 0 && options.loop) {
        currentSlidePosition = slidesCount;
      } else if (currentSlidePosition < 0 && !options.loop) {
        currentSlidePosition = 0;
      }

      setActive(currentSlidePosition);
    }, false);
    navNext.addEventListener("click", function (event) {
      currentSlidePosition += 1;

      if (currentSlidePosition > slidesCount && options.loop) {
        currentSlidePosition = 0;
      } else if (currentSlidePosition > slidesCount && !options.loop) {
        currentSlidePosition = slidesCount;
      }

      setActive(currentSlidePosition);
    }, false);
  };

  var sliderEqualizeHeights = function sliderEqualizeHeights() {
    var maxHeight = 0;
    slides.forEach(function (slide) {
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
    });
    slidesWrapper.style.minHeight = maxHeight + "px";
  };

  var initDots = function initDots() {
    var dots = [];

    if (!dotsWrapper) {
      console.warn("Dots container not found");
      return;
    }

    slides.forEach(function (slide, index) {
      var dotElement = document.createElement("li");
      dotElement.className = "slider-dot";
      dotElement.setAttribute("slide-id", index);

      if (currentSlidePosition === index) {
        dotElement.className += " is-current";
        console.log(dotElement.className, currentSlidePosition, index);
      }

      dotsWrapper.appendChild(dotElement);
      dots.push(dotElement);
      dotElement.addEventListener("click", function (event) {
        dots.forEach(function (dot) {
          return dot.classList.remove("is-current");
        });
        dotElement.classList.add("is-current");
        currentSlidePosition = index;
        setActive(currentSlidePosition);
      });
    });
  }; // Let's get the party going


  initActive();
  handleNavigation();

  if (options.equalHeights) {
    sliderEqualizeHeights();
  }

  if (options.dots) {
    initDots();
  }
}