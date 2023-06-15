import React, { useState } from 'react';




function AddPicture({uploaded, setUploaded}) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(URL.createObjectURL(file));
    setUploaded(file);
  };

  return (
    <>
      <div>
        <span>
          Add picture: 
        </span>
        <span>
        <input
          type="file"
          accept="image/*"
          placeholder="Add picture"
          name="pic"
          id="pic"
          onChange={handleFileUpload}
        />
        </span>
        <span>
          <img src={uploadedFile || 'man.png'} alt="Uploaded" />
        </span>
      </div>
    </>
  );
}

export default AddPicture;
