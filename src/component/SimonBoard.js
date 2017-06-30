/**
 * Created by matthias on 07/06/17.
 */
import React from 'react'
import SimonButton from './SimonButton'
import StartButton from './StartButton'
import SimonInfo from './SimonInfo'
import ModeButton from './ModeButton'

class SimonBoard extends React.Component{
 
    constructor(){
        super();
        this.j = 0;
        this.info = "";
         this.passiveColor = ["red", "yellow", "green", "blue"];
         this.activeColor = ["#e6634c", "#ffe975", "#92fb8d", "#69dfff"];
         this.sound = [
            "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
            "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
            "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
            "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
        ]
        this.lose = false;
        this.state = {
            start: false,
          playerTurn: false,
          buttonColor: [this.passiveColor[0], this.passiveColor[1], this.passiveColor[2], this.passiveColor[3]],
          sequence: [],
          modeHard: false,
        }
    }
    onClickModeButton(){
        this.setState({modeHard:!this.state.modeHard} )
    }
    play(i){
        const audio = new Audio(this.sound[i]);
      let color = this.state.buttonColor.slice();
      console.log(this.activeColor[i])
      color[i] = this.activeColor[i];
      console.log(color);
      this.setState({buttonColor: color});
      
      audio.play();
      setTimeout(() => {
          if(!this.lose){
            color = this.state.buttonColor.slice();
            color[i] = this.passiveColor[i];
            this.setState({buttonColor: color});
          }
          
      }, 800); 
    }
    playSequence(){
        this.setState({playerTurn:false})
        this.play(this.state.sequence[this.j]);
        if(this.j < this.state.sequence.length){
            this.j++;
            setTimeout(() => {this.playSequence()}, 1000)
        }
        else{
            this.j = 0;
            this.setState({playerTurn:true})
            return;
        }
    }
    playAndAddToSequence(){
        let sequence = this.state.sequence;
        const next = Math.floor(Math.random() * 3);
        sequence.push(next);
        this.setState({sequence: sequence});
        this.playSequence();    
    }
    renderButton(i) {
      return(
        <SimonButton buttonColor={this.state.buttonColor[i]} onClick={() => this.handleClick(i)}/>
      )
    }
    verifieClick(i){
        if(i === this.state.sequence[this.j]){
            this.j++;
        }
        else{
            this.j = 0;
            //this.lose = true;
            this.setState({buttonColor: ["black", "black", "black", "black"]});
            setTimeout(() => {this.onLose()}, 1000);
        }
        if(this.j === this.state.sequence.length ){
            this.j = 0;
            this.setState({playerTurn: false});
            setTimeout(() => {if(!this.lose){this.playAndAddToSequence()}}, 1000);
        }
        
    }
    handleClick(i){
        if(this.state.sequence.length >= 5){
            this.info = "Win!"
            return;
        }
        if(this.state.start && !this.lose){
            if(this.state.playerTurn){
                this.play(i);
                this.verifieClick(i);
            }
        }
    }
    onLose(){
        if(!this.state.modeHard){
            this.setState({buttonColor: this.passiveColor});
            this.playSequence();
        }
        else{
            this.setState({sequence: []});
        }
    }
    handleClickStart(){
        if(!this.state.start){
            this.setState({start: true});
            this.playAndAddToSequence();
        }    
    }
    render(){
        return(
            <div>
                <div>
                    <StartButton onClick={() => this.handleClickStart()}/>
                </div>
                <SimonInfo score={this.state.sequence.length} info={this.info}/>
                <div>
                    {this.renderButton(0)}
                    {this.renderButton(1)}
                </div>
                <div>
                    {this.renderButton(2)}
                    {this.renderButton(3)}
                </div>
                <ModeButton 
                mode={this.state.modeHard} 
                onClick={() => this.onClickModeButton()}
                />
            </div>

        )
    }
}

export default SimonBoard
