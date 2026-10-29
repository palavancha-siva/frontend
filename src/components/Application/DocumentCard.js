import React from 'react';
import './DocumentCard.css';

export const DocumentCard = ({ title, description, status = 'PENDING', onUpload }) => {
  const getBadge = () => {
    switch (status) {
      case 'VERIFIED':
        return <span className="doc-badge doc-badge-success">Verified</span>;
      case 'UNDER_REVIEW':
        return <span className="doc-badge doc-badge-warning">Under Review</span>;
      case 'REJECTED':
        return <span className="doc-badge doc-badge-danger">Re-upload Required</span>;
      default:
        return <span className="doc-badge doc-badge-neutral">Pending Upload</span>;
    }
  };

  return (
    <div className="document-card">
      <div className="doc-card-info">
        <div className="doc-icon">📄</div>
        <div>
          <h5 className="doc-title">{title}</h5>
          <p className="doc-desc">{description}</p>
        </div>
      </div>

      <div className="doc-card-action">
        {getBadge()}
        <label className="upload-doc-btn">
          Upload
          <input
            type="file"
            onChange={(e) => onUpload && onUpload(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
};

export default DocumentCard;
