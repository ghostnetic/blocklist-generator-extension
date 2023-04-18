function parseHostsFile(content) {
  const fileLines = content.split('\n');
  const adblockRules = fileLines.filter(line => {
    const trimmedLine = line.trim();
    return !trimmedLine.startsWith('#') &&
           !trimmedLine.startsWith('!') &&
           trimmedLine !== '';
  }).map(line => {
    if (line.startsWith('||') && line.endsWith('^')) {
      return line;
    } else {
      const lineParts = line.split(/\s+/);
      const domain = lineParts[lineParts.length - 1];
      return `||${domain}^`;
    }
  });
  return adblockRules;
}

function removeRedundantRules(rules) {
  const filteredRules = [];
  const domainSet = new Set();

  rules.forEach(rule => {
    const domain = rule.slice(2, -1);
    const baseDomain = domain.split('.').slice(-2).join('.');
    if (!domainSet.has(baseDomain)) {
      filteredRules.push(rule);
      domainSet.add(baseDomain);
    }
  });

  return filteredRules;
}

function generateFilter(fileContents, fileName = 'blocklist.txt') {
  let duplicatesRemoved = 0;
  const uniqueRules = new Set();

  fileContents.forEach(content => {
    const adblockRules = parseHostsFile(content);
    adblockRules.forEach(rule => {
      if (!uniqueRules.has(rule)) {
        uniqueRules.add(rule);
      } else {
        duplicatesRemoved++;
      }
    });
  });

  const compressedRules = removeRedundantRules(Array.from(uniqueRules));
  const domainsCompressed = uniqueRules.size - compressedRules.length;
  duplicatesRemoved += domainsCompressed;
  const sortedRules = compressedRules.sort();
  const header = generateHeader(sortedRules.length, duplicatesRemoved, domainsCompressed);
  const filterContent = [header, ...sortedRules].join('\n');

  const blob = new Blob([filterContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);

  return { filterContent, duplicatesRemoved, domainsCompressed };
}

function generateHeader(domainCount, duplicatesRemoved, domainsCompressed) {
  const date = new Date().toISOString().slice(0, 10);
  return `# Title: AdBlock Filter Generator
# Description: Chrome Extension to generate adblock syntax filter from multiple host files and blocklists
# Created: ${date}
# Domain Count: ${domainCount}
# Duplicates Removed: ${duplicatesRemoved}
# Domains Compressed: ${domainsCompressed}
#===============================================================`;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'generateFilter') {
    try {
      console.log('Received file contents:', request.fileContents);
      const { filterContent, duplicatesRemoved, domainsCompressed } = generateFilter(request.fileContents, request.fileName);

      console.log('Generated filter content:', filterContent);

      sendResponse({ success: true, duplicatesRemoved, domainsCompressed });
    } catch (err) {
      console.error('Error generating filter:', err);
      sendResponse({ error: 'Error generating filter. Check the files and try again.' });
    }
  }

  // Required for async response handling.
  return true;
});
