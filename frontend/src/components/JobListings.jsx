import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinners";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!API_BASE_URL) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchJobs = async () => {
      setLoading(true);
      setError("");

      const apiUrl = isHome ? `${API_BASE_URL}/jobs` : `${API_BASE_URL}/jobs`;

      try {
        const response = await fetch(apiUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`);
        }

        const data = await response.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load jobs.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    return () => controller.abort();
  }, [isHome, API_BASE_URL]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <div className="flex justify-center">
            <Spinner loading={loading} />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job._id} {...job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
