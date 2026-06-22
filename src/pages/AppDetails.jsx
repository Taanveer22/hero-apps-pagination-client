import { BiDownload } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa6';
import { MdReviews } from 'react-icons/md';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import baseURL from '../api/apiLink';
import NotFound from '../ui/NotFound';
import ReviewChart from '../ui/ReviewChart';

const AppDetails = () => {
  const navigate = useNavigate();
  const appData = useLoaderData();
  // console.log(appData);
  if (!appData) {
    return <NotFound message={'App Is Not Found'}></NotFound>;
  }

  const { _id, ...detailsData } = appData || {};

  let finalRatings = [];

  if (Array.isArray(appData?.ratings)) {
    finalRatings = [...appData.ratings].reverse();
  }

  const handleInstall = (id) => {
    console.log(id);
    fetch(`${baseURL}/apps/install`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detailsData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.insertedId) {
          toast.success('app installed successfully');
        }
        navigate('/installations');
      });
  };

  return (
    <div className="w-11/12 mx-auto space-y-5 py-20">
      <title>{appData?.title || `404 - App Not Found`}</title>
      <div className="flex lg:flex-row flex-col gap-5 items-stretch">
        <div className="flex-1">
          <img src={appData?.image} className="rounded-xl shadow-2xl h-full" alt="" />
        </div>
        <div className="flex-2">
          <div className="space-y-3 border-b-2 pb-4 border-secondary">
            <h2 className="text-primary text-3xl font-bold">{appData?.title}</h2>
            <p>
              Developed by{' '}
              <span className="text-secondary font-medium">{appData?.companyName}</span>
            </p>
          </div>
          <div className="py-5 flex justify-between items-center">
            <div className="stats stats-horizontal">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <BiDownload size={48}></BiDownload>
                </div>
                <div className="stat-title">Downloads</div>
                <div className="stat-value">{appData?.downloads}</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaStar size={48}></FaStar>
                </div>
                <div className="stat-title">Avarage Ratings </div>
                <div className="stat-value">{appData?.ratingAvg}</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <MdReviews size={48}></MdReviews>
                </div>
                <div className="stat-title">Total Reviews</div>
                <div className="stat-value">{appData?.reviews}</div>
              </div>
            </div>
          </div>
          <div className="">
            {
              <button
                onClick={() => handleInstall(_id)}
                className="btn shadow-xl hover:shadow-2xl btn-xl disabled:opacity-80 bg-success btn-success text-white"
              >
                Install ( {appData?.size} MB)
              </button>
            }
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="">
        <h2 className="text-4xl font-bold text-primary mb-5">Ratings</h2>
        <div className="">
          <ReviewChart ratings={finalRatings}></ReviewChart>
        </div>
      </div>
      <div className="divider"></div>
      <div className="">
        <h2 className="text-4xl font-bold text-primary mb-5">Description</h2>
        <div className="text-justify space-y-3 opacity-60">
          {appData?.description?.split('\n').map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
