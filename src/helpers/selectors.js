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
};

export const getInterviewersForDay = (state, day) => {
  let interviewerIds = [];
  let results = [];
  for (const item of state.days) {
    if (item.name === day) {
      interviewerIds = item.interviewers;
    }
  }

  for (const id of interviewerIds) {
    const interviewerKeys = Object.keys(state.interviewers);
    for (const key of interviewerKeys) {
      if (id === Number(key)) {
        results.push(state.interviewers[id]);
      }
    }
  }
  return results;
};
