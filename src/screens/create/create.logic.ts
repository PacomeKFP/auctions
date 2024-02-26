import { ItemInterface } from "react-sortablejs";
import { toast } from "sonner";
import { LotInterface } from "../../interfaces/lot";
import HttpClient from "../../api/HttpClient";
import { AuctionInterface } from "../../interfaces/auction";
import Utils from "../../utils/utils";

export const handleAddLot = (
  lot: LotInterface,
  lots: (LotInterface & ItemInterface)[],
  setLots: (
    value: React.SetStateAction<(LotInterface & ItemInterface)[]>
  ) => void
) => {

  if (
    lot.name === "" ||
    lot.description === "" ||
    Number(lot.bounty) <= 0 ||
    Number(lot.awardDeadline) < 15
  ) {
    return toast.error("Les information sur le lot sont incomplètes");
  }
  setLots([...lots, { ...lot, id: Math.round(Math.random() * 100000) }]);

  return true;
};

export const handleRemoveLot = (
  position: number,
  lots: (LotInterface & ItemInterface)[],
  setLots: (
    value: React.SetStateAction<(LotInterface & ItemInterface)[]>
  ) => void
) => {
  const l = lots.filter((l) => lots.indexOf(l) !== position);
  setLots(l);
  toast.info("Le lot a été retiré avec success");
};

export const handleSubmit = (
  event: React.SyntheticEvent,
  auction: AuctionInterface<string[]>,
  lots: (LotInterface & ItemInterface)[]
) => {
  event.preventDefault();
  event.stopPropagation();

  if (lots.length === 0)
    return toast.error("Vous devez specifier au moins un lot");

  if (auction.participants.length === 0)
    return toast.error("Vous devez inviter au moins un utilisateur");

  const _auction: AuctionInterface<string[]> = {
    ...auction,
  };

  _auction.lots = lots.map((lot: LotInterface, index) => {
    lot.rank = index + 1;
    delete lot.chosen;
    delete lot.id;

    return lot
  });

  delete _auction.status
  const promise = HttpClient.createAuction(_auction);

  toast.promise(promise, {
    loading: "Creation de la vente, patientez ....",
    success: "La vente a été crée avec success",
    error: "Une erreur est survenue pendant la création",
  });
};

export const handleRemoveParticipant = (
  email: string,
  auction: AuctionInterface<string[]>,
  setAuction: (value: React.SetStateAction<AuctionInterface<string[]>>) => void
) => {
  setAuction({
    ...auction,
    participants: auction.participants.filter((p) => p !== email),
  });
};

export const handleAddParticipant = (
  email: string,
  userMail: string,
  auction: AuctionInterface<string[]>,
  setAuction: (value: React.SetStateAction<AuctionInterface<string[]>>) => void
) => {
  if (!auction.participants) auction.participants = [];
  if (
    Utils.isValidEmail(email) &&
    !auction.participants.includes(email) &&
    email !== userMail
  ) {
    setAuction({ ...auction, participants: [...auction.participants, email] });
  }
};

export const updateElementInAuction = (
  key: string,
  value: string | number | Date | boolean,
  auction: AuctionInterface<string[]>,
  setAuction: (value: React.SetStateAction<AuctionInterface<string[]>>) => void
) => {
  if (!key.includes(".")) return setAuction({ ...auction, [key]: value });
  const keys = key.split(".");
  if (!(keys[0] === "admin" && (keys[1] === "name" || keys[1] === "email")))
    return;

  setAuction({ ...auction, admin: { ...auction.admin, [keys[1]]: value } });
};
