import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import ImageAlbum from './components/ImageAlbum';
import './AboutPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers, faImage } from '@fortawesome/free-solid-svg-icons';
import amir from './img/amir.jpg';
import khemiri from './img/khemiri.jpg';
import about1 from './img/about1.jpg';
import about2 from './img/about2.jpg';
import about3 from './img/about3.jpg';
import about4 from './img/about4.jpg';
import about5 from './img/about5.jpg';
import about6 from './img/about6.jpg';

const AboutPage = () => {
  const images = [
    { src: about1, alt: 'Our restaurant' },
    { src: about2, alt: 'Signature dish' },
    { src: about6, alt: 'Our chef' },
    { src: about3, alt: 'Restaurant interior' },
    { src: about4, alt: 'Other popular dish' },
    { src: about5, alt: 'Our team' },
  ];

  return (
    <Container className="about-page">
      <Row>
        <Col>
          <h1 className="text-center mb-4">
            <FontAwesomeIcon icon={faUtensils} className="me-2" style={{ color: 'green' }} />
            About Us
          </h1>
          <p>
          Since 1997, we have been passionate about creating exceptional culinary experiences and using innovative technologies to enhance our service to our customers at our modern management restaurant.
          </p>
          
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center mb-3">
            <FontAwesomeIcon icon={faUsers} className="me-2" style={{ color: 'green' }} />
            Our Team
          </h2>
          <p className="text-center">
            Our passionate team is made up of dedicated professionals who strive to offer you an exceptional culinary experience. From talented chefs to attentive servers, each member plays a crucial role in creating memorable moments for our clients.
          </p>
        </Col>
      </Row>
      <Row className="mt-5 team-images">
        <Col md={6} className="mb-4 mb-md-0">
          <Image src={khemiri} alt="Our team in the kitchen" fluid className="team-image" />
        </Col>
        <Col md={6}>
          <Image src={amir} alt="Our team in service" fluid className="team-image" />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2 className="text-center mb-3">
            <FontAwesomeIcon icon={faImage} className="me-2" style={{ color: 'green' }} />
            Our Gallery
          </h2>
          <ImageAlbum images={images} />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
