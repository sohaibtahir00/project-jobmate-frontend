import { useState, useEffect } from "react";
import { fetchAdzunaJobs } from "../../utils/adzunaApi";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../Modal/ItemModal";
import "./JobSection.css";
import Preloader from "../Preloader/Preloader";

function JobSection({
  title = [],
  type = [],
  industry = [],
  userLocation = "",
  savedJobs = [],
  salary = [],
  recentlyViewedJobs = [],
  appliedJobs = [],
  showSavedJobsOnly = false,
  showViewedJobsOnly = false,
  showAppliedJobsOnly = false,
  onSaveJob,
  onDeleteJob,
  onAddRecentlyViewedJob,
  onClearRecentlyViewedJobs,
  onApplyJob,
  onClearAppliedJobs,
  filterType = "all",
}) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!showSavedJobsOnly && !showViewedJobsOnly && !showAppliedJobsOnly) {
        try {
          setLoading(true);
          const fetchedJobs = await fetchAdzunaJobs(50);
          setJobs(fetchedJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [showSavedJobsOnly, showViewedJobsOnly, showAppliedJobsOnly]);

  useEffect(() => {
    let newFilteredJobs = [];

    if (showSavedJobsOnly) {
      newFilteredJobs = savedJobs;
    } else if (showViewedJobsOnly) {
      newFilteredJobs = recentlyViewedJobs;
    } else if (showAppliedJobsOnly) {
      newFilteredJobs = appliedJobs;
    } else {
      newFilteredJobs = jobs.filter((job) => {
        const jobTitle = (job.title || "").toLowerCase();
        const jobType = (job.contractTime || "").toLowerCase();
        const jobCategory = (job.category || "").toLowerCase();
        const jobLocation = (job.location || "").toLowerCase();
        const jobSalary =
          parseFloat((job.salaryMax || "0").replace(/[$,]/g, "")) || 0;

        const matchesTitle =
          title.length === 0 ||
          title.some((t) => jobTitle.includes(t.toLowerCase()));

        const matchesType =
          type.length === 0 ||
          type.some((t) => jobType.includes(t.toLowerCase()));

        const matchesIndustry =
          industry.length === 0 ||
          industry.some((i) => jobCategory.includes(i.toLowerCase()));

        const matchesSalary =
          salary.length === 0 ||
          salary.some(([min, max]) => jobSalary >= min && jobSalary <= max);

        const matchesLocation =
          !userLocation || jobLocation.includes(userLocation.toLowerCase());

        return (
          matchesTitle &&
          matchesType &&
          matchesIndustry &&
          matchesSalary &&
          matchesLocation
        );
      });
    }

    if (filterType === "recentlyPosted") {
      newFilteredJobs = newFilteredJobs
        .filter(
          (job) =>
            new Date(job.datePosted) >=
            new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
        .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));
    } else if (filterType === "jobTitle") {
      newFilteredJobs.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", undefined, {
          sensitivity: "base",
        })
      );
    } else if (filterType === "jobType") {
      newFilteredJobs.sort((a, b) => {
        const aValue = a.contractTime || "N/A";
        const bValue = b.contractTime || "N/A";

        if (aValue === "N/A" && bValue !== "N/A") return 1;
        if (bValue === "N/A" && aValue !== "N/A") return -1;

        return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
      });
    } else if (filterType === "salary") {
      newFilteredJobs.sort((a, b) => {
        const salaryA =
          parseFloat((a.salaryMax || "0").replace(/[$,]/g, "")) || 0;
        const salaryB =
          parseFloat((b.salaryMax || "0").replace(/[$,]/g, "")) || 0;

        return salaryB - salaryA;
      });
    }

    setFilteredJobs((prevFilteredJobs) =>
      JSON.stringify(prevFilteredJobs) !== JSON.stringify(newFilteredJobs)
        ? newFilteredJobs
        : prevFilteredJobs
    );
  }, [
    jobs,
    title,
    type,
    industry,
    salary,
    userLocation,
    showSavedJobsOnly,
    showViewedJobsOnly,
    showAppliedJobsOnly,
    savedJobs,
    recentlyViewedJobs,
    appliedJobs,
    filterType,
  ]);

  const handleCardClick = (job) => {
    setSelectedJob(job);
    if (!showViewedJobsOnly && !showSavedJobsOnly && !showAppliedJobsOnly) {
      onAddRecentlyViewedJob(job);
    }
  };

  const handleCloseModal = () => setSelectedJob(null);

  const handleApplyClick = (job) => {
    if (onApplyJob) onApplyJob(job);
    if (job.url?.startsWith("http")) {
      window.open(job.url, "_blank", "noopener,noreferrer");
    } else {
      console.warn("Invalid or missing URL for the job application.");
    }
  };

  if (loading) {
    return (
      <div className="profile-section__loading">
        <Preloader />
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="profile-section">
        {showViewedJobsOnly && (
          <p className="profile-section__no-jobs">
            No Recently Viewed Jobs Found
          </p>
        )}
        {showAppliedJobsOnly && (
          <p className="profile-section__no-jobs">No Applied Jobs Found</p>
        )}
        {showSavedJobsOnly && (
          <p className="profile-section__no-jobs">No Saved Jobs Found</p>
        )}
        {!showViewedJobsOnly && !showAppliedJobsOnly && !showSavedJobsOnly && (
          <p className="profile-section__no-jobs">No Jobs Found</p>
        )}
      </div>
    );
  }

  return (
    <div className="profile-section">
      <div className="profile-section-btns">
        {showViewedJobsOnly && (
          <button
            className="profile-section__clear-btn"
            onClick={onClearRecentlyViewedJobs}
          >
            Clear All Recently Viewed Jobs
          </button>
        )}

        {showAppliedJobsOnly && (
          <button
            className="profile-section__clear-btn"
            onClick={onClearAppliedJobs}
          >
            Clear All Applied Jobs
          </button>
        )}
      </div>

      <ul className="profile-section__items">
        {filteredJobs.map((job) => (
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
            handleCardClick={() => handleCardClick(job)}
            handleApplyClick={() => handleApplyClick(job)}
          />
        ))}
      </ul>

      {selectedJob && (
        <ItemModal
          isOpen={!!selectedJob}
          job={selectedJob}
          onClose={handleCloseModal}
          onSave={onSaveJob}
          onDelete={onDeleteJob}
          isSavedPage={showSavedJobsOnly}
          handleApplyClick={() => handleApplyClick(selectedJob)}
          onApplyJob={onApplyJob}
        />
      )}
    </div>
  );
}

export default JobSection;
