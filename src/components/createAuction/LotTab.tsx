import { useState } from "react"
import { Button, CloseButton, Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { ItemInterface, ReactSortable } from "react-sortablejs"
import { LotInterface } from "../../interfaces/lot"

export type LotTabProps = {
  lots: (LotInterface & ItemInterface)[]
  setLots: (value: React.SetStateAction<(LotInterface & ItemInterface)[]>) => void
  handleAddLot: (lot: LotInterface) => void
  handleRemoveLot: (index: number) => void
}

export const LotTab = ({ handleAddLot, lots, setLots, handleRemoveLot }: LotTabProps): React.JSX.Element => {

  const emptyLot: LotInterface = { name: "", description: "", bounty: 0, awardDeadline: 15 }
  const [lot, setLot] = useState({ ...emptyLot });

  const updateElementInLot = (key: string, value: string | number) => {
    setLot({ ...lot, [key]: value });
    if (key === "bounty" || key === "awardDeadline")
      setLot({ ...lot, [key]: Number(value) });

  }

  return <>
    <Form.Control
      required
      type="text"
      value={lot.name}
      onChange={(e) => updateElementInLot("name", e.target.value)}
      placeholder="Le nom du lot"
      className="mb-3"
    />
    <Form.Control

      required
      as={"textarea"}
      rows={4}
      onChange={(e) => updateElementInLot("description", e.target.value)}
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

          required
          type="number"
          onChange={(e) => updateElementInLot("bounty", Number(e.target.value))}
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

          required
          type="number"
          min={15}
          value={lot.awardDeadline}
          onChange={(e) => updateElementInLot("awardDeadline", e.target.value)}

          placeholder="Temps d'adjudication"
        />
      </Form.Group>

    </Row>
    <Button

      onClick={() => handleAddLot(lot)}
      variant={"outline-info"}
      className="ms-2"
    >
      Ajouter
    </Button>

    <ListGroup className="mt-3">
      <ReactSortable list={lots} setList={setLots}>
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
      </ReactSortable>
    </ListGroup>
  </>
}
