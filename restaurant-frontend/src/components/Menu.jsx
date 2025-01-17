import React, { useState, useEffect } from 'react';
import axios from '../Api/axios';
import ReactLoading from 'react-loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const NextArrow = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow next-arrow`} style={style} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);

const PrevArrow = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow prev-arrow`} style={style} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching categories:', error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get('/foods');
      setFoods(response.data);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching foods:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchCategories(), fetchFoods()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <center>
        <ReactLoading type="bars" color="green" height={'8%'} width={'8%'} />
      </center>
    );
  }

  if (isError) {
    return <div>Error loading menu. Please try again later.</div>;
  }

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="menu-container">
      {categories.map((category) => {
        const categoryFoods = foods.filter((food) => food.category_id === category.id);
        return (
          <section key={category.id} className="category-section">
            <h2 className="category-title">{category.name}</h2>
            <Slider {...sliderSettings} className="category-slider">
              {categoryFoods.map((food) => (
                <div key={food.id} className="slide-item">
                  <div className="card">
                    <img src={food.image || "/placeholder.svg"} alt={food.name} className="card-image" />
                    <div className="card-body">
                      <h3 className="card-title">{food.name}</h3>
                      <p className="card-price">${parseFloat(food.price).toFixed(2)}</p>
                      <p className="card-description">{food.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
        );
      })}
    </div>
  );
};

export default Menu;

