
import './App.css';
import React from 'react';
import PropTypes from 'prop-types';


class Passval extends React.Component
{
  
  constructor(props) 
  {
    super(props); 
    this.state={pass1:"",pass2:"",valid:true,diff:0}
    //this.mailenter=this.mailenter.bind(this)
  }

 
 
  render()
  {
   
    let errorp=null
    if(!this.props.val){errorp="Пароли отличаются"}

    return(
        <div className='passwal'> Введите пароль 
        <input onChange={this.props.changer} className="pass" type={"password"}></input>
        <input onChange={this.props.changer} className="pass" type={"password"}></input>
        <span>{errorp}</span>
        <ProgressBar progress={this.props.val}></ProgressBar>
        </div>
        )
  }
}

Passval.propTypes={changer:PropTypes.string,val:PropTypes.number}

class ProgressBar extends React.Component
{
  
  constructor(props) 
  {
    super(props); 
    //this.state={pass1:"",pass2:"",valid:true,diff:0}
    //this.mailenter=this.mailenter.bind(this)
  }


  render()
  {
   
    return(
        <progress value={0.333*this.props.progress}></progress>
        )
  }
}

Passval.propTypes={progress:PropTypes.number}

export default Passval;