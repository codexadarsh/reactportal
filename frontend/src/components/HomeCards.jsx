import Card from "./Card";

const HomeCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card
            title="For Developers"
            subtitle="Browse our React jobs and start your career today"
            type="Browse Jobs"
          />
          <Card
            to="/add-job"
            bg="bg-indigo-100"
            title="For Employers"
            subtitle="List your job to find the perfect developer for the role"
            type="Add Jobs"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
