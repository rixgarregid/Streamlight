![Streamlight](./.github/img/Streamlight Logo.png)

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

## Commands

Here you have a complete list of commands `Streamlight` has available.

- `Command or Control + Space` Toggles Streamlight.
- `add` Displays a drag and drop panel to add your apps to `Streamlight`.
- `center` Sets `Streamlight`'s window to the center of the screen. You can also achieve this by pressing `Command or Control + Shift + Space` or from the tray menu.
- `commands` Shows all the available commands.
- `quit` Quits `Streamlight`.
- `settings` Shows `Streamlight` settings panel.
- `welcome` Displays the welcome guide.

## Development

Command | Description
--- | ---
`npm install` | Installs the project's dependencies.
`npm start` | Runs the app normally.
`npm run dev` | Runs `Streamlight` in development mode.
`npm run build` | Compiles `.pug` and `.styl` files to `.html` and `.css` respectively.
`npm run build:watch` | Watchs for changes in the `static` folder and runs `npm run build` when a file has been modified and saved.
`npm run clean` | Deletes `config.json`, `apps.json`, `commands.json` files and the `dist` folder to restore app defaults.
`npm run dist` | Builds the binaries of the app and creates the `dist` folder if it haven't been created yet. Binaries are generated for the host platform.
