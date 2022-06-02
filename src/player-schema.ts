import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema({
	uid: {
		type: String,
		required: true,
	},
	minutesRebel: {
		type: Number,
		required: true,
	},
	minutesAPC: {
		type: Number,
		required: true,
	},
	minutesNHS: {
		type: Number,
		required: true,
	},
	minutesHato: {
		type: Number,
		required: true,
	},
	minutesCtrg: {
		type: Number,
		required: true,
	},
});

export default mongoose.model("PlayerData", schema, "PlayerData");
