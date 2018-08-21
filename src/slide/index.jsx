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
        <img src={`https://picsum.photos/400/200?image=${i * 10}`} alt="" />
      </div>
      <p>
        {i} Lorem ipsum dolor sit
      </p>
    </S>;
};

export default Slide;