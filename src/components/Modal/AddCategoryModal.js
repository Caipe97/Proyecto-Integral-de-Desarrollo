import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Add from '../../images/add.png';

const AddCategoryModal = (props) =>{
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState({
    name: '',
    errorMessage: ''
  })

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.onCreateCategory(state.name, props.userId);
    setState({
      name: '',
      errorMessage: ''
    });
  };

  return (
    <>
      {/* <Button  type="button" variant="primary" onClick={() => setModalShow(true)}>
        Crear Categoría
      </Button> */}
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
        </Modal.Header>
        <Modal.Body>
          <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
            <TextField label="Nombre" name='name' type='name' value={state.name} onChange={handleChange} required />
            <button onClick={handleSubmit} className='button'>Crear</button>
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
  
  export default AddCategoryModal;