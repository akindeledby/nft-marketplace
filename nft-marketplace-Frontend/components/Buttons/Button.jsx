import React from 'react'
import Style from './Button.module.css'

{/*In the button function we are going to receive two props; 
1. the name of the button and 2. the function  we will then pass it into the buttons in the SideBar and Navbar components */}

const Button = ({ btnName, handleClick }) => {
  return (
    <div className={Style.box}>
      <button className={Style.button} onClick={() => handleClick()}>
      {btnName}
      </button>
    </div>
  );
};

export default Button
