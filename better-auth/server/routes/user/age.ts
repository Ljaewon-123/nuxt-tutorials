import { z } from "zod";
import { getValidatedQuery } from "h3";

const userSchema = z.object({
  name: z.string().min(3).max(20),
  age: z.number({ coerce: true }).positive().int(),
});

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, userSchema.parse);
  return `Hello ${query.name}! You are ${query.age} years old.`
});

// /?name=John&age=42
