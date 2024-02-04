import { useContext } from "react";
import { Form } from "react-bootstrap";
import { FilterContext } from "../../contexts/FilterContext";
import { Link } from "react-router-dom";
import IconPlus from "../common/IconPlus";

export function DashboardHeader() {
  const { searchText, setSearchText } = useContext(FilterContext)!;
  window.onscroll = () => {
    const dashHeader = document.getElementById("dashboard-header")
    if (dashHeader)
      window.scrollY > 0
        ? dashHeader.classList.add("sticky")
        : dashHeader.classList.remove("sticky");
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

        <Link className="link ms-3" to={"/new"}>
          <button className="new-auction">
            <IconPlus />
            <span className="text">&nbsp; Creer une vente</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
