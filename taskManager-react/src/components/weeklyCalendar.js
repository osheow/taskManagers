import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import "./weeklyCalendar.css";
import articleEntry from "./ArticleEntry.js";
import app from "./App.js";
import randomColor from "randomcolor";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig.js";

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
  },
  main: {
    flexGrow: "1",
  },
};

class WCalendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Create a new event:",
          "New event"
        );
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        const event = {
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
          backColor: randomColor(),
        };

        dp.events.add(event);

        // Add a new document in collection "cities"
        await setDoc(doc(db, "events", event.id), {
          start: `${event.start}`,
          end: `${event.end}`,
          id: `${event.id}`,
          text: `${event.text}`,
          backColor: `${event.backColor}`,
          userID: auth.currentUser.uid,
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async (args) => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt(
          "Update event text:",
          args.e.text()
        );
        if (!modal.result) {
          return;
        }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    //ALL IN USESTATE, make events a state variable.
    //make a collection in firestore called events, and write these events into firestore
    //blog can be helpful for this

    //{
    /*
    const events = [
      {
        id: 1,
        text: "Event 1",
        start: "2023-03-07T08:30:00",
        end: "2023-03-07T13:00:00",
        backColor: "#B8F2E6",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2023-03-08T09:30:00",
        end: "2023-03-08T11:30:00",
        backColor: "#6aa84f",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2023-03-08T12:00:00",
        end: "2023-03-08T15:00:00",
        backColor: "#f1c232",
      },
      {
        id: 4,
        text: "Event 4",
        start: "2023-03-06T11:30:00",
        end: "2023-03-06T14:30:00",
        backColor: "#cc4125",
      },
    ];
  */
    //}

    const startDate = "2023-03-07";

    //this.calendar.update({ startDate, events });

    //const startDate = "2023-03-07";

    this.calendar.update({ startDate });
  }

  render() {
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={3}
            skipMonths={3}
            startDate={"2023-03-07"}
            selectionDay={"2023-03-07"}
            onTimeRangeSelected={(args) => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar {...this.state} ref={this.calendarRef} />
        </div>
      </div>
    );
  }
}

export default WCalendar;
