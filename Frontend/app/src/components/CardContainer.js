import React from 'react';
import Card from './Card';
import './CardContainer.css';

function CardContainer() {
  return(
  <div className="card-container">
 <span>Top categories</span>
  <div className="cards">

  <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
          imageUrl="https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg"
          title="Design"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg"
        title="Development"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg"
        title="Marketing"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg"
        title="It-and-Software"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl=" https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg"
        title="Personal-Development"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl=" https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg"
        title="Business"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl=" https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg"
        title="Photography"
      />
      </a>
      <a href='https://www.udemy.com/courses/design/' className="card-link">
      <Card
        imageUrl="https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg"
        title="Music"
      />
      </a>
    </div>
    </div>
  
  );
}

export default CardContainer;