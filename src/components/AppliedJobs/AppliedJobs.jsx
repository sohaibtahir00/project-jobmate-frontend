import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function AppliedJobs({ appliedJobs }) {
  return (
    <div className="applied-jobs">
      <h2 className="applied-jobs__title">Your Applied Jobs</h2>
      <ul className="applied-jobs__items">
        {appliedJobs.map((job) => (
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

export default AppliedJobs;
