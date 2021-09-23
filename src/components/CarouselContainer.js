import {React, } from 'react';
//import Carousel from 'react-bootstrap/Carousel';
import MealModal from './MealModal';
import './CarouselContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

   

const CarouselContainer = (props) => {
    return (
        <Carousel responsive={responsive}>
        {props.meals.map((meal, index) =>
            <div className="card-container" key={index}>
                <div style={{ background: '#CCDDE2', textAlign: 'center', margin: 5, borderRadius: 10, paddingBottom: 5}}>
                    <div className="img" style={{fontSize: 24}}>
                        <p style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{meal.name}</p>
                    </div>
                    <div>
                        {meal.dateEaten.toString().replace('T', ' ').substring(0, 16)}
                    </div>
                    <div>
                        <MealModal meal={meal} history={props.history} onDeleteMeal={props.onDeleteMeal} onUpdateCurrentMealInState={props.onUpdateCurrentMealInState} />
                    </div>
                </div>
            </div>
         )}       
    </Carousel>
    )
}

export default CarouselContainer;