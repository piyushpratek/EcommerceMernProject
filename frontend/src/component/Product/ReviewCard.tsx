import { Rating } from '@mui/material';
import profilePng from "../../Images/Profile.png";
import { Review } from '../../store/slice/Products/productTypesRedux';

interface reviewCardProps {
  review: Review
}
const ReviewCard = ({ review }: reviewCardProps) => {
  const options = {
    value: review?.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review?.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review?.comment}</span>
    </div>
  );
};

export default ReviewCard;
