import { useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';
export default function FilterHeader() {
    const { currentTags, toggleTag } = useContext(FilterContext);
  const isSelected = (currentTags, tag) =>
    "fw-bold rounded-pill btn btn" +
    (currentTags.includes(tag) ? "" : "-outline");
  return (
    <div id="dashboard-filters">
      <div
        onClick={() => toggleTag("PENDING")}
        className={` ${isSelected(currentTags, "PENDING")}-info `}
      >
        Enchères en attente
      </div>
      <div
        onClick={() => toggleTag("IN_PROGRESS")}
        className={` ${isSelected(currentTags, "IN_PROGRESS")}-warning `}
      >
        Enchères en cours
      </div>
      <div
        onClick={() => toggleTag("COMPLETED")}
        className={` ${isSelected(currentTags, "COMPLETED")}-success `}
      >
        Enchères en terminées
      </div>
    </div>
  );
}
