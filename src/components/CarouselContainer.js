import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import MealModal from './MealModal';
import './CarouselContainer.css';
// const groupIntoThrees =(children) =>{
//     const output = []
//     let currentGroup = []
  
//     children.forEach((child, index) => {
//       currentGroup.push(child)
  
//       if (index % 3 === 2) {
//         output.push(currentGroup)
//         currentGroup = []
//       }
//     })
  
//     return output
// };

const CarouselContainer = (props) => {
    const prev  = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');

let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

window.addEventListener('resize', () => {
  carouselWidth = document.querySelector('.carousel-container').offsetWidth;
})

let index = 0;

next.addEventListener('click', () => {
  index++;
  prev.classList.add('show');
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
  
  if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
    next.classList.add('hide');
  }
})

prev.addEventListener('click', () => {
  index--;
  next.classList.remove('hide');
  if (index === 0) {
    prev.classList.remove('show');
  }
  track.style.transform = `translateX(-${index * carouselWidth}px)`;
})

    return (
        <>
        {/* <Carousel fade={true} pause={false} controls={true} touch={true} style={{position:'relative'}}>
            {props.meals.map((meal) =>
                <Carousel.Item key={meal.mealId}>
                    <div className="container" style={{ background: 'lightblue', textAlign: 'center', borderRadius: '10px'}}>
                        <div className="row">
                            <div className="col-md-4 col-lg-12">
                                <p>{meal.name}</p>
                                <p>{meal.dateEaten.toString().replace('T',' ').substring(0,16)}</p>
                            </div>
                            <div className="col-md-4 col-lg-12" style={{ position: 'center', width: '30%', textAlign: 'center', margin: 'auto' }}>
                                <p>Calorias Consumidas</p>
                            </div>
                            <div className="col-md-4 col-lg-12" style={{marginTop:'10px',position:'center',marginBottom:'10px'}}>
                                <MealModal meal={meal} history={props.history} onDeleteMeal={props.onDeleteMeal} onUpdateCurrentMealInState={props.onUpdateCurrentMealInState}/>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            )}
        </Carousel> */}
        <div class="carousel-container" style={{width:'80%'}}>
  <div class="carousel-inner">
    <div class="track">
    {props.meals.map((meal,index) =>
                <div class="card-container" key={index}>
                <div class="card">
                  <div class="img" style={{background:'lightGreen'}}>{meal.name}</div>
                  <div class="info">
                  {meal.dateEaten.toString().replace('T',' ').substring(0,16)}
                  </div>
                  <div>
                  <MealModal meal={meal} history={props.history} onDeleteMeal={props.onDeleteMeal} onUpdateCurrentMealInState={props.onUpdateCurrentMealInState}/>
                  </div>
                </div>
              </div>
                    // <div className="container" style={{ background: 'lightblue', textAlign: 'center', borderRadius: '10px'}}>
                    //     <div className="row">
                    //         <div className="col-md-4 col-lg-12">
                    //             <p>{meal.name}</p>
                    //             <p>{meal.dateEaten.toString().replace('T',' ').substring(0,16)}</p>
                    //         </div>
                    //         <div className="col-md-4 col-lg-12" style={{ position: 'center', width: '30%', textAlign: 'center', margin: 'auto' }}>
                    //             <p>Calorias Consumidas</p>
                    //         </div>
                    //         <div className="col-md-4 col-lg-12" style={{marginTop:'10px',position:'center',marginBottom:'10px'}}>
                    //             <MealModal meal={meal} history={props.history} onDeleteMeal={props.onDeleteMeal} onUpdateCurrentMealInState={props.onUpdateCurrentMealInState}/>
                    //         </div>
                    //     </div>
                    // </div>
                
            )}
      {/* <div class="card-container">
        <div class="card">
          <div class="img">1</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">2</div>
          <div class="info">
            Title 2
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">3</div>
          <div class="info">
            Title 3
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">4</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">5</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">6</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">7</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">8</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">9</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">9</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">9</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">9</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">9</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card">
          <div class="img">9</div>
          <div class="info">
            Title 1
          </div>
        </div>
      </div> */}
    </div>
  </div>
  <div class="nav">
    <button class="prev">
      <i class="material-icons">
      keyboard_arrow_left
      </i>
    </button>
    <button class="next">
      <i class="material-icons">
      keyboard_arrow_right
      </i>
    </button>
  </div>
</div>
        </>
    )
}

export default CarouselContainer;