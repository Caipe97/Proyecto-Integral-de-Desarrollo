import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const MealModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  let totalCaloriesPerFood = 0;
  const calculateTotalCaloriesPerMeal = () => {
    let totalCaloriesPerMeal = 0;
    for (let i = 0; i < props.meal.FoodList.length; i++) {
      const element = props.meal.FoodList[i];
      totalCaloriesPerMeal += element.food.caloriesPerServing * element.quantity;
    }
    return totalCaloriesPerMeal;
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
          {props.meal.name}
          </Modal.Title>
          <Button type="button" onClick={() => setModalShow(false)} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
        </Modal.Header>

        <Modal.Body>
          <h4>{props.meal.dateEaten.toString().replace('T',' ').substring(0,16)}</h4>
          <p>
            Alimentos consumidos:
          </p>
          {props.meal.FoodList.map((FoodListItem) => {
              totalCaloriesPerFood = FoodListItem.food.caloriesPerServing * FoodListItem.quantity
              return(
                <div key={FoodListItem.food.foodId} style={{textAlign:'center',top:'3px',background:'#B6E052', margin: "5px", padding: 5, borderRadius: 10}}>
                  <p style={{margin: 0}}>{FoodListItem.quantity} x {FoodListItem.food.name}: {totalCaloriesPerFood} calorias en total</p>
                </div>
              );
            })
          }
          <p>Total de calorias consumidas en la comida: {calculateTotalCaloriesPerMeal()}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" onClick={() =>  {props.onUpdateCurrentMealInState(props.meal); props.history.push("/meals", {meal: props.meal})}} style={{backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>Editar</Button>
          <Button type="button" onClick={async () =>  {
            const data = await props.onDeleteMeal(props.meal.mealId, props.meal.userId);
            if(data){
              setModalShow(false);
            }
            }} style={{backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>
              Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
  export default MealModal;