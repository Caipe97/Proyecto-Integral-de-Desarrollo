import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Delete from '../../images/delete.png';

const DeleteCategoryModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  let onlyCustomCategories = props.categories.filter((category) => category.userId !== null);

  const [state, setState] = useState({
    name: '',
    foodCategoryId: '',
    errorMessage: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.onDeleteCategory(state.foodCategoryId);
    setState({
      name: '',
      foodCategoryId: '',
      errorMessage: ''
    });
  };

  const onChangeComboBox = async event => {
    await setState({...state, foodCategoryId: event.foodCategoryId});
  }

  return (
    <>
      {/* <Button  type="button" variant="primary" onClick={() => setModalShow(true)}>
        Eliminar Categoría
      </Button> */}
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
        </Modal.Header>
        <Modal.Body>

          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <Combobox
              data={onlyCustomCategories}
              textField='name'
              onSelect={onChangeComboBox}
              groupBy={category => category.userId}
              renderListGroup={ ({group}) => ( //group es el userId
                <span>{group === null ? 'Default' : 'Custom'}</span>
              )}
            />
            <button onClick={handleSubmit} className='button'>Eliminar</button>
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
  
  export default DeleteCategoryModal;