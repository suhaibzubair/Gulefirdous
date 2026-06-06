import React from 'react';
import './ProductDashboard.scss'; 
import ProductThumbnail from '../../../assets/images/courseProduct.svg'

export interface ProductCard {
  heading: string;
  text: string;
  imgSrc: string;
}

interface ProductDashboardProps {
  products: ProductCard[];
}


const ProductDashboard: React.FC<ProductDashboardProps> = ({ products }) => {
  return (
    <div className="product-dashboard-wrapper">
      {products.map((product, index) => (
        <div className="product-card" key={index}>
          <div className="card-content">
            <h3 className="card-heading">{product.heading}</h3>
            <p className="card-text">{product.text}</p>
          </div>
          <img className="card-img" src={ProductThumbnail} alt={`Product ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ProductDashboard;
