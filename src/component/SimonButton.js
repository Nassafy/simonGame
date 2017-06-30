/**
 * Created by matthias on 31/05/17.
 */
import React from 'react';
const SimonButton = (props) =>{
  const buttonStyle =  {
      width: '25px',
      height: '25px',
      borderRadius: '5px',
      backgroundColor: props.buttonColor
  };
  return (
      <button style={buttonStyle} onClick={() => props.onClick()}/>
  );
}

export default SimonButton
