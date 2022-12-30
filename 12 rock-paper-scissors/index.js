const pages = {
  start: "start",
  result: "result",
};

const App = {
  data() {
    return {
      choiceItems: ["rock", "scissors", "paper"],
      selectedItem: null,
      computerItem: null,
      currentPage: pages.start,
    };
  },

  methods: {
    getImage(item) {
      return `./images/${item}.png`;
    },

    selectItem(item) {
      this.selectedItem = item;

      do {
        this.getComputerChoice();
      } while (this.computerItem === this.selectedItem);

      this.currentPage = pages.result;
    },

    getComputerChoice() {
      const computerIndex = Math.floor(Math.random() * 3);
      this.computerItem = this.choiceItems[computerIndex];
    },

    getBackgroundClass() {
      return this.isUserWin ? "win" : "lose";
    },

    restartGame() {
      this.selectedItem = null;
      this.computerItem = null;
      this.currentPage = pages.start;
    }
  },

  computed: {
    isStartPage() {
      return this.currentPage === pages.start;
    },

    isUserWin() {
      switch (this.selectedItem) {
        case "rock":
          return this.computerItem === "scissors";
        case "paper":
          return this.computerItem === "rock";
        case "scissors":
          return this.computerItem === "paper";
        default:
          return false;
      }
    },
  },
};
const app = Vue.createApp(App);
app.mount("#app");
