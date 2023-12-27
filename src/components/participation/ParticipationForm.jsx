import { useState } from "react";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
export default function ParticpationForm({
  auctionName,
  auctionDescription,
  anonymous,
  auctionCurrency,
  invitationsClosureDate,
  participantsCount,
}) {
  const [name, setName] = useState(null);

  const submitParticipation = (response) => {
    if (anonymous && !name) {
      toast.error("Veuillez renseigner votre nom");
      console.error("Veuillez renseigner votre nom");
      return;
    }

    const data = {
      name,
      anonymous,
      response,
    };
    console.log(data);
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
            <span className="fw-bold">Monaie : </span>
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
          onChange={(e) => setName(e.target.value)}
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

ParticpationForm.propTypes = {
  auctionName: PropTypes.string,
  auctionDescription: PropTypes.string,
  auctionCurrency: PropTypes.string,
  anonymous: PropTypes.boolean,
  participantsCount: PropTypes.number,
  invitationsClosureDate: PropTypes.date,
};
