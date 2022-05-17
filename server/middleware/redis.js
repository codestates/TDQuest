const redis = require('redis');
const redisClient = redis.createClient({
      host : "127.0.0.1",
      port : 6379,
      legacyMode: true
    });
redisClient.connect()

module.exports = {
    redisSet : (key, value) => { // 로그인
        redisClient.set(key, JSON.stringify(value))
    },

    redisGet : (req, res, next) => { // 인증
        redisClient.get(key, (err, data) => {
            if (err) {
                res.status(400).json({message : 'error'})
            }
            if (data !== null) {
                response.status(200).json({data : JSON.parse(data)})
            }
            else {
                next()
            }
        })
    },
    redisClient
}   