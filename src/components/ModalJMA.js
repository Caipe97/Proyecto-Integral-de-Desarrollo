import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button} from 'react-bootstrap';

export const MyVerticallyCenteredModal=(props)=> {
  
    return (
      <Modal
        {...props}
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
          <h4>{props.meal.dateEaten}</h4>
          <p>{}</p>
          <p>
            Acontinuacion se mostrar una lista de los alimentos consumidos durante la comida realizada en el dia seleccionado
          </p>
          {props.meal.FoodList.map((FoodListItem) => {
                                    return (
                                        <div key={FoodListItem.food.foodId} style={{textAlign:'center',top:'3px',background:'#B6E052'}}>
                                            <p>{FoodListItem.quantity} {FoodListItem.food.name}</p>
                                        </div>
                                    );
                                })
                                }
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={props.onHide}>Close</Button>
          <Button onClick={() =>  props.history.push("/meals",{prop1: props.meal})
           
            }>Edit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
const ModalJMA =(props) =>{
    const [modalShow, setModalShow] = useState(false);
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    
    //     const data = await this.props.onLogin(this.state.email, this.state.password);
    //     this.setState({ email: '', password: '' });
    //     console.log(data)
    //     if (props.mealId) {
    
    //     }
     
    // };
    return (
      <>
        <Button  type="button" variant="primary" onClick={() => setModalShow(true)}>
          More information for FoodList
        </Button>
        <p>{console.log(props)}</p>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          meal={props.meal}
          history={props.history}
        />
      </>
    );
  }
  
  export default ModalJMA;