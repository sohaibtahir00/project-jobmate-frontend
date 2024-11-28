import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackBtn from "../../assets/back-btn.svg";
import "./SideBar.css";

function SideBar({
  userData,
  handleUpdateUser,
  handleEditJob,
  onSearchAll,
  onRecentlyPosted,
  onSearchByJobTitle,
  onSearchByJobType,
  onSearchBySalary,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOverviewExpanded, setIsProfileOverviewExpanded] =
    useState(false);
  const [isMyJobsExpanded, setIsMyJobsExpanded] = useState(false);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const toggleProfileOverview = () => {
    setIsProfileOverviewExpanded(!isProfileOverviewExpanded);
  };

  const toggleMyJobs = () => {
    setIsMyJobsExpanded(!isMyJobsExpanded);
  };

  const toggleFilters = () => {
    setIsFiltersExpanded(!isFiltersExpanded);
  };

  const isAtMyJobs =
    location.pathname === "/profile/saved" ||
    location.pathname === "/profile/viewed" ||
    location.pathname === "/profile/applied";

  const isAtProfile = location.pathname === "/profile";

  return (
    <div className="sidebar">
      {isAtMyJobs && (
        <div className="sidebar__section">
          <button
            className="sidebar__button-back"
            onClick={() => navigate("/profile")}
          >
            <img
              src={BackBtn}
              alt="Back Button Image"
              className="sidebar__button-back-img"
            />
            Back to Profile
          </button>
        </div>
      )}

      {isAtProfile && (
        <div className="sidebar__section">
          <button className="sidebar__button" onClick={toggleProfileOverview}>
            Profile Overview
          </button>
          {isProfileOverviewExpanded && (
            <div className="sidebar__submenu">
              <button
                className="sidebar__submenu-button"
                onClick={handleUpdateUser}
              >
                Edit User Info
              </button>
              <button
                className="sidebar__submenu-button"
                onClick={handleEditJob}
              >
                Edit Job Preference
              </button>
            </div>
          )}
        </div>
      )}

      <div className="sidebar__section">
        <button className="sidebar__button" onClick={toggleMyJobs}>
          My Jobs
        </button>
        {(isAtProfile || isAtMyJobs) && isMyJobsExpanded && (
          <div className="sidebar__submenu">
            <button
              onClick={() => navigate("/profile/saved")}
              className="sidebar__submenu-button"
            >
              Saved Jobs
            </button>
            <button
              onClick={() => navigate("/profile/viewed")}
              className="sidebar__submenu-button"
            >
              Recently Viewed Jobs
            </button>
            <button
              onClick={() => navigate("/profile/applied")}
              className="sidebar__submenu-button"
            >
              Applied Jobs
            </button>
          </div>
        )}
      </div>

      {isAtProfile && (
        <div className="sidebar__section">
          <button className="sidebar__button" onClick={toggleFilters}>
            Search by Filters
          </button>
          {isFiltersExpanded && (
            <div className="sidebar__submenu">
              <button className="sidebar__submenu-button" onClick={onSearchAll}>
                Search All
              </button>
              <button
                className="sidebar__submenu-button"
                onClick={onRecentlyPosted}
              >
                Recently Posted
              </button>
              <button
                className="sidebar__submenu-button"
                onClick={onSearchByJobTitle}
              >
                Search by Job Title
              </button>
              <button
                className="sidebar__submenu-button"
                onClick={onSearchByJobType}
              >
                Search by Job Type
              </button>
              <button
                className="sidebar__submenu-button"
                onClick={onSearchBySalary}
              >
                Search by Salary
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SideBar;
