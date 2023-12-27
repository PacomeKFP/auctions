import AuctionForm from "../components/createAuction/AuctionForm";

const CreateAuctionScreen = () => {
  return (
    <main>
      <div id="create-auction" className="text-center p-3">
        <h1>Creer une nouvelle vente</h1>
        <p className="fs-5 m-3">
          Veuillez entrer les informations sur la vente ainsi que les differents
          lots prevus pour cette vente
        </p>
      <AuctionForm />
      </div>

    </main>
  );
};

export default CreateAuctionScreen;
