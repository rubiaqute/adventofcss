const App = {
  data() {
    return {
      menuItems: [
        {
          id: 1,
          name: "Bacon with eggs",
          imagePath: "./images/plate__bacon-eggs.png",
          price: 4.5,
        },
        {
          id: 2,
          name: "Chicken Salad",
          imagePath: "./images/plate__chicken-salad.png",
          price: 3.5,
        },
        {
          id: 3,
          name: "Fish Sticks with Fries",
          imagePath: "./images/plate__fish-sticks-fries.png",
          price: 5,
        },
        {
          id: 4,
          name: "French Fries with Ketchup",
          imagePath: "./images/plate__french-fries.png",
          price: 2.5,
        },
        {
          id: 5,
          name: "Ravioli",
          imagePath: "./images/plate__ravioli.png",
          price: 4.5,
        },
        {
          id: 6,
          name: "Salmon and Vegetables",
          imagePath: "./images/plate__salmon-vegetables.png",
          price: 7,
        },
        {
          id: 7,
          name: "Spaggethi with Meat Sauce",
          imagePath: "./images/plate__spaghetti-meat-sauce.png",
          price: 4,
        },
        {
          id: 8,
          name: "Tortellini",
          imagePath: "./images/plate__tortellini.png",
          price: 4.5,
        },
      ],
      selectedMenuItems: [],
    };
  },
  methods: {
    addToCart(id) {
      const menuItemToAdd = this.menuItems.find((item) => item.id === id);
      menuItemToAdd.quantity = 1;
      this.selectedMenuItems.push(menuItemToAdd);
      console.log(this.selectedMenuItems);
    },

    isInCart(id) {
      return Boolean(
        this.selectedMenuItems.find((cartItem) => cartItem.id === id)
      );
    },

    deleteFromCart(id) {
      this.selectedMenuItems = this.selectedMenuItems.filter(
        (cartItem) => cartItem.id !== id
      );
    },

    decreaseQuantity(id) {
      const selectedMenuItem = this.selectedMenuItems.find(
        (item) => item.id === id
      );
      selectedMenuItem.quantity = selectedMenuItem.quantity - 1;
    },

    increaseQuantity(id) {
      const selectedMenuItem = this.selectedMenuItems.find(
        (item) => item.id === id
      );
      selectedMenuItem.quantity = selectedMenuItem.quantity + 1;
    },
  },
  computed: {
    getSubTotal() {
      return this.selectedMenuItems.reduce(
        (acc, cur) => acc + cur.quantity * cur.price,
        0
      );
    },
    getTax() {
      return Math.round(this.getSubTotal * 0.0975 * 100) / 100;
    },
  },
};
const app = Vue.createApp(App);
app.mount("#app");
