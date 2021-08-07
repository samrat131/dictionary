function show(id) {
  document.getElementById(id).style.display = 'inline-block';
}

function update(id, eng, ban) {
  document.getElementById('id').value = id;
  document.getElementById('eng').value = eng;
  document.getElementById('ban').value = ban;
  document.getElementById('mode').value = 'update';
}

function deleteItem(id) {
  const code = prompt('Please input code')
  document.getElementById('id').value = id;
  document.getElementById('code').value = code;
  document.getElementById('mode').value = 'delete';
  document.getElementById('frm-add').submit();
}

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

            <span class="delete pull-right" onclick="deleteItem('${item._id}')">&#128465;</span>
            
            <span class="edit pull-right" onclick="update('${item._id}','${item.english}','${item.bangla}')">&#9998;</span>

          </td>
        </tr>`
    })

    table += '</table>'

    document.getElementById('app').innerHTML = table
  })
