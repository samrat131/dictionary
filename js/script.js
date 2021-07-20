function show(index) {
  document.getElementById('word-'+index).style.display = 'inline-block';
}

fetch('./new-words.txt')
  .then(response => response.text())
  .then(data => {

    let table = '<table>'
    let arr = data.split("\n")

    arr.forEach(function(item, index) {

      if (item.trim()=='') {
        return;
      }
      
      let word = item.split("=")

      table += 
        `<tr>
          <td class="eng show" onclick="show(${index})">
            ${word[0]}
          </td>

          <!--<td class="translate">
            <span onclick="show(${index})" class="show">Show</span>
          </td>-->

          <td class="search">
            <a target="_blank" href="https://www.google.com/search?q=define+${word[0]}">Google</a>
          </td>

          <td class="bng">
            <span id="word-${index}" class="word" style="display: none;">
              ${word[1]}
            </span>
          </td>
        </tr>`
    })

    table += '</table>'

    document.getElementById('app').innerHTML = table
  })

fetch('/.netlify/functions/hello')
  .then(response => response.json())
  .then(data => console.log(data));
