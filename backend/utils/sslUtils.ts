import { execSync } from "child_process";
import { pki } from "node-forge";

// Функция для форматирования даты в читаемый формат
function formatReadableDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("ru-RU", options);
}

export async function sslInfo(domain: string) {
  console.log("А тут получен домен??", domain);

  const certFile: string = execSync(
    `echo | openssl s_client -showcerts -connect ${domain}:443 2>/dev/null | openssl x509`
  ).toString();
  const cert: pki.Certificate = pki.certificateFromPem(certFile);

  const expDate: Date = cert.validity.notAfter;
  const certAuthority: string = cert.issuer.getField("O")?.value || "Unknown";
  const commName: string = cert.subject.getField("CN")?.value || "Unknown";
  const signatureAlgorithm: string = cert.siginfo.algorithmOid || "Unknown";
  const serialNumber: string = cert.serialNumber || "Unknown";
  const currDate: number = Date.now();
  const daysLeft: number = Math.floor(
    (expDate.getTime() - currDate) / (1000 * 60 * 60 * 24)
  );
  const webServer: string = execSync(
    `curl -sIA "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" https://${domain} | grep -i "Server:" | awk -F': ' '{print $2}'`
  )
    .toString()
    .trim();
  const ipAddr: string = execSync(`dig +short ${domain} A`).toString().trim();
  const ipOrgName: string = execSync(`whois ${ipAddr}`).toString();

  const chainCerts: any[] = execSync(
    `openssl s_client -connect ${domain}:443 -showcerts -verify_return_error </dev/null 2>/dev/null | sed -n '/-----BEGIN CERTIFICATE-----/,$p'`
  )
    .toString()
    .split("-----BEGIN CERTIFICATE-----")
    .filter((cert) => cert.trim() !== "")
    .map((cert) => {
      const parsedCert: pki.Certificate = pki.certificateFromPem(
        `-----BEGIN CERTIFICATE-----\n${cert.trim()}\n-----END CERTIFICATE-----`
      );
      return {
        commonName: parsedCert.subject.getField("CN")?.value || "Unknown",
        certificateAuthority:
          parsedCert.issuer.getField("O")?.value || "Unknown",
        validFrom: formatReadableDate(parsedCert.validity.notBefore),
        validUntil: formatReadableDate(parsedCert.validity.notAfter),
        signatureAlgorithm: parsedCert.siginfo.algorithmOid || "Unknown",
        serialNumber: parsedCert.serialNumber || "Unknown",
      };
    });

  const newOrg = ipOrgName
    .split("\n")
    .find(
      (line) =>
        line.toLowerCase().startsWith("org-name") ||
        line.toLowerCase().startsWith("organization") ||
        line.toLowerCase().startsWith("organization")
    );

  let orgName: string | null = null;
  if (newOrg) {
    orgName = newOrg.split(":")[1].trim();
  } else {
    console.log("No organization information found.");
  }

  const hostInfo = {
    domain: domain,
    ipAddr: ipAddr,
    webServer: webServer,
    ipOrgName: orgName,
  };

  const mainCert = {
    commName: commName,
    certAuthority: certAuthority,
    daysLeft: daysLeft,
    expDate: formatReadableDate(expDate),
    signatureAlgorithm: signatureAlgorithm,
    serialNumber: serialNumber,
  };

  return {
    hostInfo,
    mainCert,
    chainCerts,
  };
}
