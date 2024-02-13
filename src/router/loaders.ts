import { type Params } from "react-router-dom";
import { toast } from "sonner";
import HttpClient from "../api/HttpClient";
import { getCurrentUser } from "../contexts/UserContext";

export const historyLoader = async ({
  params,
}: {
  params: Readonly<Params<string>>;
}) => {
  if (!params.auctionCode) return toast.error("Aucune enchère sélectionnée");
  const promise = HttpClient.getAuctionWithCode(params.auctionCode!);
  const response = await promise;
  toast.promise(promise, {
    loading: "Chargement...",
    success: "Enchère chargée",
    error: "Une erreur est survenue",
  });

  return response.data;
};

export const auctionScreenLoader = async ({
  params,
}: {
  params: Readonly<Params<string>>;
}) => {
  if (!params.auctionCode) return toast.error("Aucune enchère sélectionnée");
  const promise = HttpClient.getCurrentLotForAuction(params.auctionCode!);

  toast.promise(promise, {
    loading: "Chargement...",
    success: "Enchère chargée",
    error: "Une erreur est survenue",
  });

  const da = (await promise).data._doc;
  console.log("Ca", da);

  return da;
};

export const confirmParticipationScreenLoader = async ({
  params,
}: {
  params: Readonly<Params<string>>;
}) => {
  if (!params.auctionCode) return toast.error("Aucune enchère sélectionnée");
  const promise = HttpClient.getAuctionWithCode(params.auctionCode);

  toast.promise(promise, {
    loading: "Chargement...",
    success: "Enchère chargée",
    error: "Une erreur est survenue",
  });

  const data = (await promise).data;
  return data;
};

export const dashboardScreenDataLoader = async () => {

  const currentUser = getCurrentUser();

  console.log("curentUser", currentUser)

  if (!currentUser) return toast.error("Aucun utilisateur connecté (lstorage)");
  const promise = HttpClient.getAllAuctionsForUser(currentUser);

  toast.promise(promise, {
    loading: "Chargement...",
    success: "Enchères chargées avec success",
    error: "Une erreur est survenue",
  });



  const data = (await promise).data;

  console.log("auctions", await promise)
  return data;
};



