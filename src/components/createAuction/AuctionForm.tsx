import { useState } from "react";
import {
  Button, Card, Tab, Tabs
} from "react-bootstrap";
import AuctionDetails from "./AutionDetails";
// import LotAndParticipantTab from "./LotAndParticipantTab";
import { Form } from "react-router-dom";
import { ItemInterface } from "react-sortablejs";
import { toast } from "sonner";
import HttpClient from "../../api/HttpClient";
import { AuctionInterface } from "../../interfaces/auction";
import { LotInterface } from "../../interfaces/lot";
import Utils from "../../utils/utils";
import { LotTab } from "./LotTab";
import { ParticipantsTab } from "./ParticipantsTab";

export default function AuctionForm({ userMail }: { userMail: string }) {
  console.log(userMail);
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

  const updateElementInAuction = (key: string, value: string | number | Date | boolean) => {
    if (!key.includes("."))
      return setAuction({ ...auction, [key]: value });
    const keys = key.split(".");
    if (!(keys[0] === "admin" && (keys[1] === "name" || keys[1] === "email"))) return;

    setAuction({ ...auction, admin: { ...auction.admin, [keys[1]]: value } });
  }
  const handleAddParticipant = (email: string) => {
    if (!auction.participants) auction.participants = []
    if (
      Utils.isValidEmail(email) &&
      !auction.participants.includes(email) &&
      email !== userMail
    ) {
      setAuction({ ...auction, participants: [...auction.participants, email] });
    }
  };
  const handleRemoveParticipant = (email: string) => {
    setAuction({ ...auction, participants: auction.participants.filter(p => p !== email) });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation();

    if (auction.lots.length === 0)
      return toast.error('Vous devez specifier au moins un lot')

    if (auction.participants.length === 0)
      return toast.error('Vous devez inviter au moins un utilisateur')


    const _auction: AuctionInterface<string[]> = {
      ...auction, lotWithoutRanks: [...lots],
    };

    const promise = HttpClient.createAuction(_auction)

    toast.promise(promise, {
      loading: "Creation de la vente, patientez ....",
      success: "La vente a été crée avec success",
      error: "Une erreur est survenue pendant la création",
    })
  };

  const handleRemoveLot = (position: number) => {
    alert("removing lot");
    const l = lots.filter((l) => lots.indexOf(l) !== position);
    setLots(l);
  };
  const handleAddLot = (lot: LotInterface) => {
    if (
      lot.name === "" ||
      lot.description === "" ||
      lot.bounty === 0 ||
      lot.awardDeadline < 15
    ) {
      return toast.error("Les information sur le lot sont incompletes");
    }
    setLots([...lots, { ...lot, id: Math.round(Math.random() * 100000) }]);

    return true
  };



  return (
    <>
      <Form
        id="auction-form"
        noValidate
        onSubmit={handleSubmit}
        className="w-100 d-flex flex-column align-items-center justify-content-center"
      >
        <AuctionDetails
          auction={auction}
          elementUpdater={updateElementInAuction}
        />
      </Form>

      <Card.Body className="w-50">
        <Tabs className="mb-4 pb-2">
          <Tab eventKey="participants" title="Participants">
            <ParticipantsTab
              handleRemoveParticipant={handleRemoveParticipant}
              participants={auction.participants}
              handleAddParticipant={handleAddParticipant} />
          </Tab>

          <Tab eventKey="lot" title="Lots">
            <LotTab
              lots={lots}
              setLots={setLots}
              handleAddLot={handleAddLot}
              handleRemoveLot={handleRemoveLot} />
          </Tab>
        </Tabs>
      </Card.Body>

      <Button type="submit" formTarget="auction-form" className="mt-3 w-25">
        Créer la vente
      </Button>

    </>
  );
}
