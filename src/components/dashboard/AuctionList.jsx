import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import AuctionListItem from "./AuctionListItem";

/**
 * Renders a list of auctions.
 *
 * @param {Array} auctions - An array of auction objects.
 * @param {string} userMail - The email address of the user.
 * @return {JSX.Element} - The JSX element representing the list of auctions.
 */
export default function AuctionList(auctions, userMail) {
  const getCorrectLink = (
    status,
    response,
    auctionCode,
    invitationClosureDate
  ) => {
    if (status == "IN_PROGRESS")
      // Enchère en cours et reponse oui donc on va sur l'interface d'enchères
      return `/bid/${auctionCode}`;

    if (
      status === "PENDING" &&
      invitationClosureDate > new Date() &&
      response === "PENDING"
    )
      return `/confirm/${auctionCode}`;

    return `/history/${auctionCode}`;
  };

  return (
    <div className="auctions-list">
      {auctions.auctions.length === 0 && (
        <div>
          Aucune enchère veuillez verifier la barre de recherche et les
          categrories choisies
        </div>
      )}

      {auctions.auctions.map((auction, index) => (
        <Link
          key={auction._id + index}
          className="link"
          to={getCorrectLink(
            auction.status,
            auction.response,
            auction.code,
            auction.invitationClosureDate
          )}
        >
          <AuctionListItem auction={auction} userMail={userMail} />
        </Link>
      ))}
    </div>
  );
}

AuctionList.propTypes = {
  auctions: PropTypes.any,
  userMail: PropTypes.string,
};
