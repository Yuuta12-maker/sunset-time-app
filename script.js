const dateElement = document.getElementById('date');
const sunsetTimeElement = document.getElementById('sunset-time');
const datePicker = document.getElementById('date-picker');

async function getSunsetTimeForDate(dateString) {
    const lat = 33.8393;
    const lng = 132.7657;
    
    const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${dateString}&formatted=0`);
    const data = await response.json();

    if (data.status === "OK") {
        const sunsetTime = new Date(data.results.sunset).toLocaleTimeString('ja-JP');
        
        const [year, month, day] = dateString.split('-').map(Number);
        const displayDate = new Date(year, month - 1, day);
        dateElement.textContent = displayDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

        sunsetTimeElement.textContent = sunsetTime;
    } else {
        dateElement.textContent = "情報を取得できませんでした。";
        sunsetTimeElement.textContent = "";
    }
}

function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const todayString = getTodayString();
datePicker.value = todayString;
getSunsetTimeForDate(todayString);

datePicker.addEventListener('change', (event) => {
    getSunsetTimeForDate(event.target.value);
});