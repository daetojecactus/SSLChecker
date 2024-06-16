import { Request, Response } from "express";
import { sslInfo } from "../utils/sslUtils";
import { domainChecker } from "../checkers/domainChecker";

export async function getSSLInfo(req: Request, res: Response) {
  const { domain } = req.body;
  console.log("Получен домен:", domain);

  try {
    const check = await domainChecker(domain);
    console.log('check', check)
    const info = await sslInfo(check);

    console.log('infoS', info);
    res.status(200).json(info);
  } catch (error) {
    console.error("Произошла ошибка", error);
    res.status(500).json({ error: "Произошла ошибка" });
  }
}
