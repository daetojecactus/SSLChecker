import React from 'react'

interface ChainCerts {
    commonName: string,
    certificateAuthority: string,
    validFrom: number,
    validUntil: number
}

interface ChainCertsInfoProps {
    chainCerts: ChainCerts[]
}

export default function ChainCertsInfo({chainCerts}: ChainCertsInfoProps) {
  return (
    <div>

    </div>
  )
}
