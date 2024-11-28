import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function RecentlyViewed({ viewedJobs }) {
  return (
    <div className="recently-viewed-section">
      <ul className="recently-viewed-section__items">
        {viewedJobs.map((job) => (
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
          />
        ))}
      </ul>
    </div>
  );
}

export default RecentlyViewed;
