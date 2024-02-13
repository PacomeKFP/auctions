import { ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { BidInterface } from "../../interfaces/bid"
import Utils from "../../utils/utils"



export const BidsOnLot = ({ bids, currency }: { bids: BidInterface<string>[], currency: string }): React.JSX.Element => {
  return <ListGroup>
    {bids.map((bid: BidInterface<string>, index: number) => (
      <ListGroupItem className="mb-3" key={index}>
        <Row className="d-flex">
          <h5 className="col-6">{bid.user}</h5>
          <h5 className="col-3">
            {Utils.formatNumber({
              number: bid.amount,
              currency: currency,
            })}
          </h5>
          <h5 className="col-3">
            {new Intl.DateTimeFormat("fr-FR", {
              dateStyle: "medium",
              timeStyle: "medium",
            }).format(new Date(bid.date))}
          </h5>
        </Row>
      </ListGroupItem>
    ))}
  </ListGroup>
}
