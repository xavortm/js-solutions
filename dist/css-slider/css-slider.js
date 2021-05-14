"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Collect all HTML nodes we need to make the slider work:
  var sliders = document.querySelectorAll(".js-slider"); // And simple enough, run the slider function for each one.

  sliders.forEach(function (slider) {
    simpleSlider(slider);
  });
}, false);

function simpleSlider(slider, options) {
  options = Object.assign({
    loop: false,
    equalHeights: false
  }, options);
  var slides = slider.querySelectorAll(".slider-item");
  var slidesWrapper = slider.querySelector(".slider-slides");
  var navPrev = slider.querySelector(".js-slide-prev");
  var navNext = slider.querySelector(".js-slide-next");
  var currentSlidePosition = 0;
  var slidesCount = slides.length - 1; // becauase we count from 0

  var sliderInitActive = function sliderInitActive() {
    var hasCurrentSet = false;
    slides.forEach(function (slide, index) {
      if (slide.classList.contains("is-current")) {
        hasCurrentSet = slide.classList.contains("is-current");
        currentSlidePosition = index;
      }
    });
    !hasCurrentSet && slides[0].classList.add("is-current");
  };

  var setActive = function setActive(oldSlide, newSlide) {
    slides[oldSlide].classList.remove("is-current");
    slides[newSlide].classList.add("is-current");
  };

  var handleNavigation = function handleNavigation() {
    if (!navPrev && !navNext) {
      return;
    }

    navPrev.addEventListener("click", function (event) {
      var oldSlide = currentSlidePosition;
      currentSlidePosition -= 1;

      if (currentSlidePosition < 0 && options.loop) {
        currentSlidePosition = slidesCount;
      } else if (currentSlidePosition < 0 && !options.loop) {
        currentSlidePosition = 0;
      }

      setActive(oldSlide, currentSlidePosition);
    }, false);
    navNext.addEventListener("click", function (event) {
      var oldSlide = currentSlidePosition;
      currentSlidePosition += 1;

      if (currentSlidePosition > slidesCount && options.loop) {
        currentSlidePosition = 0;
      } else if (currentSlidePosition > slidesCount && !options.loop) {
        currentSlidePosition = slidesCount;
      }

      setActive(oldSlide, currentSlidePosition);
    }, false);
  };

  var sliderEqualizeHeights = function sliderEqualizeHeights() {
    var maxHeight = 0;
    slides.forEach(function (slide, index) {
      console.log(slide.offsetHeight);
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
    });
    slidesWrapper.style.minHeight = maxHeight + "px";
  }; // Let's get the party going


  sliderInitActive();
  handleNavigation();

  if (options.equalHeights) {
    sliderEqualizeHeights();
  }
}