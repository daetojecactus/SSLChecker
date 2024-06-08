import React from "react";
import DomainInput from "../components/DomainInput";
import useAllInfo from "../hooks/useAllInfo";
import Container from "../components/Container";

export default function Home() {
  const { handleSubmitDomain } = useAllInfo();

  return (
    <main className="main">
      <Container>
        <h1 className="main__title">SSL Checker сервис</h1>
        <p className="main__subtitle">
          Проверка статуса и цепочки SSL-сертифката
        </p>
        <DomainInput onDomainSubmit={handleSubmitDomain} />
        <h2 className="main__caption">
          Что такое SSL-сертификат и для чего он нужен?
        </h2>
        <p className="main__descr">
          SSL-сертификат (англ. Secure Sockets Layer) — механизм защиты данных
          посетителей сайта. Его наличие гарантирует, что передаваемые ими
          личные данные защищены, а сайт не является однодневкой. Это происходит
          благодаря применению шифрования данных, передаваемых по сети интернет.
          Злоумышленники, пытающиеся прочитать эти данные не смогут расшифровать
          их, поскольку не знают специального ключа, который известен только
          владельцу сертификата.
        </p>
      </Container>
    </main>
  );
}
