export const privatecontentTranslator = (data) => {
  Array.isArray(data) && data.forEach((content) => {
    content._picUrl = content.picUrl;
    content.picUrl = content.sPicUrl;
  });
  return data;
}