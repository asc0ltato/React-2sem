
import './App.css';
import React from 'react';



class Mailvalid extends React.Component
{
  
  constructor(props) 
  {
    super(props); 
    //this.props={changer:null}
    this.state={mail:"",valid:false}
    //this.mailenter=this.mailenter.bind(this)
  }

 
/*   mailenter(handler)
  {
    const valirex=/^.+?@.+?\..+?/
    //this.setState({block:true})
  } */

  render()
  {

   
    return(
        <div> Введите email 
        <input onChange={this.props.changer} pattern='^.+?@.+?\..+?'  type={"text"}></input>
        </div>
        )
  }
}
export default Mailvalid;