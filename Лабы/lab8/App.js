import logo from './logo.svg';
import './App.css';
import React from 'react';



function App() {
  return (
<React.Fragment>
<Comments>

</Comments>


</React.Fragment>
  );
}

class CommentInstance extends React.Component
{

  constructor(props)
  {
    super(props)
    this.props={}
    this.state={date:null, avatar:"avatars/usertile8.bmp",email:null,uname:null,
    comment_text:"Empty",infotrig:false,changebtrig:false,deltrig:false,password:""}
    this.infobutton=this.infobutton.bind(this)
    this.changebutton=this.changebutton.bind(this)
    this.changetext=this.changetext.bind(this)
    this.delbutton=this.delbutton.bind(this)
  }

  componentDidMount()
  {
    this.setState
    ({
      date:new Date(),
      avatar:this.props.avatar,
      uname:this.props.uname,
      email:this.props.email,
      comment_text:this.props.comment_text,
      password:this.props.password
    })
  }

  

  changetext(textarg)
  {
    this.setState({ comment_text: textarg,date:new Date() })
    
  }
  changetrig(handler)
  {
    this.setState({ comment_text: handler.target.value })
  }

  changebutton()
  {
    let buff=this.state.changebtrig
    this.setState({changebtrig: !buff})
  }

  delbutton()
  {
    let buff=this.state.deltrig
    this.setState({deltrig: !buff}
    )
  }

  infobutton()
  {
    let buff=this.state.infotrig
    this.setState({infotrig: !buff}
    )
  }

  render()
  {
    let compon=null
    if(this.state.infotrig)
    {
      compon=<СommentsInfo uname={this.state.uname} mail={this.state.email} cdate={this.state.date.toLocaleString()}/>
    }

    let chfield=null
    if(this.state.changebtrig)
    {
     chfield=<СommentsEdit editor={this.changetext} text={this.state.comment_text}></СommentsEdit>
    }

    let dell=null
    if(this.state.deltrig)
    {
     dell=<СommentsDel password={this.state.password} index={this.props.index} delete={this.props.remover}></СommentsDel>
    }

    return(
    <div className='comment'>
   
    <img className='avatar' alt='dd'  src={this.state.avatar}/>
    <div className='comdiv'>
   
    <span className='name'>{this.state.uname}</span>
      <button onClick={this.changebutton}>изменить</button> 
      <button onClick={this.delbutton} value={this.props.index}> удалить</button>
      <button onClick={this.infobutton}>инфо</button>
    
    </div>
    <textarea className='textcomment' value={this.state.comment_text}></textarea> 
    {compon}
    {chfield}
    {dell}
    </div>)
  //.bmp
  }
}

class Comments extends React.Component
{
  constructor(props)
  {
    super(props)
    this.props={}
    this.state={comments:new Map}
    this.addcoments=this.addcoments.bind(this)
    this.deleteComment=this.deleteComment.bind(this)
  }
  render()
  {
    return(<React.Fragment><div>{Array.from(this.state.comments.values())}</div><CommentPublish adder={this.addcoments}/></React.Fragment>)
  }
  
  deleteComment(textarg)
  {
   
    //let buff=new Map()
    let buff=this.state.comments
    console.log(buff)
    console.log(textarg)
    
    buff.delete(textarg)

    console.log(buff)

    this.setState({comments:buff}
    
    )
  }
  
  addcoments()
  {
    
    const dat=new Date().getTime().toString()
    let buff=this.state.comments
    buff.set(dat,
      <CommentInstance 
      avatar={document.getElementById("avatar").value}
      uname={document.getElementById("name").value}
      email={document.getElementById("email").value}
      password={document.getElementById("password").value}
      comment_text={document.getElementById("commentadd").value}
      index={dat}
      key={dat}
      remover={this.deleteComment}
      />
      
    )
    document.getElementById("avatar").value="avatars/usertile8.bmp"
    document.getElementById("name").value=""
    document.getElementById("email").value=""
    document.getElementById("password").value=""
    document.getElementById("commentadd").value=""
    this.setState({comments:buff})
  }

}

class СommentsDel extends React.Component
{
  
  constructor(props)
  {
    super(props)
    this.props={}
    this.state={password:""}
    this.passhandle=this.passhandle.bind(this)
    this.change=this.change.bind(this)
  }

  passhandle(handler){console.log(1);this.setState({password:handler.target.value})}

  render(){return( <div><input type={"input"} onChange={this.passhandle} placeholder={"пароль"}/><button onClick={this.change} value={this.props.index}>подтвердить</button></div>)}
  change(handler)
  {
    
    
    if(this.props.password==this.state.password)
    {
      console.log(handler.target.value)
      this.props.delete(handler.target.value)

    }
  }
}

class СommentsEdit extends React.Component
{

  constructor(props)
  {
    super(props)
    this.props={}
    this.state={text:null}
    this.changetext=this.changetext.bind(this)
  }
  render(){
    
    return(<React.Fragment><p>изменить текст</p><textarea defaultValue={this.props.text} onChange={this.changetext}></textarea> <button onClick={() => {console.log(55);(this.props.editor(this.state.text))}}> изменить</button> </React.Fragment>)}
  changetext(handler)
  {
    this.setState({ text: handler.target.value })
  }
}

class СommentsInfo extends React.Component
{
  render(){
    return(
    <div>
      <p>Имя {this.props.uname}</p>
      <p>Дата Изменения {this.props.cdate}</p>
      <p>email {this.props.mail}</p>
      
    </div>
    )
    }
}

class CommentPublish extends React.Component
{

  constructor(props)
  {
    super(props)
    this.props={}
    this.state={avatar:("avatars/usertile8.bmp")}
    this.changeAvatar=this.changeAvatar.bind(this)
  }

  changeAvatar(handler)
  {
    this.setState({avatar:handler.target.value})
  }

  render()
  {
    return(
      <div className='comment'>
   
      <img className='avatar' alt='dd'  src={(this.state.avatar)}/>
      <div className='comdiv'>
      
      <input id='name'placeholder='имя' type={"text"}/>
      <input id='email'placeholder='email' type={"text"}/>
      <input id='password' placeholder='пароль' type={"text"}/>
      <label htmlFor='avatar'> avatar {" "}
        <select onChange={this.changeAvatar} name={"avatar"} id={"avatar"} defaultValue={"avatars/usertile8.bmp"}>
          <option value={"avatars/usertile8.bmp"} selected>default</option>
          <option value={"avatars/usertile9.bmp"}>flower</option>
          <option value={"avatars/usertile16.bmp"}>cat</option>
          <option value={"avatars/usertile36.bmp"}>ship</option>
          <option value={"avatars/usertile44.bmp"}>light</option>
        </select>
        </label>
      </div>
      <textarea id='commentadd'></textarea>
      <button onClick={()=>{ this.props.adder();this.setState({avatar:"avatars/usertile8.bmp"})}}>добавить комментарий</button>
      </div>
    )
  }
}


export default App;
