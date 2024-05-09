import logo from './logo.svg';
import './notes.css';
import React, { Component } from 'react';




class Notes extends React.Component {
  constructor(props) 
  {
    super(props); 
    this.state={notes:[],ins:null}
    this.addnote=this.addnote.bind(this)
    //this.clearall=this.clearall.bind(this)
    this.remove_elem=this.remove_elem.bind(this)
    this.removefirst=this.removefirst.bind(this)
    this.removelast=this.removelast.bind(this)
    this.changer=this.changer.bind(this)
  }
 
  componentDidMount(){
    let buff=new Array;
    buff=this.props.notes
    this.setState({notes:buff})
  } 

  changer(handler)
  {
    //console.log(7777)
    let buff = this.state.notes;
    delete buff[handler.target.value]
    buff[handler.target.value]=<NoteEx
    stater={this.changer} key={new Date().getTime().toString()}  index={handler.target.value}
      notedat={handler.target.getAttribute('data_s1')}
      head={handler.target.getAttribute('data_s2')}
      notemat={handler.target.getAttribute('data_s3')}
      remover={this.remove_elem}/>
    this.setState({notes:buff})
    this.props.update(this.state.notes)
     
    
  
  }

  remove_elem(handler)
  {
    let buff = this.state.notes;
    buff.splice(handler.target.value,1)
    this.setState({notes:buff})
    this.props.update(this.state.notes)
  }
  addnote(handler)
  {
    let buff =this.state.notes
    //buff = this.state.notes
  /// let  buffer=[this.dateel.value,this.headel.value,this.note_el.value]
  let func= ()=>{return this.props.update(this.state.notes)}
    let func2=()=>{return this.props.update(this.state.notes)}
    buff.push(<NoteEx 
      stater={this.changer} key={new Date().getTime().toString()} upto={func} index={this.state.notes.length}
      notedat={document.getElementsByName("note")[0].value}
      head={document.getElementsByName("head")[0].value}
      notemat={document.getElementsByName("notemat")[0].value}
      remover={this.remove_elem}
      />)

    this.setState({notes:buff})
   
    document.getElementsByName("note")[0].value=""
    document.getElementsByName("head")[0].value=""
    document.getElementsByName("notemat")[0].value=""

   
  }
  removelast()
  {
    let buff = this.state.notes;
    buff.splice(buff.length-1,1)
    this.setState({notes:buff})
    this.props.update(this.state.notes)
  }
  removefirst()
  { let buff = this.state.notes;
    if(buff.length)
    {
      buff.splice(0,1)
      this.setState({notes:buff})
    }
     this.props.update(this.state.notes)
  }

  render() {
    let buff=this.state.notes
    return (
      <div className="App">
        <label htmlFor='note'>Дата заголовка</label><input type={"date"} name={"note"} ref={(el) => this.dateel = el}/>
        <input type={"text"} name={"head"} placeholder={"заголовок"} ref={(el) => this.headel = el}/>
        <textarea name={"notemat"} placeholder='Заметка' ref={(el) => this.note_el = el}></textarea>
        <button onClick={this.addnote}>добавить</button>
        <button onClick={this.props.iremover}>удалить все</button>
        <button value={this.props.index} onClick={this.removelast}>удалить последний</button>
        <button value={this.props.index} onClick={this.removefirst}>удалить первый</button>
      
        {this.state.ins}

          <Buff key={new Date().getTime().toString()+"buff"} render={buff}/>
         
      </div>
    );
  }
}
class NoteEx extends React.Component {
  constructor(props) 
  {
    super(props)
    this.changer=this.changer.bind(this)
    this.props={}
    this.state={head:null,notedate:null,nmat:null}
  }
  componentDidMount()
  {
    this.setState({nmat:this.props.notemat,notedate:this.props.notedat,head:this.props.head})
  }
  changer(handler)
  {
    if(handler.target.type=="text")
    {console.log("66");this.setState({head:handler.target.value})}
    if(handler.target.type=="textarea")
    {this.setState({nmat:handler.target.value})}
    if(handler.target.type=="date")
    {console.log("66");this.setState({notedate:handler.target.value})}
  }
  render() {
    let overload = null
    let background ="yellow"
    if(this.props.index>7){
      overload="У вас слишком много заметок"
      background ="red"
    }
    return (
      <div className="App">
        <span>{overload}</span>
        <label htmlFor='notev'>Дата заголовка</label>
        <input  type={"date"} className="noter" onChange={this.changer}
        defaultValue={this.state.notedate}
        name={"notev"} /* disabled *//>
        <input onChange={this.changer} type={"text"}  className="noter" defaultValue={this.state.head} placeholder={"заголовок"} /* disabled *//>
        <textarea onChange={this.changer} placeholder='Заметка' style={{backgroundColor:background}} className="noter" defaultValue={this.state.nmat} /* disabled */></textarea>
        <button data_s1={this.state.notedate} data_s2={this.state.head} data_s3={this.state.nmat} value={this.props.index} onClick={this.props.stater}>изменить</button>
        <button value={this.props.index} onClick={this.props.remover}>удалить</button>
        
      </div>
    );
  }
}

class Buff extends React.Component {
  render() {
    return (
      this.props.render
    );
  }
}



export default Notes;
