import { Schema, model } from "mongoose";

const nameCollection = 'message';

const MessageSchema = new Schema({
    user:{type: string, required: [true, 'el nombre del usuario es obligatorio']},
    message:{type: string, required: [true, 'el mensaje es obligatorio']},
});

export const messageModel = model(nameCollection, MessageSchema);
