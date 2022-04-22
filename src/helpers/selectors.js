export const getAppointmentsForDay = (state, day) => {
  let appointmentIds = [];
  let results = [];
  for (const item of state.days) {
    if (item.name === day) {
      appointmentIds = item.appointments;
    }
  }
  for (const id of appointmentIds) {
    const appointmentsKeys = Object.keys(state.appointments);
    for (const key of appointmentsKeys) {
      if (id === Number(key)) {
        results.push(state.appointments[id]);
      }
    }
  }
  return results;
};

export const getInterview = (state, interview) => {
  return interview
    ? {
        student: interview.student,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
}
