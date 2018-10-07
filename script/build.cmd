@echo off
electron-packager .. Streamlight --overwrite --electron-version=1.8.4 --prune=true --out=../dist --icon=../resources/icons/win/icon.ico --version-string.CompanyName=\"Streamlight\" --version-string.FileDescription %npm_package_description% --version-string.ProductName=\"Streamlight\"
