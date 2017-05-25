(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    console.log('inside renderMovies, movies=', movies);
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  function getMovies() {

    if ($('#search').val()) {
      var str = 'https://omdb-api.now.sh/?s=' + $('#search').val();
      console.log('In getMovies, str: ' + str);
      $.get(str).then(function(data) {
        console.log('In getMovies, data: ', data);
        console.log('In getMovies, data.Search: ', data.Search);
        movies.length = 0;
        for (var i=0; i<data.Search.length; i++) {
          // console.log('data.Search[i]=', i, data.Search[i])
          var amovie = {};
          amovie.id = data.Search[i].imdbID;
          amovie.poster = data.Search[i].Poster;
          amovie.title = data.Search[i].Title;
          amovie.year = data.Search[i].Year;
          console.log('Inside get, amovie: ', i, amovie);
          movies.push(amovie);
        }
        console.log('Inside get, movies=', movies);
        renderMovies(movies );
      });
      $('#search').val('');

    } else {
      alert('You must enter a search keyword');
    }

    console.log("In checkMovie, movies= ", movies);

    return movies;
  }

  $('form').submit(function(e) {
    e.preventDefault();
    getMovies();
    // console.log('In form, movies= ', movies);
  });

})();
