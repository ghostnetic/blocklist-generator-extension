# AdBlock Blocklist Generator

This Chrome extension generates an filter in the form of a text file from multiple host files and blocklists. It combines all the selected lists, eliminates duplicate lines, and creates a filter compatible with adblocker syntax.

## Features

Features

- Combine multiple host files and blocklists
- Convert rules to adblock-style syntax
- Remove duplicate lines
- Discard redundant rules due to existing domain rules
- Display the number of duplicate lines removed and domains compressed
- Download the generated filter as a `.txt` file

## Included Filter Lists

The extension comes with a predefined set of filter lists that you can choose from:
- OISD Big: https://big.oisd.nl/
- OISD Small: https://small.oisd.nl/
- HaGeZi's Pro DNS Blocklist: https://raw.githubusercontent.com/hagezi/dns-blocklists/main/adblock/pro.txt
- HaGeZi's Normal DNS Blocklist: https://raw.githubusercontent.com/hagezi/dns-blocklists/main/adblock/multi.txt
- NoTracking: https://raw.githubusercontent.com/notracking/hosts-blocklists/master/adblock/adblock.txt
- 1Hosts (Pro): https://o0.pages.dev/Pro/adblock.txt
- 1Hosts (Lite): https://o0.pages.dev/Lite/adblock.txt
- hBlock https://hblock.molinero.dev/hosts_adblock.txt
- NoTrack Tracker Blocklist: https://gitlab.com/quidsup/notrack-blocklists/-/raw/master/trackers.hosts

You can select any combination of these filter lists or add your own host files or blocklists to generate a custom filter.

## Installation

1. Clone this repository or download the zip file. You can also download the source code.
2. Install the extension by following these steps:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" by toggling the switch in the top-right corner.
   - Click "Load unpacked" and select the directory containing the source code.

## Usage

1. Click on the extension icon.
2. Select from the available blocklists or upload your own host files.
3. Click the "Generate Filter" button.
4. The extension will generate the filter and automatically download it as a `.txt` file.

## License

This project is released under the MIT License.
