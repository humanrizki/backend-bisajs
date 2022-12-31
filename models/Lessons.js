import database from "./../config/database.js";
const LessonsSchema = new database.Schema({
    name: String,
    description: String
}, {versionKey: false});
const Lessons = database.model('lessons', LessonsSchema)
export default Lessons