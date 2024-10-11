import { useEffect } from "react";
import { useState } from "react";
import FilterSearch from "../components/FilterSearch";
import JobPostCards from "../components/JobPostCards";
import styles from "./JobSeekerposts.module.css";
import JSheader from "../components/JSheader";

function JobSeekerposts() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("src\\assets\\Data\\dummyDataJobPosts.json"); // Use the correct path
        // Check if the response is OK
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    let result = jobs;

    // Check if the selected category is not "All Categories"
    if (selectedCategory !== "All Categories") {
      result = jobs.filter(
        (job) =>
          job.jobCategory &&
          job.jobCategory.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term if it's not empty
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.jobName &&
          job.jobName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [jobs, searchTerm, selectedCategory]);

  return (
    <div className={styles.pageContainer}>
      <JSheader />
      <div className={styles.rightPart}>
        <FilterSearch
          onSearch={setSearchTerm}
          searchTerm={searchTerm}
          categories={["All Categories", "CS", "DevOps", "IA"]}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <JobPostCards jobs={filteredJobs} />
      </div>
    </div>
  );
}

export default JobSeekerposts;
