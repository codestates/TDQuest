// const redis = require('redis');
// const redisClient = redis.createClient(6379);
// redisClient.connect()

// module.exports = {
//     redisSet : async (key, value) => { // 로그인
//         redisClient.set(key, JSON.stringify(value))
// //         let key = req.body.email;
// //      redisClient.get(key, (error, data) => {
// //         if (error) {
// //             res.status(400).json({
// //             ok: false,
// //             message: error});
// //         }
// //         if (data !== null) {
// //          데이터가 cache되어 있으면, parsing하여 response
// //             res.status(200).send({
// //             ok: true,
// //             data: JSON.parse(data),
// //             });
// //         }
// //         else ; //통과
// //   });
//     },

//     redisGet : async (req, res, next) => { // 인증
//         redisClient.get(key, (err, data) => {
//             if (err) {
//                 res.status(400).json({message : 'error'})
//             }
//             if (data !== null) {
//                 response.status(200).json({data : JSON.parse(data)})
//             }
//             else {
//                 next()
//             }
//         })
//     },

//     redisDestory : (req,) => {
//     }
// }   