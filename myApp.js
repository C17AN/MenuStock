const { link } = require("fs");
const { app, BrowserWindow } = require("electron");
const { menubar } = require("menubar");
const debug = require("electron-debug");

debug();

const mb = menubar();

mb.on("ready", () => {
  console.log("app is ready");
  // your app code here
});
