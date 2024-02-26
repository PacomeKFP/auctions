import { type Params } from "react-router-dom";
import { toast } from "sonner";
import HttpClient from "../api/HttpClient";
import { getCurrentUser } from "../contexts/UserContext";
import Utils from "../utils/utils";

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

  if (!currentUser) return toast.error("Aucun utilisateur connecté (lstorage)");
  const promise = HttpClient.getAllAuctionsForUser({ userMail: currentUser });

  toast.promise(promise, {
    loading: "Chargement...",
    success: "Enchères chargées avec success",
    error: "Une erreur est survenue",
  });

  const { data } = await promise;

  const promMail = HttpClient.getUserWithMail({ userMail: currentUser });
  toast.promise(promMail, {
    loading: "Chargement des informations sur l'utilisateur",
    success: (users) => {
      Utils.removeNulls(data);

      data.forEach((auction, index) => {
        if (auction === null) {
          data.splice(index, 1);
          return;
        }
        const user = users.find((user) => user.auction === auction.code!);

        // si on trouve un correspondance!
        if (user) auction.userId = user._id;
      });

      return "Utilisateur chargé avec success";
    },
    error: (error) => {
      console.error("Error while loading user", error);
      return "Une erreur est survenue, utilisateur introuvable";
    },
  });
  console.log("data", data);
  return data;
};
