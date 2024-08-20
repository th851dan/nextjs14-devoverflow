import * as z from "zod";

export const QuestionValidation = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(20)).min(1).max(3),
});

export const AnswerValidation = z.object({
  answer: z.string().min(10),
});

const nameLengthErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.too_big ||
    issue.code === z.ZodIssueCode.too_small
  ) {
    return { message: "Name must be between 5 and 50 characters." };
  }
  return { message: ctx.defaultError };
};

export const ProfileValidation = z.object({
  name: z.string({ errorMap: nameLengthErrorMap }).min(5).max(50),
  username: z.union([z.string().min(5).max(50), z.literal("")]),
  bio: z.union([z.string().min(5).max(50), z.literal("")]),
  portfolioWebsite: z.union([z.string().url(), z.literal("")]),
  location: z.union([z.string().min(5).max(50), z.literal("")]),
});
