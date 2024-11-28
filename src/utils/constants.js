export const jobTitlesOptions = [
  {
    value: ["engineer", "software engineer", "developer", "software developer"],
    label: "Software Engineer",
  },
  {
    value: ["data", "data scientist", "data analyst", "data engineer"],
    label: "Data Scientist",
  },
  {
    value: ["manager", "product manager", "product owner"],
    label: "Product Manager",
  },
  {
    value: ["designer", "ui/ux designer", "ux designer", "ui designer"],
    label: "UI/UX Designer",
  },
  { value: ["dev", "devops engineer", "devops"], label: "DevOps Engineer" },
  {
    value: ["manager", "project manager", "pm", "project lead"],
    label: "Project Manager",
  },
];

export const jobTypeOptions = [
  {
    value: ["full-time", "fulltime", "full_time"],
    label: "Full-time",
  },
  {
    value: ["part-time", "parttime", "part_time"],
    label: "Part-time",
  },
  { value: ["hybrid"], label: "Hybrid" },
  { value: ["remote", "work from home"], label: "Remote" },
];

export const industryOptions = [
  { value: ["technology", "tech", "it"], label: "Technology" },
  { value: ["healthcare", "medical"], label: "Healthcare" },
  { value: ["finance", "financial", "banking"], label: "Finance" },
  { value: ["education", "teaching", "academia"], label: "Education" },
  { value: ["manufacturing", "factory", "production"], label: "Manufacturing" },
  { value: ["retail", "commerce", "sales"], label: "Retail" },
];

export const desiredSalaryOptions = [
  { value: [0, 50000], label: "Up to 50k/year" },
  { value: [50001, 100000], label: "50k-100k/year" },
  { value: [100001, 130000], label: "100k-130k/year" },
  { value: [130001, 200000], label: "130k-200k/year" },
  { value: [200001, 300000], label: "200k-300k/year" },
  { value: [300001, 500000], label: "300k-500k/year" },
  { value: [500001, Infinity], label: "Above 500k/year" },
];
