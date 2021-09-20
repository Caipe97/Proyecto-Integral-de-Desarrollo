import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ModalJMA from './ModalJMA';

// import image1 from './../assets/images/1.jpg';
// import image2 from './../assets/images/2.jpg';
// import image3 from './../assets/images/3.jpg';
const array1 = [];
// const sum=0;

const CarouselContainer = (props) => {
    return (

        <Carousel fade={true} pause={false} controls={true} touch={true} >
            {props.meals.map((meal) =>
                <Carousel.Item>
                    <div className="container" key={meal.mealId} style={{ background: 'lightblue', textAlign: 'center', borderRadius: '10px' }}>

                        <div class="row">
                            <div class="col-md-4 col-lg-12">
                                <p>{meal.name}</p>
                                <p>{meal.dateEaten}</p>

                            </div>

                            <div class="col-md-4 col-lg-12" style={{ position: 'center', width: '30%', textAlign: 'center', margin: 'auto' }}>
                                <p>Calorias Consumidas</p>
                                <div class="progress" style={{ position: 'center', margin: 'auto' }}   >
                                    {meal.FoodList.map((FoodListItem) => {

                                        array1.push(FoodListItem.food.caloriesPerServing);
                                    })
                                    }

                                    <div class="progress-bar" role="progressbar" style={{ width: '\'' + '90%' + '\'', minWidth: '10%' }}>
                                        10%
                                        <p>{array1.reduce((a, b) => a + b, 0) / 3000 * 100}%</p>
                                    </div>
                                    {/* <p>10%</p> */}
                                </div>
                            </div>
                            {/* <div class="col-md-4 col-lg-12">

                                {meal.FoodList.map((FoodListItem) => {
                                    return (
                                        <div key={FoodListItem.food.foodId}>
                                            <p>{FoodListItem.quantity} {FoodListItem.food.name}</p>
                                        </div>
                                    );
                                })
                                }


                            </div> */}
                            <div class="col-md-4 col-lg-12" style={{marginTop:'10px',position:'center',marginBottom:'10px'}}>
                                <ModalJMA foodList={meal.FoodList} nameMeal= {meal.name} fecha={meal.dateEaten}/>
                            </div>

                        </div>






                    </div>

                    {/* 

                    <Carousel.Caption><h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>*/}
                </Carousel.Item>
            )}
            {/* <Carousel.Item interval={2000}>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt="Third slide"
                />
                <div>comida2</div>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item> */}
        </Carousel>
    )
}

export default CarouselContainer;