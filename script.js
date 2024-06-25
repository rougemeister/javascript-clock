const digitalClock = document.querySelector('.digital-clock');
const clockhours = document.querySelector('.hour');
const clockminutes = document.querySelector('.minutes');
const clockseconds = document.querySelector('.seconds');
const timeFormat = document.querySelector('.time-format');


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
            clockhours.textContent = this.hours.toString().padStart(2, '0');
            clockminutes.textContent = this.minutes.toString().padStart(2, '0');
            clockseconds.textContent = this.seconds.toString().padStart(2, '0');
            timeFormat.textContent = this.get12HourTime();
        }
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
