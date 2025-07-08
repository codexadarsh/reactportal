import React from "react";
import { HomeCards,Hero,JobListings,View } from "../components";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <View />
    </>
  );
};

export default HomePage;
