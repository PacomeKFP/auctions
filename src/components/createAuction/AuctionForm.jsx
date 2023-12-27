/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import AuctionDetails from "./AutionDetails";
import { PropTypes } from "prop-types";
import {
  Container,
  Card,
  Tabs,
  Button,
  Col,
  Form,
  Row,
  Tab,
} from "react-bootstrap";
// import LotAndParticipantTab from "./LotAndParticipantTab";
import { ListGroup, ListGroupItem, CloseButton } from "react-bootstrap";
import IconPlus from "../common/IconPlus";

export default function AuctionForm({ userMail }) {
  const [participants, setParticipants] = useState([]);
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState("");

  const [lots, setLots] = useState([]);
  const [lotName, setLotName] = useState("");
  const [lotDescription, setLotDescription] = useState("");
  const [lotBounty, setLotBounty] = useState(0);
  const [lotAwardDealine, setLotAwardDealine] = useState(15);

  const isValidEmail = (mail) => {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleAddParticipant = (email) => {
    if (isValidEmail(email) && !participants.includes(email)) {
      setParticipants([...participants, email]);
      setEmail("");
    }
  };
  const handleRemoveParticipant = (email) => {
    setParticipants(participants.filter((p) => p !== email));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleRemoveLot = (position) => {
    alert("removing lot");
    const l = lots.filter((l, index) => index !== position);
    console.log(l);
    setLots(l);
  };
  const handleAddLot = () => {
    if (
      lotName === "" ||
      lotDescription === "" ||
      lotBounty === 0 ||
      lotAwardDealine < 15
    ) {
      return alert("not ok");
    }
    setLots([
      ...lots,
      {
        name: lotName,
        description: lotDescription,
        bounty: lotBounty,
        awardDealine: lotAwardDealine,
      },
    ]);
    setLotName("");
    setLotDescription("");
    setLotBounty(0);
    setLotAwardDealine(15);
  };

  return (
    <Form
      id="auction-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3 w-75">
        <AuctionDetails userMail={userMail} />

        <Col md="6">
          <Container className=" h-100">
            <Row className="d-flex justify-content-center align-items-center">
              <Col xl="10">
                <Card>
                  <Card.Body className="p-5">
                    <h2>Participants et Lots</h2>
                    <Tabs className="mb-4 pb-2">
                      <Tab eventKey="participants" title="Participants">
                        <div className="d-flex justify-content-center align-items-center mb-4">
                          <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Adresse email de l'invité"
                          />
                          <Button
                            onClick={() => handleAddParticipant(email)}
                            variant={"outline-primary"}
                            className="ms-2"
                          >
                            <IconPlus color="#5575c8" />
                          </Button>
                        </div>
                        <h2>Invités</h2>
                        <ListGroup className="mb-0">
                          {participants.map((participant, index) => (
                            <ListGroupItem
                              key={index}
                              className=" d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                              style={{ backgroundColor: "#f4f6f7" }}
                            >
                              {participant}
                              <CloseButton
                                onClick={() =>
                                  handleRemoveParticipant(participant)
                                }
                              />
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </Tab>
                      <Tab eventKey="lot" title="Lots">
                        <Form
                          id="lot-form"
                          name="lot-form"
                          noValidate
                          validated={validated}
                          onSubmit={handleAddLot}
                        >
                          <Form.Control
                            form="lot-form"
                            required
                            type="text"
                            value={lotName}
                            onChange={(e) => setLotName(e.target.value)}
                            placeholder="Le nom du lot"
                            className="mb-3"
                          />
                          <Form.Control
                            form="lot-form"
                            required
                            as={"textarea"}
                            rows={4}
                            value={lotDescription}
                            onChange={(e) => setLotDescription(e.target.value)}
                            placeholder="La description du lot"
                            className="mb-3"
                          />
                          <Row>
                            <Form.Group
                              as={Col}
                              className="mb-3"
                              controlId="lotBounty"
                            >
                              <Form.Label className="fw-bold">
                                Mise à prix
                              </Form.Label>
                              <Form.Control
                                form="lot-form"
                                required
                                type="number"
                                value={lotBounty}
                                onChange={(e) => setLotBounty(e.target.value)}
                                placeholder="Mise à prix"
                              />
                            </Form.Group>
                            <Form.Group
                              as={Col}
                              className="mb-3"
                              controlId="lotBounty"
                            >
                              <Form.Label className="fw-bold">
                                Temps D'adjudic. (secs)
                              </Form.Label>
                              <Form.Control
                                form="lot-form"
                                required
                                type="number"
                                min={15}
                                value={lotAwardDealine}
                                onChange={(e) =>
                                  setLotAwardDealine(e.target.value)
                                }
                                placeholder="Temps d'adjudication"
                              />
                            </Form.Group>

                            <Button
                              form="lot-form"
                              onClick={handleAddLot}
                              variant={"outline-primary"}
                              className="ms-2"
                            >
                              Ajouter
                            </Button>
                          </Row>
                        </Form>
                        <ListGroup className="mt-3">
                          {lots.map((lot, index) => (
                            <ListGroupItem
                              key={index}
                              className=" d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                              style={{ backgroundColor: "#f4f6f7" }}
                            >
                              {lot.name}
                              <CloseButton
                                onClick={() => handleRemoveLot(index)}
                              />
                            </ListGroupItem>
                          ))}
                        </ListGroup>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Button form="auction-form" type="submit" className="mt-3">
        Créer la vente
      </Button>
    </Form>
  );
}

AuctionForm.propTypes = {
  userMail: PropTypes.string,
};
