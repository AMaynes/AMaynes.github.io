// 1. Fetch the text file
fetch('publications.txt')
  .then(res => res.text())
  .then(text => {
    // 2. Split into non-empty lines
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(l => l);

    // 3. Parse each line into {name, pdf}
    const publications = lines.map(line => {
      const [namePart, pdfPart] = line.split(/~pdf-path: \s*/i);
      return {
        name: namePart.trim(),
        pdf:  pdfPart.trim()
      };
    });

    // 4. Sort alphabetically
    publications.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // 5. Render into UL#pub-list
    const listEl = document.getElementById('pub-list');
    publications.forEach(pub => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href        = pub.pdf;
      a.textContent = pub.name;
      li.appendChild(a);
      listEl.appendChild(li);
    });
  })
  .catch(err => console.error('Error loading publications:', err));