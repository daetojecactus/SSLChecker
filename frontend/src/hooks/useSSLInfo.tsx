import { useState } from 'react';
import { fetchSSLInfo } from '../http/SSLInfoAPI';

export default function useSSLInfo() {

  const [info, setInfo] = useState<string | null>(null);

  const fetchSSL = async (domain: string) => {
    try {
      console.log(`А мы точно отправили?`, domain)
      const response = await fetchSSLInfo(domain);

      if (response) {
        console.log(response)
        setInfo(response);
      } else {
        console.log('1111-pusto');
      }

    } catch (error) {
      console.error("Ошибка при получении информации о SSL", error);
    }
  };

  return { fetchSSL, info };
}
