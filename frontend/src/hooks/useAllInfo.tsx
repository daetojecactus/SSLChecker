import useSSLInfo from './useSSLInfo';

// Хук для получения всей аналитики о загрузке страницы
export default function useAllInfo() {
  // Используем созданные хуки для получения информации
  const { info, fetchSSL } = useSSLInfo();


  const handleSubmitDomain = async (domain: string) => {
    try {

      await fetchSSL(domain);
    } catch (error) {
      console.error('Произошла ошибка приа:', error);
    }
  };


  // Возвращаем состояния и функцию для отправки URL
  return {
    info,
    fetchSSL,
    handleSubmitDomain,
  };
}
