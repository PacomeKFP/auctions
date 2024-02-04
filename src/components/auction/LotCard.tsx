import { Col, Card } from "react-bootstrap"
import Utils from "../../utils/utils"
import { LotInterface } from "../../interfaces/lot"

export const LotCard = ({ lot }: { lot: LotInterface }): React.JSX.Element => {

  const data: Record<string, string | number> = {
    "Name": lot.name,
    "Description": lot.description,
    "Mise à prix": Utils.formatNumber({
      number: lot.bounty,
      currency: lot.currency as string,
    }),
    "Status": lot.status || "PENDING",
    "Temps d'adjud.": Utils.formatTime(lot.awardDeadline)
  };

  return <Col className="d-flex flex-column align-items-center justify-content-center">
    <Card className="">
      <Card.Header as="h5">{lot.name}</Card.Header>
      <Card.Body className="card-body">
        <ul>
          {
            Object.keys(data).map((key: string) => <li>
              <span className="fw-bold">{key} : </span>
              {String(data[key])}
              <br />
            </li>)
          }
        </ul>
      </Card.Body>
      <Card.Footer>
        {!lot.bids || lot.bids.length === 0 ? (
          <span className="fw-bold">Aucune offre</span>
        ) : (
          <span>Timer here </span>
        )}
      </Card.Footer>
    </Card>
  </Col>
}
