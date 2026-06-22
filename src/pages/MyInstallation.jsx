import { useEffect, useState } from 'react';
import { GrInstall } from 'react-icons/gr';
import { toast } from 'react-toastify';
import baseURL from '../api/apiLink';
import InstallCard from '../ui/InstallCard';

const MyInstallation = () => {
  const [myApps, setMyApps] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/apps/install`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMyApps(data);
      });
  }, []);

  const handleSort = (type) => {
    console.log(type);
  };

  const handleUninstall = (id) => {
    // console.log(id);
    fetch(`${baseURL}/apps/install/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.deletedCount) {
          toast.warning('Deleted App Completely');
        }
        setMyApps((prevMyApps) => prevMyApps.filter((appItem) => appItem._id !== id));
      });
  };

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
          <select
            onClick={(e) => handleSort(e.target.value)}
            defaultValue="Sort By Size"
            className="select bg-white"
          >
            <option value={'Sort By Size'} disabled={true}>
              Sort By Size
            </option>
            <option value={'asc'}>Low-High</option>
            <option value={'desc'}>High-Low</option>
          </select>
        </div>
      </div>
      <div className="divider"></div>
      <div className=" grid grid-cols-1 gap-5">
        {myApps.map((appItem) => (
          <InstallCard
            key={appItem._id}
            appItem={appItem}
            handleUninstall={handleUninstall}
          ></InstallCard>
        ))}
      </div>
    </div>
  );
};

export default MyInstallation;
