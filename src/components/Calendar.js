import React from "react";
import dateFns from "date-fns";
import './calendar.css'
import Mealer from "./Mealer";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateUsername} from "../redux/auth_reducer"
import axios from 'axios'
const isSameDay = require('date-fns/is_same_day')

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    meals: [],
    isClicked: false
  };

  componentDidMount(){
    axios.get('/auth/users').then((res)=>{
         
      this.props.updateUsername(res.data.username)
    }).catch((err)=>{console.log(err)})
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
          
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        let filter = this.state.meals.filter((day)=>{ console.log(day.day, cloneDay)
          return isSameDay(new Date(day.day),(new Date(cloneDay)))})
        console.log("hellllllllllloooooooo",filter)
        days.push(
          
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}

          >
            {(filter.length > 0)? (<p>{filter[0].value.title}</p>):null}
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div className="body">
        {(this.state.isClicked) ? (<Mealer selectedRecipe={this.selectedRecipe} 
        day={this.state.selectedDate}
        onDateClick={this.onDateClick}
        />
        ):rows}
        
      </div>
    )
  }

  

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      isClicked: !this.state.isClicked,
    });
  };

  selectedRecipe =(day, value)=> {
    let planMeal = {day, value}
    this.setState({
      meals: [...this.state.meals, planMeal]
    })
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateUsername
}

const mapStateToProps = (reduxState) => {
  const { username } = reduxState
  return { username }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Calendar))