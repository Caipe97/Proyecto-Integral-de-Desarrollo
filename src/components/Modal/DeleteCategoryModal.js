import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Delete from '../../images/delete.png';

const DeleteCategoryModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  let onlyCustomCategories = props.foodCategories.filter((category) => category.userId !== null);

  const [state, setState] = useState({
    name: '',
    foodCategoryId: '',
    categoryName: '',
    message: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(state.foodCategoryId !== ''){
      const data = await props.onDeleteCategory(state.foodCategoryId);
      if(data){
        setState({
          name: '',
          foodCategoryId: '',
          categoryName: '',
          message: 'Categoría eliminada exitosamente'
        });
      }
    } else {
      setState({...state, message: 'Debe seleccionar alguna categoría para eliminarla'});
    }
  };

  const getFoodCategoryName = (foodCategoryId) => {
    const foodCategoryName = props.foodCategories.find(foodCategory => foodCategory.foodCategoryId === foodCategoryId);
    if(foodCategoryId === -2){
      return '';
    }
    return foodCategoryName;
  }

  const onChangeComboBox = async event => {
    await setState({...state, foodCategoryId: event.foodCategoryId, categoryName: getFoodCategoryName(event.foodCategoryId)});
  }

  return (
    <>
      <img src={Delete} alt='eliminar' style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={() => setModalShow(true)}/>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          {'Eliminar Categoría'}
          </Modal.Title>
          <Button type="button" onClick={() => {setModalShow(false); setState({...state, message: ''});}} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
        </Modal.Header>
        <Modal.Body>

          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <Combobox
              data={onlyCustomCategories}
              value={state.categoryName}
              textField='name'
              onSelect={onChangeComboBox}
              groupBy={category => category.userId}
              renderListGroup={ ({group}) => ( //group es el userId
                <span>{group === null ? 'Default' : 'Custom'}</span>
              )}
            />
            <button onClick={handleSubmit} className='button'>Eliminar</button>
            <p>{state.message}</p>
            {props.isPending
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
  
  export default DeleteCategoryModal;