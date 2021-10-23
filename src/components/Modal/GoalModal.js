import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button, ProgressBar } from 'react-bootstrap';

const GoalModal =(props) =>{
  const [modalShow, setModalShow] = useState(false);

  const calculateCurrentCaloriesOfGoal = goal => {
    let currentCaloriesPerObjective = 0;
    for (let i = 0; i < goal.objectives.length; i++) {
      const objective = goal.objectives[i];
      currentCaloriesPerObjective += objective.currentCalories;
    }
    return currentCaloriesPerObjective;
  }

  const isGoalEditable = goal => {
    let dateStart = new Date(goal.dateStart);
    dateStart = new Date(dateStart.setHours(dateStart.getHours() + 3));
    const today = new Date();
    if(dateStart.getFullYear() > today.getFullYear()){
      return true;
    } else if(dateStart.getFullYear() === today.getFullYear()){
      if(dateStart.getMonth() > today.getMonth()){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <>
      <Button  type="button" variant="primary" style={{backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}} onClick={() => setModalShow(true)}>
        Mas info
      </Button>
      
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.goal.name} 
          </Modal.Title>
          <Button type="button" onClick={() => setModalShow(false)} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>

        </Modal.Header>
        <Modal.Body>
          <h4>{props.goal.dateStart.toString().replace('T',' ').substring(0,7)}</h4>
          <p>
            Objetivos:
          </p>
          
          {props.goal.objectives.map(objective => {
            return(
              <div key={objective.foodCategoryId} style={{textAlign:'center',top:'3px',background:'#B6E052', margin: "5px", padding: 5, borderRadius: 10}}>
                <p style={{margin: 0}}>{objective.foodCategory.name}: {objective.currentCalories} de {objective.objectiveCalories}</p>
                <ProgressBar animated 
                  variant={(objective.currentCalories/objective.objectiveCalories)*100 > 65 ? "danger" : "success"}  
                  now={(objective.currentCalories/objective.objectiveCalories)*100} 
                  label={`${(objective.currentCalories/objective.objectiveCalories)*100}%`}
                />
                  
              </div>
            );
            })
          }
          {
          props.goal.totalCalories > 0 
          ?  <>
              <p>Calorias totales consumidas: {calculateCurrentCaloriesOfGoal(props.goal)}/{props.goal.totalCalories}:</p> 
              <ProgressBar animated 
                variant={(calculateCurrentCaloriesOfGoal(props.goal)/props.goal.totalCalories)*100 > 65 ? "danger" : "success"}  
                now={(calculateCurrentCaloriesOfGoal(props.goal)/props.goal.totalCalories)*100} 
                label={`${(calculateCurrentCaloriesOfGoal(props.goal)/props.goal.totalCalories)*100}%`}
              />
            </>
          : null
          }
        </Modal.Body>
        <Modal.Footer>
          { isGoalEditable(props.goal)
            ? <Button type="button" onClick={() =>  {props.onUpdateCurrentGoalInState(props.goal); props.history.push("/goals", {goal: props.goal})}} style={{backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>Editar</Button>
            : null
          }
          <Button type="button" onClick={() =>  props.onDeleteGoal(props.goal.goalId, props.goal.userId)} style={{backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
  export default GoalModal;