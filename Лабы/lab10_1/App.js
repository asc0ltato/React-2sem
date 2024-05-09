import logo from './logo.svg';
import './App.css';
import Phoneselect from "./phone.js"
import Mailvalid from "./mail.js"
import Passval from "./passval"
import React from 'react';
import PropTypes from 'prop-types';


class Form1 extends React.Component {
  constructor(props) 
  {
    super(props); 
    this.state={block:true,block2:true,valid:0}
    this.mailenter=this.mailenter.bind(this)
    this.passfix=this.passfix.bind(this)
  }
  
  mailenter(handler)
  {
    const valirex=/^.+?@.+?\..+?/
    this.setState(/* (prevState) => {
      return {
        block: valirex.test(handler.target.value)
        
      }
    } */{block2: !valirex.test(handler.target.value)})
  }
  passfix(handler)
  {
    let buff=0
    const elems = document.getElementsByClassName("pass")
    //alert(elems[0].value)
    if(elems[0].value==elems[1].value)
    {//let reg=/[0-9]+/
      //this.state.valid=true
      //this.state.block=false
      //this.setState({valid:1,block:false})
      
      if(/[0-9]/g.test(elems[0].value)){ buff++;console.log(buff);}
      
      if(elems[0].value.toUpperCase()!=elems[0].value ){buff++;console.log(buff)}
      if(elems[0].value.toLowerCase()!=elems[0].value ){buff++;console.log(buff)}
     
      //;alert(buff)
      this.setState({valid:buff,block:false})
    }
    else{this.setState({valid:0,block:true})}
  }


  render()
  {
    return (
      <form>
        <Phoneselect/>
        <Mailvalid changer={this.mailenter}></Mailvalid>
        <Passval changer={this.passfix} val={this.state.valid}></Passval>
        <PersData></PersData>
        <input type={"submit"} disabled={this.state.block||this.state.block2}></input>
        
      </form>  
    );

  }
}

class PersData extends React.Component {
  render()
  {
    return (
      <div>
        <input type={"text"} placeholder="Имя"></input>
        <input type={"text"} placeholder="Фамилия"></input>
        <input type={"text"} placeholder="Отчество"></input>
        <input type={"date"}></input>
        <label htmlFor='sex'>Пол</label>
        <span>муж
        <input type={"radio"} name={"sex"}/>
        жен
        <input type={"radio"} name={"sex"}/>
        </span>
      </div>
    );

  }
}




export default Form1;
