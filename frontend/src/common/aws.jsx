// import axios from "axios";

// export const UploadImage = async (img) => {
//     let imgUrl = null;

//     try {
//         const { data: { uploadURL } } = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/get-upload-url`);

//         await axios.put(uploadURL, img, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });

//         imgUrl = uploadURL.split("?")[0];
//     } catch (error) {
//         console.error("Error in UploadImage:", error);
//     }

//     return imgUrl;
// }

export const UploadImage = async (img) => {
  let imgUrl = null;

  await axios
    .get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {

      await axios({
        method: 'PUT',
        url: uploadURL,
        headers: { 'Content-Type': 'multipart/form-data'},
        data: img
      })
      .then(() => {
        imgUrl = uploadURL.split("?")[0]
      })
    });
};
