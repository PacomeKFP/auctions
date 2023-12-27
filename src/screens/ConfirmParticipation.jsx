import { useParams } from "react-router-dom";
import ParticpationForm from "../components/participation/ParticipationForm";
import AuctionsLots from "../components/participation/AuctionsLots";

export default function ConfirmParticipationScreen() {
  const params = useParams();
  const auctionCode = params.auctionCode;

  const auction = getAuction(auctionCode);

  return (
    <main>
      <div id="confirm-participation">
        <h2>Confirmer votre participation</h2>
        <p className="cp-intro text-center mb-3 fs-5">
          Vous avez été invités par{" "}
          <span className="fw-bold">{auction.admin.name}</span> à participer à
          une vente aux encheres.
          <br />
          Vous avez la possibilité d&apos;accepter cette invitation ou de la
          decliner. Mais avant prenez la peine de lire les informations sur
          celle ci{" "}
        </p>

        <div id="cp-content">
          <ParticpationForm
            auctionName={auction.name}
            auctionDescription={auction.description}
            anonymous={auction.anonymous}
            invitationsClosureDate={auction.invitationsClosureDate}
            participantsCount={auction.participants.length}
            auctionCurrency={auction.currency}
          />
          <AuctionsLots
            auctionCurrency={auction.currency}
            lots={auction.lots}
          />
        </div>
      </div>
    </main>
  );
}

const getAuction = (auctionCode) => {
  return {
    auctionCode,
    name: "1ere vente",
    startDate: "2023-12-23T00:00:00.000Z",
    invitationsClosureDate: "2023-12-20T00:00:00.000Z",
    admin: {
      email: "admin@ad.com",
      name: "The admin",
    },
    code: "6b12ccf5-a59d-4667-8613-2be84db69688",
    description: "La premiere vente que nous faisons",
    currency: "XAF",
    status: "PENDING",
    anonymous: true,
    participants: ["65849a8056ffee8c2b3ac470", "65849a8056ffee8c2b3ac472"],
    lots: [
      {
        _id: "658733297319de8f8f5ea44b",
        name: "Montre ancienne",
        description:
          "Il s'agit d'une montre en acier trempé datant du 18eme siecle",
        rank: 12,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.353Z",

        updatedAt: "2023-12-23T19:21:13.353Z",
      },
      {
        _id: "658733297319de8f8f5ea44d",
        name: "Montre Suisse",
        description: "Montre Suisse ornée de diamants",
        rank: 1,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.359Z",

        updatedAt: "2023-12-23T19:21:13.359Z",
      },
      {
        _id: "658733297319de8f8f5ea44b",
        name: "Montre ancienne",
        description:
          "Il s'agit d'une montre en acier trempé datant du 18eme siecle",
        rank: 12,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.353Z",

        updatedAt: "2023-12-23T19:21:13.353Z",
      },
      {
        _id: "658733297319de8f8f5ea44d",
        name: "Montre Suisse",
        description: "Montre Suisse ornée de diamants",
        rank: 1,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.359Z",

        updatedAt: "2023-12-23T19:21:13.359Z",
      },
      {
        _id: "658733297319de8f8f5ea44b",
        name: "Montre ancienne",
        description:
          "Il s'agit d'une montre en acier trempé datant du 18eme siecle",
        rank: 12,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.353Z",

        updatedAt: "2023-12-23T19:21:13.353Z",
      },
      {
        _id: "658733297319de8f8f5ea44d",
        name: "Montre Suisse",
        description: "Montre Suisse ornée de diamants",
        rank: 1,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.359Z",

        updatedAt: "2023-12-23T19:21:13.359Z",
      },

      {
        _id: "658733297319de8f8f5ea44b",
        name: "Montre ancienne",
        description:
          "Il s'agit d'une montre en acier trempé datant du 18eme siecle",
        rank: 12,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.353Z",

        updatedAt: "2023-12-23T19:21:13.353Z",
      },
      {
        _id: "658733297319de8f8f5ea44d",
        name: "Montre Suisse",
        description: "Montre Suisse ornée de diamants",
        rank: 1,
        status: "PENDING",
        bounty: 350.5,
        awardDeadline: 150,
        bids: [],
        createdAt: "2023-12-23T19:21:13.359Z",

        updatedAt: "2023-12-23T19:21:13.359Z",
      },
    ],
    _id: "65849a8056ffee8c2b3ac478",
    createdAt: "2023-12-21T20:05:20.300Z",
    updatedAt: "2023-12-21T20:05:20.300Z",
    __v: 0,
  };
};
