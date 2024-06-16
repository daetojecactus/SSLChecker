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

// Функция для разбора информации о компании, выдавшей сертификат
function parseIssuerAttributes(attributes: any[]) {
  const attributeMap: { [key: string]: string } = {
    C: 'location',
    O: 'organization',
    OU: 'site',
    CN: 'issuer',
  };

  const result: { [key: string]: string } = {};

  attributes.forEach(attr => {
    if (attributeMap[attr.shortName]) {
      result[attributeMap[attr.shortName]] = attr.value;
    }
  });

  return result;
}

// Функция для извлечения SAN из сертификата
function extractSAN(certText: string): string[] {
  const sanMatch = certText.match(/X509v3 Subject Alternative Name:\s*(.*)/);
  if (sanMatch) {
    return sanMatch[1].split(',').map(domain => domain.trim().replace('DNS:', ''));
  }
  return [];
}

export async function sslInfo(domainCheck: string) {
  console.log("А тут получен домен??", domainCheck);

  // Проверка
  if (!domainCheck) {
    return { error: "Не указан домен для проверки SSL сертификата" };
  }

  try {
    const certFile: string = execSync(
      `echo | openssl s_client -showcerts -connect ${domainCheck}:443 2>/dev/null | openssl x509`
    ).toString();
    const cert: pki.Certificate = pki.certificateFromPem(certFile);

    const expDate: Date = cert.validity.notAfter;
    const validFrom: Date = cert.validity.notBefore;
    const certAuthority: string = cert.issuer.getField("O")?.value || "Unknown";
    const commName: string = cert.subject.getField("CN")?.value || "Unknown";
    const signatureAlgorithm: string = cert.siginfo.algorithmOid || "Unknown";
    const serialNumber: string = cert.serialNumber || "Unknown";
    const currDate: number = Date.now();
    const daysLeft: number = Math.floor(
      (expDate.getTime() - currDate) / (1000 * 60 * 60 * 24)
    );

    const issuerAttributes = parseIssuerAttributes(cert.issuer.attributes);

    const webServer: string = execSync(
      `curl -sIA "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" https://${domainCheck} | grep -i "Server:" | awk -F': ' '{print $2}'`
    )
      .toString()
      .trim();
    const ipAddr: string = execSync(`dig +short ${domainCheck} A`).toString().trim();
    const ipOrgName: string = execSync(`whois ${ipAddr}`).toString();

    const chainCerts: any[] = execSync(
      `openssl s_client -connect ${domainCheck}:443 -showcerts -verify_return_error </dev/null 2>/dev/null | sed -n '/-----BEGIN CERTIFICATE-----/,$p'`
    )
      .toString()
      .split("-----BEGIN CERTIFICATE-----")
      .filter((cert) => cert.trim() !== "")
      .map((cert) => {
        const parsedCert: pki.Certificate = pki.certificateFromPem(
          `-----BEGIN CERTIFICATE-----\n${cert.trim()}\n-----END CERTIFICATE-----`
        );
        const parsedIssuerAttributes = parseIssuerAttributes(parsedCert.issuer.attributes);
        return {
          commonName: parsedCert.subject.getField("CN")?.value || "Unknown",
          certificateAuthority:
            parsedCert.issuer.getField("O")?.value || "Unknown",
          validFrom: formatReadableDate(parsedCert.validity.notBefore),
          validUntil: formatReadableDate(parsedCert.validity.notAfter),
          signatureAlgorithm: parsedCert.siginfo.algorithmOid || "Unknown",
          serialNumber: parsedCert.serialNumber || "Unknown",
          location: parsedIssuerAttributes.location || "Unknown",
          issuer: parsedIssuerAttributes.issuer || "Unknown",
          site: parsedIssuerAttributes.site || "Unknown",
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
      domain: domainCheck,
      ipAddr: ipAddr,
      webServer: webServer,
      ipOrgName: orgName,
    };

    const certText: string = execSync(
      `echo | openssl s_client -showcerts -connect ${domainCheck}:443 2>/dev/null | openssl x509 -text`
    ).toString();
    const sans = extractSAN(certText);

    const mainCert = {
      commonName: commName,
      certificateAuthority: certAuthority,
      validFrom: formatReadableDate(validFrom),
      validUntil: formatReadableDate(expDate),
      daysLeft: daysLeft,
      signatureAlgorithm: signatureAlgorithm,
      serialNumber: serialNumber,
      location: issuerAttributes.location || "Unknown",
      issuer: issuerAttributes.issuer || "Unknown",
      site: issuerAttributes.site || "Unknown",
      sans: sans,
    };

    return {
      hostInfo,
      mainCert,
      chainCerts,
    };
  } catch (error) {
    console.error("Error retrieving SSL information:", error);
    return { error: `${domainCheck} не преобразуется в IP-адрес. Убедитесь, что ваши записи DNS настроены правильно.` };
  }
}


