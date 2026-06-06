// Course.tsx

import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import './Course.scss';
import CustomButton from '../../../../../components/shared/button/Button';
import uploadImgIcon from "../../../../../assets/images/upload.svg";
import { Icon } from '@iconify/react';
import ImageCropper from "../../../../../components/shared/ImageCropper/ImageCrop";
import { Modal } from "antd";

const Course = ({ setCourses }: any) => {

    const [courseTitle, setCourseTitle] = useState('');
    const [courseTagline, setCourseTagline] = useState('');
    const [courseURL, setCourseURL] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [cropedImg, setCropedimg] = useState('')
    const [ImgCropModalOpen, setImgCropModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const fileInputRef = useRef<any>(null);
    const [src, setSrc] = useState<any>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            // Checking file size
            if (file.size > 2 * 1024 * 1024) {
                console.error("File size exceeds 2MB limit");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setSrc(result);
            };
            reader.readAsDataURL(file);
        }
        setImgCropModalOpen(true)
    };


    const handleDescriptionChange = (value: string) => {
        setCourseDescription(value);
    };

    const handleSave = () => {
        const courseData = {
            title: courseTitle,
            tagline: courseTagline,
            url: courseURL,
            description: courseDescription,
            thumbnail: thumbnail,
        };

        setCourses((prevCourses: any) => {
            const coursesArray = Array.isArray(prevCourses) ? prevCourses : [];
            return [...coursesArray, courseData];
        });
        console.log('==========', courseData);

        // Reset form fields after saving
        setCourseTitle('');
        setCourseTagline('');
        setCourseURL('');
        setCourseDescription('');
        setThumbnail(null);

        // Navigate 
        // navigate('/create-course');
    };

    const handleCancel = () => { };

    return (
        <div className="main-wrapper">
            <div className="course-details-container" >
                <h2 className='title'>Course Creation</h2>
                <div className="input-details">
                    <div className='simple-input'>
                        <label className='title'>Title:</label><br />
                        <input type="text" placeholder='Text' value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                    </div>
                    <div className='simple-input'>
                        <label className='title'>Course Tagline</label><br />
                        <input type="text" placeholder='Text' value={courseTagline} onChange={(e) => setCourseTagline(e.target.value)} />
                    </div>
                    <div className='simple-input'>
                        <label className='title'>Course URL</label><br />
                        <input type="text" placeholder='pespsi.urqa.com/LMS/Courses/Course name' value={courseURL} onChange={(e) => setCourseURL(e.target.value)} />
                    </div>

                    <div className='textarea-wraper'>
                        <label className='textarea-title'>Description:</label>
                        <div style={{ height: 'auto' }} className="custom-quill">
                            <ReactQuill
                                theme="snow"
                                value={courseDescription}
                                onChange={(handleDescriptionChange)}
                                style={{ border: 'none', width: '100%', background: 'none' }}
                            />
                        </div>
                    </div>
                    <label className="title">Thumbnail</label>
                    <div className="image-container">
                        {cropedImg ? (
                            <>
                                <label className="image-upload-label" htmlFor="thumbnailInput">
                                    <div
                                        className="cropped-image"
                                        onMouseEnter={() => {
                                            setIsHovered(true);
                                        }}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <img
                                            src={cropedImg}
                                            style={{ opacity: isHovered ? '50%' : '100%' }}
                                            alt="not found"
                                        />
                                        {isHovered && (
                                            <div className="pencil">
                                                <Icon icon="mdi:pencil-box" height="24" />
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    id="thumbnailInput"
                                    className="course-thumbnail"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </>

                        ) : (
                            <>
                                <label
                                    className="course-thumbnail"
                                    htmlFor="thumbnailInput"
                                    style={{ textAlign: "center" }}
                                >
                                    <span>
                                        <img src={uploadImgIcon} alt="" />
                                    </span>
                                    {src ? "Change Thumbnail" : "Upload Thumbnail PNG"}
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    id="thumbnailInput"
                                    className="course-thumbnail"
                                    onChange={handleFileChange}

                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </div>

                    <Modal
                        title="Crop Image"
                        open={ImgCropModalOpen}
                        onCancel={() => setImgCropModalOpen(false)}
                        footer={null}
                    >
                        {/* Integrate the Demo component with necessary props */}
                        <ImageCropper setCropedimg={setCropedimg} images={src} />

                        <CustomButton variant="primary" onClick={() => { setImgCropModalOpen(false) }} customStyle={{ marginTop: "15px" }}> Crop & Save</CustomButton>
                    </Modal>
                </div>
                <div className='btns'>
                    <CustomButton variant="secondary"
                        customStyle={{ /* your custom styles */ }}
                        childClasses="string" className='cancel-btn' onClick={handleCancel}>Cancel</CustomButton>
                    <CustomButton variant="primary"
                        customStyle={{ /* your custom styles */ }}
                        childClasses="string" className='save-btn'
                        onClick={handleSave}>Save & Continue</CustomButton>
                </div>
            </div>
        </div>
    );
}

export default Course;
