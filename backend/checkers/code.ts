// import iconv from 'iconv-lite';
// import chardet from 'chardet';

// export async function decodeDomain(domain: string) {
//     // Преобразуем строку в буфер
//     const buffer = Buffer.from(domain, 'base64');
//     console.log('buffer', buffer)
  
//     // Определяем кодировку
//     const encoding = chardet.detect(buffer);
//     console.log('encoding', encoding)
  
//     // Проверяем, определена ли кодировка
//     if (!encoding) {
//       throw new Error('Unable to determine encoding of the domain.');
//     }
    
//     // Декодируем строку
//     const decodedDomain = iconv.decode(buffer, encoding);
//     console.log('decodedDomain', decodedDomain)
  
//     return decodedDomain;
//   }