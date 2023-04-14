const BLOCKLISTS = [
  { name: ' - oisd big', url: 'https://big.oisd.nl/' },
  { name: ' - oisd small', url: 'https://small.oisd.nl/' },
  { name: " - HaGeZi's Pro DNS Blocklist", url: 'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/adblock/pro.txt' },
  { name: " - HaGeZi's Normal DNS Blocklist", url: 'https://raw.githubusercontent.com/hagezi/dns-blocklists/main/adblock/multi.txt' },
  { name: ' - notracking', url: 'https://raw.githubusercontent.com/notracking/hosts-blocklists/master/adblock/adblock.txt' },
  { name: ' - 1Hosts (Pro)', url: 'https://o0.pages.dev/Pro/adblock.txt' },
  { name: ' - 1Hosts (Lite)', url: 'https://o0.pages.dev/Lite/adblock.txt' },
  { name: ' - hBlock', url: 'https://hblock.molinero.dev/hosts_adblock.txt' },
  { name: ' - NoTrack Tracker Blocklist', url: 'https://gitlab.com/quidsup/notrack-blocklists/-/raw/master/trackers.hosts' },
];

const blocklistContainer = document.getElementById('blocklist-container');

BLOCKLISTS.forEach((blocklist, index) => {
  const listItem = document.createElement('li');
  listItem.classList.add('blocklist-item');
  listItem.innerHTML = `
    <input type="checkbox" id="blocklist-${index}">
    <label for="blocklist-${index}">${blocklist.name}</label>
    <a href="${blocklist.url}" target="_blank" rel="noopener noreferrer" class="external-link">&#x2197;</a>
  `;
  blocklistContainer.appendChild(listItem);
});

document.getElementById('generate-filter').addEventListener('click', () => {
  const fileInput = document.getElementById('file-input');
  const files = fileInput.files;
  const selectedBlocklists = BLOCKLISTS.filter((_, index) => {
    return document.getElementById(`blocklist-${index}`).checked;
  });

  if (files.length === 0 && selectedBlocklists.length === 0) {
    alert('Please select at least one file or blocklist to generate the filter.');
    return;
  }

  const blocklistFetchPromises = selectedBlocklists.map((blocklist) => fetch(blocklist.url).then((response) => response.text()));
  const fileContentsPromises = Array.from(files).map((file) => readFileAsText(file));

  Promise.all([...blocklistFetchPromises, ...fileContentsPromises])
    .then((contents) => {
      chrome.runtime.sendMessage(
        { action: 'generateFilter', fileContents: contents },
        (response) => {
          if (response && response.error) {
            alert(response.error);
          }
        }
      );
    })
    .catch((error) => {
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
    .map((file) => file.name)
    .join(', ');
  document.getElementById('file-selected-label').textContent = fileNames || 'No file chosen';
});

