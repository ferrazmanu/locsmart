import dayjs from "dayjs";
import { z } from "zod";
import { ERROR_MESSAGE } from "../components/error-message/error-message.constant";

const stringRequired = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined) return "";
    return arg;
  },
  z
    .string()
    .refine((val) => val.trim() !== "", { message: ERROR_MESSAGE.required })
);

const numberRequired = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined) return 0;
    return arg;
  },
  z.number().refine((val) => val > 0, { message: ERROR_MESSAGE.required })
);

const stringOrStringArrayRequired = z.union([
  z.string(),
  z.array(z.string()).refine((arr) => arr.length > 0, {
    message: ERROR_MESSAGE.required,
  }),
]);

const stringArrayRequired = z
  .array(z.string())
  .default([])
  .refine((val) => val.length > 0, {
    message: ERROR_MESSAGE.required,
  });

const numberArrayRequired = z
  .array(z.number())
  .default([])
  .refine((val) => val.length > 0, {
    message: ERROR_MESSAGE.required,
  });

const dateRequired = z.preprocess(
  (arg) => {
    if (arg === null || arg === undefined || arg === "") {
      return "";
    }
    return arg;
  },
  z.union([
    z.string().refine((val) => val.trim() !== "", {
      message: ERROR_MESSAGE.required,
    }),
    z.date().refine((val) => dayjs(val, "YYYY-MM-DD", true).isValid(), {
      message: ERROR_MESSAGE.validate,
    }),
  ])
);

const addIssuesIfInvalid = (
  ctx: z.RefinementCtx,
  value: unknown,
  validation: z.ZodTypeAny,
  path: (string | number)[]
) => {
  const result = validation.safeParse(value);
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      ctx.addIssue({
        ...issue,
        path,
      });
    });
  }
};

export {
  addIssuesIfInvalid,
  dateRequired,
  numberArrayRequired,
  numberRequired,
  stringArrayRequired,
  stringOrStringArrayRequired,
  stringRequired,
};
