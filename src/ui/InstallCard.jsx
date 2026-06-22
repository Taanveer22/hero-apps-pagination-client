import { FaStar } from 'react-icons/fa6';
import { GrDownload } from 'react-icons/gr';

const InstallCard = ({ appItem, handleUninstall }) => {
  if (!appItem) return null;
  const { image, title, _id, ratingAvg, downloads, size } = appItem;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm transition-all duration-200">
      {/* App Image */}
      <div className="w-14 h-14 shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-xl" />
      </div>

      {/* App Info */}
      <div className="flex-1">
        <p className="font-medium text-sm line-clamp-1">{title}</p>
        <div className="flex items-center gap-3 text-xs mt-1">
          <span className="flex items-center gap-1 text-success">
            <GrDownload className="inline-block" /> {downloads}
          </span>
          <span className="flex items-center gap-1 text-secondary">
            <FaStar className="inline-block" /> {ratingAvg}
          </span>
          <span className="text-xs text-gray-500">{size} MB</span>
        </div>
      </div>

      {/* Uninstall Button */}
      <button className="btn btn-success text-white" onClick={() => handleUninstall(_id)}>
        Uninstall
      </button>
    </div>
  );
};

export default InstallCard;
