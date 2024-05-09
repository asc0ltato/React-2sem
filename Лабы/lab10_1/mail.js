
import './App.css';
import React from 'react';
import PropTypes from 'prop-types';



class Mailvalid extends React.Component
{
  
  constructor(props) 
  {
    super(props); 
    this.props={changer:null}
    this.state={mail:"",valid:false}
    //this.mailenter=this.mailenter.bind(this)
  }

 
/*   mailenter(handler)
  {
    const valirex=/^.+?@.+?\..+?/
    //this.setState({block:true})
  } */
  //static defaultProps={changer:"PropTypes.string"}
  render()
  {

   
    return(
        <div> Введите email 
        <input onChange={this.props.changer} pattern='^.+?@.+?\..+?'  type={"text"}/>
        </div>
        )
  }

}


Mailvalid.propTypes={changer:PropTypes.func}

export default Mailvalid;