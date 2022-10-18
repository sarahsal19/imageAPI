import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';

export const imageProcess = async (
  imageFileName: string,
  width: number,
  height: number
): Promise<string> => {
  //This is to get the path of the image entered in the URL
  const imageInput: string =
    path.join(
      'public/',
      'images/',
      imageFileName
    ) + '.jpg';

  //This is to get the path of the image after resizing and saved in thumbnails
  const imageOutput: string =
    path.join(
      'public',
      'thumbnails/',
      imageFileName
    ) + `-${width}x${height}.jpg`;

  //If the image output folder doesn't exists, create it
  const imageOutputFolder: string = path.join(
    'public/',
    'thumbnails/'
  );
  if (!fs.existsSync(imageOutputFolder)) {
    await fsPromises.mkdir(imageOutputFolder);
  }

  try {
    //Process the image with Sharp, if it succeeds, returns the path of the output image
    await sharp(imageInput)
      .resize(width, height)
      .toFile(imageOutput);
    return imageOutput;
  } catch (error) {
    // if not succeeds, return the error
    return error as string;
  }
};
