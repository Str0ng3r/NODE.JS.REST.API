import Jimp from "jimp";
export const resizeAvatar = async (filePath) => {
    try {
      const image = await Jimp.read(filePath);
      await image.resize(250, 250).write(filePath);
    } catch (error) {
      throw error;
    }
  };