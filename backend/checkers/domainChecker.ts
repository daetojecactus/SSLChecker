import punycode from "punycode";

export async function domainChecker(domain: string): Promise<string> {
  console.log("domain", domain);
  // Преобразуем домен в латиницу
  const domainCheck = punycode.toASCII(domain);
  const domainRegex = /^[a-z0-9.-]+$/;

  const isValidSyntax = domainRegex.test(domainCheck);

  if (isValidSyntax === true) {
    return domainCheck;
  } else {
    console.log("error");
  }

  return domainCheck;
}
