import React from 'react';
import DocumentCard from '../Application/DocumentCard';
import './MyDocuments.css';

export const getDocumentStatusLabel = (status) => {
  switch (status) {
    case 'VERIFIED':
      return 'Verified';
    case 'PENDING':
      return 'Pending Review';
    case 'REJECTED':
      return 'Rejected';
    default:
      return 'Not Uploaded';
  }
};

export const isDocumentExpiring = (expiryDateStr) => {
  if (!expiryDateStr) return false;
  const expiry = new Date(expiryDateStr);
  const now = new Date();
  const diffDays = (expiry - now) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 30;
};

export const MyDocuments = () => {
  const documents = [
    { title: 'PAN Card Copy', desc: 'Permanent Account Number verification', status: 'VERIFIED' },
    { title: 'Aadhaar Card', desc: 'Identity & Address Proof', status: 'VERIFIED' },
    { title: 'Salary Slip - Sep 2026', desc: 'Net in-hand pay: ₹85,000', status: 'VERIFIED' },
    { title: 'Salary Slip - Aug 2026', desc: 'Net in-hand pay: ₹85,000', status: 'VERIFIED' },
    { title: 'Salary Slip - Jul 2026', desc: 'Net in-hand pay: ₹85,000', status: 'VERIFIED' },
    { title: 'Bank Statement (6 Months)', desc: 'HDFC Bank primary salary account', status: 'PENDING' },
  ];

  return (
    <div className="my-documents-section">
      <div className="my-docs-header">
        <h4>Stored Digital KYC & Income Proofs</h4>
        <p>Encrypted using 256-bit bank grade security</p>
      </div>

      <div className="docs-list">
        {documents.map((doc, idx) => (
          <DocumentCard
            key={idx}
            title={doc.title}
            description={doc.desc}
            status={doc.status}
          />
        ))}
      </div>
    </div>
  );
};

export default MyDocuments;
