import React from "react";

export interface ChainCerts {
  commonName: string;
  certificateAuthority: string;
  validFrom: string;
  validUntil: string;
  signatureAlgorithm: string;
  serialNumber: string;
  location: string;
  issuer: string;
  site: string;
}

interface ChainCertsInfoProps {
  chainCerts: ChainCerts[];
}

export default function ChainCertsInfo({ chainCerts }: ChainCertsInfoProps) {
  if (!chainCerts) {
    return null; // Если информации нет, ничего не отображаем
  }

let onlyChain = [...chainCerts]
onlyChain.shift();

  return (
    <div className="">
      {onlyChain.map((cert, index) => (
        <div className="block-ssl ssl-info__row" key={index}>
          <div className="cell ssl-info__cell">Chain:</div>
          <div className="cell ssl-info__cell">
          <div className="ssl-info__row-grid">
            Имя:
            <span className="ssl-info__bold">{cert.commonName}</span>
          </div>
          <div className="ssl-info__row-grid">
            Сертификат выдан компанией:
            <span className="ssl-info__bold">{cert.certificateAuthority}</span>
          </div>
          <div className="ssl-info__row-grid">
            Установлен:
            <span className="ssl-info__bold">{cert.validFrom}</span>
          </div>
          <div className="ssl-info__row-grid">
            Действителен до:
            <span className="ssl-info__bold">{cert.validUntil}</span>
          </div>
          <div className="ssl-info__row-grid">
            Алгоритм подписи:
            <span className="ssl-info__bold">{cert.signatureAlgorithm}</span>
          </div>
          <div className="ssl-info__row-grid">
            Серийный номер:
            <span className="ssl-info__bold">{cert.serialNumber}</span>
          </div>
          <div className="ssl-info__row-grid">
            Локация:
            <span className="ssl-info__bold">{cert.location}</span>
          </div>
          <div className="ssl-info__row-grid">
            Выдан
            <span className="ssl-info__bold">{cert.issuer}</span>
          </div>
          <div className="ssl-info__row-grid">
            Сайт:
            <span className="ssl-info__bold">{cert.site}</span>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
