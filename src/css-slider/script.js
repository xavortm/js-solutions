document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Collect all HTML nodes we need to make the slider work:
    const sliders = document.querySelectorAll(".js-slider");

    // And simple enough, run the slider function for each one.
    sliders.forEach((slider) => {
      simpleSlider(slider, { dots: true });
    });
  },
  false
);

function simpleSlider(slider, options) {
  options = Object.assign(
    {
      loop: false,
      equalHeights: false,
      dots: false,
    },
    options
  );

  const slides = slider.querySelectorAll(".slider-item");
  const slidesWrapper = slider.querySelector(".slider-slides");
  const dotsWrapper = slider.querySelector(".slider-dots");
  const navPrev = slider.querySelector(".js-slide-prev");
  const navNext = slider.querySelector(".js-slide-next");

  let currentSlidePosition = 0;
  let slidesCount = slides.length - 1; // becauase we count from 0

  const initActive = () => {
    let hasCurrentSet = false;

    slides.forEach((slide, index) => {
      if (slide.classList.contains("is-current")) {
        hasCurrentSet = slide.classList.contains("is-current");
        currentSlidePosition = index;
      }
    });

    !hasCurrentSet && slides[0].classList.add("is-current");
  };

  const setActive = (newSlide) => {
    const dots = dotsWrapper.querySelectorAll("li");
    slides.forEach((slide) => slide.classList.remove("is-current"));
    dots.forEach((dot) => dot.classList.remove("is-current"));

    slides[newSlide].classList.add("is-current");
    dots[newSlide].classList.add("is-current");
  };

  const handleNavigation = () => {
    if (!navPrev && !navNext) {
      return;
    }

    navPrev.addEventListener(
      "click",
      (event) => {
        currentSlidePosition -= 1;

        if (currentSlidePosition < 0 && options.loop) {
          currentSlidePosition = slidesCount;
        } else if (currentSlidePosition < 0 && !options.loop) {
          currentSlidePosition = 0;
        }

        setActive(currentSlidePosition);
      },
      false
    );

    navNext.addEventListener(
      "click",
      (event) => {
        currentSlidePosition += 1;

        if (currentSlidePosition > slidesCount && options.loop) {
          currentSlidePosition = 0;
        } else if (currentSlidePosition > slidesCount && !options.loop) {
          currentSlidePosition = slidesCount;
        }

        setActive(currentSlidePosition);
      },
      false
    );
  };

  const sliderEqualizeHeights = () => {
    let maxHeight = 0;

    slides.forEach((slide) => {
      maxHeight = Math.max(maxHeight, slide.offsetHeight);
    });

    slidesWrapper.style.minHeight = maxHeight + "px";
  };

  const initDots = () => {
    let dots = [];
    if (!dotsWrapper) {
      console.warn("Dots container not found");
      return;
    }

    slides.forEach((slide, index) => {
      const dotElement = document.createElement("li");

      dotElement.className = "slider-dot";
      dotElement.setAttribute("slide-id", index);

      if (currentSlidePosition === index) {
        dotElement.className += " is-current";
        console.log(dotElement.className, currentSlidePosition, index);
      }

      dotsWrapper.appendChild(dotElement);
      dots.push(dotElement);

      dotElement.addEventListener("click", (event) => {
        dots.forEach((dot) => dot.classList.remove("is-current"));
        dotElement.classList.add("is-current");

        currentSlidePosition = index;
        setActive(currentSlidePosition);
      });
    });
  };

  // Let's get the party going
  initActive();
  handleNavigation();

  if (options.equalHeights) {
    sliderEqualizeHeights();
  }

  if (options.dots) {
    initDots();
  }
}
