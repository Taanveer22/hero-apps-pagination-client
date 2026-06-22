import { useEffect, useState } from 'react';
import { DiVisualstudio } from 'react-icons/di';
import baseURL from '../api/apiLink';
import AppCard from '../ui/AppCard';

const AllAppsPage = () => {
  const [appsData, setAppsData] = useState([]);
  const [totalApps, setTotalApps] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState('size');
  const [sortOrder, setSortOrder] = useState('asc');
  const [search, setSearch] = useState('');

  const pageLimit = 10;
  const paginationArrayKeys = [...Array(totalPages).keys()];

  useEffect(() => {
    fetch(
      `${baseURL}/apps?limit=${pageLimit}&skip=${currentPage * pageLimit}&sortField=${sortField}&sortOrder=${sortOrder}&search=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setAppsData(data?.apps);
        setTotalApps(data?.count);
        const requiredPages = Math.ceil(data?.count / pageLimit);
        setTotalPages(requiredPages);
      });
  }, [currentPage, sortField, sortOrder, search]);

  const handleSortChange = (e) => {
    // console.log(e.target.value);
    const sortBy = e.target.value;
    setSortField(sortBy.split('-')[0]);
    setSortOrder(sortBy.split('-')[1]);
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div>
      <title>All Apps | Hero Apps</title>
      {/* Header */}
      <div className="py-16">
        <h2 className="text-4xl font-bold text-center text-primary flex justify-center gap-3">
          All Applications {totalApps}
          <DiVisualstudio size={48} className="text-secondary"></DiVisualstudio>
        </h2>
        <p className="text-center text-gray-400">
          Explore All Apps on the Market developed by us. We code for Millions
        </p>
      </div>
      {/* Search and Count */}
      <div className="w-11/12 mx-auto flex flex-col-reverse lg:flex-row gap-5 items-start justify-between lg:items-end mt-10">
        <div>
          <h2 className="text-lg underline font-bold">({appsData.length}) Apps Found</h2>
        </div>

        <form>
          <label className="input max-w-[300px] w-[300px] input-secondary">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={handleSearchChange}
              type="search"
              className=""
              placeholder="Search Apps"
            />
          </label>
        </form>

        <div>
          <select
            onChange={handleSortChange}
            className="select bg-white"
            defaultValue={'Sort by R / S / D'}
          >
            <option value={'Sort by R / S / D'} disabled={true}>
              Sort by R / S / D
            </option>
            <option value={'rating-desc'}>Ratings : High - Low</option>
            <option value={'rating-asc'}>Ratings : Low - High</option>
            <option value={'size-desc'}>Size : High - Low</option>
            <option value={'size-asc'}>Size : Low - High</option>
            <option value={'downloads-desc'}>Downloads : High - Low</option>
            <option value={'downloads-asc'}>Downloads : Low - High</option>
          </select>
        </div>
      </div>
      {/* Loading State */}
      <>
        {/* Apps Grid */}
        <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-10 gap-5">
          {appsData.length === 0 ? (
            <div className="col-span-full text-center py-10 space-y-10">
              <h2 className="text-6xl font-semibold opacity-60">No Apps Found</h2>
              <button className="btn btn-primary">Show All Apps</button>
            </div>
          ) : (
            appsData.map((appItem) => <AppCard key={appItem.id} appItem={appItem}></AppCard>)
          )}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {currentPage > 0 && (
            <button onClick={() => setCurrentPage(currentPage - 1)} className="btn">
              Prev
            </button>
          )}
          {paginationArrayKeys.map((index) => (
            <button
              onClick={() => setCurrentPage(index)}
              key={index}
              className={`btn ${index === currentPage && 'btn-primary'}`}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages - 1 && (
            <button onClick={() => setCurrentPage(currentPage + 1)} className="btn">
              Next
            </button>
          )}
        </div>
      </>
    </div>
  );
};

export default AllAppsPage;
