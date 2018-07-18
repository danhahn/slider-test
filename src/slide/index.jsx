import React from 'react';
import styled from "styled-components";

const S = styled.div`
  @media screen and (max-width: 480px) {
    margin-right: 20px;
  }
`;

const Slide = ({i}) => {
  return <S>
      <div className="imageWrapper">
        <img src={`https://picsum.photos/200/200?image=${i * 10}`} alt="" />
      </div>
      <p>
        {i} Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
        fuga adipisci tenetur ab facere quaerat nulla, nesciunt, cum ipsam
        quam maxime animi, aut voluptatem vitae rem impedit error. Itaque,
        architecto.
      </p>
    </S>;
};

export default Slide;