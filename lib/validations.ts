import * as z from "zod";

export const QuestionValidation = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20),
  tags: z.array(z.string().min(1).max(20)).min(1).max(3),
});

export const AnswerValidation = z.object({
  answer: z.string().min(10),
});

// regex for a string which cannot have spaces at the start or end.
// Words can be separated by either a single underscore or a single space,
// but these characters cannot be next to each other. The name must be between 5 and 50 characters long.
const namePattern =
  /^(?! )(?!.*[_ ]{2,})(?!.* _)(?!.*_ )([A-Za-z_]+(?: [A-Za-z_]+|_[A-Za-z_]+)*){5,50}$/;

const nameLengthErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (
    issue.code === z.ZodIssueCode.too_big ||
    issue.code === z.ZodIssueCode.too_small
  ) {
    return { message: "Name must be between 5 and 50 characters." };
  }

  if (issue.code === z.ZodIssueCode.invalid_string) {
    return {
      message:
        'Name must not have spaces at the start or end. Words can be separated by either an underscore "_" or a single space, but not both together.',
    };
  }

  return { message: ctx.defaultError };
};

export const ProfileValidation = z.object({
  name: z
    .string({ errorMap: nameLengthErrorMap })
    .min(5)
    .max(50)
    .regex(namePattern),
  username: z.union([z.string().min(5).max(50), z.literal("")]),
  bio: z.union([z.string().min(5).max(50), z.literal("")]),
  portfolioWebsite: z.union([z.string().url(), z.literal("")]),
  location: z.union([z.string().min(5).max(50), z.literal("")]),
});
