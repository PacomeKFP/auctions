
import { Row } from "react-bootstrap";
import { useLoaderData, useParams } from "react-router-dom";
import { LotInterface } from "../../interfaces/lot";
import { CenteredContentLoader } from "../../components/common/ContentLoaderTemplates";
import { Header } from "../../components/common/Header";
import { getCurrentLot } from "./auction.logic";
import { actionButtons } from "../../interfaces/global";
import { BidForm } from "../../components/auction/BidForm";
import { BidsRetro } from "../../components/auction/BidsRetro";
import { LotCard } from "../../components/auction/LotCard";

const AuctionScreen = () => {
  const auctionCode = useParams()

  const lot = useLoaderData() as LotInterface
  const bids = getCurrentLot().bids

  return !lot ? (
    <CenteredContentLoader />
  ) : (
    <main>
      <Header title="Interface d'encheres"
        actions={[
          actionButtons.dashboard,
          actionButtons.history(auctionCode.auctionCode!)
        ]} />
      <Row className="mt-5">
        <LotCard lot={lot} />
        <BidsRetro bids={bids} />
      </Row>

      <BidForm />
    </main>
  );
};

export default AuctionScreen;
