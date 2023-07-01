const NodeRSA = require('node-rsa');

module.exports = {
    defendHF: async function (req, res) {
        let ip = req.connection.remoteAddress || '';
        _console.dir('客户端IP:'+req.connection.remoteAddress);
        if (ip) {
            
        }
    },
    // rsa密码解密(pkcs8)
    decrypt: function(txt) {
        const privateKey = '-----BEGIN PRIVATE KEY-----MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMLs5zFXxuitW2jGMrMvO7Bg9GXJ9rfRfY2zVPPWXJP6n2sweauRPR262egpvyKLwctCgejJraH0twMHX3CQWvwKALatM77g4bElHsHMk0N0qTMxrcyhNL4FTXl3vvorKYSsHwfH8LjjmR1hGrLruWIPCzH++SmGe27ZRoeJKYLzAgMBAAECgYEArILfxaKqrmgmex7V5hFKYTodciyBBoQH+y2YZMj1XB21kzbup3G9xh8FFVxFBXzswUgWEwDSg4BBrBONWuDXM6bvf4WKDufCWAkA4VRgIhf/ajrvGixA3YAZUbnE3NonbMsoNZkvxh/68T3Ff9Yl5dMCnF4L5WElwmF3UEFdddkCQQDi2vEVPi561ArPIcsho2hKdgoXO5VUUTh31mFqoGU7fuhLIKk9IrakUDCmGj1mdMrO+NH6l3oZJOSX3jfNIsmXAkEA2/fRkV3zbzcQh0SFjCUR+mxsUXmT30B5xKRSdAJqRMrm3vuw9lNdCvkjEaqQwTh6zeVU19Uwuy2A3vX60gVlBQJBAMK5yt1ALeeTIeAgktvCB2B7KDg/FfR1b3I2XBKJsbu7OKxcUck/heVPTCMYPQI4WGoG3T8sTUtOBsZxohZ8uOsCQCjysSiGfNKvRXxo3ROBsx8TH/bq0wQ0VHauwEqoSHAV9XR9FixEyIVKa6TWQ6w0f2fk0S58mV2+0saus8p1BqECQCHTzxgdZjeloH867ZqjSiCtR/n24RdsDF0HbidKzNszhJDLB6hIo56PP0puWoIuthG2hMKs6Xvz83SJMnNg28c=-----END PRIVATE KEY-----'
        const encryptor = new NodeRSA(privateKey, 'pkcs8')
        return encryptor.decrypt(txt, 'utf8')
      }
}