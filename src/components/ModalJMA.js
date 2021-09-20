import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button} from 'react-bootstrap';
const MyVerticallyCenteredModal=(props)=> {
  
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.aca}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.acaFecha}</h4>
          <p>{props.aca}</p>
          <p>
            Acontinuacion se mostrar una lista de los alimentos consumidos durante la comida realizada en el dia seleccionado
          </p>
          {props.acaFoodList.map((FoodListItem) => {
                                    return (
                                        <div key={FoodListItem.food.foodId} style={{textAlign:'center',top:'3px',background:'#B6E052'}}>
                                            <p>{FoodListItem.quantity} {FoodListItem.food.name}</p>
                                        </div>
                                    );
                                })
                                }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onHide}>Edit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
const ModalJMA =(props) =>{
    const [modalShow, setModalShow] = useState(false);
  
    return (
      <>
        <Button  type="button" variant="primary" onClick={() => setModalShow(true)}>
          More information for FoodList
        </Button>
      
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          aca={props.nameMeal}
          acaFoodList={props.foodList}
          acaFecha ={props.fecha}
        />
      </>
    );
  }
  
  export default ModalJMA;