import { useEffect, useState } from 'react';
import { GrInstall } from 'react-icons/gr';

const MyInstallation = () => {
  const [myApps, setMyApps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/apps/install`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyApps(data);
      });
  }, []);

  const handleSort = (type) => {
    console.log(type);
  };

  // const handleUninstall = (id) => {
  //   console.log(id);
  // };

  return (
    <div className="px-5 lg:w-11/12 mx-auto py-10">
      <title>My Installations</title>
      <div className="">
        <h2 className="text-4xl font-bold text-center text-primary flex justify-center gap-3">
          Your Installed Apps
          <GrInstall size={48} className="text-secondary"></GrInstall>
        </h2>
        <p className="text-center text-gray-400">
          Explore All Trending Apps on the Market developed by us
        </p>
      </div>
      <div className=" flex justify-between mt-10 sticky">
        <h2 className="text-lg  underline text-secondary font-medium">
          {myApps.length} Apps Found
        </h2>
        <div className="">
          <select onClick={(e) => handleSort(e.target.value)} className="select bg-white">
            <option selected disabled={true}>
              Sort By Size
            </option>
            <option value={'asc'}>Low-High</option>
            <option value={'desc'}>High-Low</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
      <div className=" grid grid-cols-1 gap-5">
        {myApps.length}
        {/* {myApps.map((app) => (
          <InstallCard key={app._id} app={app} handleUninstall={handleUninstall}></InstallCard>
        ))} */}
      </div>
    </div>
  );
};

export default MyInstallation;
