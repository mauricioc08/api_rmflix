let imdb_key = 'k_0p88pyxe' //k_r97nvdxs

let idmovie = location.search.split('id=')[1] // melhorar

if (idmovie) {
  fetch('https://imdb-api.com/API/Trailer/' + imdb_key + '/' + idmovie)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      let content = '<ul>'
      content += '<li>'
      content += '<h1>' + data.videoDescription + '</h1>'
      content += '<a href="?id=' + data.id + '">'
      content +=
        '<iframe src="' +
        data.linkEmbed +
        '" height="600" width="860" title="Iframe Example"></iframe>'
      content += data.title
      content += '</a>'
      content += '</li>'

      content += '</ul>'

      document.getElementById('content-show').innerHTML = content
    })
} else {
  getMoviesApi(
    'https://imdb-api.com/en/API/Top250Movies/' + imdb_key,
    'show-filmes'
  )
  getMoviesApi(
    'https://imdb-api.com/en/API/MostPopularMovies/' + imdb_key,
    'show-breves'
  )
  getMoviesApi('https://imdb-api.com/en/API/Top250TVs/' + imdb_key, 'show-tv')
}

function getMoviesApi(url, target) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      getMovies(data, target)
    })
}

function getMovies(data, target) {
  let content = ''

  data.items.forEach(function (linha) {
    content += '<div class="item">'
    content +=
      '<a href="./show.html?id=' +
      linha['id'] +
      '" target="_blank"> <img class="box-film" src="' +
      linha['image'] +
      '" alt="' +
      linha['title'] +
      '"></a>'

    content += '</div>'
  })

  document.getElementById(target).innerHTML = content
}
