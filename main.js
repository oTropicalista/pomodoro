const { app, BrowserWindow, nativeImage } = require("electron");

// Recarrega a aplicação após cada alteração
require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

function createWindow() {
  // const icon = nativeImage.createFromPath(`${app.getAppPath()}/build/icon.png`);
  const icon = nativeImage.createFromPath(`${__dirname}/build/tomato64.png`);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  // Janela
  const win = new BrowserWindow({
    icon: icon,
    width: 400,
    height: 550,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  // Abre o console do navegador (DevTools),
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Caso tenha conexão com db, fechar ela aqui
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // cria a janela se não foi criada.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
