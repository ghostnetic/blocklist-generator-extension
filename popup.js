document.getElementById('generate-filter').addEventListener('click', () => {
  const fileInput = document.getElementById('file-input');
  const files = fileInput.files;

  if (files.length === 0) {
    alert('Please select at least one file to generate the filter.');
    return;
  }

  const fileContentsPromises = Array.from(files).map(file => readFileAsText(file));
  Promise.all(fileContentsPromises)
    .then(fileContents => {
      chrome.runtime.sendMessage(
        { action: 'generateFilter', fileContents },
        response => {
          if (response && response.error) {
            alert(response.error);
          }
        }
      );
    })
    .catch(error => {
      alert('Error reading files. Try again.');
    });
});

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

document.getElementById('file-input').addEventListener('change', (event) => {
  const fileInput = event.target;
  const fileNames = Array.from(fileInput.files)
    .map(file => file.name)
    .join(', ');
  document.getElementById('file-selected-label').textContent = fileNames || 'No file chosen';
});
