module.exports = {
    defendHF: async function (req, res) {
        let ip = req.connection.remoteAddress || '';
        _console.dir('客户端IP:'+req.connection.remoteAddress);
        if (ip) {
            
        }
    }
}