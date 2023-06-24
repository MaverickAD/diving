import React from 'react';
import plongeeImage from '../Component/ImgHome/plongee.png';

function Home() {
  return (
      <div className="bg-white p-8 ">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">Home to the Sub Aquatic Group Wattignies!</h1>
        <div className="mb-12 flex justify-center">
          <img src={plongeeImage} className=" max-w-full max-h-500" alt="Plongee" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-justify">
          The Sub Aquatic Group Wattignies is a passionate and dynamic diving club located in the beautiful city of Wattignies. Whether you are a beginner or an experienced diver, our club offers you the opportunity to discover the hidden wonders of the depths.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-justify">
          Our club consists of a team of enthusiastic and qualified divers, all driven by the same passion for underwater exploration. We believe in safety and place great importance on the training of our members. Our experienced instructors are certified and will ensure that you acquire the necessary skills to dive with confidence.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-justify">
          As a member of the Sub Aquatic Group Wattignies, you will have access to a variety of exciting activities. Whether you want to dive in local waters or explore exotic destinations, our club regularly organizes thrilling diving trips. From colorful marine life to mysterious wrecks, each dive is a unique adventure that will broaden your horizons.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-justify">
          We take pride in creating a friendly and welcoming atmosphere where divers of all levels can come together, share their experiences, and build lasting connections. Whether you're looking for a relaxing leisure activity or an opportunity to push your limits, the Sub Aquatic Group Wattignies is the perfect place for you.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-justify">
          Join us now and discover the fascinating world of scuba diving with the Sub Aquatic Group Wattignies. Dive into adventure and create unforgettable memories with our club.
        </p>
      </div>
  );
}

export default Home;
