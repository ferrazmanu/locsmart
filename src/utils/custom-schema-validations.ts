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

const numberRequired = z.number().refine((val) => val > 0, {
  message: ERROR_MESSAGE.required,
});

const stringOrStringArrayRequired = z.union([
  z.string(),
  z.array(z.string()).refine((arr) => arr.length > 0, {
    message: ERROR_MESSAGE.required,
  }),
]);

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

const imageValidation = z
  .instanceof(FileList)
  // .refine((files) => files.length > 0, "A imagem é obrigatória.")
  .refine(
    (files) => files[0]?.size <= 2 * 1024 * 1024, // 2MB
    "O arquivo deve ter no máximo 2MB."
  )
  .refine(
    (files) => ["image/jpeg", "image/png"].includes(files[0]?.type),
    "Apenas arquivos JPG ou PNG são permitidos."
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
  imageValidation,
  numberRequired,
  stringOrStringArrayRequired,
  stringRequired,
};
