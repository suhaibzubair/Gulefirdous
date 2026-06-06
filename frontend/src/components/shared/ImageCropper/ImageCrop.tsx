import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const Demo = ({ images, setCropedimg }: any) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [cropedImage, setCroppedImage] = useState<any>();
  const onCrop = () => {
    const cropper: any = cropperRef.current?.cropper;
    setCroppedImage(cropper.getCroppedCanvas().toDataURL());
    setCropedimg(cropper.getCroppedCanvas().toDataURL())
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <>
      <Cropper
        src={images}//"https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
        style={{ height: '270px', width: '480px' }}
        // Cropper.js options
        initialAspectRatio={16 / 9}
        guides={false}
        crop={onCrop}
        ref={cropperRef}
      />
      {cropedImage && cropedImage.length && (
        <div >
          <img
            style={{ width: "480px", height: "270px" }}
            src={cropedImage}
            className="img-fluid"
            alt="cropped result"
          />
        </div>
      )}{" "}
    </>
  );
};

export default Demo;
