import React, { useState } from 'react';
import logo from './tnp-logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

import QrCodeList from './components/QrCodeList';
import PdfList from './components/PdfList';
import ExcelUpload from './components/ExcelUpload';

function App() {
  const [isDatabaseUpdate, setIsDatabaseUpdate] = useState(false);
  const [isPdfUpdate, setIsPdfUptate] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <section>
        <Container>
          <ExcelUpload
            show={show}
            handleClose={handleClose}
            onUpdate={setIsDatabaseUpdate}
          />
          <Button
            variant='danger'
            className='ml-1 mt-2 mb-4'
            onClick={handleShow}
          >
            จัดการข้อมูล (อัพโหลด Excel / ลบ) ข้อมูล Qr Code
          </Button>
          <Row className='justify-content-md-center'>
            <Col xs='7'>
              <QrCodeList
                onIsUpdate={setIsPdfUptate}
                isUpdate={isDatabaseUpdate}
              />
            </Col>
            <Col xs='5'>
              <PdfList isUpdate={isPdfUpdate} />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default App;
