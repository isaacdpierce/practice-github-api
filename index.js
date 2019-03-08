'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();

  // iterate through the repos array and make an li item for each repo
  for (let repo of responseJson) {
    console.log(repo.html_url);

    $('#results-list').append(
      `<li><a href="${repo.html_url}" target='blank'><h3>${repo.name}</h3></a>`
    );
  }
  // display the results section
  $('#results').removeClass('hidden');
}

function getRepos(searchTerm) {
  const searchURL = `https://api.github.com/users/${searchTerm}/repos`;

  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);
