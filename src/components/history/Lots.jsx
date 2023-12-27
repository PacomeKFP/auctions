import { ListGroup, ListGroupItem } from "react-bootstrap";
import { PropTypes } from "prop-types";

export default function LotsListComponent({
  lots,
  selectedLot,
  handleUpdateSelectedLot,
  className
}) {
  return (
    <ListGroup id="history-lots" className={className}>
      {lots.map((lot, index) => (
        <ListGroupItem
          className="mb-3 rounded btn"
          variant={index == selectedLot ? "success" : "outline-warning"}
          key={index}
          onClick={() => handleUpdateSelectedLot(index)}
        >
          {lot.name}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

LotsListComponent.propTypes = {
  lots: PropTypes.array,
  selectedLot: PropTypes.number,
  handleUpdateSelectedLot: PropTypes.func,
  className: PropTypes.string,
};
