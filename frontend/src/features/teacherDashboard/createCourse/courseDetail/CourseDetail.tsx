import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Button from '../../../../components/shared/button/Button';
import {CourseDetailsProps} from './CourseDetail.d';
import './CourseDetails.scss';
import CustomButton from '../../../../components/shared/button/Button';

const CourseDetails: React.FC<CourseDetailsProps> = ({ onsaveclick, width}) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseTitle(e.target.value);
    };

    const handleDescriptionChange = (value: string) => {
        setCourseDescription(value);
    };

    const handleSave = () => {
        // Package the data and send it back to the parent component
        const data = {
            title: courseTitle,
            description: courseDescription,
        };
        onsaveclick(data);
    };
    const handleCancel = ()=>{};

    return (
        <div className="course-details-wrapper" style={{width: width}}>
            <h2 className='title'>Creating Section</h2>
            <div className="input-details">
                <div className='simple-input'>
                    <label className='title'>Title:</label><br />
                    <input type="text" placeholder='Text' value={courseTitle} onChange={handleTitleChange} />
                </div>
                <div className='simple-input'>
                    <label className='title'>Thumbnail</label> <br />
                    <input type="file" accept=".png" />
                </div>
                <div className='textarea-wraper'>
                    <label className='textarea-title'>Description:</label>
                    <div style={{ height: 'auto' }} className="custom-quill">
                        <ReactQuill
                            theme="snow"
                            value={courseDescription}
                            onChange={handleDescriptionChange}
                            style={{ border: 'none', width: '100%', background: 'none' }}
                        />
                    </div>
                </div>
            </div>
            <div className='btns'>
                <CustomButton variant="primary"
                    customStyle={{ /* your custom styles */ }}
                    childClasses="string" className='cancel-btn' onClick={handleCancel}>Cancel</CustomButton>
                <CustomButton variant="primary"
                    customStyle={{ /* your custom styles */ }}
                    childClasses="string" className='save-btn'
                    onClick={handleSave}>Save</CustomButton>
            </div>
        </div>
    );
}

export default CourseDetails;
