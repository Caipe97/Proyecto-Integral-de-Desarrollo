import React, { useState } from 'react';
import Modal  from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import GoalsSearchBar from '../SearchBar/GoalsSearchBar';

const GoalsHistoryModal =(props) =>{
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button  type="button" variant="primary" style={{height: 50, width: "100%",backgroundColor: 'rgb(18, 207, 90)', borderColor: 'rgb(18, 207, 90)'}} onClick={() => setModalShow(true)}>
        Ver todas las metas
      </Button>
      
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {'Todas las Metas'}
          </Modal.Title>
          <Button type="button" onClick={() => setModalShow(false)} style={{ backgroundColor: 'white', borderColor: 'white', color: "black"}}>X</Button>
        </Modal.Header>
        <Modal.Body>
          <GoalsSearchBar {...props}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
  
  export default GoalsHistoryModal
;