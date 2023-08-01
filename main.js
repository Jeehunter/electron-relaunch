const { app, BrowserWindow ,Menu} = require('electron');
const path = require('path')


const createWindow = () => {
    const window = new BrowserWindow({
        height: 800,
        width: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    window.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('ready', () => {
    Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            {
                role: 'appMenu', submenu: [

                    {
                        label: 'relaunch(); exit()', click() {
                            app.relaunch();
                            app.exit();
                        }
                    }
                ]
            }
        ])
    )
})
