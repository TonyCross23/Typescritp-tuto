import Joi from "joi";
import { model, Schema } from "mongoose";

//validation schema
export const TodoSchemaValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  done: Joi.boolean().required(),
});

//todo interface
interface ITodo {
  title: string;
  description: string;
  done: boolean;
}

//todo schema
const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    done: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", TodoSchema);
