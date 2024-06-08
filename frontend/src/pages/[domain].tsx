import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchSSLInfo } from "../http/SSLInfoAPI";
import Container from "@/components/Container";
import DomainInput from "@/components/DomainInput";
import useAllInfo from "../hooks/useAllInfo";

export default function DomainPage() {
  const router = useRouter();
  const { domain } = router.query;
  const [sslInfo, setSSLInfo] = useState(null);

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
        
      </Container>
    </main>
  );
}
