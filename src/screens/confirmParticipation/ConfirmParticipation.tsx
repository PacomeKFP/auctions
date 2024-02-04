import { useLoaderData, useParams } from "react-router-dom";
import { SimpleArticleContentLoader } from "../../components/common/ContentLoaderTemplates";
import AuctionsLots from "../../components/participation/AuctionsLots";
import ParticpationForm from "../../components/participation/ParticipationForm";
import { AuctionInterface } from "../../interfaces/auction";

export default function ConfirmParticipationScreen() {
  const params = useParams();
  const userId = params.userId!;

  const auction = useLoaderData() as AuctionInterface<string[]>
  return (
    <main>
      <div id="confirm-participation">
        <h2>Confirmer votre participation</h2>

        {!auction ? (
          <div className="w-100 d-flex  justify-content-center">
            <SimpleArticleContentLoader />
          </div>
        ) : (
          <>
            <p className="cp-intro text-center mb-3 fs-5">
              Vous avez été invités par{" "}
              <span className="fw-bold">{auction.admin.name}</span> à participer
              à une vente aux encheres.
              <br />
              Vous avez la possibilité d&apos;accepter cette invitation ou de la
              decliner. Mais avant prenez la peine de lire les informations sur
              celle ci{" "}
            </p>

            <div id="cp-content">
              <ParticpationForm
                userId={userId}
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
          </>
        )}
      </div>
    </main>
  );
}
