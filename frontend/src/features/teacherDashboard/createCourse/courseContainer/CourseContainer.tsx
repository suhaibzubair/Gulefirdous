// CourseContainer.tsx

import React, { useEffect, useState } from 'react';
import Course from './course/Course';
import CreatedCourses from '../createdCourses/CreatedCourses';

const CourseContainer = () => {
    const [courses, setCourses] = useState<any>();

    const updateParentState = (newValue: any) => {
        setCourses(newValue);
    };

    useEffect(() => {
        // ... (existing code)

        if (courses) {
            // If you want to navigate programmatically, you can use the 'navigate' function here.
            // For example, navigate('/create-course');
            console.log('courses availabel===========')
        }
    }, [courses]);

    return (
        <div>
            <Course setCourses={updateParentState} />
            <CreatedCourses courses={courses} onAddSectionClick={() => { }} img=''/>
        </div>
    );
};

export default CourseContainer;
