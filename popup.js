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
          if (response.error) {
            alert(response.error);
          } else {
            downloadFile('my-blocklist.txt', response.filterContent);
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

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
