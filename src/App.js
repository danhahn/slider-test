import React from 'react';
import Gallery from './gallery';
import './App.css';

const data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

class Example extends React.Component {
  render() {
    return <div style={{ padding: 20 }}>
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
        <Gallery data={data} />
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