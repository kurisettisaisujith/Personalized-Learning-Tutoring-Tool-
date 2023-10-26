import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <div className="card">
        <div className='carddev'>
      <img src={props.imageUrl} alt={props.title} />
      </div>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}

export default Card;