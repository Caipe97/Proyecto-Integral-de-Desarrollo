import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Add from '../../images/add.png';

const AddCategoryModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState({
    name: '',
    message: ''
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const validateString = (name) => { //cannot be empty and only letters
    const expression = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/
    return expression.test(String(name).toLowerCase())
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateString(state.name)){
      const data = await props.onCreateCategory(state.name, props.userId);
      if(data){
        setState({
          name: '',
          message: 'Categoría agregada exitosamente'
        });
      }
    } else {
      setState({...state, message: 'La categoría debe tener un nombre(solo letras)'});
    }
  };

  return (
    <>
      <img src={Add} alt='agregar' style={{width: '30px', height: '30px', cursor: 'pointer'}} onClick={() => setModalShow(true)}/>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
          {'Crear Categoría'}
          </Modal.Title>
          <Button type="button" onClick={() => {setModalShow(false); setState({...state, name: '', message: ''});}} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <TextField label="Nombre" name='name' type='name' value={state.name} onChange={handleChange} required />
            <button onClick={handleSubmit} className='button'>Crear</button>
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
  
  export default AddCategoryModal;