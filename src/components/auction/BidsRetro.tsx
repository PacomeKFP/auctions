import { Col } from "react-bootstrap"
import { BidInterface } from "../../interfaces/bid"
import { getColor } from "../../screens/auction/auction.logic"


export const BidsRetro = ({ bids }: { bids: BidInterface<string>[] }): React.JSX.Element => {
  return <Col className="">
    {!bids || bids.length == 0 ? (
      <div className="txt-center w-100 h-100 d-flex">
        Aucune enchere faite pour le moment
      </div>
    ) : (
      <ul className="list-group pmd-list pmd-card-list w-75">
        {bids.sort((a, b) => b.amount - a.amount)
          .map((bid, index) => (
            <li
              key={bid._id}
              className={
                "list-group-item d-flex rounded " + getColor(index)
              }
            >
              <div className="media-body rounded">
                <h6 className="pmd-list-title">{bid.amount}</h6>
                <p className="pmd-list-subtitle">{bid.user}</p>
              </div>
              <br />
            </li>
          ))}
      </ul>
    )}
  </Col>
}
