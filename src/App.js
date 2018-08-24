import React from 'react';
import Gallery from './gallery';
import styled from "styled-components";
import Slide from "./slide";
import './App.css';

// const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

const StyledSwipe = styled.div`
  &.fade {
    transition: all 1s;
    .image-panel {
      img {
        opacity: 0;
        transition: all 1s;
      }
      .quickview-container {
        opacity: 0;
        transition: all 1s;
      }
    }
    li {
      opacity: 0;
      transition: all 1s;
    }
  }
  &.fade&.fade-return {
    .image-panel {
      img {
        opacity: 1;
      }
      .quickview-container {
        opacity: 1;
      }
    }
    li {
      opacity: 1;
    }
  }
`;

const Inner = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .image-panel {
    background-color: #f6f6f6;
  }
  img {
    transition: all 100ms;
    max-width: 100%;
  }
  p {
    transition: all 1s;
    margin: 1em;
  }
  li,
  .quickview-container {
    transition: all 100ms;
  }
`;

const CustomButtonPrev = styled.button`
  outline: none;
  border: none;
  width: 29px;
  height: 65px;
  left: 0;
  top: 227px;
  margin-top: 0;
  transform: translateY(-50%);
  background-size: 11px 35px;
  background-color: rgba(255, 255, 255, 0.7);
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' xmlns='http://www.w3.org/2000/svg' width='11' height='35'%3E%3Cpolygon class='cls-3' points='11 35 1.14 17.5 11 0 9.86 0 0 17.5 9.86 35' fill='%23707070'/%3E%3C/svg%3E%0A");
  transition: background-color 750ms;
  &.swiper-button-disabled {
    opacity: 0;
  }
  @media screen and (max-width: 510px) {
    display: none;
  }
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 1);
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' xmlns='http://www.w3.org/2000/svg' width='11' height='35'%3E%3Cpolygon class='cls-3' points='11 35 1.14 17.5 11 0 9.86 0 0 17.5 9.86 35' fill='%23000000'/%3E%3C/svg%3E%0A");
  }
  &[disabled] {
    display: none;
  }
`;

const CustomButtonNext = CustomButtonPrev.extend`
  left: inherit;
  right: 0;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' width='11' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon class='cls-3' fill='%23707070' points='0 0 9.86 17.5 0 35 1.14 35 11 17.5 1.14 0'/%3E%3C/svg%3E%0A");
  &:hover,
  &:focus {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg viewBox='0 0 11 35' width='11' height='35' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon class='cls-3' fill='%23000000' points='0 0 9.86 17.5 0 35 1.14 35 11 17.5 1.14 0'/%3E%3C/svg%3E%0A");
  }
`;

class Example extends React.Component {

  render() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const data2 = [1, 2, 3, 4, 5, 6, 7, 8];

    return <div style={{ padding: 20, maxWidth: 1000, margin: '0 auto' }}>
        <h2>Before</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus, ex eaque voluptatem, dolorum eveniet delectus ut
          velit animi laboriosam quod, officiis saepe omnis temporibus!
          Excepturi fuga eius voluptatibus consectetur vero.
        </p>
        <p>
          Enim maiores magni, consequuntur illo dolorum nulla inventore ad?
          Accusamus molestias ab doloremque commodi sunt optio voluptate
          consequuntur laudantium, perspiciatis, et quo quaerat earum cum
          repudiandae repellat laboriosam necessitatibus voluptas!
        </p>
        <p>
          Modi dolor repudiandae id voluptates quia saepe, animi corporis
          consectetur provident. Cupiditate totam fugit architecto facilis.
          Quasi velit dolorem quos veritatis animi quisquam laboriosam
          accusamus! Quia in quas natus consequuntur.
        </p>
        <Gallery
        // duration={400}
        // className={'fade'}
        nextButton={<CustomButtonNext />}
        prevButton={<CustomButtonPrev />}
        render={
          () => (
            data.map(item => (
              <StyledSwipe key={item}>
                <Inner>
                  <Slide i={item} />
                </Inner>
              </StyledSwipe>
            ))
          )
        } />
        <h2>#2</h2>
        <Gallery
        // duration={400}
        // className={'fade'}
        nextButton={<CustomButtonNext />}
        prevButton={<CustomButtonPrev />}
        render={
          () => (
            data2.map(item => (
              <StyledSwipe key={item}>
                <Inner>
                  <Slide i={item} />
                </Inner>
              </StyledSwipe>
            ))
          )
        } />
        <h3>after</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ipsa,
          architecto, itaque praesentium eius nihil alias sapiente, earum
          iusto iure explicabo neque nemo ex? Consequuntur officiis mollitia
          aliquid quisquam cumque.
        </p>
        <p>
          Fugit eligendi eveniet quasi blanditiis minima! Facilis
          perferendis id corporis autem? Expedita porro mollitia autem
          molestiae placeat asperiores alias hic nesciunt non voluptates
          obcaecati aliquam voluptatibus cum accusamus, labore architecto?
        </p>
        <p>
          Aut, quasi! Repellendus sed maxime alias nobis odit dolores
          reiciendis vero libero, iste facilis optio delectus consectetur
          impedit soluta modi adipisci ab autem sequi voluptates expedita
          exercitationem corporis harum pariatur.
        </p>
      </div>;
  }
}

export default Example;