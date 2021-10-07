import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Edit from '../../images/edit.png';

const AddCustomFoodModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState({
    name: '',
    recommendedServing: '',
    caloriesPerServing: '',
    foodCategoryId: '',
    errorMessage: ''
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleChangeComboBox = event => {
    setState({
      ...state,
      foodCategoryId: event.foodCategoryId
    })
  };

  if(props.edit){
    const handleSubmitEdit = async (event) => {
      event.preventDefault();
      await props.onEditCustomFood(props.foodId, state.name, state.recommendedServing, state.caloriesPerServing, state.foodCategoryId);
      setState({
        name: '',
        recommendedServing: '',
        caloriesPerServing: '',
        foodCategoryId: '',
        errorMessage: ''
      });
    };

    return (
      <>
      {/* <Button  type="button" variant="primary" onClick={() => setModalShow(true)}>
        Editar Categoría
      </Button> */}
      <img src={Edit} alt='editar' style={{width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => setModalShow(true)}/>
        
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            {'Editar Alimento Personalizado'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <TextField label="Nombre" name='name' type='name' value={state.name} onChange={handleChange} required />
              <TextField label="Porción Recomendada" name='recommendedServing' type='recommendedServing' value={state.recommendedServing} onChange={handleChange} required />
              <TextField label="Calorias por Porción" name='caloriesPerServing' type='caloriesPerServing' value={state.caloriesPerServing} onChange={handleChange} required />
              <Combobox
                data={props.foodCategories}
                textField='name'
                onSelect={handleChangeComboBox}
                groupBy={category => category.userId}
                renderListGroup={ ({group}) => ( //group es el userId
                  <span>{group === null ? 'Default' : 'Custom'}</span>
                )}
              />
              <button onClick={handleSubmitEdit} className='button'>Finalizar edición</button>
              <p>{state.errorMessage}</p>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={() => setModalShow(false)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    const handleSubmitAdd = async (event) => {
      event.preventDefault();
      await props.onAddCustomFood(state.name, state.recommendedServing, state.caloriesPerServing, state.foodCategoryId, props.userId);
      setState({
        name: '',
        recommendedServing: '',
        caloriesPerServing: '',
        foodCategoryId: '',
        errorMessage: ''
      });
    };

    return (
      <>
        <Button  type="button" variant="primary" onClick={() => setModalShow(true)} style={{backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}}>
          Agregar Alimento Personalizado
        </Button>
        
        <Modal
          show={modalShow}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            {'Agregar Alimento Personalizado'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <TextField label="Nombre" name='name' type='name' value={state.name} onChange={handleChange} required />
              <TextField label="Porción Recomendada" name='recommendedServing' type='recommendedServing' value={state.recommendedServing} onChange={handleChange} required />
              <TextField label="Calorias por Porción" name='caloriesPerServing' type='caloriesPerServing' value={state.caloriesPerServing} onChange={handleChange} required />
              <Combobox
                data={props.foodCategories}
                textField='name'
                onSelect={handleChangeComboBox}
                groupBy={category => category.userId}
                renderListGroup={ ({group}) => ( //group es el userId
                  <span>{group === null ? 'Default' : 'Custom'}</span>
                )}
              />
              <button onClick={handleSubmitAdd} className='button'>Agregar</button>
              <p>{state.errorMessage}</p>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={() => setModalShow(false)}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}
  
  export default AddCustomFoodModal;