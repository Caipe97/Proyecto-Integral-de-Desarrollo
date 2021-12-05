import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Edit from '../../images/edit.png';

const CustomFoodModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState({
    name: '',
    recommendedServing: '',
    caloriesPerServing: '',
    foodCategoryId: '',
    message: ''
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

  const validateAll = (name, recommendedServing, caloriesPerServing, foodCategoryId) => {
    if(validateString(name) && validateNumber(recommendedServing) && validateNumber(caloriesPerServing) && validateNumber(foodCategoryId)){
      return true;
    }
    return false;
  }

  const validateString = (name) => { //cannot be empty and only letters
    const expression = /^[a-z ,.'-]+$/i 
    return expression.test(String(name).toLowerCase())
  }

  const validateNumber = (weight) => { //cannot be empty and only numbers
    const expression = /^\d+$/
    return expression.test(String(weight).toLowerCase())
  }

  if(props.edit){
    const handleSubmitEdit = async (event) => {
      event.preventDefault();
      await setState({...state, message: ''});
      if(validateAll(state.name, state.recommendedServing, state.caloriesPerServing, state.foodCategoryId)){
        await setState({...state, message: '', loading: true});
        const data = await props.onEditCustomFood(props.foodId, state.name, state.recommendedServing, state.caloriesPerServing, state.foodCategoryId);
        if(data){
          setState({
            ...state,
            message: 'Alimento editado exitosamente',
            loading: false
          });
        }
      } else {
        setState({...state, message: 'Debe completar todos los campos correctamente', loading: false});
      }
    };
    
    const getFoodCategoryName = (foodCategoryId) => {
      const foodCategoryName = props.foodCategories.find(foodCategory => foodCategory.foodCategoryId === foodCategoryId);
      if(foodCategoryId === -2){
        return '';
      }
      return foodCategoryName;
    }

    return (
      <>
      <img src={Edit} alt='editar' style={{width: '20px', height: '20px', cursor: 'pointer'}} onClick={() => {
        setState({
          name: props.row.name,
          recommendedServing: props.row.recommendedServing,
          caloriesPerServing: props.row.caloriesPerServing,
          foodCategoryId: props.row.foodCategoryId
        });
        setModalShow(true)
        }}/>
        
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
            <Button type="button" onClick={() => {setModalShow(false); setState({...state, message: ''});}} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
          </Modal.Header>
          <Modal.Body>
            <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <TextField label="Nombre" name='name' type='name' value={state.name} onChange={handleChange} required />
              <TextField label="Porción Recomendada" name='recommendedServing' type='recommendedServing' value={state.recommendedServing} onChange={handleChange} required />
              <TextField label="Calorias por Porción" name='caloriesPerServing' type='caloriesPerServing' value={state.caloriesPerServing} onChange={handleChange} required />
              <Combobox
                data={props.foodCategories}
                defaultValue={getFoodCategoryName(state.foodCategoryId)}
                textField='name'
                onSelect={handleChangeComboBox}
                groupBy={category => category.userId}
                renderListGroup={ ({group}) => ( //group es el userId
                  <span>{group === null ? 'Default' : 'Custom'}</span>
                )}
              />
              <button onClick={handleSubmitEdit} className='button'>Finalizar edición</button>
              <p>{state.message}</p>
              {state.loading === true
              ? <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              : null}
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    const handleSubmitAdd = async (event) => {
      event.preventDefault();
      setState({...state, message: ''});
      if(validateAll(state.name, state.recommendedServing, state.caloriesPerServing, state.foodCategoryId)){
        setState({...state, message: '', loading: true});
        const data = await props.onAddCustomFood(state.name, state.recommendedServing, state.caloriesPerServing, state.foodCategoryId, props.userId);
        if(data){
          setState({
            name: '',
            recommendedServing: '',
            caloriesPerServing: '',
            foodCategoryId: '',
            message: 'Alimento agregado exitosamente',
            loading: false
          });
        }
      } else {
        setTimeout(() => {
          setState({...state, message: 'Debe completar todos los campos correctamente', loading: false});
        }, 0.1 * 1000);
      }
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
            <Button type="button" onClick={() => {setModalShow(false); setState({
              name: '',
              recommendedServing: '',
              caloriesPerServing: '',
              foodCategoryId: '',
              message: ''
            });}} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
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
              <p>{state.message}</p>
              {state.loading === true
              ? <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              : null}
            </form>

          </Modal.Body>
        </Modal>
      </>
    );
  }

}
  
  export default CustomFoodModal;