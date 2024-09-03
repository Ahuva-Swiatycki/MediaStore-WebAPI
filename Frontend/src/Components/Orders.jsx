import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../reducers/productSlice';
import { getOrderByUserId } from '../service/OrderService';
import '../Css/orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const products = useSelector((state) => state.products.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const fetchedOrders = await getOrderByUserId(userId);
          console.log('Fetched Orders:', fetchedOrders); 
          if (Array.isArray(fetchedOrders)) {
            setOrders(fetchedOrders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
          setOrders([]);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log('Products:', products); 
  }, [products]);

  return (
    <div className="orders-page">
      <h1 className="page-title">ההזמנות שלי</h1>
      <div className="orders-container">
        {orders.length > 0 ? (
          orders.map(order => (
            <div className="order-card" key={order.orderId}>
              <div className="order-header">
                <div className="order-header-left">
                  <p>הזמנה #{order.orderId}</p>
                  <p>תאריך ביצוע ההזמנה: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="order-header-right">
                  <p>סטטוס: {order.paymentStatus}</p>
                  <p>סה"כ לתשלום: ₪{(order.totalAmount !== undefined && order.totalAmount !== null) ? order.totalAmount.toFixed(2) : 'לא צוין'}</p>
                </div>
              </div>
              <hr />
              <div className="order-details">
                <div className="products-list">
                  {order.orderItems.map((item, index) => {
                    const product = products.find(p => p.productId === item.productId);
                    return (
                      <div key={index} className="Oedersproduct-card">
                        {product ? (
                          <>
                            <img src={product.img} alt={product.productName} />
                            <div className="product-info">
                              <h4>{product.productName}</h4>
                              <p>₪{item.price.toFixed(2)} x {item.qty}</p>
                              <p>{item.font || 'לא צוין'} <b>|</b>  <span className="color-box" style={{ backgroundColor: item.color }}></span></p>
                               </div>
                              <div className="product-actions">
                                <button className="add-to-cart-button">הוסף לעגלה</button>
                                <button className="buy-now-button">קנה עכשיו</button>
                              </div>        
                          </>
                        ) : (
                          <p>המוצר לא נמצא</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>אין הזמנות להצגה</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
