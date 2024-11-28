//const postRouter = require('./postRoutes')
const postRouter = require('./postRoutes'); // Đường dẫn đến file route
function route(app){
    // Đăng ký routes
app.use('/posts', postRouter);
}
module.exports = route;