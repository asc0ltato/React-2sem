
import './App.css';
import React from 'react';
import PropTypes, { number } from 'prop-types';


var currenc ="$"


let regread =/[0-9]{1,3}/;
var phones=[
{
  state:"Беларусь",
  code:"375",
  flag:"🇧🇾",
  format:"(XX) XXX-XX-XX",
  regeb:/([0-9]{1,3})([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/,
  regea:"+$1($2) $3-$4-$5",
  len:18
},
{
  state:"Россия",
  code:"7",
  flag:"🇷🇺",
  format:"(XXX) XXX-XX-XX",
  regeb:/([0-9]{1})([0-9]{0,3})([0-9]{0,3})([0-9]{0,2})([0-9]{0,3})/,
  regea:"+$1($2) $3-$4-$5",
  len:17
},
{
  state:"Литва",
  code:"370",
  flag:" 🇱🇹 ",
  format:"(XX) XXX-XX-XX",
  regeb:/([0-9]{1,3})([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,2})/,
  regea:"+$1($2) $3-$4-$5",
  len:18
},
{
  state:"Латвия",
  code:"371",
  flag:"🇱🇻",
  format:"XXXX-XXXX",
  regeb:/([0-9]{1,3})([0-9]{0,4})([0-9]{0,4})/,
  regea:"+$1 $2-$3",
  len:14
},
{
  state:"Украина",
  code:"380",
  flag:"🇺🇦",
  format:"(XX) XXX-XX-XXX",
  regeb:/([0-9]{1,3})([0-9]{0,2})([0-9]{0,3})([0-9]{0,2})([0-9]{0,3})/,
  regea:"+$1($2) $3-$4-$5",
  len:19
},
{
  state:"Польша",
  code:"48",
  flag:"🇵🇱",
  format:"XXX-XXX-XXX",
  regeb:/([0-9]{1,2})([0-9]{0,3})([0-9]{0,3})([0-9]{0,3})/,
  regea:"+$1 $2-$3-$4",
  len:15
}

]
//var mapper =new Map()
//mapper=(phones.forEach(element => mapper.set(element.code,element) ))



var providers=[
{code:375,
provs:["МТС","A1","life"]
},
{code:7,
  provs:["Билайн", "Мегафон", "МТС", "Tele2"]
  },
{code:370,
  provs:["Telia", "Bite", "Tele2"]
},
{code:371,
  provs:["LMT", "Tele2", "Bite"]
},
{code:380,
  provs:["Lifecell", "Vodafone", "Київстар"]
},
{code:48,
  provs:["Orange", "Play", "Plus", "T-mobile"]
  }
]



var item_arr=[
  
  {
    price:55, 
    amount:0,
    iname:"rr"
  },
  {
    price:0, 
    amount:3,
    iname:"apr"
  },
  {
    price:0, 
    amount:44,
    iname:"ffr"
  }
]

class Controls extends React.Component
{
render(){return(<tr> 
  <td >№ </td>
  <td onClick={this.props.namesort}>name </td>
  <td onClick={this.props.pricesort}>price </td>
  <td onClick={this.props.amountsort}>amount </td>
  </tr>)}

}

class Warehouse extends React.Component
{
  
  constructor(props) {
    super(props);
    this.namesort = this.namesort.bind(this);
    this.pricesort = this.pricesort.bind(this);
    this.amountsort = this.amountsort.bind(this);
    this.render =this.render.bind(this)
  }

  namesort =  createSort("iname");
  pricesort= createSort("price");
  amountsort =createSort("amount")
  


  render()
  {
    let rows=[];
    let iter=0;

 
    rows.push(<Controls namesort={this.namesort} pricesort={this.pricesort} amountsort={this.amountsort}/>)
    for(const item of item_arr)
    { 
      rows.push(<Wh_Node index={++iter} goodsname={item.iname} 
        price={item.price} amount={item.amount}/>)
    }
    return (
      <table>
        
        {rows}
     
      </table>)
  }
}

function App() {
  return (
    <div>
    введите номер
  <Phoneselect></Phoneselect>
  </div>

  );
}

export default App;

class Wh_Node extends React.Component
{
  constructor(props)
  {
    super(props)
    this.props={goodsname:String,amount:0,price:0,index:1}
  }

  render()
  {
    let compon
    if(this.props.amount<=3){
      if(this.props.amount==0){
        compon= <td class="amount red" >{this.props.amount}</td> }
      else{compon= <td class="amount yellow">{this.props.amount}</td> }
    }
    else{compon= <td class="amount">{this.props.amount}</td> }

    return (<tr>
       <td class="index">{this.props.index}</td>
       <td class="goodsname">{this.props.goodsname}</td> 
       <td class="price">{currenc+this.props.price}</td> 
       {compon}
       


        </tr>)
  }
}

function createSort(prop=String) 
{
  
  let bool=1
  return (function(){
  if(bool===1){bool=-1; }
  else{bool=1; }


//console.log(bool)
if(prop==="iname"){item_arr.sort((v_a,v_b)=>bool*(v_a[prop].charCodeAt(0)-v_b[prop].charCodeAt(0)))}
else{item_arr.sort((v_a,v_b)=>bool*(v_a[prop]-v_b[prop]))}


})

} 

class Phoneselect extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state={selected_code:375,rcode:0}
    this.setnum = this.setnum.bind(this);
    this.setnum_inp = this.setnum_inp.bind(this);
    //this.inp_plus = this.inp_plus.bind(this);

  }
setnum(handler){
  //let trig=false
  this.setState(
  function(prevState, props){
   
      return({selected_code:handler.target.value,
      
      }) 
    })
    providers.find((obj)=>{
      if(obj.code==handler.target.value)
        { this.setState({rcode:providers.indexOf(obj)})
        console.log("code"+this.state.rcode)    
        }
      })
      
  
//if(!trig){handler.target.value="+"+this.state.selected_code;trig=true}


console.log(this.state.rcode)


}

inp_plus(handler){if(handler.target.value==""){handler.target.value=("+")}}

setnum_inp(handler){

  providers.find((obj)=>{
    if(obj.code==handler.target.value)
      { this.setState({rcode:providers.indexOf(obj)})
      console.log("code"+this.state.rcode)    
      }
    })


  let afterbuff=handler.target.value.match(regread) 
  let len=0
  for(let code of phones)
  {if(code.code==afterbuff){afterbuff=code;break}}  
  
  if(afterbuff){this.setState({selected_code:afterbuff.code})}
  else{afterbuff=this.state.selected_code}
let buff2=handler.target.value.replace(/[^0-9]/g, '')
buff2=buff2.replace(afterbuff.regeb,afterbuff.regea)

handler.target.value= handler.target.value.match(/[0-9]+/g)
  handler.target.value=buff2
  
}

render(){
  let states=[];
  for(let state of phones)
  {states.push(<option value={state.code}>{state.flag+" "+state.state+" +"+state.code+" "+state.format}</option>)}
  
  return(
  <div>

    <select onChange={this.setnum} value={this.state.selected_code} id={"selector"}>{states}</select>
    <input id="inputer" onChange={this.setnum_inp} maxLength={phones[this.state.rcode].len} /* onClick={this.inp_plus} */ placeholder={"+"+this.state.selected_code+" "+phones[this.state.rcode].format}/>
    <button onClick={clearinp}> очистить</button>
    <Panel2 provider={providers} rcode={ this.state.rcode}/>
    
  </div>
  //array number
  )}
}


function Panels(props) {
  let arr=[]
  for(let val of props.value){
   arr.push(
    <li>
   
    <input type="radio" name={"oper"} value={val}/>
    {val}
    </li>
   ) 

  }
  // Правильно! Нет нужды объявлять ключ здесь:
  return (arr)
}


class Panel2 extends React.Component{
  constructor(props)
  {
    super(props)
    this.props={provider:providers[0].provs}
    this.state={rcode:0}
    
  }
render(){

  const providers_in = this.props.provider;
  const listItems = providers_in.map((number) =>
      <Panels key={(number.code)} value={number.provs} />
  );
  return (
      <ul>
          { 
             listItems[this.props.rcode]
          }
      </ul>
  );
}
}
Panel2.propTypes={provider:PropTypes.array,rcode:number}
Panels.propTypes={value:PropTypes.array}
function clearinp(){document.getElementById("inputer").value=""}