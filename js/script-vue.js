var vm = new Vue({
  el: '#app',
  data: {
    items: ''
  },
  created: function () {
    fetch('./new-words.txt')
        .then(response => response.text())
        .then(data => {
          this.items = data.split("\n")
        })
  },
  methods: {
    getWord(item){
      return item.split('=')[0]
    },
    getLink(item){
      return 'https://www.google.com/search?q=define+'+this.getWord(item)
    },
    getMeaning(item){
      return item.split('=')[1]
    },
    toggle(id){
      document.getElementById(id).style.display = 'block'
    }
  }
})
