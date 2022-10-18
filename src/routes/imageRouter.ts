import express from 'express';
import fs from 'fs';
import path from 'path';
import { imageProcess } from '../utils/processImage';
import {
  validateParameters,
  urlQuery,
} from '../utils/validateParameters';

const routes = express.Router();

export default routes.get(
  '/images',
  async (
    req: express.Request,
    res: express.Response
  ): Promise<void> => {
    // validate all three mandatory parameters of the request
    if (
      validateParameters(
        req.query as unknown as urlQuery
      )
    ) {
      const filename = req.query
        .filename as string;
      const width = Number(req.query.width);
      const height = Number(req.query.height);

      //The expected path of the image
      const imageThumbnail: string =
        path.join(filename) +
        `-${width}x${height}.jpg`;

      // if the requested image with the requested size already exists, send the existing image as response
      if (fs.existsSync(imageThumbnail)) {
        res.sendFile(
          path.join(filename) +
            `-${width}x${height}.jpg`,
          { root: '.' }
        );
      } else {
        // if the requested image doesn't exists, resize the image
        const processedImage = await imageProcess(
          filename as string,
          width,
          height
        );

        // if the process of image doesn't include error, then send the processed image
        if (
          !String(processedImage).includes(
            'Error'
          )
        ) {
          res.sendFile(processedImage, {
            root: '.',
          });
        } else {
          res
            .status(404)
            .send(
              'There is no such image file, kindly verify the file name'
            );
        }
      }
    } else {
      // if one of the parameters is missing in the request URL or if width or height are not numbers, then send a proper error message
      res
        .status(500)
        .send(
          'Kindly send filename, width and height with correct format as parameters in the url'
        );
    }
  }
);
