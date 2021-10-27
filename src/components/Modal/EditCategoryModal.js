import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import TextField from '@material-ui/core/TextField';
import Edit from '../../images/edit.png';

const EditCategoryModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  let onlyCustomCategories = props.categories.filter((category) => category.userId !== null);
  const [state, setState] = useState({
    name: '',
    foodCategoryId: '',
    message: ''
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await props.onEditCategory(state.foodCategoryId, state.name);
    if(data){
      setState({
        name: '',
        foodCategoryId: '',
        message: 'Categoría editada exitosamente'
      });
    }
  };

  const onChangeComboBox = async event => {
    await setState({...state, foodCategoryId: event.foodCategoryId});
  }

  return (
    <>
      <img src={Edit} alt='editar' style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={() => setModalShow(true)}/>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          {'Editar Categoría'}
          </Modal.Title>
          <Button type="button" onClick={() => {setModalShow(false); setState({...state, message: ''});}} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
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
            <TextField label="Nuevo nombre" name='name' type='name' value={state.name} onChange={handleChange} required />
            <button onClick={handleSubmit} className='button'>Editar</button>
            <p>{state.message}</p>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
  
  export default EditCategoryModal;