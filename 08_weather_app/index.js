const appId = "2802cbdc04a31355605539f00b226d8b";
const weatherTypes = {
  Clouds: "cloudy",
  Thunderstorm: 'stormy',
  Drizzle: 'rainy',
  Rain: 'rainy',
  Snow: 'snowy',
  Clear: 'sunny',
};

const App = {
  data() {
    return {
      weatherDays: new Array(5).fill(0),
      cityName: "Moscow",
    };
  },
  methods: {
    getWeek(day) {
      return day
        ? new Date(day * 1000)
            ?.toLocaleDateString("en-EN", { weekday: "short" })
            ?.toUpperCase()
        : "-";
    },
    getDay(day) {
      return new Date(day * 1000)?.getDate() || "-";
    },
    async loadWeather(e) {
      await this.getWeather();
    },
    async getWeather() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&lang=en&appid=${appId}&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        this.weatherDays = data.list.filter((item, index) => index % 8 === 0);
      } catch (err) {
        this.weatherDays = [];
      }
    },
    getFahrengeitTemp(temp) {
      return Math.round((temp * 9) / 5 + 32);
    },
    getIcon(day) {
      const iconName = day
        ? weatherTypes[day.weather[0]?.main] || 'partly-cloudy'
        : "partly-cloudy";
      return `./images/${iconName}.svg`;
    },

    getClass(day) {
      const className = day
        ? weatherTypes[day.weather[0].main].toLowerCase() || 'partly'
        : "partly";
      return className;
    },
  },
  async created() {
    await this.getWeather();
  },
};

const app = Vue.createApp(App);
app.mount("#app");

