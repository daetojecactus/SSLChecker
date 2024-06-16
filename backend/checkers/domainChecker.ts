import punycode from "punycode";

export async function domainChecker(domain: string): Promise<string> {
  console.log("domain", domain);
  // Преобразуем домен в латиницу
  let domainCheck = punycode.toASCII(domain);
  const domainRegex = /^[a-z0-9.-]+$/;

  const isValidSyntax = domainRegex.test(domainCheck);

  if (!isValidSyntax) {
    domainCheck = "domainError";
  }

  return domainCheck;
}
