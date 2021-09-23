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
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

   

const CarouselContainer = (props) => {
    
    return (
      
            <Carousel responsive={responsive}>
  {/* <div>Item 1</div> */}
  {props.meals.map((meal, index) =>
                            <div className="card-container" key={index}>
                                <div className="card">
                                    <div className="img" style={{ background: 'lightGreen' }}>{meal.name}</div>
                                    <div className="info">
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