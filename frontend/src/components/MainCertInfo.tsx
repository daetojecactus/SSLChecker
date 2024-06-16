import React from "react";

export interface MainCert {
  commonName: string;
  certificateAuthority: string;
  daysLeft: number;
  validUntil: string;
  signatureAlgorithm: string;
  serialNumber: string;
  validFrom: string;
  location: string;
  issuer: string;
  site: string;
  sans: string[];
}

interface MainCertInfoProps {
  mainCert: MainCert | null;
}

export default function MainCertInfo({ mainCert }: MainCertInfoProps) {
  if (!mainCert) {
    return null; // Если информации нет, ничего не отображаем
  }

  return (
    <div className="block-ssl ssl-info__row">
      <div className="cell ssl-info__cell">main info:</div>
      <div className="cell ssl-info__cell">
        <div className="ssl-info__row-grid">
          Имя:
          <span className="ssl-info__bold">{mainCert.commonName}</span>
        </div>
        <div className="ssl-info__row-grid">
          Сертификат выдан компанией:
          <span className="ssl-info__bold">
            {mainCert.certificateAuthority}
          </span>
        </div>
        <div className="ssl-info__row-grid">
          Действителен дней:
          <span className="ssl-info__bold">{mainCert.daysLeft}</span>
        </div>
        <div className="ssl-info__row-grid">
          Действителен до:
          <span className="ssl-info__bold">{mainCert.validUntil}</span>
        </div>
        <div className="ssl-info__row-grid">
          Действителен с:
          <span className="ssl-info__bold">{mainCert.validFrom}</span>
        </div>
        <div className="ssl-info__row-grid">
          Алгоритм подписи:
          <span className="ssl-info__bold">{mainCert.signatureAlgorithm}</span>
        </div>
        <div className="ssl-info__row-grid">
          Серийный номер:
          <span className="ssl-info__bold">{mainCert.serialNumber}</span>
        </div>
        <div className="ssl-info__row-grid">
          Локация:
          <span className="ssl-info__bold">{mainCert.location}</span>
        </div>
        <div className="ssl-info__row-grid">
          Выдан:
          <span className="ssl-info__bold">{mainCert.issuer}</span>
        </div>
        <div className="ssl-info__row-grid">
          Сайт:
          <span className="ssl-info__bold">{mainCert.site}</span>
        </div>
        <div className="ssl-info__row-grid">
          Альтернативные имена:
          <span className="ssl-info__bold">{mainCert.sans.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
