import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const listOfDays = props.days.map(dayItem => {
    return (
      <DayListItem
        key={dayItem.id}
        name={dayItem.name}
        spots={dayItem.spots}
        selected={dayItem.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return (
    <ul>{listOfDays}</ul>
  );
}