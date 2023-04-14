# AdBlock Filter Generator Extension

A Chrome extension that generates an adblock syntax filter by combining multiple host files and blocklists. This extension allows users to create a custom filter list to enhance their ad-blocking experience by consolidating various lists they find effective.

## Features

- Easily select multiple host files to be combined.
- Generates an adblock syntax filter by parsing host files and blocklists.
- Removes duplicate entries and sorts the resulting list alphabetically.
- Exports the combined filter list as a downloadable text file named "blocklist.txt."
- Progress bar to show the filter generation process.

## Installation

1. Download or clone this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner of the page.
4. Click "Load unpacked" and select the "adblock-filter-generator" folder you downloaded or cloned.
5. The extension should now be installed and visible in your browser toolbar.

## Usage

1. Click on the extension icon in the browser toolbar to open the popup window.
2. Click on the "Choose Files" button and select one or more host files or blocklists you want to combine.
3. Click the "Generate Filter" button.
4. The extension will process the files, remove duplicates, and sort the entries alphabetically, while displaying a progress bar.
5. The generated filter list will be downloaded as a text file named "blocklist.txt."
