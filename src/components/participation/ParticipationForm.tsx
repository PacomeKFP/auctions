import { useState } from "react";
import HttpClient from "../../api/HttpClient";
import { ConfirmParticipationInterface } from "../../interfaces/RequestsInterfaces";
import { DateString } from "../../interfaces/global";
import { toast } from "sonner";
export default function ParticipationForm({
  userId,
  auctionName,
  auctionDescription,
  anonymous,
  auctionCurrency,
  invitationsClosureDate,
  participantsCount,
}:
  {
    userId: string,
    auctionName: string,
    auctionDescription: string,
    anonymous: boolean,
    auctionCurrency: string,
    invitationsClosureDate: DateString,
    participantsCount: number,
  }) {
  const [name, setName] = useState<string | undefined>(undefined);

  const submitParticipation = (response: boolean) => {

    if (anonymous && !name)
      return toast.error("Veuillez renseigner votre nom");


    const data: ConfirmParticipationInterface = {
      auctionCode: window.location.pathname.split("/")[2],
      userId,
      response,
      name,
    };

    const promise = HttpClient.confirmParticipation(data)

    toast.promise(promise, {
      loading: "Creation de la vente, patientez ....",
      success: () => {
        // TODO: navigate to dashboard 
        return "La vente a été crée avec success"
      },
      error: "Une erreur est survenue",
    })

  };

  return (
    <div id="cp-form">
      <h2 className="cp-auction-name mb-3">{auctionName}</h2>
      <br />
      <div className="cp-auction-description mb-3">
        <ul>
          <li>
            <span className="fw-bold">Description : </span>
            {auctionDescription}
          </li>
          <li>
            <span className="fw-bold">Monnaie : </span>
            {auctionCurrency}
          </li>
          <li>
            <span className="fw-bold">Date de clôture des invitations : </span>
            {new Intl.DateTimeFormat("fr-FR").format(
              new Date(invitationsClosureDate)
            )}
          </li>
          <li>
            <span className="fw-bold">
              Nombre de Participants Potentiels :{" "}
            </span>
            {participantsCount}
          </li>
        </ul>
      </div>
      <br />
      <br />

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Votre Nom
        </span>
        <input
          id="cp-name"
          className="form-control"
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value === "" ? undefined : e.target.value)}
          required={!anonymous}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>

      <div className="buttons">
        <button
          onClick={() => submitParticipation(false)}
          className="btn btn-outline-danger"
        >
          Décliner l&apos;invitation
        </button>
        <button
          onClick={() => submitParticipation(true)}
          className="btn btn-success"
        >
          Accepter l&apos;invitation
        </button>
      </div>
      <p className={"mt-3 " + (anonymous ? "text-danger" : "text-info")}>
        <span className={"fw-bold"}>Note: </span>
        {anonymous
          ? "Vous devez avoir un nom pour participer"
          : "Si vous n'entrez pas de nom vous serez enregistré comme un participant anonyme"}
      </p>
    </div>
  );
}
