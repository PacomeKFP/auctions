import { useState } from "react";
import {
  Button, Card, Tab, Tabs
} from "react-bootstrap";
import AuctionDetails from "./AutionDetails";
import { Form } from "react-router-dom";
import { ItemInterface } from "react-sortablejs";
import { AuctionInterface } from "../../interfaces/auction";
import { LotInterface } from "../../interfaces/lot";
import Utils from "../../utils/utils";
import { LotTab } from "./LotTab";
import { ParticipantsTab } from "./ParticipantsTab";
import { handleAddLot, handleAddParticipant, handleRemoveLot, handleRemoveParticipant, handleSubmit, updateElementInAuction } from "../../screens/create/create.logic";

export default function AuctionForm({ userMail }: { userMail: string }) {
  const emptyAuction: AuctionInterface<string[]> = {
    name: "",
    description: "",
    status: "PENDING",
    admin: {
      name: "",
      email: userMail,
    },
    participants: [],
    lots: [],
    startDate: Date(),
    invitationsClosureDate: Date(),
    currency: Utils.defaultCurrency,
    anonymous: false
  }
  const [auction, setAuction] = useState({ ...emptyAuction } as AuctionInterface<string[]>);
  const [lots, setLots] = useState<Array<LotInterface & ItemInterface>>([]);


  return (
    <>
      <Form
        id="auction-form"
        noValidate
        onSubmit={(e) => handleSubmit(e, auction, lots)}
        className="w-100 d-flex flex-column align-items-center justify-content-center"
      >
        <AuctionDetails
          auction={auction}
          elementUpdater={(key, value) => updateElementInAuction(key, value, auction, setAuction)}
        />
      </Form>

      <Card.Body className="w-50">
        <Tabs className="mb-4 pb-2">
          <Tab eventKey="participants" title="Participants">
            <ParticipantsTab
              handleRemoveParticipant={(email: string) => handleRemoveParticipant(email, auction, setAuction)}
              participants={auction.participants}
              handleAddParticipant={(email: string) => handleAddParticipant(email, userMail, auction, setAuction)} />
          </Tab>

          <Tab eventKey="lot" title="Lots">
            <LotTab
              lots={lots}
              setLots={setLots}
              handleAddLot={(lot) => handleAddLot(lot, lots, setLots)}
              handleRemoveLot={(position) => handleRemoveLot(position, lots, setLots)} />
          </Tab>
        </Tabs>
      </Card.Body>

      <Button type="submit" form="auction-form" className="mt-3 w-25">
        Créer la vente
      </Button>

    </>
  );
}
