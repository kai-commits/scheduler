import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicaitonData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // const appointmentIds = state.days.find((day) => day.name === state.day).appointments;
    // const dayIndex = state.days.filter((day) => day.name === state.day)[0].id - 1;
    // let nullAppointments = [];
    // for (const id of appointmentIds) {
    //   nullAppointments.push(
    //     ...Object.values(appointments)
    //       .filter((appointment) => appointment.id === id)
    //       .filter((item) => item.interview === null)
    //   );
    // }
    const spots = state.days
      .find((day) => day.name === state.day)
      .appointments.map((dayId) =>
        Object.values(appointments).find(
          (appointment) => appointment.id === dayId
        )
      )
      .filter((appointment) => appointment.interview === null).length;

    const dayIndex = state.days.findIndex((day) => day.name === state.day);
    const days = [...state.days];
    days[dayIndex].spots = spots;

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState({ ...state, appointments, days });
      return res.status;
    });
  };

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayId = state.days.findIndex((day) => day.name === state.day);
    const days = [...state.days];
    days[dayId].spots += 1;

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days });
      return res.status;
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, deleteInterview };
}
