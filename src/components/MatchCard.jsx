import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Card,
  Carousel,
  Spinner,
  ListGroup,
  ListGroupItem,
  Accordion,
  Collapse,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

const MatchCard = ({ match }) => {
  const [open, setOpen] = useState(false);

  return (
    // <Card className="mb-3">
    //   <Card.Img variant="top" src={match.image} className="card-img" />
    //   <Button
    //     onClick={() => setOpen(!open)}
    //     aria-controls="example-collapse-text"
    //     aria-expanded={open}
    //   >
    //     {match.homeTeam.name} vs {match.awayTeam.name}
    //   </Button>
    //   <Collapse in={open}>
    //     <Card.Text>{match.description}</Card.Text>{" "}
    //     <ListGroup className="list-group-flush">
    //       <ListGroupItem>{match.venue}</ListGroupItem>
    //       <ListGroupItem>{match.entryFee}</ListGroupItem>
    //     </ListGroup>
    //     <Card.Body>
    //       <Link to={`match/${match._id}#ticketButton`}>
    //         <Button>GET TICKETS</Button>{" "}
    //       </Link>
    //     </Card.Body>
    //   </Collapse>
    // </Card>
    <Row>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Row>
  );
};

export default MatchCard;
