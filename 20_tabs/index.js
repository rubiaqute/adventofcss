const App = {
  data() {
    return {
      selectedEpisode: null,
      episodesList: [
        {
          episodeId: 39,
          title: "Tech to Look Forward to in 2022",
          description:
            "In this episode, Amy and James discuss the future of web development: Astro, Veet, Supabase, SvelteKit, Redwood.js, Blitz.js, GitHub Co-Pilot, Web Assembly, Blockchain, w3, no-code, and low-code.",
        },
        {
          episodeId: 38,
          title: "2021 Gift Guide",
          description:
            "This episode is full of picks! Amy and James talk about all of their favorite things, just in time for the holidays.",
        },
        {
          episodeId: 37,
          title: "Building a Course",
          description:
            "In this episode, Amy and James discuss all the things that go into course creation: why? What? How? Where to Host? Building the right audience",
        },
        {
          episodeId: 36,
          title: "SVGs FTW",
          description:
            "In this episode, Amy and James discuss all things SVGs: what is, why and when to reach for it, and seven different ways to get an SVG on the page, and the pros and cons of each method",
        },
        {
          episodeId: 35,
          title: "Crossover Episode with Purrfect Dev",
          description:
            "This is a crossover episode with our friends, Alex Patterson and Brittney Postma from the Purrfect.dev podcast. In this episode, we all discuss our jobs. Even though we're all in tech, our day- to - day work looks vastldifferent.",
        },
        {
          episodeId: 34,
          title: "Getting git",
          description:
            "In this episode, Amy and James explain the fundamentals of git and their most-used commands. They also explain basic different workflows, if you're working with a team or by yourself",
        },
        {
          episodeId: 33,
          title: "Small Design Tweaks that Make All the Difference",
          description:
            "In this episode, Amy and James talk about small design tweaks that you can make that will make a big difference. These recommendations are helpful if you're looking for basic principles and guidelines to take your site to the next level.",
        },
      ],
    };
  },
  created() {
    this.selectedEpisode = this.episodesList[0]
  },

  methods: {
   selectEpisode(episodeIndex) {
    this.selectedEpisode = this.episodesList[episodeIndex];
   },
   
  },
  computed: {
    getImagePath() {
        return `./images/cover__episode-${this.selectedEpisode.episodeId}.png`;
    },

    getLink() {
        return `https://www.compressed.fm/episode/${this.selectedEpisode.episodeId}`;
    }
  }
};
const app = Vue.createApp(App);
app.mount("#app");
