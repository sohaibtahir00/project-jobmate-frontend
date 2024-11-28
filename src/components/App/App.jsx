import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import RegisterModal from "../Modal/RegisterModal.jsx";
import RegisterJobModal from "../Modal/RegisterJobModal.jsx";
import LoginModal from "../Modal/LoginModal.jsx";
import ItemPopupModal from "../Modal/ItemPopupModal.jsx";
import EditUserModal from "../Modal/EditUserModal.jsx";
import EditJobModal from "../Modal/EditJobModal.jsx";
import Profile from "../Profile/Profile.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [userData, setUserData] = useState({});
  const [tempUserData, setTempUserData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const storedAppliedJobs = localStorage.getItem("appliedJobs");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs));
    }
  }, []);

  const handleLogout = () => {
    setUserData({});
    localStorage.removeItem("userData");
    localStorage.removeItem("appliedJobs");
    navigate("/");
  };

  const handlePopupRegister = () => {
    setActiveModal("popup-register");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleLogin = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleBasicRegisterSubmit = (data) => {
    setTempUserData(data);
    setActiveModal("jobregister");
  };

  const handleJobRegisterSubmit = (jobData) => {
    const finalUserData = {
      ...tempUserData,
      jobPreferences: jobData,
    };

    setUserData(finalUserData);
    localStorage.setItem("userData", JSON.stringify(finalUserData));
    setTempUserData(null);
    setActiveModal("");
    navigate("/profile");
  };

  const handleLoginSubmit = (loginData) => {
    const finalUserData = {
      name: loginData.name || "User",
      email: loginData.email,
      jobPreferences: loginData.jobPreferences || {},
    };

    setUserData(finalUserData);
    localStorage.setItem("userData", JSON.stringify(finalUserData));
    setActiveModal("");
    navigate("/profile");
  };

  const handleEditUserSubmit = (updatedData) => {
    const updatedUserData = { ...userData, ...updatedData };
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    closeActiveModal();
  };

  const handleEditJobSubmit = (updatedJobData) => {
    const updatedUserData = {
      ...userData,
      jobPreferences: {
        ...userData.jobPreferences,
        ...updatedJobData,
      },
    };
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    closeActiveModal();
  };

  const handleApplyJob = (job) => {
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

  return (
    <div className="page">
      <div className="page__content">
        <Header
          userData={userData}
          handleLogout={handleLogout}
          handleRegister={handleRegister}
          handleLogin={handleLogin}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                handleRegister={handleRegister}
                handlePopupRegister={handlePopupRegister}
                userData={userData}
                setActiveModal={setActiveModal}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                userData={{
                  ...userData,
                  jobPreferences: userData.jobPreferences || {},
                }}
                handleUpdateUser={() => setActiveModal("update-user")}
                handleEditJob={() => setActiveModal("edit-job")}
                onApplyJob={handleApplyJob}
              />
            }
          />
          <Route
            path="/profile/saved"
            element={
              <Profile
                userData={{
                  ...userData,
                  jobPreferences: userData.jobPreferences || {},
                }}
                showSavedJobsOnly
                handleUpdateUser={() => setActiveModal("update-user")}
                handleEditJob={() => setActiveModal("edit-job")}
                onApplyJob={handleApplyJob}
              />
            }
          />
          <Route
            path="/profile/viewed"
            element={
              <Profile
                userData={{
                  ...userData,
                  jobPreferences: userData.jobPreferences || {},
                }}
                showViewedJobsOnly
                handleUpdateUser={() => setActiveModal("update-user")}
                handleEditJob={() => setActiveModal("edit-job")}
                onApplyJob={handleApplyJob}
              />
            }
          />
          <Route
            path="/profile/applied"
            element={
              <Profile
                userData={{
                  ...userData,
                  jobPreferences: userData.jobPreferences || {},
                }}
                showAppliedJobsOnly
                handleUpdateUser={() => setActiveModal("update-user")}
                handleEditJob={() => setActiveModal("edit-job")}
                onApplyJob={handleApplyJob}
              />
            }
          />
        </Routes>
        <Footer />
      </div>

      <RegisterModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onRegister={handleBasicRegisterSubmit}
        handleLogin={handleLogin}
      />
      <RegisterJobModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onRegister={handleJobRegisterSubmit}
      />
      <LoginModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onLogin={(loginData) => handleLoginSubmit(loginData)}
        handleRegister={handleRegister}
      />
      <ItemPopupModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        handleRegister={handleRegister}
        handleLogin={handleLogin}
      />
      <EditUserModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onRegister={(updatedUserData) => {
          const updatedData = { ...userData, ...updatedUserData };
          setUserData(updatedData);
          localStorage.setItem("userData", JSON.stringify(updatedData));
          closeActiveModal();
        }}
        existingUserData={userData}
      />
      <EditJobModal
        activeModal={activeModal}
        onClose={closeActiveModal}
        onUpdate={(updatedJobData) => {
          const updatedUserData = {
            ...userData,
            jobPreferences: {
              ...userData.jobPreferences,
              ...updatedJobData,
            },
          };
          setUserData(updatedUserData);
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          closeActiveModal();
        }}
        existingJobData={{
          ...userData.jobPreferences,
          location: userData.jobPreferences?.location || "",
        }}
      />
    </div>
  );
}

export default App;
