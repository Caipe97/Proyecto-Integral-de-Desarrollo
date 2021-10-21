import {React, } from 'react';
//import Carousel from 'react-bootstrap/Carousel';
import GoalModal from '../Modal/GoalModal';
import './CarouselContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
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
          
          <div className="card-container" key={'addMeta'}>
              <div style={{ background: '#CCDDE2', textAlign: 'center', margin: 5, borderRadius: 10, paddingBottom: 5}}>
              <Button  className="card-container" type="button" variant="primary" style={{marginBottom: 14, height: 50, width: "100%",backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>
              <Link to="/goals">Nueva Meta</Link>
              </Button>
              <Button  className="card-container" type="button" variant="primary" style={{height: 50, width: "100%",backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>
              Historial de Metas
              </Button>
              </div>
          </div>
        {props.goals.map((goal, index) =>
            <div className="card-container" key={index}>
                <div style={{ background: '#CCDDE2', textAlign: 'center', margin: 5, borderRadius: 10, paddingBottom: 5}}>
                    <div className="img" style={{fontSize: 24}}>
                        <p style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{goal.name}</p>
                    </div>
                    <div>
                        {goal.dateStart.toString().replace('T', ' ').substring(0, 7)}
                    </div>
                    {goal 
                    ?                     
                    <div>
                      <GoalModal goal={goal} history={props.history} onDeleteGoal={props.onDeleteGoal} onUpdateCurrentGoalInState={props.onUpdateCurrentGoalInState} />
                    </div>
                    : null
                    }

                </div>
            </div>
         )}       
    </Carousel>
    )
}

export default CarouselContainer;