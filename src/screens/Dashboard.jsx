import { DashboardHeader } from "../components/dashboard/Header";
import AuctionList from "../components/dashboard/AuctionList";
import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";
import FilterHeader from "../components/dashboard/FilterHeader";
const DashboardScreen = () => {
  const { userMail } = getParams();
  const auctions = getAllAuctionsForUser(userMail);
  const { currentTags, searchText } = useContext(FilterContext);

  const searchFilter = (auction) => {
    if (
      !searchText ||
      auction.name.toLowerCase().includes(searchText.toLowerCase()) ||
      auction.description.toLowerCase().includes(searchText.toLowerCase()) ||
      auction.lots.join(" ").toLowerCase().includes(searchText.toLowerCase())
    )
      return true;

    return false;
  };

  return (
    <main>
      <DashboardHeader />

      <FilterHeader />

      <AuctionList
        auctions={auctions.filter(
          (auction) =>
            searchFilter(auction) && currentTags.includes(auction.status)
        )}
        userMail={userMail}
      />
    </main>
  );
};

const getParams = () => {
  return {
    userId: "65849a8056ffee8c2b3ac470",
    userMail: "pacomekengafe@gmail.com",
  };
};

/**
 * 
 * @param {*} userMail 
 * @returns [
 *   {
        name, admin, description, currency, status, anonymous, lots(liste des noms juste), nombre de participants,reponse (de l'utilisateur)      };
 * ]
 */
const getAllAuctionsForUser = (userMail) => {
  console.log(`Getting auctions for user ${userMail}`);
  const mails = ["admin@ad.com", "pacomekengafe@gmail.com", "thekfp@gmail.com"];
  const codes = [
    "6b12ddf5-a59d-4667-8613-2be84db69688",
    "4523de7823-a59d-4667-8613-2be84db69688",
    "6b1eccf5-a59d-1405-8613-2be84db69688",
    "6b12ccf5-a59d-4667-8613-2be8afb69688",
  ];
  const status = ["PENDING", "IN_PROGRESS", "COMPLETED"];
  const responses = ["PENDING", "YES", "NO"];
  const rd = (array) => array[Math.floor(Math.random() * array.length)];

  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
    (elemt, index) => {
      return {
        elemt,
        response: rd(responses),
        name: "Vente " + index,
        admin: {
          email: rd(mails),
          name: "The admin",
        },
        code: rd(codes),
        description: "La vente N°" + index + " que nous faisons",
        currency: "XAF",
        status: rd(status),
        anonymous: true,
        participants: ["65849a8056ffee8c2b3ac470", "65849a8056ffee8c2b3ac472"],
        lots: ["Montre ancienne", "Montre suisse"],
        _id: "65849a8056ffee8c2b3ac478",
        createdAt: "2023-12-21T20:05:20.300Z",
        updatedAt: "2023-12-21T20:05:20.300Z",
        __v: 0,
      };
    }
  );
};

export default DashboardScreen;
