// import { modalActions } from 'features/modal/modalSlice';
import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { clickOutside } from 'utils/help';
// import cameraIcon from 'assets/icons/camera.png';
import './ReplacePicture.css';
import { useDropzone } from 'react-dropzone';
// import ReactSlider from 'react-slider';
import ReactAvatarEditor from 'react-avatar-editor';

const ReplacePicture = () => {
  // const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [beforeVisible, setBeforeVisible] = useState(true);
  const [hadPicture, setHadPicture] = useState(false);
  const [scale, setScale] = useState(1.5);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const handlePositionChange = (position) => {
    setPosition(position);
  };

  const thumbs = files.map((file) => (
    <div key={file.name} className='replace-picture__img-container'>
      <ReactAvatarEditor
        image={file.preview}
        className='replace-picture__picture'
        width={170}
        height={170}
        border={[74, 34]}
        borderRadius={200}
        scale={scale}
        position={position}
        onPositionChange={handlePositionChange}
        color={[0, 0, 0, 0.6]}
        style={{ backroundFilter: 'blur(2px)' }}
      // backgroundColor='rgba(26, 32, 64, 0.5)'
      />
      {/* <img src={file.preview} alt='' /> */}
      <h5 className='replace-picture__img-text'>Drag to reposition photo</h5>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    if (files.length > 0) {
      setHadPicture(true);
    }
  }, [files]);

  // const wrapperRef = useRef(null);
  // useEffect(() => {
  //   /**
  //    * Alert if clicked on outside of element
  //    */
  //   clickOutside(wrapperRef, dispatch, modalActions);
  // }, [dispatch, wrapperRef]);

  return (
    <div className='replace-picture__container' >
      <div className='replace-picture__header'>
        <h3 className='replace-picture__title'>Replace Picture</h3>
      </div>
      <div className='replace-picture__body'>
        {files.length === 0 ? (
          <div className='replace-picture__wrapper' {...getRootProps()}>
            <input {...getInputProps} />
            {/* <img src={cameraIcon} alt='' className='replace-picture__img' /> */}
            <h5 className='replace-picture__h5'>
              Drop your image here, or{' '}
              <button
                type='button'
                className='replace-picture__h5-btn'
                onClick={open}
              >
                browse
              </button>
            </h5>
            <h6 className='replace-picture__h6'>Supports: JPG, PNG, TIFF</h6>
          </div>
        ) : (
          <div className='replace-picture__wrapper'>{thumbs}</div>
        )}
        {/* {hadPicture && (
          <div className='replace-picture__slider'>
            <h6>Zoom</h6>
            <ReactSlider
              className='replace-picture__slider-container'
              thumbClassName='replace-picture__slider-thumb'
              trackClassName='replace-picture__slider-track'
              min={100}
              max={500}
              defaultValue={150}
              onChange={(value, _) => {
                setBeforeVisible(value !== 100);
                setScale(value / 100);
              }}
            />
            <div
              className={
                beforeVisible
                  ? 'replace-picture__slider-span-before-visible'
                  : 'replace-picture__slider-span-before-invisible'
              }
            ></div>
            <div className='replace-picture__slider-span-after'></div>
          </div>
        )} */}
      </div>
      <div className='replace-picture__btn'>
        <div className='replace-picture__btn-left'></div>
        <div className='replace-picture__btn-right'>
          <button className='replace-picture__btn-cancel'>Cancel</button>
          <button className='replace-picture__btn-save'>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ReplacePicture;
