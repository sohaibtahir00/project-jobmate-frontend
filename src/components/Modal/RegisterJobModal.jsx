import { useState } from "react";
import ModalWithForm from "./ModalWithForm";
import CreatableSelect from "react-select/creatable";
import {
  jobTitlesOptions,
  jobTypeOptions,
  industryOptions,
  desiredSalaryOptions,
} from "../../utils/constants";

function RegisterJobModal({ activeModal, onClose, onRegister }) {
  const [title, setTitle] = useState([]);
  const [type, setType] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [salary, setSalary] = useState([]);

  const processOptions = (options, isSalary = false) => {
    if (isSalary) {
      return options.map((option) => option.value);
    }
    return options.flatMap((option) =>
      Array.isArray(option.value)
        ? option.value.map((v) => v.toString().toLowerCase())
        : [option.value?.toString().toLowerCase()]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      title: processOptions(title),
      type: processOptions(type),
      industry: processOptions(industry),
      salary: processOptions(salary, true),
    };

    onRegister(jobData);
  };

  return (
    <ModalWithForm
      title="Job Info"
      buttonText="Sign Up"
      isOpen={activeModal === "jobregister"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label-register">
        <CreatableSelect
          options={industryOptions}
          isMulti
          placeholder="Preferred Industries"
          value={industry}
          onChange={setIndustry}
          classNamePrefix="custom-select"
        />
      </label>

      <label className="modal__label-register">
        <CreatableSelect
          options={jobTitlesOptions}
          isMulti
          placeholder="Preferred Job Titles"
          value={title}
          onChange={setTitle}
          classNamePrefix="custom-select"
        />
      </label>

      <label className="modal__label-register">
        <CreatableSelect
          options={jobTypeOptions}
          isMulti
          placeholder="Desired Job Type"
          value={type}
          onChange={setType}
          classNamePrefix="custom-select"
        />
      </label>

      <label className="modal__label-register">
        <CreatableSelect
          options={desiredSalaryOptions}
          isMulti
          placeholder="Desired Salary"
          value={salary}
          onChange={setSalary}
          classNamePrefix="custom-select"
        />
      </label>
      <div className="modal__other-buttons">
        <button
          className="modal__other-btn"
          type="button"
          onClick={handleSubmit}
        >
          Skip and proceed
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterJobModal;
