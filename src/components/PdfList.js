import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  ListGroup,
  Row,
  Col,
  Form,
  Spinner
} from 'react-bootstrap';

const PdfList = props => {
  const [isZipLoading, setIsZipLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [pdfLinks, setPdfLinks] = useState([]);
  const apiUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}/api/v1/qrs/pdfs`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setPdfLinks(data.data));
  }, [apiUrl, isDeleteLoading, props.isUpdate]);

  const onGetZip = event => {
    event.preventDefault();
    setIsZipLoading(true);
    const apiUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}/api/v1/qrs/zip`;

    fetch(apiUrl)
      .then(res => res.blob())
      .then(blob => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
        setIsZipLoading(false);
      });
  };

  const onDeletePdf = event => {
    event.preventDefault();
    setIsDeleteLoading(true);
    const apiUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}/api/v1/qrs/pdfs`;

    fetch(apiUrl, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        setIsDeleteLoading(false);
      });
  };

  return (
    <Card className='shadow-sm p-3 mb-3 bg-white rounded'>
      <Card.Body>
        <Card.Title>
          <Form.Group as={Row}>
            <Col xs={12}>
              <Form.Control plaintext defaultValue='ไฟล์ PDF ทั้งหมด' />
            </Col>
          </Form.Group>
          <Row>
            <Col xs={8}>
              <Button variant='danger' onClick={onGetZip}>
                {isZipLoading ? (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                ) : null}
                ดาวน์โหลด (ZIP)
              </Button>
            </Col>
            <Col xs={4}>
              <Button variant='danger' onClick={onDeletePdf}>
                {isDeleteLoading ? (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                ) : null}
                ลบไฟล์
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <ListGroup size='sm'>
          {pdfLinks.map((link, index) => {
            return (
              <ListGroup.Item action href={link.link} key={index}>
                {link.name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PdfList;
