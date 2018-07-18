import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import Slide from '../slide'

const StyledSwipe = styled.div`
  /* border: 1px solid black; */
  height: 300px;
  box-sizing: border-box;
  display: flex;
  border: 1px solid black;
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
  background-color: rgba(255, 255, 255, 0.9);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0Axmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 23 70'%0Awidth='12px' height='35px'%3E%3Cpath fill-rule='evenodd' fill='#707070'%0Ad='M22.999,70.003 L2.379,35.000 L22.999,-0.002 L20.622,-0.002 L0.001,35.000 L20.622,70.003 L22.999,70.003 Z'/%3E%3C/svg%3E");
  @media screen and (max-width: 510px) {
    display: none;
  }
`;

const CustomButtonNext = CustomButtonPrev.extend`
  left: inherit;
  right: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0Axmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 23 70'%0Awidth='12px' height='35px'%3E%3Cpath fill-rule='evenodd' fill='#707070'%0Ad='M0.001,-0.003 L20.621,35.000 L0.001,70.002 L2.378,70.002 L22.999,35.000 L2.378,-0.003 L0.001,-0.003 Z'/%3E%3C/svg%3E ");
`;

// const Icon = styled.span``;

const test = (e) => {
  if (!!e.toElement.classList.value) {
    if (e.toElement.classList.contains('imageWrapper')) {
      return false;
    }
    return true;
  };
  return false;
};

class Gallery extends React.Component {
  render() {
    const params = {
      slidesPerView: 4,
      slidesPerGroup: 4,
      preventInteractionOnTransition: true,
      speed: 1000,
      allowSlideNext: false,
      allowSlidePrev: false,

      on: {
        click(e) {
          const doAnimateToNext = test(e);
          if (doAnimateToNext) {
            const isNext = e.toElement.classList.contains("swiper-button-next");
            const { realIndex, passedParams: { slidesPerGroup }, slides } = this;
            const slidesDOM = Array.from(Object.values(slides));
            slidesDOM.forEach(item => {
              if (item.classList) {
                item.classList.add("fade");
              }
            });
            setTimeout(() => {
              if (isNext) {
                this.allowSlideNext = true;
                this.slideNext(0);
                this.allowSlideNext = false;
                const nextStart = realIndex + slidesPerGroup;
                slidesDOM
                  .slice(nextStart, nextStart + slidesPerGroup)
                  .reverse()
                  .forEach((item, index) => {
                    setTimeout(() => {
                      item.classList.remove("fade");
                    }, (1000 / slidesPerGroup) * index);
                  });
              } else {
                this.allowSlidePrev = true;
                this.slidePrev(0);
                this.allowSlidePrev = false;
                const nextStart = realIndex - slidesPerGroup;
                slidesDOM
                  .slice(nextStart, nextStart + slidesPerGroup)
                  // .reverse()
                  .forEach((item, index) => {
                    setTimeout(() => {
                      item.classList.remove("fade");
                    }, (1000 / slidesPerGroup) * index);
                  });
              }
            }, (1000 / 2) + 200);
          }
        },
        init() {
          if (window.innerWidth < 480) {
            this.allowSlideNext = true;
            this.allowSlidePrev = true;
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
          spaceBetween: 10,
          freeMode: true,
        }
      }
    };

    const { data } = this.props;

    return(
      <Swiper {...params}>
        {
          data.map(item => (
            <StyledSwipe key={item}>
              <Inner>
                <Slide i={item} />
              </Inner>
            </StyledSwipe>
          ))
        }
      </Swiper>
    );
  }
}

export default Gallery;