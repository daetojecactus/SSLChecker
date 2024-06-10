import React from "react";

export interface MainCert {
  commName: string;
  certAuthority: string;
  daysLeft: number;
  expDate: string;
  signatureAlgorithm: string;
  serialNumber: string;
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
      <div className="ssl-info__row-grid">
        Имя:
      <span className="ssl-info__bold">{mainCert.commName}</span>
      </div>
      <div className="ssl-info__row-grid">
        Сертификат выдан компанией:
      <span className="ssl-info__bold">{mainCert.certAuthority}</span>
      </div>
      <div className="ssl-info__row-grid">
        Действителен дней:
      <span className="ssl-info__bold">{mainCert.daysLeft}</span>
      </div>
      <div className="ssl-info__row-grid">
        Действителен до:
      <span className="ssl-info__bold">{mainCert.expDate}</span>
      </div>
      <div className="ssl-info__row-grid">
      Алгоритм подписи:
      <span className="ssl-info__bold">{mainCert.signatureAlgorithm}</span>
      </div>
      <div className="ssl-info__row-grid">
      Серийный номер:
      <span className="ssl-info__bold">{mainCert.serialNumber}</span>
      </div>
    </div>
  );
}
