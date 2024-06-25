const digitalClock = document.querySelector('.digital-clock');
const clockhours = document.querySelector('.hour');
const clockminutes = document.querySelector('.minutes');
const clockseconds = document.querySelector('.seconds');
const timeFormat = document.querySelector('.time-format');
const changeFormat = document.getElementById('change-format')
const alarmEl = document.getElementById('alarm')
let hour12 = false;

function Clock() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    console.log(this.hours, this.minutes, this.seconds);
}



Object.defineProperties(Clock.prototype, {
    getFormattedTime: {
        value: function() {
            const formattedHours = this.hours.toString().padStart(2, '0');
            const formattedMinutes = this.minutes.toString().padStart(2, '0');
            const formattedSeconds = this.seconds.toString().padStart(2, '0');
            console.log(formattedHours);
            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        },
        writeable: true,
        configuration: true,
        enumerable: false
    },
    get12HourTime: {
        value: function() {
            let timePeriod = "AM";
            if(this.hours >= 12){
                timePeriod = "PM"
                if(this.hours > 12){
                    this.hours -= 12;
                }
            } else if(this.hours === 0){
                this.hours = 12;
            }
            return timePeriod;
        },
        writeable: true,
        configuration: true,
        enumerable: false
    },
    update: {
        value: function(hours, minutes, seconds) {
            this.hours = hours;
            this.minutes = minutes;
            this.seconds = seconds;
            this.display();
        },
        writeable: true,
        configuration: true,
        enumerable: false
    },
    display: {
        value: function() {
          if(hour12){
            clockhours.textContent = (this.hours - 12).toString().padStart(2, '0');
            clockminutes.textContent = this.minutes.toString().padStart(2, '0');
            clockseconds.textContent = this.seconds.toString().padStart(2, '0');
            timeFormat.textContent = this.get12HourTime();
          } else{
            clockhours.textContent = this.hours.toString().padStart(2, '0');
            clockminutes.textContent = this.minutes.toString().padStart(2, '0');
            clockseconds.textContent = this.seconds.toString().padStart(2, '0');
            timeFormat.textContent = this.get12HourTime();
          }
            
        }
    }
})


console.log(changeFormat)


changeFormat.addEventListener('change', (e)=>{
  console.log(e)
    if(e.target.value === "24Hour" ){
      timeFormat.style.visibility = "hidden"
      hour12 = false
    } else if(e.target.value === "12Hour"){
            hour12 = true
    }
})


function updateTime(func){
    setInterval(() => {
        const date = new Date();
        const myhours = date.getHours();
        const myminutes = date.getMinutes();
        const myseconds = date.getSeconds();
        func(myhours, myminutes, myseconds);     
    }, 1000);
}




const newClock = new Clock();


//updating time on seconds
updateTime((hours, minutes, seconds) => {
    newClock.update(hours, minutes, seconds);
}); 



let alarmTime = null;
let is24HourFormat = true;

const setAlarm = () => {
  
  const format = document.getElementById("format").value;
  let period = null;

  if (format === "12") {
    period = document.querySelector('input[name="period"]:checked').value;
  }

  if (isNaN(alarmHour) || isNaN(alarmMinute) || (format === "12" && !period)) {
    alert("Please enter valid hour, minute, and period for the alarm.");
    return;
  }

  alarmTime = { hours: alarmHour, minutes: alarmMinute, period };
  is24HourFormat = format === "24";

  alert(
    `Alarm set for ${alarmHour.toString().padStart(2, "0")}:${alarmMinute
      .toString()
      .padStart(2, "0")}${period ? ` ${period}` : ""}`
  );
};

const stopAlarm = () => {
  if (alarmSound) {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
};

const checkAlarm = (currentClock) => {
  if (!alarmTime) return;

  const currentHour = is24HourFormat
    ? currentClock.hours
    : currentClock.hours % 12 || 12;
  const currentPeriod = currentClock.hours >= 12 ? "PM" : "AM";

  if (
    currentHour === alarmTime.hours &&
    currentClock.minutes === alarmTime.minutes &&
    (is24HourFormat || currentPeriod === alarmTime.period)
  ) {
    alarmSound.play();
    alert("Alarm ringing!");
    alarmTime = null; // Reset alarm after it rings
  }
};


const setAlarmEl = document.querySelector('.set-alarm')
console.log(setAlarmEl)
setAlarmEl.addEventListener('click', ()=>{
  console.log(alarmEl.value)

})



