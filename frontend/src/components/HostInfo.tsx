import React from "react";

export interface Host {
  domain: string;
  ipAddr: string;
  webServer: string;
  ipOrgName: string;
}

interface HostInfoProps {
  hostInfo: Host | null;
}

export default function HostInfo({ hostInfo }: HostInfoProps) {
  if (!hostInfo) {
    return null; // Если информации нет, ничего не отображаем
  }

  return (
    <div className="block-ssl ssl-info__row">
      <div className="cell ssl-info__cell">Хост:</div>
      <div className="cell ssl-info__cell">
      <div className="ssl-info__row-grid">
        Домен:
        <span className="ssl-info__bold">{hostInfo.domain}</span>
      </div>
      <div className="ssl-info__row-grid">
        IP-адрес:
        <span className="ssl-info__bold">{hostInfo.ipAddr}</span>
      </div>
      <div className="ssl-info__row-grid">
        Веб сервер:
        <span className="ssl-info__bold">{hostInfo.webServer}</span>
      </div>
      <div className="ssl-info__row-grid">
        IP организации:
        <span className="ssl-info__bold">{hostInfo.ipOrgName}</span>
      </div>
      </div>
    </div>
  );
}
