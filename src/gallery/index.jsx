import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import Slide from '../slide';
import './gallery.css';

const StyledSwipe = styled.div`
  /* border: 1px solid black; */
  height: 300px;
  box-sizing: border-box;
  display: flex;
  &.fade {
    border-color: red;
    .imageWrapper img {
      opacity: 0;
    }
    p {
      opacity: 0;
    }
  }
`;

const Inner = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .imageWrapper {
    background-color: gray;
  }
  img {
    transition: all 1s;
    max-width: 100%;
  }
  p {
    transition: all 1s;
    margin: 1em;
  }
`;

const CustomButtonPrev = styled.button`
  outline: none;
  border: none;
  width: 29px;
  height: 65px;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0Axmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 23 70'%0Awidth='12px' height='35px'%3E%3Cpath fill-rule='evenodd' fill='#707070'%0Ad='M22.999,70.003 L2.379,35.000 L22.999,-0.002 L20.622,-0.002 L0.001,35.000 L20.622,70.003 L22.999,70.003 Z'/%3E%3C/svg%3E");
  &.swiper-button-disabled {
    opacity: 0;
  }
  @media screen and (max-width: 510px) {
    display: none;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
  &:focus {
    border: 1px solid blue;
  }
`;

const CustomButtonNext = CustomButtonPrev.extend`
  left: inherit;
  right: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0Axmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 23 70'%0Awidth='12px' height='35px'%3E%3Cpath fill-rule='evenodd' fill='#707070'%0Ad='M0.001,-0.003 L20.621,35.000 L0.001,70.002 L2.378,70.002 L22.999,35.000 L2.378,-0.003 L0.001,-0.003 Z'/%3E%3C/svg%3E ");
`;

// const Icon = styled.span``;

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
  }

  render() {
    const { duration, className } = this.props;

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

      renderPrevButton: () => (
        <CustomButtonPrev className="swiper-button-prev" />
      ),
      renderNextButton: () => (
        <CustomButtonNext className="swiper-button-next" />
      ),

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