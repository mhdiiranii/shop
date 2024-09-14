const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
module.exports = (app)=>{
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1',productRouter)
}