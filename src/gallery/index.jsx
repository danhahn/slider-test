import React from 'react';
import Swiper from 'react-id-swiper/lib/custom';
import "core-js";
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

const doSlideUpdates = ({ slidesDOM, isNext, config, swiper }) => {
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

  if (!isNext) {
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
  const { className, duration } = props;
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
        const image = item.querySelector('.image-panel img');
        const quickview = item.querySelector('.image-panel .quickview-container');
        const lis = item.querySelectorAll('li');
        const fadeElements = [image, quickview, ...lis];
        fadeElements.forEach(element => {
          element.style.transitionDuration = `${config.duration}ms`;
        });
        item.classList.add(config.className);
      }
    });
    const [firstSlide] = slidesDOM;
    firstSlide.addEventListener('transitionend', function cb(event) {
      if (event.target.classList.contains('quickview-container')) {
        doSlideUpdates({ slidesDOM, isNext, config, swiper });
        setTimeout(() => {
          slidesDOM.forEach(item => {
            if (item.classList && item.classList.contains(config.className)) {
              item.classList.remove(config.className);
            }
          });
        }, config.duration + 100);
        event.currentTarget.removeEventListener(event.type, cb);
      }
    });
  }
};

const adjustArrowOffset = swiper => {
  const height = swiper.imagesToLoad[0].offsetHeight / 2;
  const next = swiper.navigation.nextEl;
  next.style.top = `${height}px`;
  const prev = swiper.navigation.prevEl;
  prev.style.top = `${height}px`;
};

const fixMobileSlides = swiper => {
  if (window.innerWidth < 510) {
    setTimeout(() => {
      swiper.$el[0].classList.add('margin-offset');
      swiper.slidesGrid = swiper.slidesGrid.map((slide, i) => {
        const newSlide = slide === -0 ? slide : slide - ((11 + 15) * i);
        return newSlide;
      });
      swiper.snapGrid = swiper.snapGrid.map((slide, i) => {
        const newSlide = slide === -0 ? slide : slide - (11 + 15) * i;
        return newSlide;
      });
      swiper.slidesSizesGrid = swiper.slidesSizesGrid.map(slide => slide - 11);
      swiper.allowSlideNext = true;
      swiper.allowSlidePrev = true;
      const slides = Array.from(swiper.$el[0].children[0].children);
      slides.forEach(slide => (slide.style.width = `${parseInt(slide.style.width, 10) - 11}px`));
    }, 200);
  } else {
    // check if ie 11 and add width to the image to ensure it displays correctly.
    // with out this check the image size is not confined to the wrapper size.
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
      // need to convert the nodeList to an array to loop over and set the size;
      const nodesArray = [].slice.call(swiper.el.querySelectorAll(".swiper-slide"));
      nodesArray.forEach(function(slide) {
        const img = slide.querySelector('img');
        img.style.width = slide.style.width;
      });
    }
  }
};

class Gallery extends React.Component {
  static defaultProps = {
    duration: 400,
    className: 'fade'
  };

  constructor(props) {
    super(props);
    this.swiper = null;
    this.state = {
      swiper: null
    };
  }

  componentWillMount() {
    this.setState({ swiper: this.swiper });
  }

  componentDidMount() {
    fixMobileSlides(this.swiper);
    const _swiper = this.swiper;
    this.swiper.slides[0].querySelector('img').addEventListener('load', function cb(event) {
      setTimeout(() => adjustArrowOffset(_swiper), 100);
      event.currentTarget.removeEventListener(event.type, cb);
    });
    window.addEventListener('resize', () => adjustArrowOffset(this.swiper));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => adjustArrowOffset(this.swiper));
  }

  handleKeyPress(event) {
    const { duration, className } = this.props;
    const config = {
      duration,
      className
    };
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      doAnimation(this.state.swiper, event, config);
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
        resize() {
          if (window.innerWidth < 510) {
            this.slidesGrid = this.slidesGrid.map((slide, i) => {
              const newSlide = slide === -0 ? slide : slide - ((11 + 15) * i);
              return newSlide;
            });
            this.snapGrid = this.snapGrid.map((slide, i) => {
              const newSlide = slide === -0 ? slide : slide - (11 + 15) * i;
              return newSlide;
            });
            this.slidesSizesGrid = this.slidesSizesGrid.map(slide => slide - 11);
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
            const slides = Array.from(this.$el[0].children[0].children);
            slides.forEach(slide => (slide.style.width = `${parseInt(slide.style.width, 10) - 11}px`));
          }
        }
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      spaceBetween: 10,
      breakpoints: {
        // when window width is <= 510px
        510: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 15,
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

    return (
      <Swiper
        {...params}
        ref={node => {
          if (node) {
            this.swiper = node.swiper;
          }
        }}
      >
        {this.props.render()}
      </Swiper>
    );
  }
}

export default Gallery;
