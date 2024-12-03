export const fetchAdzunaJobs = async (resultsPerPage = 20) => {
  const appId = "2cd467aa";
  const appKey = "c13aed2ed4a3bb27f1e95d5ae7b4c56a";
  const apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&what=software+engineer&where=remote&results_per_page=${resultsPerPage}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    const formatDate = (isoDate) => {
      const dateObject = new Date(isoDate);

      const formattedDate = dateObject.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const formattedTime = dateObject.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return { formattedDate, formattedTime };
    };

    const jobs = data.results.map((job) => {
      const { formattedDate, formattedTime } = job.created
        ? formatDate(job.created)
        : { formattedDate: "Unknown Date", formattedTime: "Unknown Time" };

      const formatSalary = (salary) =>
        salary ? `$${parseFloat(salary).toLocaleString()}` : "N/A";

      const salaryMax = formatSalary(job.salary_max);

      return {
        id: job.id,
        title: job.title,
        company: job.company?.display_name,
        location: job.location?.display_name,
        description: job.description,
        datePosted: formattedDate,
        timePosted: formattedTime,
        salaryMax,
        category: job.category?.label,
        contractTime: job.contract_time,
        url: job.redirect_url,
      };
    });

    return jobs;
  } catch (error) {
    console.error("Error fetching data from Adzuna API:", error);
    return [];
  }
};
