export const responseFormat = (status: number, data: any) => {
  const response = {
    success: status < 400,
    data: data,
  };
  return response || data;
};
