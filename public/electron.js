const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

const devUrl = "http://localhost:3000";
const prodUrl = `file://${path.join(__dirname, "index.html")}`;

const createWindow = () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
		autoHideMenuBar: true,
	});

	window.loadURL(isDev ? devUrl : prodUrl);

	if (isDev) {
		window.webContents.openDevTools();
		// open dev tools in separate window
		window.webContents.openDevTools({ mode: "detach" });
	}

	// window.maximize();
	window.setFullScreen(true);
};

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (!BrowserWindow.getAllWindows().length) {
		createWindow();
	}
});
