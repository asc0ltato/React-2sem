import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

var phonesList=[
{code1:/(\+375|80)(29[1,3,6,9])|44/,code2:/\+37544/,name:"A1"},
{code1:/(\+375|80)(29[2,5,7,8])|33/,code2:/\+37533/,name:"MTS"},
{code1:/(\+375|80)(25)/,code2:/\+37525/,name:"Life"},
{code1:/(\+375|80)(17)/,code2:/\+37517/,name:"Белтелеком(городской)"}
]

class StudentInfo extends React.Component {
  
  render() {//onChange={}
    return (

      <form className="App">

        <input onChange={this.props.func}  type={"text"} className="stud" placeholder={"Фамилия"} />
        <input onChange={this.props.func} type={"text"} className="stud" placeholder={"Имя"} />
        <input onChange={this.props.func} type={"text"} className="stud" placeholder={"Отчество"} />
        <label htmlFor='birth'>Дата рождения</label><input onChange={this.props.func} className="stud" type={"date"} name={"birth"} />
        <label htmlFor='unidat'>Дата поступления</label><input onChange={this.props.func} className="stud" type={"date"} name={"unidat"} />
        
        <input onChange={this.props.func} type={"text"} className="stud" placeholder={"Факультет"} />
        <input onChange={this.props.func} type={"text"} className="stud" placeholder={"группа"} />
        
        <input onChange={this.props.func} type={"text"} className="stud" placeholder={"специальность"} />
        <input onChange={this.props.func} type={"text"} className="stud" placeholder={"email"}/>
        <input onChange={this.props.func} type={"text"} className="stud" id={"phone"} placeholder={"Телефон"} />

      </form>
    );
  }
}

class StudentInfoHandler extends React.Component {
  
  
  render() {
    let prov=""
    let numb=this.props.vals[9]
    if(this.props.vals[9])
    {
      for(let phone of phonesList)
      {
      if(phone.code1.test(numb)){prov=phone.name}
      }
    }
    
    for(let index=0;index<this.props.vals.length;index++)
    {
      if(this.props.vals[index]==undefined){this.props.vals[index]=""}
    }

    const valirex=/.+?@(.+?\..+?)/
    let domain = " "
    domain = this.props.vals[8]
    let repl=domain
    if(this.props.vals[8] && valirex.test(domain)){
    repl=repl.replace(valirex,"$1")
    console.log(this.props.vals[8])
        }
    else{repl=""}
    console.log(repl)
    let age
    let dat =new Date()
    let date2 =new Date()
    let unidate=new Date(Date.parse(this.props.vals[4]))
    date2=new Date(Date.parse(this.props.vals[3])) 
    
    age=dat.getFullYear()-date2.getFullYear()
    let course=dat.getFullYear()-unidate.getFullYear()+1
    if((date2.getMonth()-dat.getMonth())>0){age--;}
    else if( ((date2.getMonth()-dat.getMonth())==0)&&((date2.getDate()-dat.getDate() )>0)){age--}
    
    if((unidate.getMonth()-dat.getMonth())>0){course--;}
    else if( ((unidate.getMonth()-dat.getMonth())==0)&&((unidate.getDate()-dat.getDate() )>0)){age--}
    
    if(course<1){course=" "}
    if(age<0){age=" "}
    if(isNaN(age)){age="неизвестно сколько"}
    if(isNaN(course)){course=" "}
    if(course>4){course="Университет окончил"}
    return (
      
      <div className="App">
        <table>
          <tr><td>фио</td><td>{(this.props.vals[0]?this.props.vals[0]:" ")+" " +(this.props.vals[1]?this.props.vals[1]:" ")+" "+(this.props.vals[2]?this.props.vals[2]:" ")}</td> </tr>
          <tr><td>возраст</td><td>{age+" лет"}</td> </tr>
          <tr><td>Факультет,курс группа</td><td>{(this.props.vals[5]?this.props.vals[5]:" ")+" "+course+" "+(this.props.vals[6]?this.props.vals[6]:" ")}</td> </tr>
          <tr><td>специальность</td><td>{this.props.vals[7]}</td> </tr>
          <tr><td>email</td><td>{domain}</td> </tr>
          <tr><td>домен почты</td><td>{repl}</td> </tr>
          <tr><td>Телефон</td><td>{this.props.vals[9]}</td> </tr>
          <tr><td>оператор сотовой связи</td><td>{prov}</td> </tr>
        </table> 
        
      </div>
    );
  }
}

class Notes extends React.Component {
  constructor(props) 
  {
    super(props); 
    this.state={notes:[]}
    this.addnote=this.addnote.bind(this)
    //this.render=this.render.bind(this)
  }
 
  addnote(handler)
  {
    let buff =this.state.notes
    //buff = this.state.notes
    buff.push(<NoteEx key={this.state.notes.length} index={this.state.notes.length}
      notedat={document.getElementsByName("note")[0].value}
      head={document.getElementsByName("head")[0].value}
      notemat={document.getElementsByName("notemat")[0].value}
      />)
    this.setState({notes:buff})
    //this.forceUpdate()
  }
  
  render() {
    let buff=this.state.notes
    return (
      <div className="App">
        <label htmlFor='note'>Дата заголовка</label><input type={"date"} name={"note"} />
        <input type={"text"} name={"head"} placeholder={"заголовок"}/>
        <textarea name={"notemat"} placeholder='Заметка'></textarea>
        <button onClick={this.addnote}>добавить</button>
        <Buff render={buff}/>
      </div>
    );
  }
}
class NoteEx extends React.Component {
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
        <input  type={"date"} className="noter"
        value={this.props.notedat}
        name={"notev"} disabled/>
        <input type={"text"}  className="noter" value={this.props.head} placeholder={"заголовок"} disabled/>
        <textarea placeholder='Заметка' style={{backgroundColor:background}} className="noter" value={this.props.notemat} disabled></textarea>
        
        
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

class Main extends React.Component {
  
  constructor(props) 
  {
    super(props); 
    this.state={values:[]}
    this.inputch=this.inputch.bind(this)
    //this.render=this.render.bind(this)
  }
  inputch(handler)
  {
    let buff=document.getElementsByClassName("stud")
    let buff2=[]
    for(let ind=0;ind<buff.length;ind++){buff2[ind]=buff[ind].value
    //console.log(buff2)
    }
    //let buff2 = buff[0].value
    //buff2=buff[0].value
    //console.log(buff[0].value)
    //buff2=buff[0].value
    //for(let el=0; el<buff; el++){buff2=buff[0].value}
    //console.log(buff2.value)
    this.setState({values:buff2})
  }
  render() {
    return (
      <React.Fragment>
      <StudentInfo func={this.inputch}></StudentInfo>
      <StudentInfoHandler  vals={this.state.values}/>
      <Notes></Notes>
      </React.Fragment>
    );
  }
}

export default Main;
