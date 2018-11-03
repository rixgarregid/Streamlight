# Changelog

### 0.2.0-beta
*12 October 2018*

- Redesigned some parts of the program's architecture.
- Redesigned UI CSS structure. *(see [Streamlight UI](./Streamlight UI.md))*
- Redesigned command system. Now instead of using `.settings` you'll just wanna type `settings`.
- Some graphical changes to **settings**, **commands** and **welcome** panels.
- The new **keymap** command lets you customize all Streamlight keyboard shortcuts.
- New commands available: **keymap**, **devtools**, **google**, **reset**, **lock** and **unlock**. To see what each one does [read this](../README.md#commands).
- Changed the way apps are stored. Instead of creating a shortcut for each added app, now only the name and the path to the app is stored in the `apps.json` file.
- Streamlight now does an auto-backup for your data files, `apps.json`, `config.json` and `keymap.json` into your system's application data folder.
- Minor internal changes. (See commit history).

### 0.1.0-beta
*5 September 2018*

- IT'S ALIVE! First "stable" version of Streamlight.
