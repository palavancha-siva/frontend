import React from 'react';
import './documentFiles.css';

export const DocumentFiles = ({ files = [] }) => {
  return (
    <div className="document-files-list">
      {files.map((file, idx) => (
        <div key={idx} className="file-chip">
          <span className="file-icon">📎</span>
          <span className="file-name">{file.name || 'document.pdf'}</span>
          <span className="file-size">{file.size || '1.2 MB'}</span>
        </div>
      ))}
    </div>
  );
};

export default DocumentFiles;
