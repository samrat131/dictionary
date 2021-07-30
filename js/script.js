function show(index) {
  document.getElementById('word-'+index).style.display = 'inline-block';
}

// fetch('./words.json')
fetch('/.netlify/functions/db?mode=read')
  .then(response => response.json())
  .then(data => {
    
    let table = '<table>'
    
    data.forEach(function(item, index) {

      table += 
        `<tr>
          <td class="eng show" onclick="show(${index})">
            ${item.english}
          </td>

          <td class="search">
            <a target="_blank" href="https://www.google.com/search?q=define+${item.english}">Google</a>
          </td>

          <td class="bng">
            <span id="word-${index}" class="word" style="display: none;">
              ${item.bangla}
            </span>
          </td>
        </tr>`
    })

    table += '</table>'

    document.getElementById('app').innerHTML = table
  })

// fetch('https://nostalgic-bell-6b3f17.netlify.app/.netlify/functions/dbio?mode=read')
//   .then(response => response.json())
//   .then(data => console.log(data));
