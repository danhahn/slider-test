import React from 'react';

const Slide = ({i}) => {
  return (
    <div>
      <div className="imageWrapper"><img src={`https://picsum.photos/200/200?image=${i * 10}`} alt="" /></div>
      <p>{i} Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fuga adipisci tenetur ab facere quaerat nulla, nesciunt, cum ipsam quam maxime animi, aut voluptatem vitae rem impedit error. Itaque, architecto.</p>
    </div>
    );
};

export default Slide;