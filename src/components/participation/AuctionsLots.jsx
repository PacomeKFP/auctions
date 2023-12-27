import { PropTypes } from "prop-types";

import { Card } from "react-bootstrap";
import Utils from "../../utils/Utils";
export default function AuctionsLots({ lots, auctionCurrency }) {
  if (lots.length === 0) return <div>Aucun lot</div>;

  return (
    <div id="cp-lots">
      {lots
        .sort((a, b) => a.rank - b.rank)
        .map((lot) => (
          <Card key={lot._id}>
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
                    currency: auctionCurrency,
                  })}
                </li>
                <li>
                  <span className="fw-bold">Temps d&apos;adjud. : </span>
                  {Utils.formatTime(lot.awardDeadline)}
                </li>
              </ul>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}

AuctionsLots.propTypes = {
  lots: PropTypes.array.isRequired,
  auctionCurrency: PropTypes.string.isRequired,
};
