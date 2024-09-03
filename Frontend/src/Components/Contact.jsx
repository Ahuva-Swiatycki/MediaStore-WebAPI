import React from 'react'
import '../Css/contact.css';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
const Contact = () => {
  return (
    <>
      <div className="element11">פרטי התקשרות</div>
      <div className="element12">נשמח לעמוד לשירותכם</div>
      <div className="roow" >
        <div className="details" id="element13">         
          <EmailIcon />
          Email:
            <br />
            A0556772926@gmail.com 
            <br />
            <PhoneInTalkIcon />  
            Phone:
            <br />
            055-6772926
            <br />         
        </div>
        </div>
        <div className="map-container">  <iframe className="iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211.8853019110225!2d35.19760437739977!3d31.82050396402367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d727c239206f%3A0xd4fdf0c6bbabd69f!2sAhuva%20Multimedia!5e0!3m2!1siw!2sil!4v1679778503846!5m2!1siw!2sil" loading="eager" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      
      <br/>
    </>
    
  )
}

export default Contact