import { Link } from "react-router-dom";
import { AuctionInterface, AuctionStatus, UserResponseOnAuction } from "../../interfaces/auction";
import { DateString } from "../../interfaces/global";
import { UserInterface } from "../../interfaces/user";
import AuctionListItem from "./AuctionListItem";

/**
 * Renders a list of auctions.
 *
 * @param {Array} auctions - An array of auction objects.
 * @param {string} userMail - The email address of the user.
 * @return {JSX.Element} - The JSX element representing the list of auctions.
 */
export default function AuctionList({auctions, userMail}:{auctions: AuctionInterface<UserInterface[]>[], userMail: string}) {
  const getCorrectLink = (
    status: AuctionStatus,
    response: UserResponseOnAuction,
    auctionCode: string,
    invitationsClosureDate: DateString
  ) => {
    if (status == "IN_PROGRESS")
      // Enchère en cours et reponse oui donc on va sur l'interface d'enchères
      return `/bid/${auctionCode}`;

    if (
      status === "PENDING" &&
      new Date(invitationsClosureDate) > new Date() &&
      response === "PENDING"
    )
      return `/confirm/${auctionCode}`;

    return `/history/${auctionCode}`;
  };

  console.log("Auction List", auctions);

  return (
    <div className="auctions-list">
      {auctions.length === 0 ? (
        <div className="text-center fs-5 text-muted">
          Aucune enchère, <br /> Veuillez verifier la barre de recherche et les
          categories choisies
        </div>
      ) : (
        auctions.map((auction) => auction !== null && (
          <Link
            key={auction._id}
            className="link"
            to={getCorrectLink(
              auction.status,
              auction.response || "PENDING",
              auction.code!,
              auction.invitationsClosureDate
            )}
          >
            <AuctionListItem auction={auction} userMail={userMail} />
          </Link>
        ))
      )}
    </div>
  );
}
