function show(id) {
  document.getElementById(id).style.display = 'inline-block';
}

// fetch('./words.json')
fetch('/.netlify/functions/db?mode=read')
  .then(response => response.json())
  .then(data => {
    
    let table = '<table>'
    
    data.forEach(function(item, index) {

      table += 
        `<tr>
          <td class="eng show" onclick="show('${item._id}')">
            ${item.english}
          </td>

          <td class="search">
            <a target="_blank" href="https://www.google.com/search?q=define+${item.english}">Google</a>
          </td>

          <td class="bng">
            <span id="${item._id}" class="word" style="display: none;">
              ${item.bangla}
            </span>
          </td>
        </tr>`
    })

    table += '</table>'

    document.getElementById('app').innerHTML = table
  })
