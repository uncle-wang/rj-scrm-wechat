export default (callback, accept) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  if (accept) {
    fileInput.accept = accept;
  }
  fileInput.click();
  fileInput.onchange = () => {
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      callback(file);
    }
  };
};
