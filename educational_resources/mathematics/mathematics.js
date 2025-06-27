// 1. Fetch the text file
fetch('educational_resources/mathematics/mathematics_notes_list.txt')
  .then(res => res.text())
  .then(text => {
    // 2. Split into non-empty lines
    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(l => l);

    // 3. Parse each line into {name, pdf}
    const mathematics_notes_list = lines.map(line => {
      const [namePart, pdfPart] = line.split(/~pdf-path: \s*/i);
      return {
        name: namePart.trim(),
        pdf:  pdfPart.trim()
      };
    });

    // 4. Sort alphabetically
    mathematics_notes_list.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // 5. Render into UL#pub-list
    const listEl = document.getElementById('pub-list');
    mathematics_notes_list.forEach(pub => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href        = pub.pdf;
      a.textContent = pub.name;
      li.appendChild(a);
      listEl.appendChild(li);
    });
  })
  .catch(err => console.error('Error loading mathematics_notes_list:', err));