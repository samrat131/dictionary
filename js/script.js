function show(id) {
  document.getElementById(id).style.display = 'inline-block';
}

function update(id, eng, ban) {
  document.getElementById('id').value = id;
  document.getElementById('eng').value = eng;
  document.getElementById('ban').value = ban;
  document.getElementById('mode').value = 'update';
}

function memorized(id) {
  const code = prompt('Please input code')
  if (code) {
    document.getElementById('id').value = id;
    document.getElementById('code').value = code;
    document.getElementById('mode').value = 'update';
    document.getElementById('memorized').value = 1;
    document.getElementById('frm-add').submit();
  }
}

function deleteItem(id) {
  const code = prompt('Please input code')
  if (code) {
    document.getElementById('id').value = id;
    document.getElementById('code').value = code;
    document.getElementById('mode').value = 'delete';
    document.getElementById('frm-add').submit();
  }
}

fetch('/.netlify/functions/db?mode=read')
  .then(response => response.json())
  .then(data => {
    
    let table = '<table>'
    
    data.forEach(function(item, index) {
      
      if (item.memorized === true) {
        return
      }

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

            <span class="delete pull-right" onclick="deleteItem('${item._id}')">❌</span>
            <span class="edit pull-right" onclick="memorized('${item._id}')">✅</span>
            <span class="edit pull-right" onclick="update('${item._id}','${item.english}','${item.bangla}')">📝</span>

          </td>
        </tr>`
    })

    table += '</table>'

    document.getElementById('app').innerHTML = table
  })
