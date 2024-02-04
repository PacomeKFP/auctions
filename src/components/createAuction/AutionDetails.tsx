import { Col, Form } from "react-bootstrap";
import { AuctionInterface } from "../../interfaces/auction";
import Utils from "../../utils/utils";
export default function AuctionDetails({
  auction, elementUpdater }: { auction: AuctionInterface<string[]>, elementUpdater: (key: string, value: string | number | Date | boolean) => void }) {
  return (
    <div className="d-flex justify-content-evenly w-100">
      <Col md={4}>
        <Form.Group as={Col} className="mb-3" controlId="auctionName">
          <Form.Label className="fw-bold">Nom de la vente</Form.Label>
          <Form.Control
            value={auction.name}
            onChange={(e) => elementUpdater("name", e.target.value)}
            required
            type="text"
            placeholder="Nom de la vente"
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="auctionDescription">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            value={auction.description}
            onChange={(e) => elementUpdater("description", e.target.value)}
            as={"textarea"}
            rows={6}
            required
            type="text"
            placeholder="Nom de la vente"
          />
        </Form.Group>



        <Form.Group className="mb-3">

          <Form.Check
            type="switch"
            className="fw-bold"
            checked={auction.anonymous}
            label="Autoriser les participants anonymes"
            onChange={() => elementUpdater("anonymous", !auction.anonymous)
            }
          />
        </Form.Group>
      </Col>

      <Col md={4}>


        {/* Admin */}
        <Form.Group as={Col} className="mb-3" controlId="adminName">
          <Form.Label className="fw-bold">Nom de l'administrateur</Form.Label>
          <Form.Control
            required
            value={auction.admin && auction.admin.name ? auction.admin.name : undefined}
            onChange={(e) => elementUpdater("admin.name", e.target.value)}
            type="text"
            placeholder="Nom de l'admin"
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="startDate">
          <Form.Label className="fw-bold">
            Date et Heure de debut de l'enchere
          </Form.Label>
          <Form.Control
            required
            value={auction.startDate as string}
            onChange={(e) => elementUpdater("startDate", e.target.value)}
            type="datetime-local"
            placeholder="Date et Heure de debut de l'enchere"
          />
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="invitationsClosureDate">
          <Form.Label className="fw-bold">Cloture des invitations</Form.Label>
          <Form.Control
            required
            value={auction.invitationsClosureDate as string}
            onChange={(e) => elementUpdater("invitationsClosureDate", e.target.value)}
            type="datetime-local"
            placeholder="Date et Heure de cloture des invitations"
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="auctionCurrency">
          <Form.Label className="fw-bold">Monnaie de la vente</Form.Label>
          <Form.Select
            required
            value={auction.currency}
            onChange={(e) => elementUpdater("currency", e.target.value)}
            name="currency"
            aria-label="Select currency"

          >
            {Object.keys(Utils.currencies).map((key) => (
              <option key={key} value={key}>
                {Utils.currencies[key]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>


    </div>
  );
}

