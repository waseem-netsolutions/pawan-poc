
const callStatesModel = {
    ringing: {
        info: "Ringing",
          displayPickup: true,
          displayCall: false,
          displayCallEnd: false,
    },
    established : {
        info: "Call_established",
        displayPickup: false,
        displayCall: false,
        displayCallEnd: true
      },
    connected: {
        info: "Call_connected",
        displayPickup: false,
        displayCall: false,
        displayEnd: true
      },
    ended: {
        info: "Call_ended",
        displayPickup: false,
        displayEnd: false,
        displayCall: true
    }
  }
  export default callStatesModel