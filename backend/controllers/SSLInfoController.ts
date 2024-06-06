import { Request, Response } from 'express';
import { sslInfo } from '../utils/sslUtils';
// import {decodeDomain} from '../checkers/code'

export async function getSSLInfo(req: Request, res: Response) {
  const { domain } = req.body;
  console.log('Получен домен:', domain);

  try {
    const info = await sslInfo(domain);
    // const decode = await decodeDomain(domain);
    // console.log(decode)
    console.log(info)
    res.status(200).json(info);
  } catch (error) {
    console.error('Произошла ошибка', error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
}
