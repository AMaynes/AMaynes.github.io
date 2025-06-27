// genericListLoader.js — supports <Entry> blocks

function loadList(textFile, listId) {
  fetch(textFile)
    .then(res => res.text())
    .then(text => {
      const entries = text.split(/<Entry-End>/i)
        .map(block => block.trim())
        .filter(Boolean);

      const items = [];

      entries.forEach(entry => {
        const nameMatch = entry.match(/Name:\s*"(.+?)"/);
        const pathMatch = entry.match(/PDF-Path:\s*"(.+?)"/);
        if (nameMatch && pathMatch) {
          items.push({
            name: nameMatch[1],
            path: pathMatch[1]
          });
        }
      });

      // Sort alphabetically by name
      items.sort((a, b) => a.name.localeCompare(b.name));

      // Render into the target UL
      const ul = document.getElementById(listId);
      items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.path;
        a.textContent = item.name;
        li.appendChild(a);
        ul.appendChild(li);
      });
    })
    .catch(err => console.error('Error loading list:', err));
}