import React, { useState } from 'react';

import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const ExcelUpload = props => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const onFileUpload = e => {
    e.preventDefault();
    setIsUploading(true);

    const apiUrl = `/api/v1/qrs/excels`;

    const formData = new FormData();

    formData.append('file', e.target.files[0]);

    fetch(apiUrl, {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setIsUploading(false);
        props.handleClose();
        props.onUpdate(false);
        props.onUpdate(true);
      });
  };

  const onDeleteDatabase = e => {
    e.preventDefault();
    setIsDeleteLoading(true);
    const apiUrl = `/api/v1/qrs`;

    fetch(apiUrl, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        setIsDeleteLoading(false);
        props.handleClose();
        props.onUpdate(false);
        props.onUpdate(true);
      });
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>เพิ่มข้อมูลลงฐานข้อมูล</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Label>กรุณาเลือกไฟล์ Excel</Form.Label>
          <Form.Control type='file' onChange={onFileUpload} />
          {isUploading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          ) : null}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={onDeleteDatabase}>
          {isDeleteLoading ? (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          ) : null}
          ลบข้อมูลทั้งหมด
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcelUpload;
