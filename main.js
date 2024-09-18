$(document).ready(function () {
  $(".slideshow-promos").slick({
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.custom-prev'),
    nextArrow: $('.custom-next')
  });
});

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

function showSlides(index) {
  slides.forEach((slide, i) => {
    const elementsToAnimate = slide.querySelectorAll(
      ".slide-in-left, .slide-in-right, .slide-in-bottom-right, .slide-in-bottom-left"
    );

    if (i === index) {
      slide.classList.add("active");
      elementsToAnimate.forEach((element) => {
        const animationClass = getAnimationClass(element);
        element.style.animation = `${animationClass} 1s forwards`;
      });
    } else {
      slide.classList.remove("active");
      elementsToAnimate.forEach((element) => {
        element.style.animation = "none";
      });
    }
  });
}

function getAnimationClass(element) {
  if (element.classList.contains("slide-in-left")) return "slide-in-left";
  if (element.classList.contains("slide-in-right")) return "slide-in-right";
  if (element.classList.contains("slide-in-bottom-right"))
    return "slide-in-bottom-right";
  if (element.classList.contains("slide-in-bottom-left"))
    return "slide-in-bottom-left";
  return "";
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlideClasses("next");
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlideClasses("prev");
}

function updateSlideClasses(direction) {
  const activeSlide = slides[currentSlide];
  showSlides(currentSlide);

  activeSlide.querySelectorAll(".carousel-item img").forEach((element) => {
    if (direction === "next") {
      element.classList.add("slide-in-bottom-right");
      element.classList.remove("slide-in-bottom-left");
    } else if (direction === "prev") {
      element.classList.add("slide-in-bottom-left");
      element.classList.remove("slide-in-bottom-right");
    }
  });
}

showSlides(currentSlide);

document.getElementById("button-right-bright").addEventListener("click", () => {
  nextSlide();
  updateSlideClasses("next");
});

document.getElementById("button-left-bright").addEventListener("click", () => {
  prevSlide();
  updateSlideClasses("prev");
});
