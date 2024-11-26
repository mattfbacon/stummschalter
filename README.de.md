# Stummschalter

([en](/README.md) | de)

Eine Firefox-Erweiterung um Tabs automatisch stumm- bzw. wieder lautzuschalten nach Wünsch.
Arbeitet anhand einer Liste von Webseiten die zugelassen sind, Audio zu spielen. Die werden beim Laden automatisch lautgeschaltet.
Der Benutzer kann auch einen Tab beliebig manuell stumm- bzw. lautschalten, wobei die Erweiterung den Tab ignoriert. Dieser Override-Modus wird in der Adressleiste angezeigt und kann mit einem Klick auf das angezeigte Symbol ausgeschaltet werden.

## Benutzung

```bash
./build.sh
zip -r /tmp/package.zip manifest.json icons out
# Lade /tmp/package.zip als Erweiterung-Paket in Firefox
```

## Lizenz

AGPL-3.0-or-later
