//const postRouter = require('./postRoutes')
const postRouter = require('./postRoutes'); // Đường dẫn đến file route
const meRouter = require('./meRoutes')
function route(app){
    // Đăng ký routes
app.use('/posts', postRouter);
app.use('/me', meRouter);
}

module.exports = route;