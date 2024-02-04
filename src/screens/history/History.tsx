import { useState } from "react";
import {
  Offcanvas,
  Row
} from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import LotsListComponent from "../../components/history/Lots";
import { AuctionInterface } from "../../interfaces/auction";
import { UserInterface } from "../../interfaces/user";
import { CenteredContentLoader } from "../../components/common/ContentLoaderTemplates";
import { Header } from "../../components/common/Header";
import { LotDetails } from "../../components/history/LotDetails";
import { BidsOnLot } from "../../components/history/BidsInfo";
import { actionButtons } from "../../interfaces/global";
export default function HistoryScreen() {
  // const params = useParams();
  const auction = useLoaderData() as AuctionInterface<UserInterface[]>;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const toggleShow = () => setShow((s) => !s);

  const [selectedLot, setSelectedLot] = useState(0);

  return !auction || !auction.lots ?
    <CenteredContentLoader />

    : (
      <main className="">
        <Header title="Retrospective" actions={[actionButtons.dashboard]} />

        <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Les lots de la vente</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <LotsListComponent
              lots={auction.lots}
              selectedLot={selectedLot}
              handleUpdateSelectedLot={setSelectedLot}
            />
          </Offcanvas.Body>
        </Offcanvas>


        <Row>
          <LotsListComponent
            lots={auction.lots}
            selectedLot={selectedLot}
            handleUpdateSelectedLot={setSelectedLot}
            className="col-md-3 p-3"
          />
          <div className="col-md-6 p-3">
            <h2>Liste des offres faites</h2>
            {auction.lots[selectedLot].bids || auction.lots[selectedLot].bids!.length === 0 ? (
              "Aucune offre faite pour ce lot"
            ) : (
              <BidsOnLot
                bids={auction.lots[selectedLot].bids!}
                currency={auction.currency}
              />
            )}
          </div>

          <div className="col-md-3 p-3 border-left-secondary">
            <h2>Informations sur le lot</h2>
            <LotDetails currency={auction.currency} lot={auction.lots[selectedLot]} />
          </div>
        </Row>
      </main>
    );
}
