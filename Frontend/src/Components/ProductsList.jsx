import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducers/productSlice';
import '../Css/productL.css';
import Loader from './Loader';

const ProductsList = () => {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products.list);
  const status = useSelector(state => state.products.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (productsList.length > 0) {
      let imagesLoaded = 0;

      productsList.forEach((product) => {
        const img = new Image();
        img.src = product.img;
        img.onload = () => {
          imagesLoaded += 1;
          if (imagesLoaded === productsList.length) {
            setLoading(false); 
          }
        };
      });
    }
  }, [productsList]);

  if (status === 'loading' || loading) {
    return <Loader />;
  }

  return (
    <div className="products-list-container">
      {productsList.length === 0 ? (
        <p>No products available</p>
      ) : (
        productsList.map((product) => (
          <Link key={product.productId} to={`/Products/${product.productId}`} className="product-link">
            <div className="product-card">
              <img src={product.img} alt={product.productName} />
              <p>{product.productName}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProductsList;
