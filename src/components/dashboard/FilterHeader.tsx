import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { Form } from "react-bootstrap";
import { FilterTag } from "../../interfaces/ContextsInterfaces";
export default function FilterHeader() {
  const { currentTags, toggleTag } = useContext(FilterContext)!;
  const isSelected = (currentTags: FilterTag[], tag: FilterTag) =>
    "fw-bold rounded-pill btn btn" +
    (currentTags.includes(tag) ? "" : "-outline");

  const data = {
    "PENDING": ["info", "Enchères en attente", "En Attente"],
    "IN_PROGRESS": ["warning", "Enchères en Cours", "En Cours"],
    "COMPLETED": ["success", "Enchères terminees", "Terminées"]
  }
  return (
    <div id="dashboard-filters" className="mt-3">
      {
        Object.keys(data).map((key: string) => {
          return <div
            key={key}
            onClick={() => toggleTag(key as FilterTag)}
            className={` ${isSelected(currentTags, key as FilterTag)}-${data[key as FilterTag][0]}`}
          >
            <Form.Check
              checked={currentTags.includes(key as FilterTag)}
              onChange={() => toggleTag(key as FilterTag)}
              className="d-inline me-2"
            />
            <span className="can-be-hide">{data[key as FilterTag][1]}</span>
            <span className="can-be-show">{data[key as FilterTag][2]}</span>
          </div>
        })
      }
    </div>
  );
}
