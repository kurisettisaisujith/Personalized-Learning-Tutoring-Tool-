import React from 'react';
import Card from './Card';
import './CardSet2.css';
import './CardContainer.css';
function CardSet2() {
  return (
    <div className="card-container">
    <span>Top courses <img src="./images/book-open-cover.png" width="18px" height="18px"/></span>
    <div className="cards">
    <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFWyrfUZGRJ5ByvHS3Qunwg320IU5JQJ9sgw&usqp=CAU"
        title="Udemy"
        description="We’ll get you to your goals."
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboAWZyv-1yAjzqCj8Py0_nxojPAuqFDExtg&usqp=CAU"
        title="Udemy"
        description="We’ll get you to your goals."
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboAWZyv-1yAjzqCj8Py0_nxojPAuqFDExtg&usqp=CAU"
        title="Udemy"
        description="We’ll get you to your goals."
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSboAWZyv-1yAjzqCj8Py0_nxojPAuqFDExtg&usqp=CAU"
        title="Udemy"
        description="We’ll get you to your goals."
      />
      </a>
    
    </div>
    <br/>
  
    </div>
  );
}

export default CardSet2;