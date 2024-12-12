//const postRouter = require('./postRoutes')
const postRouter = require('./postRoutes'); // Đường dẫn đến file route
const meRouter = require('./meRoutes')
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes')
function route(app){
// Đăng ký routes
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/me', meRouter);
app.use('/user', userRouter);

}

module.exports = route;