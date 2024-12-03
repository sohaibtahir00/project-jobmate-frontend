import React, { useEffect } from "react";
import "./ItemModal.css";
import close from "../../assets/close-btn.svg";

function ItemModal({
  isOpen,
  job,
  onClose,
  onApplyJob,
  isSavedPage,
  onSave,
  onDelete,
}) {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSaveOrDelete = () => {
    if (isSavedPage) {
      onDelete(job.id);
    } else {
      onSave(job);
    }
    onClose();
  };

  const handleApplyClick = () => {
    if (job && onApplyJob) {
      onApplyJob(job);
    }
    if (job.url) {
      window.open(job.url, "_blank", "noopener,noreferrer");
    } else {
      console.warn("Invalid or missing URL for the job application.");
    }
  };

  return (
    <div className="item-modal">
      <div className="item-modal__content">
        <button className="item-modal__close-btn" onClick={onClose}>
          <img
            src={close}
            alt="close button"
            className="item-modal__close-btn-img"
          />
        </button>
        <h2 className="item-modal__title">{job.title || "Unknown Title"}</h2>
        <h3 className="item-modal__company">
          {job.company || "Unknown Company"}
        </h3>
        <p className="item-modal__location">
          <strong>Location:</strong> {job.location || "Unknown Location"}
        </p>
        <p className="item-modal__category">
          <strong>Category:</strong> {job.category || "Unknown Category"}
        </p>
        <p className="item-modal__contract">
          <strong>Contract:</strong> {job.contractTime || "N/A"}
        </p>
        <p className="item-modal__salary">
          <strong>Salary:</strong> {job.salaryMax || "N/A"}
        </p>
        <p className="item-modal__date">
          <strong>Date Posted:</strong> {job.datePosted || "Unknown Date"}
        </p>
        <p className="item-modal__description">
          <strong>Description:</strong>
          {job.description || "No description available"}
        </p>

        <button onClick={handleApplyClick} className="item-modal__apply-btn">
          Apply Now
        </button>

        <button
          onClick={handleSaveOrDelete}
          className={`item-modal__${isSavedPage ? "delete" : "save"}-btn`}
        >
          {isSavedPage ? "Delete" : "Save for later"}
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
