import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faUser, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';
import './ContactPage.css';

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xannanwg");
  const [showMessage, setShowMessage] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    setShowMessage(true);
  };

  return (
    <div className="contact-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="contact-form-container">
              <h1 className="text-center mb-4">Contact-Us</h1>
              {showMessage && state.succeeded && (
                <Alert variant="success" onClose={() => setShowMessage(false)} dismissible>
                  Thank you for your message! We will get back to you soon.
                </Alert>
              )}
              <Form onSubmit={onSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text bg-success text-white">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Form.Control id="name" type="text" name="name" placeholder="Your name" required />
                  </div>
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text bg-success text-white">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <Form.Control id="email" type="email" name="email" placeholder="Your email" required />
                  </div>
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-text bg-success text-white">
                      <FontAwesomeIcon icon={faComment} />
                    </span>
                    <Form.Control id="message" as="textarea" rows={5} name="message" placeholder="Your message" required />
                  </div>
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                <Button variant="success" type="submit" className="w-100 submit-btn" disabled={state.submitting}>
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  {state.submitting ? 'Sending...' : 'Send'}
                </Button>
                <ValidationError errors={state.errors} />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;

