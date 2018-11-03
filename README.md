![Streamlight](./.github/images/streamlight.png)

`Streamlight` is an open source custom app launcher built in [Electron](electronjs.org).

## Getting Started
First of all you'll wanna clone this repository by using:
```bash
git clone https://github.com/rixgarregid/Streamlight.git
```
in your terminal. Keep in mind to be in the directory where you wanna download `Streamlight`.

Then install the dependencies via `npm`:
```bash
npm install
```
And now you can run the app normally:
```bash
npm start
```
or in development mode.
```bash
npm run dev
```

## Adding your programs to Streamlight

In order to add any program you want Streamlight to search for it, type the `add` command *(see [commands]() section)* and drag and drop your program's executable file in the add panel.

## Keyboard shortcuts

- `Command or Control + Space` Toggles Streamlight.
- `Command or Control + Shift + Space` Restores Streamlight's default position.
- `Command or Control + Shift + R` Reloads Streamlight app.

## Commands

Here you have a complete list of commands `Streamlight` has available.

- `add` Displays a drag and drop panel to add your apps to Streamlight.
- `center` Sets Streamlight's window to the center of the screen..
- `commands` Shows all the available commands.
- `quit` Quits Streamlight.
- `settings` Shows Streamlight settings panel.
- `welcome` Displays the welcome guide.

## Development commands

The following chart shows all the available npm commands to be used in development.

Command | Description
--- | ---
`npm install` | Installs the project's dependencies.
`npm start` | Runs the app normally.
`npm run dev` | Runs `Streamlight` in development mode.
`npm run build` | Compiles `.pug` and `.styl` files to `.html` and `.css` respectively.
`npm run build:watch` | Watchs for changes in the `static` folder and runs `npm run build` when a file has been modified and saved.
`npm run clean` | Deletes `config.json`, `apps.json`, `commands.json` files and the `dist` folder to restore app defaults.
`npm run dist` | Builds the binaries of the app and creates the `dist` folder if it haven't been created yet. Binaries are generated for the host platform.

As Streamlight is built in Electron, it's essential you have installed Node.js to work on this app.
