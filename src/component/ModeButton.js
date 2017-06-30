import React from 'react'

const ModeButton = (props) => {
    const buttonStyle =  {
      backgroundColor: props.mode ? "green" : "red",
  };
    return (
        <div>
            <button style={buttonStyle} onClick={() => props.onClick()}>
                { props.mode ? "easy" : "hard"}
            </button>
        </div>
    )
}

export default ModeButton