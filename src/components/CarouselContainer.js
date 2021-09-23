import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MealModal from './MealModal';

const CarouselContainer = (props) => {
    return (
        <Carousel fade={true} pause={false} controls={true} touch={true}>
            {props.meals.map((meal) =>
                <Carousel.Item key={meal.mealId}>
                    <div className="container" style={{ background: 'lightblue', textAlign: 'center', borderRadius: '10px', backgroundColor: '#CCDDE2' }}>
                        <div className="row">
                            <div className="col-md-4 col-lg-12">
                                <p>{meal.name}</p>
                                <p>{meal.dateEaten.toString().replace('T',' ').substring(0,16)}</p>
                            </div>
                            <div className="col-md-4 col-lg-12" style={{ position: 'center', width: '30%', textAlign: 'center', margin: 'auto' }}>
                            </div>
                            <div className="col-md-4 col-lg-12" style={{marginTop:'10px',position:'center',marginBottom:'10px'}}>
                                <MealModal meal={meal} history={props.history} onDeleteMeal={props.onDeleteMeal} onUpdateCurrentMealInState={props.onUpdateCurrentMealInState}/>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default CarouselContainer;