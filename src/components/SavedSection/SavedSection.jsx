import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function SavedSection({ savedJobs, onRemoveSavedJob }) {
  return (
    <div className="saved-section">
      <ul className="saved-section__items">
        {savedJobs.map((job) => (
          <ItemCard
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            datePosted={job.datePosted}
            salaryMax={job.salaryMax}
            category={job.category}
            contractTime={job.contractTime}
            handleApplyClick={() => window.open(job.url, "_blank")}
            handleRemoveSavedJob={() => onRemoveSavedJob(job.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default SavedSection;
