import mongoose from "mongoose";
const QASchema = new mongoose.Schema({
  question: String,
  answer: String,
  user: {
    typeof: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export default QA = mongoose.model("QA", QASchema);
