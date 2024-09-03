import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { updateUser, getUserDetails } from '../service/usersService';
import {createOrder} from '../service/OrderService';
import { setUserName } from '../reducers/userSlice';
import { useSelector, useDispatch } from "react-redux";
import '../Css/payment.css';

const steps = [
  'סקירת הזמנה',
  'פרטים אישיים',
  'מדיניות החברה',
  'פרטי אשראי',
];

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-label': {
    color: '#000',
  },
  '& .MuiStepLabel-active .MuiStepLabel-label': {
    color: '#ff4081',
  },
  '& .MuiStepLabel-completed .MuiStepLabel-label': {
    color: '#ff4081',
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff4081',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e040fb',
  },
}));

export default function Payment() {
  const [activeStep, setActiveStep] = useState(0);
  const [creditCard, setCreditCard] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];
  const productsInCartFromStore = useSelector((state) => state.cart.products) || [];
  const productsInCart = selectedProducts.length > 0 ? selectedProducts : productsInCartFromStore;
  
  const [productOptions, setProductOptions] = useState(
    productsInCart.map(product => ({
      productId: product.productId,
      qty: product.qty || '0',  
      price: product.price || '0',
      font: '',
      color: '',
    }))
  );
  
  
  
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreditCard({ ...creditCard, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleFontChange = (event, productId) => {
    const newFont = event.target.value;
    setProductOptions(prevOptions =>
      prevOptions.map(option =>
        option.productId === productId
          ? { ...option, font: newFont }
          : option
      )
    );
  };

  const handleColorChange = (event, productId) => {
    const newColor = event.target.value;
    setProductOptions(prevOptions =>
      prevOptions.map(option =>
        option.productId === productId
          ? { ...option, color: newColor }
          : option
      )
    );
  };

  const validate = () => {
    let validationErrors = {};
  
    if (!formData.userName.trim()) {
      validationErrors.userName = "UserName is required.";
    }
  
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email address is invalid.";
    }
  
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Phone Number is invalid. Must be 10 digits.";
    }
  
    setErrors(validationErrors);
  
    return Object.keys(validationErrors).length === 0;
  };

  const checkIfUserIsLoggedIn = () => {
    if (!userId) {
      navigate('/user/signin', { state: { initialTab: 'signup', returnUrl: '/payment' } });
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log("Current Step: ", activeStep);
    if (activeStep === 1 && !checkIfUserIsLoggedIn()) {
        return;
    }
  }, [activeStep]);
  
  const handleNext = async () => {
    if (activeStep === 0) {
        const allOptionsFilled = productOptions.every(option => option.font && option.color);
        if (!allOptionsFilled) {
            alert('עליך לבחור צבע ופונט לכל המוצרים לפני המעבר לשלב הבא.');
            return;
        }
    }

    if (activeStep === 1) {
        if (!userId) {
            alert('כדי לבצע הזמנה יש לבצע רישום לאתר.');
            navigate('/user/signin', { state: { initialTab: 'signup', returnUrl: '/payment' } });
            return;
        }

        if (!validate()) {
            if (activeStep < steps.length) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
            return;
        }
        try {
            const updatedUser = await updateUser(userId, formData);
            dispatch(setUserName(updatedUser.userName));
        } catch (error) {
            console.error('User update failed:', error);
        }
    }

    if (activeStep === 3) {
        try {
            const orderData = {
                userId,
                orderDate: new Date().toISOString(),
                paymentStatus: 'Pending',
                totalAmount: productOptions.reduce((total, option) => total + (option.price * option.qty * 1.5), 0),
                orderItems: productOptions.map(option => ({
                    productId: option.productId,
                    qty: option.qty,
                    price: option.price*1.5,
                    color: option.color,
                    font: option.font,
                })),
            };

            const createdOrder = await createOrder(orderData);

            if (createdOrder) {
                alert('ההזמנה בוצעה בהצלחה!');
                setActiveStep(steps.length);
                return;
            }
        } catch (error) {
            console.error('Order creation failed:', error);
            alert(`אירעה שגיאה בעת יצירת ההזמנה: ${error.message}. נסה שוב.`);
            return;
        }
    }

    if (activeStep < steps.length) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
};

  
  


  const fetchUserDetails = async () => {
    if (!userId) return;
    try {
      const userDetails = await getUserDetails(userId);
      setFormData({
        userName: userDetails.userName || '',
        email: userDetails.email || '',
        phoneNumber: userDetails.phoneNumber || '',
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const isCreditCardValid = () => {
    return (
      creditCard.cardNumber.length === 16 &&
      creditCard.cardHolderName.length > 0 &&
      creditCard.expirationDate.match(/^([0-2][1-9]|1[0-2])\/\d{2}$/) &&
      creditCard.cvv.length === 3
    );
  };

  const renderOrderSummary = () => {
    if (!Array.isArray(productsInCart) || productsInCart.length === 0) {
      return <Typography variant="body1">אין מוצרים בעגלה.</Typography>;
    }
  
    const totalAmount = productsInCart.reduce((total, product) => total + (product.price * product.qty), 0);

    return (
      <>
        <br />
        <div className='products'>
          <h3>סקירת הזמנה</h3>
          <div className='products-table'>
            <div className='table-header'>
              <div className='header-item'>תמונה</div>
              <div className='header-item'>שם מוצר</div>
              <div className='header-item'>כמות</div>
              <div className='header-item'>סה"כ</div>
              <div className='header-item'>פונט</div>
              <div className='header-item'>צבע</div>
            </div>
            {productsInCart.map((product) => (
              <div key={product.productId} className='table-row'>
                <div className='row-item'><img src={product.img} alt={product.productName} /></div>
                <div className='row-item'>{product.productName}</div>
                <div className='row-item'>{product.qty}</div>
                <div className='row-item'>₪ {product.price * product.qty *1.5}</div>
                <div className='row-item'>
                  <select
                    value={productOptions.find(option => option.productId === product.productId).font}
                    onChange={event => handleFontChange(event, product.productId)}
                    style={{ width: '150px' }}
                  >
                   <option value="">פונטים לבחירה</option>
          <option style={{ fontFamily: 'FbDinamika Bold' }}>אגץ - FbDinamika Bold</option>
          <option style={{ fontFamily: 'FbDinamika Regula' }}>אגץ - FbDinamika Regula</option>
          <option style={{ fontFamily: 'Gan CLM' }}>אגץ - Gan CLM</option>
          <option style={{ fontFamily: 'Arimo SemiBold' }}>אגץ - Arimo SemiBold</option>
          <option style={{ fontFamily: 'Gveret Levin AlefAlefAlef' }}>אגץ - Gveret Levin AlefAlefAlef</option>
          <option style={{ fontFamily: 'Carmelit Bold' }}>אגץ - Carmelit Bold</option>
          <option style={{ fontFamily: 'Courier New' }}>אגץ - Courier New</option>
          <option style={{ fontFamily: 'Dorian CLM' }}>אגץ - Dorian CLM</option>
          <option style={{ fontFamily: 'Rubik' }}>אגץ - Rubik</option>
          <option style={{ fontFamily: 'Trashim CLM' }}>אגץ - Trashim CLM</option>
          <option style={{ fontFamily: 'Yehuda CLM' }}>אגץ - Yehuda CLM</option>
          <option style={{ fontFamily: 'Dana Yad AlefAlefAlef Normal' }}>אגץ - Dana Yad AlefAlefAlef Normal</option>
          <option style={{ fontFamily: 'Miri' }}>אגץ - Miri</option>
          <option style={{ fontFamily: 'Stopmotion' }}>אגץ - Stopmotion</option>
          <option style={{ fontFamily: 'Paskol' }}>אגץ - Paskol</option>
          <option style={{ fontFamily: 'Horev CLM' }}>אגץ - Horev CLM</option>
          <option style={{ fontFamily: 'Amatica SC' }}>אגץ - Amatica SC</option>
          <option>אחר</option>
          <option>לקבלת כל הפונטים למייל</option>
                  </select>
                </div>
                <div className='row-item'>
                  <input
                    type="color"
                    value={productOptions.find(option => option.productId === product.productId).color}
                    onChange={event => handleColorChange(event, product.productId)}
                    placeholder="צבע לבחירה --"
                  />
                </div>
              </div>
            ))}
            <div className='table-row'>
              <div className='row-item' style={{ fontWeight: 'bold' }}>₪ {totalAmount*1.5}</div>
              <div className='row-item' colSpan="5" style={{ fontWeight: 'bold' }}>:סה"כ לתשלום</div>
            </div>
          </div>   
        </div>
        <br />   
        <CustomButton variant="contained" onClick={handleNext}>אישור ומעבר לשלב הבא</CustomButton>
      </>
    );
  };

  const renderPersonalDetailsForm = () => (
    <>
      <br />
      <div>
        <h3>פרטים אישיים</h3>
        <TextField 
          label="UserName"
          fullWidth 
          name="userName" 
          value={formData.userName}
          onChange={handleInputChange}
        />   
        <TextField 
          label="Email" 
          fullWidth 
          name="email" 
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField 
          label="Phone Number" 
          fullWidth 
          name="phoneNumber" 
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <CustomButton variant="contained" onClick={handleNext}>אישור ומעבר לשלב הבא</CustomButton>
    </>
  );

  const renderCompanyPolicy = () => (
    <>
      <Typography variant="body1" style={{ textAlign: 'right' }}>
        :מדיניות החברה <br />
        משלמים לפי 150 ₪ לדקה *<br />
        יש להביא את כל החומר ביום אחד ולוודא שקיבלתי הכל *<br />
        *לכל אחד מאיתנו טעם שונה ואחר אני מנסה להגיע כמה שיותר 
        לטעם של הלקוח אך בכל אופן גם לי יש טעם ולכן יש להסביר
        היטב מראש איזה סגנון רוצים! כדי שלא יהיה בעיות אח"כ של חוסר הבנה <br />
        בקליפ/מצגת ישנם עד 2 תיקונים! (למעט שגיאות כתיב/טעויות
        הקלדה) עד שעה לאחר קבלת הקליפ/המצגת<br />
        משעה ואילך עד אישור- תיקון אחד בלבד *<br />
        לא מקבלים את הקליפ לפני שהכסף אצלי בחשבון *<br />
        מהרגע בו נשלח את המצגת והתקבל אישור על כך- אין תיקונים  *<br />
        <div>
          <textarea id="subject" name="subject" placeholder=" לא חובה -- תאור הקליפ / המצגת " style={{ height: '50px', width: '100%', direction: 'rtl' }}></textarea>
        </div>
        כל חריגה מהנ"ל עלולה לגרום לעצירה בעבודה וחיוב מחיר מלא<br/>
        קראתי בעיון ואני מאשר/ת את הכתוב לעיל 

        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <br />
      </Typography>
      <CustomButton variant="contained" onClick={handleNext} disabled={!isChecked}>אישור ומעבר לתשלום</CustomButton>
    </>
  );

  const renderCreditCardForm = () => (
    <>
      <br />
      <TextField id="cardNumber" name="cardNumber" label="מספר כרטיס אשראי" fullWidth onChange={handleInputChange} />
      <TextField id="cardHolderName" name="cardHolderName" label="שם בעל הכרטיס" fullWidth onChange={handleInputChange} />
      <TextField id="expirationDate" name="expirationDate" label="תוקף (MM/YY)" fullWidth onChange={handleInputChange} />
      <TextField id="cvv" name="cvv" label="CVV" fullWidth onChange={handleInputChange} />
      <br /><br /><br />
      <CustomButton variant="contained" onClick={handleNext} disabled={!isCreditCardValid()}>אישור ההזמנה והתשלום</CustomButton>
    </>
  );

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return renderOrderSummary();
      case 1:
        return renderPersonalDetailsForm();
      case 2:
        return renderCompanyPolicy();
      case 3:
        return renderCreditCardForm();
      default:
        return 'שלב לא ידוע';
    }
  };

  return (
    <Box className="Payment">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep}>
            <CustomStepLabel>{label}</CustomStepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ marginTop: '30px' }}>
  {activeStep === steps.length ? (
    <Typography variant="h5">
      <b>!איזה כיף 
      <br />
      הזמנתך התקבלה
      <br />
      ואנחנו כבר מתחילים לטפל בה</b>
      <br />
      <p style={{fontSize: 17}} >
      נשלח בקרוב מייל עם פרטי ההזמנה
      <br />
      ואחד מנציגנו יצור עימך קשר
      <br /></p>
      <br />
      <CustomButton variant="contained" onClick={() => navigate('/')}>חזרה לדף הבית</CustomButton>
      <CustomButton variant="contained" onClick={() => navigate('/user/orders')}>לדף ההזמנות שלי</CustomButton>
      <br /><br /><br />
      <p style={{fontSize: 17, textAlign:'center'}}>תודה שבחרת בנו להפוך לך רגעים לזכרונות</p>
    </Typography>
  ) : (
    getStepContent(activeStep)
  )}
</Box>

    </Box>
  );
}
