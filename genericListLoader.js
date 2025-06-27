// genericListLoader.js

/**
 * Load a list from a text file where each line is:
 *   NAME ~pdf: PATH_TO_PDF
 * @param {string} textFile  Path to your .txt file
 * @param {string} listId    ID of the UL element to populate
 */
function loadList(textFile, listId) {
  fetch(textFile)
    .then(res => res.text())
    .then(text => {
      // Split into non-empty lines
      const lines = text
        .split('\n')
        .map(l => l.trim())
        .filter(Boolean);

      // Parse each line into { name, path }
      const items = lines.map(line => {
        const [namePart, pathPart] = line.split(/~pdf: \s*/i);
        return {
          name: namePart.trim(),
          path: pathPart.trim()
        };
      });

      // Sort alphabetically by name
      items.sort((a, b) => a.name.localeCompare(b.name));

      // Render into the target UL
      const ul = document.getElementById(listId);
      items.forEach(item => {
        const li = document.createElement('li');
        const a  = document.createElement('a');
        a.href        = item.path;
        a.textContent = item.name;
        li.appendChild(a);
        ul.appendChild(li);
      });
    })
    .catch(err => console.error('Error loading list:', err));
}