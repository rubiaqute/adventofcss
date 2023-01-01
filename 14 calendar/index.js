const App = {
    data() {
      return {
        selectedMonth: new Date(),
        weekDays: ['S', 'M', "T", "W", "T", "F", "S"], 
        rows: new Array(6).fill(0).map((el, index)=> el + index)
      };
    },
  
    methods: {
        getDay(day_pos, row_pos) {
            const firstDayOfWeek = this.selectedMonth.getDay();
            const currentIndex = day_pos + row_pos*7
            const monthDates = this.getMonthDates()

            return monthDates[currentIndex - firstDayOfWeek] || ''
        },

        getMonthDates() {
            const monthDates = []
            let dateIndex = 1;
            
            do {
                const day = new Date(this.selectedMonth.getYear(), this.selectedMonth.getMonth(), dateIndex).getDate()
                monthDates.push(day)
                dateIndex++
            } while (new Date(this.selectedMonth.getYear(), this.selectedMonth.getMonth(), dateIndex).getMonth() === this.selectedMonth.getMonth())

            return monthDates
        },

        goToPreviousMonth() {
            this.selectedMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() - 1, 1)
        },

        goToNextMonth() {
            this.selectedMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1)
        },
        isCurrentDate(day_pos, row_pos) {
            return new Date().getDate() === this.getDay(day_pos, row_pos) &&
            new Date().getMonth() === this.selectedMonth.getMonth() &&
            new Date().getFullYear() === this.selectedMonth.getFullYear()
        }
    },
  
    computed: {
        getRussianMonth() {
            return this.selectedMonth.toLocaleString('en-EN', {month: 'long', year: "numeric"})
        },
    },
  };
  const app = Vue.createApp(App);
  app.mount("#app");
  