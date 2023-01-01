import database from "../starter/database.js";
const LessonsSchema = new database.Schema({
    name: String,
    description: String,
    slug: String
}, {versionKey: false});
const Lessons = database.model('lessons', LessonsSchema)
export default Lessons