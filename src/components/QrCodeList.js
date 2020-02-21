import React, { useState, useEffect, useCallback } from 'react';

import { Button, Card, Row, Col, Table, Form, Spinner } from 'react-bootstrap';

const QrCodeList = props => {
  const [qrCodes, setQrCodes] = useState([]);
  const [totalQrs, setTotalQrs] = useState(0);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(10);

  const onLoadQrs = useCallback(() => {
    setIsQrLoading(true);

    const apiUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}/api/v1/qrs/?start=${startIndex}&end=${endIndex}`;

    console.log(apiUrl);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setQrCodes(data.data);
        setTotalQrs(data.total);
        setIsQrLoading(false);
      });
  }, [startIndex, endIndex]);

  const onCreatePdf = e => {
    e.preventDefault();
    setIsPdfLoading(true);
    props.onIsUpdate(false);
    const apiUrl = `${window.location.protocol}//${window.location.hostname}:${process.env.REACT_APP_API_PORT}/api/v1/qrs/pdfs`;
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ start: startIndex, end: endIndex })
    })
      .then(res => res.json())
      .then(data => {
        setIsPdfLoading(false);
        props.onIsUpdate(true);
      });
  };

  const onStartChange = e => {
    e.preventDefault();
    setStartIndex(e.target.value);
  };

  const onEndChange = e => {
    e.preventDefault();
    setEndIndex(e.target.value);
  };

  useEffect(() => {
    onLoadQrs();
  }, [props.isUpdate]);

  return (
    <Card className='shadow-sm p-3 mb-3 bg-white rounded'>
      <Card.Body>
        <Card.Title>
          <Form>
            <Form.Group as={Row} className='justify-content-md-center'>
              <Col xs='4'>
                <Form.Control
                  size='sm'
                  type='number'
                  onChange={onStartChange}
                  value={startIndex}
                />
              </Col>
              <Col xs='1'>
                <Form.Control plaintext defaultValue='-' />
              </Col>
              <Col xs='4'>
                <Form.Control
                  size='sm'
                  type='number'
                  onChange={onEndChange}
                  value={endIndex}
                />
              </Col>
              <Col xs='3'>
                <Form.Control
                  plaintext
                  value={`/ ${totalQrs}`}
                  onChange={() => {}}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='justify-content-md-center'>
              <Col xs='4'>
                <Button variant='danger' onClick={onLoadQrs}>
                  {isQrLoading ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : null}
                  เรียกดูข้อมูล
                </Button>
              </Col>
              <Col xs='4'>
                <Button variant='danger' onClick={onCreatePdf}>
                  {isPdfLoading ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : null}
                  สร้าง PDF
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Title>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Label</th>
              <th>Code</th>
              {/* <th>Url</th> */}
            </tr>
          </thead>
          <tbody>
            {qrCodes.map((qr, index) => {
              return (
                <tr key={index}>
                  <td>{qr.name}</td>
                  <td>{qr.code}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default QrCodeList;
