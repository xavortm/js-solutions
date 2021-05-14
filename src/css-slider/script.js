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

function simpleSlider(slider, options) {
  options = Object.assign(
    {
      loop: false,
    },
    options
  );

  const slides = slider.querySelectorAll(".slider-item");
  const navPrev = slider.querySelector(".js-slide-prev");
  const navNext = slider.querySelector(".js-slide-next");

  let currentSlidePosition = 0;
  let slidesCount = slides.length - 1; // becauase we count from 0

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

  const setActive = (oldSlide, newSlide) => {
    slides[oldSlide].classList.remove("is-current");
    slides[newSlide].classList.add("is-current");
  };

  const handleNavigation = () => {
    if (!navPrev && !navNext) {
      return;
    }

    navPrev.addEventListener(
      "click",
      (event) => {
        const oldSlide = currentSlidePosition;
        currentSlidePosition -= 1;

        if (currentSlidePosition < 0 && options.loop) {
          currentSlidePosition = slidesCount;
        } else if (currentSlidePosition < 0 && !options.loop) {
          currentSlidePosition = 0;
        }

        setActive(oldSlide, currentSlidePosition);
      },
      false
    );

    navNext.addEventListener(
      "click",
      (event) => {
        const oldSlide = currentSlidePosition;
        currentSlidePosition += 1;

        if (currentSlidePosition > slidesCount && options.loop) {
          currentSlidePosition = 0;
        } else if (currentSlidePosition > slidesCount && !options.loop) {
          currentSlidePosition = slidesCount;
        }

        setActive(oldSlide, currentSlidePosition);
      },
      false
    );
  };

  // Let's get the party going
  sliderInitActive();
  handleNavigation();
}
