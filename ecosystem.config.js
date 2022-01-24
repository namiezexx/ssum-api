module.exports = {
    apps: [{
        name: 'ssum api',
        script: './app.js',
        instances: 4,
        exec_mode: 'cluster'
    }]
}