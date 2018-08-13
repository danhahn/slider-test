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
    // return true;
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
  const direction = isNext ? 'Next' : 'Prev';
  const {
    realIndex,
    slidesPerGroup,
    className,
    duration
  } = config;

  const nextStart = isNext
    ? realIndex + slidesPerGroup
    : realIndex - slidesPerGroup;

  swiper[`allowSlide${direction}`] = true;
  swiper[`slide${direction}`](0);
  swiper[`allowSlide${direction}`] = false;

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
    hasTwoSlides: slidesGrid.length <= slidesGrid.length * 2
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
    }, config.duration);
  }
};

class Gallery extends React.Component {
  static defaultProps = {
    duration: 1000,
    className: 'fade'
  };

  componentDidMount() {
    setTimeout(() => {
      var mySwiper = document.querySelector(".swiper-container").swiper;
      this.setState({ mySwiper });
    }, 1);
  }

  handleKeyPress(event) {
    const { duration, className } = this.props;
    const config = {
      duration,
      className
    };
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      doAnimation(this.state.mySwiper, event, config);
    }
  }

  render() {
    const { duration, className, nextButton, prevButton } = this.props;

    const props = {
      duration,
      className
    };

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
              el.classList.add("margin-offset");
            }, 100);
          }
        }
      },

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
          freeMode: true
        }
      }
    };
    // check if prevButton is passed and add to params
    if (prevButton) {
      params.renderPrevButton = () => ({
        ...prevButton,
        props: {
          ...prevButton.props,
          className: "swiper-button-prev",
          onKeyPress: event => this.handleKeyPress(event)
        }
      });
    }
    // check if nextButton is passed and add to params
    if (nextButton) {
      params.renderNextButton = () => ({
        ...nextButton,
        props: {
          ...nextButton.props,
          className: "swiper-button-next",
          onKeyPress: event => this.handleKeyPress(event)
        }
      });
    }

    return <Swiper {...params}>{this.props.render()}</Swiper>;
  }
}

export default Gallery;