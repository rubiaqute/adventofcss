const App = {
    data() {
      return {
        videoData: [],
        searchQuery: 'css'
      };
    },
  
    methods: {
        async getVideos() {
            try {
                const searchQueryTrimmed = this.searchQuery.trim()
                const key = 'AIzaSyCjbe5mltSCI0PQ1U3XWLRWKGd1nHubdJw'
                const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQueryTrimmed}&key=${key}`;
                const res = await fetch(url);
                const data = await res.json();
                this.videoData = data?.items || []
              } catch (err) {
                this.videoData = []
              }
        },
        getLink(videoId) {
          return `https://www.youtube.com/watch?v=${videoId}`
        }
    },
  
    computed: {
        getFirstVideoTitle() {
          return this.videoData[0]?.snippet?.title || ''
        },

        getFirstVideoDescription() {
          return this.videoData[0]?.snippet?.description || ''
        },
        getVideoImage() {
          return this.videoData[0]?.snippet?.thumbnails?.high?.url || ''
        },
        getFirstVideoLink() {
          return `https://www.youtube.com/watch?v=${this.videoData[0]?.id?.videoId}`
        }
    },
    created() {
        this.getVideos()
    }
  };
  const app = Vue.createApp(App);
  app.mount("#app");
  