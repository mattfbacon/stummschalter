# Stummschalter

(en | [de](/README.de.md))

A Firefox extension to automatically mute/unmute tabs following preferences.
Works with a list of websites that are allowed to play audio. They are automatically unmuted when they are loaded.
The user can also manually mute/unmute a tab at any time, in which case the extension does nothing. This override mode is shown in the address bar and can be disabled by clicking on the symbol.

## Usage

```bash
./build.sh
zip -r /tmp/package.zip manifest.json icons out
# Load /tmp/package.zip as an extension package in Firefox
```

## License

AGPL-3.0-or-later
