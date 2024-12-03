import React from "react";
import "./ItemCard.css";

function ItemCard({
  handleCardClick,
  handleApplyClick,
  title = "Unknown Title",
  company = "Unknown Company",
  location = "Unknown Location",
  description = "No description available",
  datePosted = "Unknown Date",
  salaryMax = "N/A",
  category = "Unknown Category",
  contractTime = "N/A",
}) {
  const onCardClick = () => {
    if (handleCardClick) {
      handleCardClick();
    }
  };

  const onApplyClick = (e) => {
    e.stopPropagation();
    if (handleApplyClick) {
      handleApplyClick();
    }
  };

  return (
    <div className="item-card" onClick={onCardClick}>
      <h2 className="item-card__title">
        {title ? title.slice(0, 24) : "No title available"}...
      </h2>
      <h3 className="item-card__company">
        {company ? company.slice(0, 30) : "No company available"}...
      </h3>
      <p className="item-card__location">{location}</p>
      <p className="item-card__category">{category}</p>
      <p className="item-card__contract">{contractTime}</p>
      <p className="item-card__salary">Salary: {salaryMax}</p>
      <p className="item-card__date">Posted: {datePosted}</p>
      <p className="item-card__description">
        {description ? description.slice(0, 150) : "No description available"}
        ...
      </p>
      <button className="item-card__apply-btn" onClick={onApplyClick}>
        Apply Now
      </button>
    </div>
  );
}

export default ItemCard;
