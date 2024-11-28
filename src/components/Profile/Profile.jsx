import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Refresh from "../../assets/refresh-btn.svg";
import JobSection from "../JobSection/JobSection";
import SideBar from "../SideBar/SideBar";
import {
  jobTitlesOptions,
  jobTypeOptions,
  industryOptions,
  desiredSalaryOptions,
} from "../../utils/constants";

const mapValuesToLabels = (values, options) => {
  if (!values || values.length === 0) return "None";

  if (typeof values[0] === "object" && Array.isArray(values[0])) {
    return [
      ...new Set(
        values.map(([min, max]) => {
          const matchedOption = options.find(
            (option) =>
              Array.isArray(option.value) &&
              min >= option.value[0] &&
              max <= option.value[1]
          );
          return matchedOption?.label || `${min} - ${max}`;
        })
      ),
    ].join(", ");
  }

  return [
    ...new Set(
      values.map((value) => {
        const matchedOption = options.find((option) =>
          Array.isArray(option.value)
            ? option.value.includes(value.toString().toLowerCase())
            : option.value?.toString().toLowerCase() ===
              value.toString().toLowerCase()
        );
        return matchedOption?.label || value;
      })
    ),
  ].join(", ");
};

function Profile({ userData = {}, handleUpdateUser, handleEditJob }) {
  const [savedJobs, setSavedJobs] = useState([]);
  const [recentlyViewedJobs, setRecentlyViewedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();

  const handleSearchAll = () => setFilterType("all");
  const handleRecentlyPosted = () => setFilterType("recentlyPosted");
  const handleSearchByJobTitle = () => setFilterType("jobTitle");
  const handleSearchByJobType = () => setFilterType("jobType");
  const handleSearchBySalary = () => setFilterType("salary");
  const handleRefresh = () => setRefreshKey((prevKey) => prevKey + 1);

  const {
    name = "User",
    email,
    location: userLocation = "None",
    jobPreferences = {},
  } = userData;

  const { title = [], type = [], industry = [], salary = [] } = jobPreferences;

  const displaySalary = mapValuesToLabels(salary, desiredSalaryOptions);
  const displayTitle = mapValuesToLabels(title, jobTitlesOptions);
  const displayIndustry = mapValuesToLabels(industry, industryOptions);
  const displayType = mapValuesToLabels(type, jobTypeOptions);

  const handleSaveJob = (job) => {
    setSavedJobs((prev) => {
      const updatedJobs = [...prev, job];
      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      return updatedJobs;
    });
  };

  const handleDeleteJob = (jobId) => {
    setSavedJobs((prev) => {
      const updatedJobs = prev.filter((job) => job.id !== jobId);
      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      return updatedJobs;
    });
  };

  const onAddRecentlyViewed = (job) => {
    setRecentlyViewedJobs((prev) => {
      const isAlreadyViewed = prev.some((viewedJob) => viewedJob.id === job.id);
      if (isAlreadyViewed) return prev;

      const updatedViewedJobs = [...prev, job];
      localStorage.setItem(
        "recentlyViewedJobs",
        JSON.stringify(updatedViewedJobs)
      );
      return updatedViewedJobs;
    });
  };

  const handleAddAppliedJob = (job) => {
    setAppliedJobs((prev) => {
      const isAlreadyApplied = prev.some(
        (appliedJob) => appliedJob.id === job.id
      );
      if (isAlreadyApplied) return prev;

      const updatedAppliedJobs = [...prev, job];
      localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs));
      return updatedAppliedJobs;
    });
  };

  const handleClearRecentlyViewed = () => {
    setRecentlyViewedJobs([]);
    localStorage.removeItem("recentlyViewedJobs");
  };

  const handleClearAppliedJobs = () => {
    setAppliedJobs([]);
    localStorage.removeItem("appliedJobs");
  };

  const isSavedPage = location.pathname === "/profile/saved";
  const isViewedPage = location.pathname === "/profile/viewed";
  const isAppliedPage = location.pathname === "/profile/applied";

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(storedJobs);

    const storedViewedJobs =
      JSON.parse(localStorage.getItem("recentlyViewedJobs")) || [];
    setRecentlyViewedJobs(storedViewedJobs);

    const storedAppliedJobs =
      JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedAppliedJobs);
  }, []);
  return (
    <div className="profile">
      <section className="profile__hero">
        <div className="profile__hero-title-text">
          <h1 className="profile__hero-title">
            Welcome to your Dashboard, {name}!
          </h1>
          <p className="profile__hero-email">Email: {email}</p>
          <p className="profile__hero-location">
            Location: {userLocation.trim() || "None"}
          </p>
        </div>
      </section>
      <div className="profile__content">
        <section className="profile__header-section">
          <div className="profile__sidebar">
            <SideBar
              userData={userData}
              handleUpdateUser={handleUpdateUser}
              handleEditJob={handleEditJob}
              onSearchAll={handleSearchAll}
              onRecentlyPosted={handleRecentlyPosted}
              onSearchByJobTitle={handleSearchByJobTitle}
              onSearchByJobType={handleSearchByJobType}
              onSearchBySalary={handleSearchBySalary}
            />
          </div>
          <div className="profile__job-pref">
            <h3 className="profile__job-pref-title">My Job Preference:</h3>
            <div className="profile__main-pref-container">
              <div className="profile__main-pref">
                <p className="profile__main-pref-jobindustry">
                  Industry: {displayIndustry}
                </p>
                <p className="profile__main-pref-jobtitle">
                  Title: {displayTitle}
                </p>
              </div>
              <div className="profile__main-pref">
                <p className="profile__main-pref-jobtype">
                  Job Type: {displayType}
                </p>
                <p className="profile__main-pref-jobsalary">
                  Salary: {displaySalary}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="profile__job-section">
        <div className="profile__job-header">
          <p className="profile__job-title">
            {isSavedPage
              ? "Your Saved Jobs:"
              : isViewedPage
              ? "Recently Viewed Jobs:"
              : isAppliedPage
              ? "Your Applied Jobs:"
              : "Recommended Jobs for you:"}
          </p>
          {!isSavedPage && !isViewedPage && !isAppliedPage && (
            <button className="profile__refresh-button" onClick={handleRefresh}>
              <img
                src={Refresh}
                alt="Refresh Button"
                className="profile__refresh-img"
              />
            </button>
          )}
        </div>
        <JobSection
          key={refreshKey}
          title={title}
          type={type}
          industry={industry}
          location={[userLocation]}
          savedJobs={savedJobs}
          recentlyViewedJobs={recentlyViewedJobs}
          appliedJobs={appliedJobs}
          showSavedJobsOnly={isSavedPage}
          showViewedJobsOnly={isViewedPage}
          showAppliedJobsOnly={isAppliedPage}
          onSaveJob={handleSaveJob}
          onDeleteJob={handleDeleteJob}
          onAddRecentlyViewedJob={onAddRecentlyViewed}
          onClearRecentlyViewedJobs={handleClearRecentlyViewed}
          onClearAppliedJobs={handleClearAppliedJobs}
          onApplyJob={handleAddAppliedJob}
          filterType={filterType}
          salary={jobPreferences.salary}
        />
      </section>
    </div>
  );
}

export default Profile;
