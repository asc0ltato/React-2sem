import logo from './logo.svg';
import './App.css';
import React from 'react';



var currenc ="$"

var item_arr=[
  
   {price:255, 
  amount:0,
  iname:"ноутбук aspire 3456",
  image:"laptop.jpeg",
  isnew:false,
  discount:0,
  descript:"Просто непонятный ноутбук",
  discount_price:null
},
{
  price:800, 
  amount:3,
  iname:"geforce 3060",
  image:"3060.jpeg",
  isnew:true,
  discount:30,
  descript:"хорошая видеокарта с rtx",
  discount_price:null
},
  

  
  {
    price:35, 
    amount:44,
    iname:"i5 11400f",
    image:"i5.jpeg",
    isnew:false,
    discount:16,
    descript:"новейший процессор интел на 10нм, без встроенной графики",
    discount_price:null
  },
  {
    price:185, 
    amount:44,
    iname:"asus prime a320",
    image:"mot2.jpeg",
    isnew:false,
    discount:16,
    descript:"начальная плата для сокета am4",
    discount_price:null
  },
  {
    price:333, 
    amount:44,
    iname:"asrock b660",
    image:"mot1.jpeg",
    isnew:false,
    discount:50,
    descript:"продвинутая плата для сокет lga 1700",
    discount_price:null

  }
 
]

class Controls extends React.Component
{
render(){return(<div> 
  
  <button onClick={this.props.namesort}>name </button>
  <button onClick={this.props.pricesort}>price </button>
  <button onClick={this.props.amountsort}>amount </button>
  <button onClick={this.props.discountsort}>discount</button>
  </div>)}

}

class Warehouse extends React.Component
{
  
  constructor(props) {
    super(props);
    this.state={myarray:item_arr}
    this.namesort = this.namesort.bind(this);
    this.pricesort = this.pricesort.bind(this);
    this.amountsort = this.amountsort.bind(this);
    this.discountsort=this.discountsort.bind(this)
    newitysort=newitysort.bind(this)
    this.render =this.render.bind(this)
  }

  componentDidMount()
  {
  for(let item of item_arr)
  {
    item.discount_price=item.price*(100-item.discount)/100
  }
  item_arr.sort((v_a,v_b)=>{if(v_a.isnew<v_b.isnew){return 1}
  if(v_a.isnew>v_b.isnew){return -1}
  })
  this.setState({myarray:item_arr})
  
  }

  namesort =  createSort("iname");
  pricesort= createSort("discount_price");
  amountsort =createSort("amount")
  discountsort=createSort("discount")
  newitysort()
  {
    item_arr.sort((v_a,v_b)=>(v_a["isnew"]-v_b["isnew"]))
  }  

  render()
  {
    let rows=[];
    let iter=0;

 
    rows.push(<React.Fragment><Controls namesort={this.namesort} pricesort={this.pricesort} amountsort={this.amountsort} discountsort={this.discountsort}/><Searcher items={this.state.myarray}></Searcher> </React.Fragment>)
    for(const item of this.state.myarray)
    { 
      rows.push(<Wh_Node index={++iter} goodsname={item.iname} 
      descript={item.descript}  price={item.price} amount={item.amount} image={item.image} isnew={item.isnew} diskount={item.discount} key={item.iname  }/>)
    }
    return (
      <div>
       
        {rows}
     
      </div>)
  }
}


export default Warehouse;

class Searcher extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state={text:"",menutrig:false,strictsearch:false}
    this.texthandle=this.texthandle.bind(this)
    this.closebutton=this.closebutton.bind(this)
    this.searchstrict=this.searchstrict.bind(this)
  }
  render()
  {
    let items=[]
    console.log(this.state.strictsearch)
    
    if(this.state.strictsearch){
    items=this.props.items.filter((item)=>
    {
      return item.iname==this.state.text
    })}
    else
    {
      items=this.props.items.filter((item)=>
      {
        return item.iname.includes(this.state.text)
      })
    }
    
    //console.log(items)
    let item_scroll=[]
    for(let item of items)
    {
      item_scroll.push(<Wh_Node  goodsname={item.iname} 
        descript={item.descript}  price={item.price} amount={item.amount} image={item.image} isnew={item.isnew} diskount={item.discount} key={item.iname +"search" }/>)
    }


    let menu
    if(this.state.text!="" && this.state.menutrig){menu=<div id='sdisplay'> <div className='searchresult'>{item_scroll}</div></div>}
    return(<React.Fragment>
    <div className='searchbar'> <input type={"text"} onChange={this.texthandle}/><button onClick={this.closebutton}>закрыть</button>
    <br/>
    <button value={true} onClick={this.searchstrict}>точный/частичный поиск</button>
    </div>
      { menu }
      
    </React.Fragment>
    )
    
  }

  searchstrict(handler)
  {
    let buff=this.state.strictsearch
    this.setState({strictsearch:!buff})
    console.log("fixed:",this.state.strictsearch)
  }

  closebutton()
  {
    this.setState({menutrig:false})
  }

  texthandle(handler)
  {
    this.setState({text:handler.target.value,menutrig:true})
  }


}

class Wh_Node extends React.Component
{
  constructor(props)
  {
    super(props)
    this.props={goodsname:String,amount:0,price:0,index:1,image:"",descript:"",isnew:false,diskount:0}
  }



  render()
  {
    let totprice
    let compon
    let newmark
    let discount_store
    if(this.props.amount<=3){
      if(this.props.amount==0){
        compon= <p class="amount red" >{this.props.amount}</p> }
      else{compon= <p class="amount yellow">{this.props.amount}</p> }
    }
    else{compon= <p class="amount">{this.props.amount}</p> }

    if(this.props.isnew){
      console.log(33)
      newmark=<p className='newmark'><span>новинка</span></p>
    }
    if(this.props.diskount>0 && this.props.diskount<100)
    {
      discount_store=<p>скидка {(this.props.diskount)}% </p>
      totprice=<p>цена со скидкой {currenc}{this.props.price*(1-this.props.diskount/100)} </p> 
      console.log(this.props.price*(100-this.props.diskount)/100,this.props.price)
    }
    return (<div className='catalogue'>
      {newmark}
      <p class="goodsname">{this.props.goodsname}</p> 
       <p class="amount">количество {this.props.amount}</p>
       
       <p class="price">цена: {currenc+this.props.price}</p> 
       <figure><img src={'res/'+this.props.image}/></figure>
       
       {totprice}
       {discount_store}
      <p>{this.props.descript}</p>

        </div>)
  }
}

function newitysort()
{
  item_arr.sort((v_a,v_b)=>{if(v_a.isnew<v_b.isnew){return 1}
  if(v_a.isnew>v_b.isnew){return -1}
  })
  this.setState({myarray:item_arr})
  
  //this.setState({myarray:item_arr})
}  


function createSort(prop=String) 
{
  
  let bool=1
  return (function(){
  if(bool===1){bool=-1; }
  else{bool=1; }
  
  this.setState({myarray:item_arr})
  


if(prop==="iname"){item_arr.sort((v_a,v_b)=>bool*(v_a[prop].charCodeAt(0)-v_b[prop].charCodeAt(0)))}
else{ item_arr.sort((v_a,v_b)=>bool*(v_a[prop]-v_b[prop])) }
newitysort()
})

} 

