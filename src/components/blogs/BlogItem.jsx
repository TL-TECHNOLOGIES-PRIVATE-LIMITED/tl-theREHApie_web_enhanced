import React from "react";
import { Link } from "react-router-dom";

export const BlogItem = ({
  image,
  tag,
  title,
  description,
  userImage,
  author,
  date,
  id,
  excerpt
  // likes,
  // shares,
}) => {

  return (
    <article className="mb-60 p-3 border border-secondary rounded shadow-sm" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div className="td-postbox-thumb position-relative mb-3">
        <img className="w-100 rounded" src={image} alt="thumb" />
      </div>
      <div className="td-postbox-content">
        <h2 className="td-postbox-title mb-3">
          <Link to={`/blog-details/${id}`} className="text-decoration-none text-dark">
            {title}
          </Link>
        </h2>

        <div className="td-postbox-text mb-3">
          <p>{excerpt}</p>
        </div>

        <div className="td-postbox-meta d-flex justify-content-between align-items-center">
          <div className="td-postbox-user d-flex align-items-center">
  <a href="#" className="text-decoration-none text-muted d-flex align-items-center">
    <img 
      src="/favicon.png" 
      alt={author} 
      className="me-2 rounded-circle" 
      style={{ width: "24px", height: "24px", objectFit: "cover" }} 
    />
    By <span className="ms-1">{author}</span>
  </a>
</div>


          <div className="td-postbox-meta-here">
            <span className="text-muted">
              <i className="fa-light fa-calendar-days me-1"></i>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

        </div>
      </div>
    </article>
  );
};
