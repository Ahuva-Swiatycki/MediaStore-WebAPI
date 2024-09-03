import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../service/productService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';
import '../Css/product.css';
import Alert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Product = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [am, setAm] = useState(1);
  const [price, setPrice] = useState("0");
  const [newPrice, setNewPrice] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const fetchData = async () => {
    try {
      const productsList = await getProducts();
      const foundProduct = productsList.find(p => p.productId === productId); 
      if (foundProduct) {
        setProduct(foundProduct);
        setPrice(foundProduct.price); 
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const QuantityButton = ({ handlePlus, handleMinus }) => (
    <div className="quantity-buttons">
      <button className="quantity-button" onClick={handleMinus}>-</button>
      <span className="quantity">{am}</span>
      <button className="quantity-button" onClick={handlePlus}>+</button>
    </div>
  );

  const handlePlus = () => {
    setAm(prevAm => prevAm + 1);
  };

  const handleMinus = () => {
    setAm(prevAm => (prevAm - 1 >= 1 ? prevAm - 1 : 1));
  };

  const handlePrice = () => {
    if (newPrice.length >= 3) {
      setPrice(newPrice);
      setIsButtonDisabled(false);
      setShowAlert(false);
    } else {
      setIsButtonDisabled(true);
      setShowAlert(true);
    }
  };

  const addToCartHandler = async () => {
    if (product) {
      try {
        await dispatch(addToCart({ ...product, qty: am, price: price }));
        setShowPopup(true);
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [productId]); 

  return (
    <div className='product'>
      {product && (
      <>
        <div className='product1'>
          <br /><br />
          <div>
            <h2 style={{textAlign: 'center'}}>{product.productName}</h2> 
            <marquee direction="rtl">
              <hr />
            </marquee>
          </div>
          <div>
            <p style={{fontSize: 15}}><b style={{fontSize: 25}}> ₪ {(price * 1.5 * am)}</b></p>
          </div>
          <br />
          <div className='quantity-button1'>
            <QuantityButton style={{textAlign: 'right'}} count={1} handlePlus={handlePlus} handleMinus={handleMinus} />
          </div>
          <br /> <br /> <br />
          <div>
            <input style={{width: 100}} value={newPrice} type="text" placeholder="Input minutes*" onChange={e => setNewPrice(e.target.value)} />
            <button onClick={handlePrice}>Update Price</button>
            {showAlert && (
              <Alert severity="error" className="alert">מספר הדקות והשניות צריך להיות לפחות 3 ספרות</Alert>
            )}
          </div>
          <br /><br /><br /><br />
          <div style={{textAlign: 'center'}}>
            <IconButton color="black" aria-label="back to all Products" onClick={() => navigate('../')} style={{ fontSize: 50 }}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <IconButton color="black" aria-label="add to shopping cart" onClick={addToCartHandler} disabled={isButtonDisabled}>
              <AddShoppingCartIcon />
            </IconButton>
          </div>
          <br /><br />
          <div>המחיר הינו 150 ש"ח לדקת עריכה*</div>
          <div>כדי לעדכן מחיר ולהוסיף לסל <br />יש להכניס מספר דקות ושניות <br />לגודמא: 3 דקות ו58 שניות נכתוב 358</div>
          {showPopup && (
            <div className="popup">
              <Alert severity="success">
                <p>{`${product.productName} נוסף בהצלחה`}</p>
                <div className="popup-buttons">
                  <button onClick={() => navigate('/cart')}>לעגלה</button>
                  <button onClick={() => navigate('/Products')}>המשך בקניות</button>
                </div>
              </Alert>
            </div>
          )}
        </div>
        <div className='product2'>
          <hr />
        </div>
        <div className='product3'>
          <img className='product-image' src={product.img} alt={product.productName} /> 
        </div>
      </>
      )}
    </div>
  );
};

export default Product;
