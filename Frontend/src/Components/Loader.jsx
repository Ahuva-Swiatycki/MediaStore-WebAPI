import React from 'react';
import '../Css/loader.css';

const Loader = () => {
  console.log('Loader component rendered');
  return (
    <img src={process.env.PUBLIC_URL + '/assets/img/Loading.gif'} alt="Loading..." style={{border: '2px solid red'}} />
  );
};

export default Loader;
