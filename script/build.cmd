@echo off
electron-packager .. Streamlight --overwrite --electron-version=1.8.4 --prune=true --out=../dist --icon=../resources/icons/win/icon.ico --version-string.CompanyName=\"Streamlight\" --version-string.FileDescription \"A custom app launcher powered by Electron.\" --version-string.ProductName=\"Streamlight\"
