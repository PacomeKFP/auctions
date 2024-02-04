import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LotInterface } from "../../interfaces/lot";

export default function LotsListComponent({
  lots,
  selectedLot,
  handleUpdateSelectedLot,
  className,
}:
  {
    lots: LotInterface[],
    selectedLot: number,
    handleUpdateSelectedLot: (index: number) => void,
    className?: string,
  }) {

  console.log("lots", lots);

  return (
    <ListGroup id="history-lots" className={className}>
      {lots.map((lot:LotInterface, index:number) => (
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

