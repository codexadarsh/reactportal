import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newJob = {
      title,
      type,
      location,
      description,
      salary: Number(salary),
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) throw new Error("Failed to add job");

      toast.success("Job added successfully!");
      navigate("/jobs");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding the job.");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            {/* Job Type */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Job Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Job Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
                rows="4"
              ></textarea>
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="block font-bold mb-2">
                Salary (e.g. 75000)
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                min="0"
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            {/* Company Info */}
            <h3 className="text-2xl mb-4 mt-6">Company Info</h3>

            <div className="mb-4">
              <label className="block font-bold mb-2">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">
                Company Description
              </label>
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                className="border rounded w-full py-2 px-3"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">
                Contact Phone (10 digits)
              </label>
              <input
                type="number"
                pattern="[0-9]{10}"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-full w-full hover:bg-indigo-700"
            >
              Add Job
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddJobPage;
