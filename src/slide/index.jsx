import React from 'react';
import styled from "styled-components";

const S = styled.div`
  img {
    display: block;
    max-width: 100%;
  }
`;

const Slide = ({i}) => {
  return <S>
      <div className="imageWrapper">
        <div className="image-panel">
          <img src={`https://picsum.photos/400/200?image=${i * 10}`} alt="" />
          <button className="quickview-container">Quickview</button>
        </div>
      </div>
      <ul>
        <li>{i} Lorem ipsum dolor sit</li>
        <li>{i} Lorem ipsum dolor sit</li>
        <li>{i} Lorem ipsum dolor sit</li>
        <li>{i} Lorem ipsum dolor sit</li>
      </ul>
    </S>;
};

export default Slide;