import { useMemo, useState } from "react";

export const useCpfCnpjMask = (cpfOuCnpj: string) => {
  const [isCPF, setIsCPF] = useState<boolean>(false);

  const cpfOuCnpjMask = useMemo(() => {
    if (cpfOuCnpj && cpfOuCnpj.length <= 14) {
      setIsCPF(true);
      return "999.999.999-999";
    } else {
      setIsCPF(false);
      return "99.999.999/9999-99";
    }
  }, [cpfOuCnpj]);

  return { isCPF, cpfOuCnpjMask };
};
