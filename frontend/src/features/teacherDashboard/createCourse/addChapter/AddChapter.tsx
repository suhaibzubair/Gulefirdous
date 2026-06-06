import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Button from '../../../../components/shared/button/Button';
import 'react-quill/dist/quill.snow.css';
import { AddChapterProps } from './AddChapter.d';
import './AddChapter.scss';


function AddChapter({ onsaveclick }: AddChapterProps) {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourseTitle(e.target.value);
    };

    const handleDescriptionChange = (value: string) => {
        setCourseDescription(value);
    };

    const handleSave = () => {
        if (courseTitle && courseDescription) {
            onsaveclick(courseTitle, courseDescription);
            setCourseTitle('');
            setCourseDescription('');
        }
    };

    return (
        <div className="add-chapter-wrapper">
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
                            value= {courseDescription}
                            onChange={handleDescriptionChange}
                            style={{ border: 'none', width: '100%', background: 'none' }}
                        />
                    </div>
                </div>
            </div>
            <div className='btns'>
                <Button variant="primary"
                    customStyle={{ /* your custom styles */ }}
                    childClasses="string" className='save-btn' onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}

export default AddChapter;
