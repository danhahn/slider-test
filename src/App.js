import React from 'react';
import Gallery from './gallery';
import styled from "styled-components";
import Slide from "./slide";
import './App.css';

const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

const StyledSwipe = styled.div`
  /* border: 1px solid black; */
  /* height: 300px; */
  /* box-sizing: border-box;
  display: flex; */
  &.fade {
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
    background-color: rebeccapurple;
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
  transition: background-color 750ms;
  &.swiper-button-disabled {
    opacity: 0;
  }
  @media screen and (max-width: 510px) {
    display: none;
  }
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.9);
  }
`;

const CustomButtonNext = CustomButtonPrev.extend`
  left: inherit;
  right: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%0Axmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 23 70'%0Awidth='12px' height='35px'%3E%3Cpath fill-rule='evenodd' fill='#707070'%0Ad='M0.001,-0.003 L20.621,35.000 L0.001,70.002 L2.378,70.002 L22.999,35.000 L2.378,-0.003 L0.001,-0.003 Z'/%3E%3C/svg%3E ");
`;

class Example extends React.Component {

  render() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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