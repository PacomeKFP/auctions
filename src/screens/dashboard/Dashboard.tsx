import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import AuctionList from "../../components/dashboard/AuctionList.tsx";
import FilterHeader from "../../components/dashboard/FilterHeader.tsx";
import { DashboardHeader } from "../../components/dashboard/Header.tsx";
import { FilterContext } from "../../contexts/FilterContext.tsx";
import { UserContext } from "../../contexts/UserContext.tsx";
import { AuctionInterface } from "../../interfaces/auction.ts";
import { UserInterface } from "../../interfaces/user.ts";
import Utils from "../../utils/utils.ts";
const DashboardScreen = () => {
  const { currentUser } = useContext(UserContext)!;
  const { currentTags, searchText } = useContext(FilterContext)!;
  const auctions = useLoaderData() as AuctionInterface<UserInterface[]>[]

  Utils.removeNulls(auctions)


  const searchFilter = (auction: AuctionInterface<UserInterface[]>) => {
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
            searchFilter(auction) && currentTags.includes(auction.status!)
        )}
        userMail={currentUser}
      />
    </main>
  );
};


export default DashboardScreen;
