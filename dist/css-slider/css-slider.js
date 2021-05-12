"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Collect all HTML nodes we need to make the slider work:
  var sliders = document.querySelectorAll(".js-slider"); // And simple enough, run the slider function for each one.

  sliders.forEach(function (slider) {
    simpleSlider(slider);
  });
}, false);

function simpleSlider(slider) {
  var slides = slider.querySelectorAll(".slider-item");
  var navPrev = slider.querySelector(".js-slide-prev");
  var navNext = slider.querySelector(".js-slide-next");
  var currentSlidePosition = 0;

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

  var handleNavigation = function handleNavigation() {
    if (!navPrev && !navNext) {
      return;
    }
  }; // Let's get the party going


  sliderInitActive();
  handleNavigation();
}