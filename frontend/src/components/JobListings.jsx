import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinners";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const api_url = isHome
        ? "/api/jobs?_limit=3"
        : "/api/jobs";
      try {
        const response = await fetch(api_url);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.log("Error Fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <>
              {jobs.map(
                ({ id, type, title, location, salary, description }) => (
                  <JobListing
                    key={id}
                    id={id}
                    type={type}
                    title={title}
                    location={location}
                    salary={salary}
                    description={description}
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
