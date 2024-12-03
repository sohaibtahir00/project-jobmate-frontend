import { useState, useEffect } from "react";
import { fetchAdzunaJobs } from "../../utils/adzunaApi";
import ItemCard from "../ItemCard/ItemCard";
import ItemModal from "../Modal/ItemModal";
import ItemPopupModal from "../Modal/ItemPopupModal";
import "./Main.css";
import Preloader from "../Preloader/Preloader";

function Main({
  handleRegister,
  handlePopupRegister,
  userData,
  setActiveModal,
}) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);

  const isLoggedIn = Boolean(userData?.name);

  const handleCardClick = (job) => {
    if (isLoggedIn) {
      setSelectedJob(job);
    } else {
      setActiveModal("popup-register");
    }
  };

  const handleApplyClick = (job) => {
    if (isLoggedIn) {
      setSelectedJob(job);
    } else {
      setActiveModal("popup-register");
    }
  };

  const handleModalClose = () => {
    setSelectedJob(null);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
      setLoading(false);
    } else {
      fetchAdzunaJobs(20)
        .then((data) => {
          setJobs(data);
          localStorage.setItem("jobs", JSON.stringify(data));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch job listings:", error);
          setError(
            "Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later."
          );
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="main">
      {isLoggedIn ? (
        <div className="main__logged-in-hero">
          <h2 className="main__logged-in-title">
            Welcome back, {userData.name}!
          </h2>
          <p className="main__quote">
            "Success is not final; failure is not fatal. It is the courage to
            continue that counts."
          </p>
        </div>
      ) : (
        <div className="main__hero">
          <h1 className="main__hero-title">Welcome to JobMate</h1>
          <p className="main__hero-text">
            Your go-to platform for finding the best tech jobs tailored just for
            you.
          </p>
          <button className="main__hero-button" onClick={handleRegister}>
            Get Started for Free
          </button>
        </div>
      )}
      <div className="main__listings">
        {loading ? (
          <div className="main__listings-loading">
            <Preloader />
          </div>
        ) : error ? (
          <p className="main__error">{error}</p>
        ) : jobs.length > 0 ? (
          <>
            {jobs
              .slice(0, isLoggedIn ? jobs.length : visibleCount)
              .map((job) => (
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
            {!isLoggedIn && visibleCount < jobs.length && (
              <button className="main__show-more" onClick={handleShowMore}>
                Show More
              </button>
            )}
          </>
        ) : (
          <p className="main__no-jobs">No job listings found.</p>
        )}
      </div>

      {selectedJob && (
        <ItemModal
          isOpen={!!selectedJob}
          job={selectedJob}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default Main;
