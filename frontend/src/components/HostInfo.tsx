import React from 'react'

interface Host {
    domain: string,
    apAddr: string,
    webServer: string,
    ipOrgName: string
}

interface HostInfoProps {
    hostInfo: Host | null
}

export default function HostInfo({hostInfo}: HostInfoProps) {

    if (!hostInfo) {
        return null; // Если информации нет, ничего не отображаем
      }

  return (
    <div>
        <p>{hostInfo.domain}</p>
        <p>{hostInfo.apAddr}</p>
        <p>{hostInfo.webServer}</p>
        <p>{hostInfo.ipOrgName}</p>
    </div>
  )
}
