import React from 'react';
import DOMPurify from 'dompurify';

const ProductDescription = ({ description }) => {
  // Sanitize the HTML content
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <div
    className="text-xs text-regal-footer-gray flex flex-col gap-4 product-details"
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
    />
  );
};

export default ProductDescription;