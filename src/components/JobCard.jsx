import styles from "./JobCard.module.css";
import PropTypes from "prop-types";

function JobCard({ title, company, imageSrc, onInterview, onDetails }) {
  return (
    <div className={styles.jobCard}>
      <img src={imageSrc} alt={title} />
      <h3>{title}</h3>
      <p>{company}</p>
      <div className={styles.btnContainer}>
        <button onClick={onDetails}>Details</button>
        <button onClick={onInterview}>Interview</button>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  onInterview: PropTypes.func.isRequired,
  onDetails: PropTypes.func.isRequired,
};

export default JobCard;
