import { Card } from "react-bootstrap";
import Utils from "../../utils/utils";
import { LotInterface } from "../../interfaces/lot";
export default function AuctionsLots({ lots, auctionCurrency }: { lots: LotInterface[], auctionCurrency: string }) {
  if (lots.length === 0) return <div>Aucun lot</div>;

  return (
    <div id="cp-lots">
      {lots
        .sort((a, b) => a.rank! - b.rank!)
        .map((lot) => (
          <Card key={lot._id}>
            <Card.Header as="h5">{lot.name}</Card.Header>
            <Card.Body className="card-body">
              <ul>
                <li>
                  <span className="fw-bold">Description : </span>
                  {lot.description}
                  <br />
                </li>
                <li>
                  <span className="fw-bold">Mise à prix : </span>{" "}
                  {Utils.formatNumber({
                    number: lot.bounty,
                    currency: auctionCurrency,
                  })}
                  <br />

                </li>
                <li>
                  <span className="fw-bold">Temps d&apos;adjud. : </span>
                  {Utils.formatTime(lot.awardDeadline)}
                  <br />

                </li>
              </ul>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
