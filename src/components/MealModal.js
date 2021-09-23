import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button} from 'react-bootstrap';

const MealModal =(props) =>{
    const [modalShow, setModalShow] = useState(false);
    return (
      <>
        <Button  type="button" variant="primary" onClick={() => setModalShow(true)}>
          Mas info
        </Button>
       
        <Modal
        show={modalShow}
        //onHide={() => setModalShow(false)}
        // meal={props.meal}
        history={props.history}
        onDeleteMeal={props.onDeleteMeal}
        onUpdateCurrentMealInState={props.onUpdateCurrentMealInState}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.meal.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.meal.dateEaten.toString().replace('T',' ').substring(0,16)}</h4>
          <p>
            Alimentos consumidos:
          </p>
          {props.meal.FoodList.map((FoodListItem) => {
              return(
                <div key={FoodListItem.food.foodId} style={{textAlign:'center',top:'3px',background:'#B6E052'}}>
                  <p>{FoodListItem.quantity} {FoodListItem.food.name}</p>
                </div>
              );
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() =>setModalShow(false)}>Cerrar</Button>
          <Button type="button" onClick={() =>  {props.onUpdateCurrentMealInState(props.meal); props.history.push("/meals", {meal: props.meal})}}>Editar</Button>
          <Button type="button" onClick={() =>  props.onDeleteMeal(props.meal.mealId, props.meal.userId)}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default MealModal;