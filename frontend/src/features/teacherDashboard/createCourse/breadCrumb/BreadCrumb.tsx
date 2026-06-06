// Breadcrumb.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbProps } from './BreadCrumb.d';
import './BreadCrumb.scss';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="breadcrumb-wraper">
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {index < items.length - 1 ? (
            <Link to={`/${item.toLowerCase()}`}>{item}</Link>
          ) : (
            item
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator"> / </span>}
        </span>
      ))}
    </div>
    </div>
  );
};

export default Breadcrumb;
