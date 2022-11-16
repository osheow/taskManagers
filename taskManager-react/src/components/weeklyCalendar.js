import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";
import "./weeklyCalendar.css";


class Calendar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        durationBarVisible: false,
      };
    }

    render() {
      const {...config} = this.state;
      return (
        <div>
          <DayPilotCalendar
            {...config}
          />
        </div>
      );
    }
  }
  
  export default Calendar;