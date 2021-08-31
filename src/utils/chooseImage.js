import chooseFile from './chooseFile';

export default (callback) => {
  chooseFile((file) => {
    if (file.type.startsWith('image/')) {
      callback(file);
    }
  }, 'image/*');
};
