import { useContext } from "react";
import { Link } from 'react-router-dom';
import AuctionForm from "../../components/createAuction/AuctionForm";
import { UserContext } from "../../contexts/UserContext";
import { UserContextInterface } from "../../interfaces/ContextsInterfaces";

const CreateAuctionScreen = () => {
  const userContext = useContext<UserContextInterface | null>(UserContext);
  if (!userContext) return <main>
    Une erreur s'est produite veuilez reessayer l'authentification
  </main>;

  const currentUser = userContext.currentUser;

  return (
    <main>
      <div id="dashboard-header">
        <h2 className="app-name"> Nouvelle Vente </h2>
        <div className="settings">
          <Link className="new-auction link me-3" to={`/`}>
            <span className="text btn btn-outline-primary">
              &nbsp; Tableau de bord
            </span>
          </Link>
        </div>
      </div>
      <div id="create-auction" className="text-center">

        <AuctionForm userMail={currentUser} />
      </div>
    </main>
  );
};

export default CreateAuctionScreen;
