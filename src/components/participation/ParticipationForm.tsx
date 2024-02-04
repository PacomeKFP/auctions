import { useState } from "react";
import HttpClient from "../../api/HttpClient";
import { ConfirmParticipationInterface } from "../../interfaces/RequestsInterfaces";
import { DateString } from "../../interfaces/global";
export default function ParticpationForm({
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
  const [responseSubmited, setResponseSubmited] = useState(false);

  const submitParticipation = (response: boolean) => {
    if (anonymous && !name) {
      //TODO handle this correctly
      console.error("Veuillez renseigner votre nom");
      return;
    }

    const data: ConfirmParticipationInterface = {
      auctionCode: window.location.pathname.split("/")[2],
      userId,
      response,
      name,
    };

    HttpClient.confirmParticipation(data).then((response) => {
      // TODO handle this correctly with swal
      if (!response)
        return alert("Erreur lors de la soumission de votre reponse");

      //TODO: navigate to the dashboard ?
      alert("votre reponse a eté transmise avec succes");
      setResponseSubmited(true);
    });
  };

  return responseSubmited ? (
    <div>Votre reponse a eté soumise avec succes</div>
  ) : (
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
          Decliner l&apos;invitation
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
