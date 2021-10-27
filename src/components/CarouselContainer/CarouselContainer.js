import {React} from 'react';
import GoalModal from '../Modal/GoalModal';
import './CarouselContainer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from 'react-bootstrap';
import GoalsHistoryModal from '../Modal/GoalsHistoryModal';
const responsive = {
  superLargeDesktop: {
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
  let goals = props.goals;
  goals = props.goals.filter(goal => {
    let dateStartCopy = new Date(new Date(goal.dateStart).setHours(new Date(goal.dateStart).getHours() + 3))
    return dateStartCopy < new Date()
  });
  
  return (
      <Carousel responsive={responsive}>
        <div className="card-container" key={'addMeta'}>
            <div style={{ background: '#CCDDE2', textAlign: 'center', margin: 5, borderRadius: 10, paddingBottom: 5}}>
            <Button  className="card-container" type="button" variant="primary" style={{marginBottom: 14, height: 50, width: "100%",backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}} onClick={async () => {  props.history.push("/goals"); }}>
            Nueva Meta
            </Button>
            <GoalsHistoryModal {...props}/>
            </div>
        </div>
      {goals.map((goal, index) =>
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