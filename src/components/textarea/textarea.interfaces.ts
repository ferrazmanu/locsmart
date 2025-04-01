interface TextareaProps
  extends React.RefAttributes<HTMLTextAreaElement>,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | undefined;
}

interface ITextareaStyles {
  error?: string | undefined;
  disabled?: boolean;
}

export type { ITextareaStyles, TextareaProps };
