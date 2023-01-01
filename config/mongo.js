import dotenv from 'dotenv'
dotenv.config()
const data = {
    database: process.env.APP_DATABASE_MONGO || "test",
    host: process.env.APP_HOST_MONGO || "host",
    password: process.env.APP_PASSWORD_MONGO || "password",
    type: process.env.APP_TYPE_MONGO || "cluster",
    port: process.env.APP_PORT_MONGO || "27017",
    uri: process.env.APP_URI_MONGO || "cluster0.uknown.mongodb.net",
    retry_writes: process.env.APP_RETRYWRITES_MONGO || "true",
    w: process.env.APP_W_MONGO || "majority",
}
const mongo_index = data.type == "cluster" ? "mongodb+srv://" : "mongodb://"
let mongo;
if(data.type == "cluster") {
    mongo = mongo_index
    .concat(data.host+":")
    .concat(data.password+"@")
    .concat(data.uri+"/")
    .concat(data.database+"?retryWrites=")
    .concat(data.retry_writes+"&w=")
    .concat(data.w)
} else {
    data.host="localhost"
    mongo = mongo_index
    .concat(data.host+":")
    .concat(data.port)
}
export default mongo