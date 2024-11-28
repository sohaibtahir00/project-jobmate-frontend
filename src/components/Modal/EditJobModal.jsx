import { useState, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import CreatableSelect from "react-select/creatable";
import {
  jobTitlesOptions,
  jobTypeOptions,
  industryOptions,
  desiredSalaryOptions,
} from "../../utils/constants";

function EditJobModal({ activeModal, onClose, onUpdate, existingJobData }) {
  const [title, setTitle] = useState([]);
  const [type, setType] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    if (existingJobData) {
      const mapValuesToOptions = (values, options, isSalary = false) => {
        if (isSalary) {
          return options.filter((option) => values.includes(option.value));
        }
        return options.filter((option) =>
          Array.isArray(option.value)
            ? option.value.some((v) =>
                values.includes(v.toString().toLowerCase())
              )
            : values.includes(option.value?.toString().toLowerCase())
        );
      };

      setTitle(
        mapValuesToOptions(existingJobData.title || [], jobTitlesOptions)
      );
      setType(mapValuesToOptions(existingJobData.type || [], jobTypeOptions));
      setIndustry(
        mapValuesToOptions(existingJobData.industry || [], industryOptions)
      );
      setSalary(
        mapValuesToOptions(
          existingJobData.salary || [],
          desiredSalaryOptions,
          true
        )
      );
    }
  }, [existingJobData]);

  const processOptionsForSubmit = (options, isSalary = false) => {
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

    const updatedJobData = {
      title: processOptionsForSubmit(title),
      type: processOptionsForSubmit(type),
      industry: processOptionsForSubmit(industry),
      salary: processOptionsForSubmit(salary, true),
    };

    onUpdate(updatedJobData);
    onClose();
  };

  return (
    <ModalWithForm
      title="Update Job Preferences"
      buttonText="Update"
      isOpen={activeModal === "edit-job"}
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
    </ModalWithForm>
  );
}

export default EditJobModal;
