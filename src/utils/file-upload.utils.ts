import { extname } from "path";

export const csvFileFilter = (_req, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return callback(new Error('Only csv files are allowed!'), false);
    }
    callback(null, true);
  };

  export const editFileName = (_req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };