import React from 'react';
import Swiper from 'react-id-swiper';
import './gallery.css';

const disabledRealIdCheck = ({ realIndex, max, hasTwoSlides }) => {
  // checks to see if has only two slides and returns `false` this is related
  // to the way we have to check if the button is disabled
  if (realIndex === 0 && hasTwoSlides) {
    return false;
  }
  // return true if the realID is 0 but has more than two slides
  if (realIndex === 0) {
    return true;
  }

  if (realIndex === max && !hasTwoSlides) {
    return true;
  }
  return false;
};

const checkAnimateToNext = (event, isDisabled) => {
  const next = 'swiper-button-next';
  const prev = 'swiper-button-prev';
  const disabled = "swiper-button-disabled";
  const cl = event.toElement ? event.toElement.classList : event.target.classList;
  console.log({ isDisabled})
  if (!!cl.value) {
    // check if `imageWrapper` if yes return 'false'
    if (cl.contains("imageWrapper")) {
      return false;
    }
    // check to see if `next` or `prev` class are in the classList if not return 'false'
    if (cl.length && (!cl.contains(next) && !cl.contains(prev))) {
      return false;
    }
    // check if button is disabled
    if (cl.contains(disabled) && isDisabled) {
      return false;
    }
    return true;
  }
  return false;
};

const doSlideUpdates = ({slidesDOM, isNext, config, swiper}) => {
  const dir = isNext ? 'Next' : 'Prev';
  const {
    realIndex,
    slidesPerGroup,
    className,
    duration
  } = config;

  const nextStart = isNext
    ? realIndex + slidesPerGroup
    : realIndex - slidesPerGroup;

  swiper[`allowSlide${dir}`] = true;
  swiper[`slide${dir}`](0);
  swiper[`allowSlide${dir}`] = false;

  let slidesSliced = slidesDOM.slice(nextStart, nextStart + slidesPerGroup);

  if (isNext) {
    slidesSliced = slidesSliced.reverse();
  }

  slidesSliced.forEach((item, index) => {
    setTimeout(() => {
      if (item.classList && item.classList.contains(className)) {
        item.classList.remove(className);
      }
    }, (duration / slidesPerGroup) * index);
  });
};

const doAnimation = (swiper, event, props) => {
  const {className, duration} = props;
  const {
    realIndex,
    passedParams: { slidesPerGroup },
    slides,
    slidesGrid
  } = swiper;
  const isDisabled = disabledRealIdCheck({
    realIndex,
    max: slidesGrid.length - slidesPerGroup,
    hasTwoSlides: slidesGrid.length / slidesPerGroup === 2
  });
  const doAnimateToNext = checkAnimateToNext(event, isDisabled);
  const config = {
    realIndex,
    slidesPerGroup,
    className,
    duration
  };
  if (doAnimateToNext) {
    const classListGroup = event.toElement
      ? event.toElement.classList
      : event.target.classList;
    const isNext = classListGroup.contains("swiper-button-next");
    const slidesDOM = Array.from(Object.values(slides));
    slidesDOM.forEach(item => {
      if (item.classList) {
        item.classList.add(config.className);
      }
    });
    setTimeout(() => {
      if (isNext) {
        doSlideUpdates({ slidesDOM, isNext, config, swiper });
      } else {
        doSlideUpdates({ slidesDOM, isNext, config, swiper });
      }
      setTimeout(() => {
        slidesDOM.forEach(item => {
          if (item.classList && item.classList.contains(config.className)) {
            item.classList.remove(config.className);
          }
        });
      }, config.duration);
    }, config.duration / 2 + 200);
  }
};

class Gallery extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const {duration, className} = this.props;
      const props = {
        duration,
        className
      }
      var mySwiper = document.querySelector('.swiper-container').swiper
      const next = document.querySelector(".swiper-button-next");
      const prev = document.querySelector(".swiper-button-prev");

      next.addEventListener("keyup", (event) => {
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          doAnimation(mySwiper, event, props);
        }
      });
      prev.addEventListener("keyup", function(event) {
        event.preventDefault();
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          doAnimation(mySwiper, event, props);
        }
      });
    }, 1000)
  }

  render() {
    const { duration, className, nextButton, prevButton } = this.props;

    const props = {
      duration,
      className
    }

    const params = {
      slidesPerView: 4,
      slidesPerGroup: 4,
      speed: duration,
      allowSlideNext: false,
      allowSlidePrev: false,

      on: {
        click(event) {
          doAnimation(this, event, props);
        },
        init() {
          if (window.innerWidth < 480) {
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
            const el = document.querySelector(".swiper-container");
            setTimeout(() => {
              el.classList.add('margin-offset')
            }, 100)
          }
        }
      },

      renderPrevButton: () => ({
        ...prevButton,
        props: {
          ...prevButton.props,
          className: 'swiper-button-prev'
        }
      }),
      renderNextButton: () => ({
        ...nextButton,
        props: {
          ...nextButton.props,
          className: 'swiper-button-next'
        }
      }),

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      spaceBetween: 10,
      breakpoints: {
        // when window width is <= 480px
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 0,
          freeMode: true,
        }
      }
    };

    return(
      <Swiper {...params}>
        {this.props.render()}
      </Swiper>
    );
  }
}

export default Gallery;