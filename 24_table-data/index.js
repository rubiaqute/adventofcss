const sortDirections= {
        asc: "asc",
        desc: "desc",
}

const sortFields = {
        id: "id",
        name: "name",
        email: "email",
        job: "jobTitle",
}

const DEFAULT_ACTIVE_PAGE = 1;
const ROWS_PER_PAGE = 10;


const App = {
  data() {
    return {
      personList: [],
      selectedPerson: null,
      activePage: DEFAULT_ACTIVE_PAGE,
      sorting: {
        direction: sortDirections.asc,
        field: sortFields.id,
      },
      activePage: 1,
    };
  },

  methods: {
    isPersonSelected(personId) {
      return personId === this.selectedPerson?.id;
    },

    selectPerson(person) {
      if (this.isPersonSelected(person.id)) {
        this.selectedPerson = null;
      } else {
        this.selectedPerson = person;
      }
    },

    isSortingActive(direction, field) {
      return (
        this.sorting.direction === direction && this.sorting.field === field
      );
    },

    changeSorting(direction, field) {
      this.sorting.direction = direction;
      this.sorting.field = field;
    },

    changeActivePage(e) {
      const value = +(e.target.value)
      this.activePage =  ((value >= 1) && (value <= this.totalPages)) ? value : DEFAULT_ACTIVE_PAGE    
    },

    decreaseActivePage()  {
      this.activePage = this.activePage === 1 ?  this.activePage : this.activePage - 1 ;
    },

    increaseActivePage()  {
      this.activePage =
        this.activePage === this.totalPages ?  this.activePage : this.activePage + 1;
    }
  },

  computed: {
    paginatedPersonList() {
      const sortedList = this.sortedPersonList;
      return [...sortedList].slice((this.activePage * 10) - 10, this.activePage * 10);
    },

    sortedPersonList() {
      const usortedPersonList = [...this.personList];
      usortedPersonList.sort((a, b) => {
        if (this.sorting.field === sortFields.id) {
          return this.sorting.direction === sortDirections.asc
            ? a.id - b.id
            : b.id - a.id;
        }

        return this.sorting.direction === sortDirections.asc
          ? String(a[this.sorting.field]).localeCompare(
              String(b[this.sorting.field])
            )
          : b[this.sorting.field].localeCompare(a[this.sorting.field]);
      });

      return usortedPersonList;
    },

    sortDirections() {
      return sortDirections;
    },

    sortFields() {
      return sortFields;
    },

    totalPages() {
      return Math.ceil(this.personList.length / ROWS_PER_PAGE);
    },
  },
  async created() {
    try {
      const res = await fetch("./data.json");
      this.personList = (await res.json()) || [];
    } catch {
      this.personList = [];
    }
  },
};
const app = Vue.createApp(App);
app.mount("#app");
