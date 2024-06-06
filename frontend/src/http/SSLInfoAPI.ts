import { host } from "./index";

export const fetchSSLInfo = async (domain: string) => {
  try {
    // console.log("Отправка запроса на сервер...");
    // console.log("Мы хотим отправить домен", domain);
    // console.log('che za govno???', host)
    // const response = await $host.post("/api/ssl-info", { domain });
    const response = await host.post("/api/ssl-info", { domain });
    console.log("Ответ от сервера:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка при отправке запроса");
  }
};
