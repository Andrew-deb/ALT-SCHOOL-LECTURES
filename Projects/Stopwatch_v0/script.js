// Selecting all the required elements
const startButton = document.getElementsByClassName("start")[0];
const stopButton = document.getElementsByClassName("stop")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const clearLapsButton = document.getElementsByClassName("clear-laps")[0];


// Select individual time unit span elements to preserve styling
const hoursSpan = document.getElementsByClassName("hours")[0];
const minutesSpan = document.getElementsByClassName("minutes")[0];
const secondsSpan = document.getElementsByClassName("seconds")[0];
const millisecondsSpan = document.getElementsByClassName("milliseconds")[0];

console.log(startButton, stopButton, resetButton, lapButton);
console.log("Time spans:", hoursSpan, minutesSpan, secondsSpan, millisecondsSpan);

//Declaring time units variables
let hrs = 0, 
    mins = 0, 
    secs = 0,
    millisecs = 0,
    timeinterval,
    IsStart = false;

// Start button functionality
startButton.onclick = () => {
    // Only start if not already running
    if (!IsStart) {
        startButton.style.display = "none";
        stopButton.style.display = "inline-block";
        IsStart = true;
        
        timeinterval = setInterval(() => {
            millisecs++;
            if(millisecs == 100){
                secs++;
                millisecs = 0;
            }
            if(secs == 60){
                mins++;
                secs = 0;
            }
            if(mins == 60){
                hrs++;
                mins = 0;
            }
            
           // Format: Hours (always 2 digits)
            if (hrs < 10) {
                hoursSpan.textContent = '0' + hrs;
            } else {
                hoursSpan.textContent = hrs;
            }

            // Format: Minutes with leading colon (always 2 digits)
            if (mins < 10) {
                minutesSpan.textContent = ':0' + mins;
            } else {
                minutesSpan.textContent = ':' + mins;
            }

            // Format: Seconds with leading colon (always 2 digits)
            if (secs < 10) {
                secondsSpan.textContent = ':0' + secs;
            } else {
                secondsSpan.textContent = ':' + secs;
            }

            // Format: Milliseconds with leading colon (always 2 digits for display)
            if (millisecs < 10) {
                millisecondsSpan.textContent = ':0' + millisecs;
            } else {
                millisecondsSpan.textContent = ':' + millisecs;
            }
            
        }, 10);
    }
};


// Stop button functionality
stopButton.onclick = () => {
    clearInterval(timeinterval);
    
    // Reset button visibility and state
    stopButton.style.display = "none";
    startButton.style.display = "inline-block";
    IsStart = false;
    
    console.log("Stop button clicked - Timer stopped");
};

// Reset button functionality
resetButton.onclick = () => {
    clearInterval(timeinterval);
    hrs = 0;
    mins = 0; 
    secs = 0;
    millisecs = 0;
    
    // Reset display to initial state
    hoursSpan.textContent = '00';
    minutesSpan.textContent = ':00';
    secondsSpan.textContent = ':00';
    millisecondsSpan.textContent = ':00';
    
    // Start button visibility and state after reset
    stopButton.style.display = "none";
    startButton.style.display = "inline-block";
    IsStart = false;
    
    console.log("Reset button clicked - Timer reset to 00:00:00:00");
};

// Lap button functionality
lapButton.onclick = () => {
    if (timeinterval) { 
        const lapTime = `${hrs < 10 ? '0' + hrs : hrs} : ${mins < 10 ? '0' + mins : mins} : ${secs < 10 ? '0' + secs : secs} : ${millisecs < 10 ? '0' + millisecs : millisecs}`;
        
        // Get existing laps list
        const lapsList = document.getElementsByClassName("laps")[0];
        const existingLaps = lapsList.querySelectorAll('.lap-item');
        const lapNumber = existingLaps.length;
        
        // Create new lap item
        const newLap = document.createElement('li');
        newLap.className = 'lap-item';
        newLap.innerHTML = `<span class="number">#${lapNumber + 1}</span><span>${lapTime}</span>`;
        
        // Insert new lap before the clear button
        const clearButton = lapsList.querySelector('.clear-laps');
        lapsList.insertBefore(newLap, clearButton);
        
        console.log(`Lap button clicked - Lap #${lapNumber + 1}: ${lapTime}`);
    }
};

// clear all laps functionality
clearLapsButton.onclick = () => {
    const lapsList = document.getElementsByClassName("laps")[0];
    const existingLaps = lapsList.querySelectorAll('.lap-item');
    existingLaps.forEach(lap => lap.remove());
    console.log("Clear Laps button clicked - All laps cleared");
}

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem("theme") || "dark";

// Apply the saved theme on page load
if (currentTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️"; // Sun icon for light mode
} else {
    themeToggle.textContent = "🌙"; // Moon icon for dark mode
}

// Theme toggle button functionality
themeToggle.onclick = () => {
    document.body.classList.toggle("light-theme");
    
    // Update button icon and save preference
    if (document.body.classList.contains("light-theme")) {
        themeToggle.textContent = "☀️"; // Sun icon for light mode
        localStorage.setItem("theme", "light");
        console.log("Switched to light theme");
    } else {
        themeToggle.textContent = "🌙"; // Moon icon for dark mode
        localStorage.setItem("theme", "dark");
        console.log("Switched to dark theme");
    }
};



