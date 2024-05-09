import './App.css';
import React from 'react';



//const weekdays =["" ]

function App() {
  return (
    <Calendar/>
  );
}
export default App;

class Calendar extends React.Component 
{
  constructor(props){
    super(props)
    this.props={}
    this.state={ndate:new Date(),thisdate:1,adat:new Date()}
    this.sw_month=this.sw_month.bind(this)
    this.selday=this.selday.bind(this)
  }
  
  render()
  { return(
   <table>
    
    <CalendarHead dat={this.state.ndate} eventh={this.sw_month} />
    <CalendarBody dat={this.state.ndate} adat={this.state.adat} eventh2={this.selday}/>
   </table>
    
    )
  }

  selday(handler)
  {
    let examp = this.state.ndate
    examp.setDate(Number(handler.target.innerText))
    this.setState({adat:examp})//
    //console.log(handler.target.innerText)
    //console.log(this.state.ndate.getMonth())
    //this.forceUpdate()
  }

  sw_month(handler)
  {
    let examp =this.state.ndate
    console.log(handler.target.value)
    if(handler.target.value=="-1")//inverce
    {
      {examp.setMonth(examp.getMonth()-1)}
    
    }
    else//1
    {
      {examp.setMonth(examp.getMonth()+1)}
     
    }
    this.setState({ndate:examp})
   
  }
  
  

}

class CalendarHead extends React.Component 
{
  constructor(props){
    super(props)
    this.props={}
    this.state={}
  }
  render()
  {
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

     return(
    <React.Fragment>
    
    <tr> <td colSpan={7}>{monthNames[this.props.dat.getMonth()]} {this.props.dat.getFullYear()}  <button value={-1} onClick={this.props.eventh}> l </button> <button value={1} onClick={this.props.eventh}> r </button> </td></tr>
    <tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr>
    </React.Fragment>
    )
  }

}
class CalendarBody extends React.Component 
{
  constructor(props){
    super(props)
    this.props={}
  }

  

  render()
  { 
    const datcon =this.props.dat
    //this.setState({tday:datcon.getDay(),ldate:datcon.getDate()})
    let diff =getfday(datcon.getMonth(),datcon.getFullYear())
    if(diff>0)
    {
     diff--
    }
    else{diff=6}
    let fullweek=[]
    let max =daysInMonth(datcon.getMonth()+1,datcon.getFullYear())
    let monthl=1
    let mon2=1
    
    for(let it1=0;it1<6;it1++)
    {
      let weekdays=[]
      for(let it2=0;it2<7;it2++)
      {
        if(diff!=0){weekdays.push(
          <td class={"past"} >{daysInMonth(datcon.getFullYear(),datcon.getMonth())-diff }</td>
         )
        diff--;}
         else{
          if(max>=monthl)
          { if(this.props.adat.getDate()==monthl){weekdays.push(<td class={"select"} onClick={this.props.eventh2}>{monthl++}</td>)}
            else{
            if((new Date().getDate())==monthl && (datcon.getMonth() == new Date().getMonth()) && (
              (datcon.getFullYear() == new Date().getFullYear())
            )){  weekdays.push(<td class={"today"} onClick={this.props.eventh2}>{monthl++}</td>)}
            else{weekdays.push(<td onClick={this.props.eventh2}>{monthl++}</td>)}
            }
          }
          else{

            weekdays.push
            (
              <td class={"past"} >{mon2++}</td>
             )

          }
          }
      }
      fullweek.push(<tr>{weekdays}</tr>)
    }
    
    
    return(
   
    

   <React.Fragment>
    {fullweek}
    </React.Fragment>
    )
  }

}

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}
function getfday (month, year) {
  return new Date(year, month, 1).getDay();
}