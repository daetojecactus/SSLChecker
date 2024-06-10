import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchSSLInfo } from "../http/SSLInfoAPI";
import Container from "@/components/Container";
import DomainInput from "@/components/DomainInput";
import useAllInfo from "../hooks/useAllInfo";
import HostInfo, { Host } from "@/components/HostInfo";
import MainCertInfo, { MainCert } from "@/components/MainCertInfo";
import ChainCertsInfo, { ChainCerts } from "@/components/ChainCertsInfo";

interface SSLInfo {
  hostInfo: Host;
  mainCert: MainCert;
  chainCerts: ChainCerts[];
}

export default function DomainPage() {
  const router = useRouter();
  const { domain } = router.query;
  // const [sslInfo, setSSLInfo] = useState(null);
  const [sslInfo, setSSLInfo] = useState<SSLInfo | null>(null);

  useEffect(() => {
    if (domain && typeof domain === "string") {
      fetchSSLInfo(domain)
        .then((data) => {
          setSSLInfo(data);
        })
        .catch((error) => {
          console.error("Error fetching SSL info:", error);
        });
    }
  }, [domain]);

  const { handleSubmitDomain } = useAllInfo();

  if (!sslInfo) {
    return <div>Loading...</div>;
  }
  console.log("sslInfo", sslInfo);
  return (
    <main className="main">
      <Container>
        <h1 className="main__title">SSL Checker сервис</h1>
        <p className="main__subtitle">
          Проверка статуса и цепочки SSL-сертифката
        </p>
        <DomainInput
          onDomainSubmit={handleSubmitDomain}
          initialDomain={typeof domain === "string" ? domain : ""}
        />
        <div className="ssl-info">
          <HostInfo hostInfo={sslInfo.hostInfo} />
          <MainCertInfo mainCert={sslInfo.mainCert} />
          <ChainCertsInfo chainCerts={sslInfo.chainCerts} />
        </div>
      </Container>
    </main>
  );
}
