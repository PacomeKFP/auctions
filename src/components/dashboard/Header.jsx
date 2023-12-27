import { useContext } from "react";
import { Form } from "react-bootstrap";
import { FilterContext } from "../../context/FilterContext";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  const { searchText, setSearchText } = useContext(FilterContext);
  window.onscroll = () => {
    window.scrollY > 0
      ? document.getElementById("dashboard-header").classList.add("sticky")
      : document.getElementById("dashboard-header").classList.remove("sticky");
  };

  return (
    <div id="dashboard-header">
      <h2 className="app-name"> Votre tableau de bord</h2>
      <div className="settings">
        <Form.Control
          id="search"
          placeholder="Rechercher"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button className="new-auction">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="add-circle-line">
              <path
                id="Vector"
                d="M10.0833 10.0833V6.41665H11.9167V10.0833H15.5833V11.9166H11.9167V15.5833H10.0833V11.9166H6.41668V10.0833H10.0833ZM11 20.1666C5.93726 20.1666 1.83334 16.0627 1.83334 11C1.83334 5.93723 5.93726 1.83331 11 1.83331C16.0628 1.83331 20.1667 5.93723 20.1667 11C20.1667 16.0627 16.0628 20.1666 11 20.1666ZM11 18.3333C12.9449 18.3333 14.8102 17.5607 16.1855 16.1854C17.5607 14.8102 18.3333 12.9449 18.3333 11C18.3333 9.05506 17.5607 7.1898 16.1855 5.81453C14.8102 4.43926 12.9449 3.66665 11 3.66665C9.05509 3.66665 7.18983 4.43926 5.81456 5.81453C4.43929 7.1898 3.66668 9.05506 3.66668 11C3.66668 12.9449 4.43929 14.8102 5.81456 16.1854C7.18983 17.5607 9.05509 18.3333 11 18.3333Z"
                fill="#303030"
              />
            </g>
          </svg>
          <Link className="link" to={"/new"}>
            <span className="text">&nbsp; Creer une vente</span>
          </Link>
        </button>
      </div>
    </div>
  );
}
