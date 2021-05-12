document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Collect all HTML nodes we need to make the slider work:
    const sliders = document.querySelectorAll(".js-slider");

    // And simple enough, run the slider function for each one.
    sliders.forEach((slider) => {
      simpleSlider(slider);
    });
  },
  false
);

function simpleSlider(slider) {
  const slides = slider.querySelectorAll(".slider-item");
  const navPrev = slider.querySelector(".js-slide-prev");
  const navNext = slider.querySelector(".js-slide-next");

  let currentSlidePosition = 0;

  const sliderInitActive = () => {
    let hasCurrentSet = false;

    slides.forEach((slide, index) => {
      if (slide.classList.contains("is-current")) {
        hasCurrentSet = slide.classList.contains("is-current");
        currentSlidePosition = index;
      }
    });

    !hasCurrentSet && slides[0].classList.add("is-current");
  };

  const handleNavigation = () => {
    if (!navPrev && !navNext) {
      return;
    }
  };

  // Let's get the party going
  sliderInitActive();
  handleNavigation();
}
