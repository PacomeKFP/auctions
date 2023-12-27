import {
  Button,
  ListGroup,
  ListGroupItem,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LotsListComponent from "../components/history/Lots";
import Utils from "../utils/Utils";

export default function HistoryScreen() {
  const params = useParams();
  const auction = getAuctionRetro(params.auctionCode);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [selectedLot, setSelectedLot] = useState(0);

  const getBestBid = (bids) => {
    let max = 0;
    for (let i = 0; i < bids.length; i++) {
      if (bids[i].amount > max) {
        max = bids[i].amount;
      }
    }
    return max;
  };

  return (
    <main className="">
      <>
        <h2 className="text-center m-3">
          <Button className="m-3" variant="primary" onClick={toggleShow}>
            Lots
          </Button>
          Retrospective de la vente {auction.name}
        </h2>

        <Offcanvas
          show={show}
          onHide={handleClose}
          scroll={true}
          backdrop={true}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Les lots de la vente</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <LotsListComponent
              lots={auction.lots}
              selectedLot={selectedLot}
              handleUpdateSelectedLot={setSelectedLot}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <Row>
          <LotsListComponent
            lots={auction.lots}
            selectedLot={selectedLot}
            handleUpdateSelectedLot={setSelectedLot}
            className="col-md-3 p-3"
          />

          <div className="col-md-6 p-3">
            <h2>Liste des offres faites</h2>
            <ListGroup>
              {auction.lots[selectedLot].bids.map((bid, index) => (
                <ListGroupItem className="mb-3" key={index}>
                  <Row className="d-flex">
                    <h5 className="col-6">{bid.user}</h5>
                    <h5 className="col-3">
                      {Utils.formatNumber({
                        number: bid.amount,
                        currency: auction.currency,
                      })}
                    </h5>
                    <h5 className="col-3">
                      {/* TODO: Afficher la date avec l'huere aussi */}
                      {new Intl.DateTimeFormat("fr-FR", {
                        dateStyle: "medium",
                        timeStyle: "long",
                      }).format(new Date(bid.date))}
                    </h5>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>

          <div className="col-md-3 p-3 border-left-secondary">
            <h2>Informations sur le lot</h2>
            <ul>
              <li>
                <span className="fw-bold">Nom : </span>
                {auction.lots[selectedLot].name}
              </li>

              <li>
                <span className="fw-bold">Description : </span>
                {auction.lots[selectedLot].description}
              </li>

              <li>
                <span className="fw-bold">Mise à prix : </span>
                {Utils.formatNumber({
                  number: auction.lots[selectedLot].bounty,
                  currency: auction.currency,
                })}
              </li>
              <li>
                <span className="fw-bold">Status : </span>
                {auction.lots[selectedLot].status}
              </li>

              <li>
                <span className="fw-bold">Montant Meilleure offre : </span>
                {getBestBid(auction.lots[selectedLot].bids)}
              </li>
            </ul>
          </div>
        </Row>
      </>
    </main>
  );
}

const getAuctionRetro = (auctionCode) => {
  console.log(`Getting auctions retro with auction code ${auctionCode}`);
  const mails = ["admin@ad.com", "pacomekengafe@gmail.com", "thekfp@gmail.com"];
  const codes = [
    "6b12ddf5-a59d-4667-8613-2be84db69688",
    "4523de7823-a59d-4667-8613-2be84db69688",
    "6b1eccf5-a59d-1405-8613-2be84db69688",
    "6b12ccf5-a59d-4667-8613-2be8afb69688",
  ];
  const status = ["PENDING", "IN_PROGRESS", "COMPLETED"];
  const responses = ["PENDING", "YES", "NO"];
  const rd = (array) => array[Math.floor(Math.random() * array.length)];

  return {
    response: rd(responses),
    name: "Vente",
    admin: {
      email: rd(mails),
      name: "The admin",
    },
    code: rd(codes),
    description: "La vente N°" + " que nous faisons",
    currency: "XAF",
    status: rd(status),
    anonymous: true,
    participants: ["65849a8056ffee8c2b3ac470", "65849a8056ffee8c2b3ac472"],
    lots: [
      {
        name: "montre suisse 1",
        description: "Il s'agit d'une vielle montre suisse nh",
        bounty: 1000,
        awardDealine: 15,
        rank: 1,
        status: rd(status),
        bids: [
          {
            user: "Pacome Kengali",
            amount: 5000,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5500,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5050,
            date: "2023-12-21T20:05:20.300Z",
          },
        ],
      },
      {
        name: "montre suisse 2",
        description: "Il s'agit d'une vielle montre suisse nh",
        bounty: 1000,
        awardDealine: 15,
        rank: 1,
        status: rd(status),
        bids: [
          {
            user: "Pacome Kengali",
            amount: 5000,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5500,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5050,
            date: "2023-12-21T20:05:20.300Z",
          },
        ],
      },
      {
        name: "montre suisse 3",
        description: "Il s'agit d'une vielle montre suisse nh",
        bounty: 1000,
        awardDealine: 15,
        rank: 1,
        status: rd(status),
        bids: [
          {
            user: "Pacome Kengali",
            amount: 5000,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5500,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5050,
            date: "2023-12-21T20:05:20.300Z",
          },
        ],
      },
      {
        name: "montre suisse 4",
        description: "Il s'agit d'une vielle montre suisse nh",
        bounty: 1000,
        awardDealine: 15,
        rank: 1,
        status: rd(status),
        bids: [
          {
            user: "Pacome Kengali",
            amount: 5000,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5500,
            date: "2023-12-21T20:05:20.300Z",
          },
          {
            user: "Pacome Kengali",
            amount: 5050,
            date: "2023-12-21T20:05:20.300Z",
          },
        ],
      },
    ],
    _id: "65849a8056ffee8c2b3ac478",
    createdAt: "2023-12-21T20:05:20.300Z",
    updatedAt: "2023-12-21T20:05:20.300Z",
    __v: 0,
  };
};
