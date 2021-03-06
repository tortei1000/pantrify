import React from "react";
import dateFns from "date-fns";
import './calendar.css'
import Mealer from "./Mealer";
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUsername } from "../redux/auth_reducer"
import axios from 'axios'
import ToggleColor from './ToggleColor'
import PrintThisComponent from './PrintThisComponent'
import { toast } from "react-toastify";

const isSameDay = require('date-fns/is_same_day')


class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    meals: [],
    isClicked: false,
    isInPantry: [],
    resizeScreen: 0,
    

  };

  componentDidMount() {
    axios.get('/auth/users').then((res) => {
      this.props.updateUsername(res.data.username)
    }).catch((err) => { console.log(err) })
    this.getCalendarMeals()
    window.addEventListener('resize', this.resize.bind(this))
    this.resize()
    this.pantryChecker()
  }

  resize() {
    
    if (window.innerWidth > 1000) {
      this.setState({ resizeScreen: true })
    } else { this.setState({ resizeScreen: false }) }
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
        let filter = this.state.meals.filter((day) => {
          
          return isSameDay(new Date(day.meal_day), (new Date(cloneDay)))
        })

        days.push(

          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
              }`}
            key={day}
            onClick={() => {
              if (this.state.resizeScreen === false) {
                return this.onDateClick(dateFns.parse(cloneDay))
              } else { return null }
            }}
            onDoubleClick={() => {
              if (this.state.resizeScreen === true) {
                return this.onDateClick(dateFns.parse(cloneDay))
              } else { return null }
            }
            }

          >
            {(filter.length > 0) ? (<ToggleColor
              meals={this.state.meals}
              filter={filter}
              removeRecipe={this.removeRecipe}
              pantryChecker={this.pantryCheck}
              isInPantry={this.state.isInPantry} />
            ) : null}
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
        {(this.state.isClicked) ? (
          <Mealer
            selectedRecipe={this.selectedRecipe}
            day={this.state.selectedDate}
            onDateClick={this.onDateClick}
            isInPantry={this.state.isInPantry}
          />
        ) : rows}
        <PrintThisComponent />

      </div>
    )
  }



  saveToDb = (planMeal) => {
    
    axios.post('/api/calendar', planMeal).then((res) => {

      this.setState({
        meals: [...this.state.meals, res.data]
      })
      toast.success(`you have selected to cook ${res.data.recipe} on ${res.data.meal_day}`)
    })
    
  }

  pantryChecker = async() => {
    
    await axios.get('/api/pantryCheck').then((res)=>{
      
      this.setState({isInPantry:res.data})  
      
    })
  }

  selectedRecipe = (meal_day, recipe, recipe_id) => {
    
    console.log('here is the meal day', meal_day) 
    let planMeal = { meal_day, recipe, recipe_id }
    this.saveToDb(planMeal)


    this.setState({
      isClicked: !this.state.isClicked
    })


  }
  getCalendarMeals = () => {
    axios.get('/api/calendar').then((res) => {
      this.setState({
        meals: res.data
      })
    })
  }

  removeRecipe = (id) => {

    axios.delete(`/api/calendar/${id}`).then(() => {

      this.getCalendarMeals()
    })
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      isClicked: !this.state.isClicked,
    });
  };


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