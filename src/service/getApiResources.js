export const getApiResources = async url => {
  try {
    const reponse = await fetch(url);

    if (reponse.ok) {
      return await reponse.json();
    } else {
      console.error('API ERROR', reponse.status);
      return;
    }
  } catch(error) {
    console.error(error);
  }
};