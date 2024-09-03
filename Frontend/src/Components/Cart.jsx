import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectItemsCart, removeFromCart, updateQuantity } from '../reducers/cartSlice';
import '../Css/cart.css';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import SignInSignUp from './SignInSignUp'; 

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const productsInCart = useSelector(selectItemsCart);
    const [tpayment, setTpayment] = useState("0");
    const [sPopup, setSPopup] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showSignInSignUp, setShowSignInSignUp] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleTpayment = () => {
        let totalPayment = 0;
        selectedProducts.forEach((product) => {
            totalPayment += product.price * 1.5 * product.qty;
        });
        setTpayment(totalPayment.toFixed(2));
    };

    useEffect(() => {
        handleTpayment();
    }, [selectedProducts]);

    useEffect(() => {
        setSelectedProducts(productsInCart);
    }, [productsInCart]);

    const toggleProductSelection = (productId) => {
        setSelectedProducts((prevSelected) => {
            const isSelected = prevSelected.some((product) => product.productId === productId);
            if (isSelected) {
                return prevSelected.filter((product) => product.productId !== productId);
            } else {
                const product = productsInCart.find((product) => product.productId === productId);
                return [...prevSelected, product];
            }
        });
    };

    const handleSignInPopup = () => {
        const confirm = window.confirm("To proceed with the order, you need to register or log in. Do you want to do that now?");
        if (confirm) {
            setShowSignInSignUp(true);
        }
    };

    const goToPayment = () => {
        if (isLoggedIn) {
            if (selectedProducts.length > 0) {
                setSPopup(true);
            } else {
                alert('Please select at least one product to proceed.');
            }
        } else {
            handleSignInPopup();
        }
    };

    const handleSignInSuccess = () => {
        setShowSignInSignUp(false);
        setIsLoggedIn(true); 
    };

    const deleteProductFromCart = (productId) => {
        dispatch(removeFromCart(productId));
        setSelectedProducts(selectedProducts.filter((product) => product.productId !== productId));
        handleTpayment();
    };

    const updateProductQuantity = (productId, newQty) => {
        dispatch(updateQuantity({ productId, qty: newQty }));
        setSelectedProducts((prevSelected) =>
            prevSelected.map((product) =>
                product.productId === productId ? { ...product, qty: newQty } : product
            )
        );
        handleTpayment();
    };

    const QuantityButton = ({ count, handlePlus, handleMinus }) => (
        <div className="quantity-buttons">
            <button className="quantity-button" onClick={handleMinus}>-</button>
            <span className="quantity">{count}</span>
            <button className="quantity-button" onClick={handlePlus}>+</button>
        </div>
    );

    return (
        <div className='bodbb'>
            <div className='cart-container'>
                <div className="cart-right-side">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <h1 className='cart-item' style={{ textAlign: 'center', justifyContent: 'center', height: 60 }}>Products in Cart</h1>
                            {productsInCart.map((product) => (
                                <div className="cart-item" key={product.productId}>
                                    <Checkbox
                                        checked={selectedProducts.some((p) => p.productId === product.productId)}
                                        onChange={() => toggleProductSelection(product.productId)}
                                        sx={{
                                            color: pink[500],
                                            '&.Mui-checked': {
                                                color: pink[500],
                                            },
                                        }}
                                    />
                                    <div>
                                        <img src={product.img} alt={product.productName} />
                                        <h3>{product.productName}</h3>
                                    </div>
                                    <div className='price-qty'>
                                        <div>
                                            <p style={{ fontSize: 15 }}>
                                                <b style={{ fontSize: 25 }}> ₪ {product.price * 1.5 * product.qty}</b>
                                            </p>
                                        </div>
                                        <div className='quantity-button2'>
                                            <QuantityButton
                                                count={product.qty}
                                                handlePlus={() => updateProductQuantity(product.productId, product.qty + 1)}
                                                handleMinus={() => updateProductQuantity(product.productId, Math.max(1, product.qty - 1))}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteProductFromCart(product.productId)}
                                        style={{ color: 'black', borderColor: 'black' }}
                                    >
                                        <div className="cart-item-actions">
                                            <span>Delete</span>
                                        </div>
                                    </Button>
                                </div>
                            ))}
                            <br /><br /><br /><br />
                        </>
                    )}
                </div>
                <div className="cart-left-side">
                    <div className='cart-item-left1'>
                        <p style={{ marginTop: 50 }}>Total payment:</p>
                        <b className='ToPay'>₪{tpayment}</b>
                        {selectedProducts.length > 0 && (
                            <>
                                <button
                                    className='cart-item-left02'
                                    style={{ width: 280, height: 40, marginBottom: 8, marginTop: 30, backgroundColor: 'black', color: 'white' }}
                                    onClick={goToPayment}
                                >
                                    Go to payment
                                </button>

                                {sPopup && (
                                    <Alert severity="success" className="popup">
                                        <p>{"Are you sure you want to proceed to payment?"}</p>
                                        <div className="popup-buttons">
                                            <button onClick={() => navigate('../Payment', { state: { selectedProducts } })}>Continue to Payment</button>
                                            <button onClick={() => setSPopup(false)}>Back to Cart</button>
                                        </div>
                                    </Alert>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        <h1>
                            <button className='cart-item-left2' style={{ height: 60 }} onClick={() => navigate('../Products')}>Continue shopping</button>
                        </h1>
                    </div>
                </div>
            </div>
            {showSignInSignUp && (
                <SignInSignUp
                    onClose={() => setShowSignInSignUp(false)}
                    onSignIn={handleSignInSuccess}
                />
            )}
        </div>
    );
};

export default Cart;
