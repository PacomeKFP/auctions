/* eslint-disable react/no-unescaped-entities */
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import Utils from "../utils/Utils";
import { useTimer } from "react-timer-hook";

const AuctionScreen = () => {
  const { auctionCode } = useParams();
  const lot = getCurrentLot();
  function MyTimer({ expiryTimestamp }) {
    const { seconds, minutes, hours, days } = useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
    });
    return (
      <div style={{ textAlign: "center" }}>
        <div>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
          <span>{seconds}</span>
        </div>
      </div>
    );
  }
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const getRemainingTime = (lot) => {
    if (lot.bids.length > 0) {
      return (
        new Date(lot.bids[0].createdAt).getSeconds() +
        lot.awardDeadline -
        Math.floor(Date.now() / 1000)
      );
    } else return Number.MAX_VALUE;
  };

  const remainingTime = getRemainingTime(lot);

  return (
    <main>
      <div id="dashboard-header">
        <h2 className="app-name"> Interface d'encheres </h2>
        <div className="settings">
          <Link className="new-auction link me-3" to={`/`}>
            <span className="text btn btn-outline-primary">
              &nbsp; Tableau de bord
            </span>
          </Link>
          <Link
            className="new-auction link ms-3"
            to={`/history/${auctionCode}`}
          >
            <span className="text btn btn-outline-info">
              &nbsp; Retrospective
            </span>
          </Link>
        </div>
      </div>

      <Row className="mt-5">
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <Card className="">
            <Card.Header as="h5">{lot.name}</Card.Header>
            <Card.Body className="card-body">
              <ul>
                <li>
                  <span className="fw-bold">Description : </span>
                  {lot.description}
                </li>
                <br />
                <li>
                  <span className="fw-bold">Mise à prix : </span>{" "}
                  {Utils.formatNumber({
                    number: lot.bounty,
                    currency: lot.currency,
                  })}
                </li>
                <br />
                <li>
                  <span className="fw-bold">Temps d&apos;adjud. : </span>
                  {Utils.formatTime(lot.awardDeadline)}
                </li>
                <br />
              </ul>
            </Card.Body>
            <Card.Footer>
              {!lot.bids || lot.bids.length == 0 ? (
                <span className="fw-bold">Aucune offre</span>
              ) : (
                <MyTimer expiryTimestamp={remainingTime} />
              )}
            </Card.Footer>
          </Card>
        </Col>
        <Col className="bg-light">.</Col>
      </Row>

      <Form noValidate className="mt-3 col-md-12 d-flex flex-row justify-content-center align-items-center">
        <Form.Group as={Col} className="col-2 mt-3" controlId="lotBounty">
          <Form.Control
            form="lot-form"
            required
            type="number"
            min={lot.bids[0].amount + 1 || lot.bounty}
            placeholder=""
          />
        </Form.Group>

        <Button
          form="lot-form"
          variant={"outline-primary"}
          className="ms-2 col-2 mt-3  "
          type="submit"
        >
          Faire une offre
        </Button>
      </Form>
    </main>
  );
};

const getCurrentLot = () => {
  return {
    name: "Lot 1",
    description: "Description du lot",
    bounty: 100,
    awardDeadline: 6000,
    currency: "EUR",
    bids: [
      // les 5 dernieres offres classées de la plus recente à la plus ancienne
      {
        amount: 110,
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:20.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },

      {
        amount: 110,
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:18.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },

      {
        amount: 110,
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:16.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },

      {
        amount: 110,
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:14.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },
      {
        amount: 110,
        user: "PacomeK",
        createdAt: "2023-12-27T02:21:13.353Z",
        updatedAt: "2023-12-23T19:21:13.353Z",
      },
    ],
  };
};

export default AuctionScreen;
