export const invalidEmails = [
  "gmail.con",
  "gmail.con.br",
  "gmail.co",
  "outlook.con",
  "outlook.co",
  "outlook.com.b",
  "outlook.co.br",
  "outlook.con.br",
  "hotmail.con",
  "hotmail.co",
  "hotmail.com.b",
  "hotmail.co.br",
  "hotmail.con.br",
];

export const invalidDomains = [
  "hotmeil",
  "hotmeiu",
  "rotmail",
  "gmeil",
  "gmeiu",
  "gmaiu",
  "altlook",
  "autlook",
  "outluk",
  "autluk",
  "outluc",
  "autluc",
];

const validateEmail = (email: string) => {
  if (!email) return false;

  const sufixDomain = email.split("@")[1];

  if (sufixDomain) {
    const emailsTested = invalidEmails.map((invalidemail) => {
      return sufixDomain === invalidemail;
    });

    const DomainsTested = invalidDomains.map((invalidemail) => {
      return sufixDomain.includes(invalidemail);
    });
    if (emailsTested.includes(true) || DomainsTested.includes(true))
      return false;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{1,3}$/;

  return regexEmail.test(email);
};

const validateNoNumbers = (input: string): boolean => {
  const hasNumbers = /\d/.test(input);
  return !hasNumbers;
};

const validateCpf = (cpf: string | null) => {
  if (!cpf) return false;

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
  return cpfRegex.test(cpf);
};

const validateCnpj = (cnpj: string | null) => {
  if (!cnpj) return false;

  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;
  return cnpjRegex.test(cnpj);
};

export { validateCnpj, validateCpf, validateEmail, validateNoNumbers };
