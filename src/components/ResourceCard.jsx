import './ResourceCard.css';

function ResourceCard({ title, description, link, image, category }) {
  return (
    <div className="resource-card">
      <img src={image} alt={`${title} thumbnail`} className="resource-image" />
      <div className="resource-content">
        <h2>{title}</h2>
        <p className="category">{category}</p>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="view-button">Learn More</a>
      </div>
    </div>
  );
}

export default ResourceCard;
