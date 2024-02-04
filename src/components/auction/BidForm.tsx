import { Col, Button, Form } from "react-bootstrap"

export const BidForm = (): React.JSX.Element => {
  return <Form
    noValidate
    className="mt-3 col-md-12 d-flex flex-row justify-content-center align-items-center"
  >
    <Form.Group as={Col} className="col-2 mt-3" controlId="lotBounty">
      <Form.Control
        form="lot-form"
        required
        type="number"
        // min={lot.bids[0].amount + 1 || lot.bounty}
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
}
