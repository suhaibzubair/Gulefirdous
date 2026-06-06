import React, { useState } from 'react';
import Breadcrumb from '../breadCrumb/BreadCrumb';
import CourseTabs from '../courseTabs/CourseTabs';
import CoursesCount from '../coursesCount/CoursesCount';
import CreatedCourses from '../createdCourses/CreatedCourses';
import IMG from '../../../../assets/images/schoolSetup.png';
import './CreateCourse.scss';
import CourseContainer from '../courseContainer/CourseContainer';;

function CreateCourse() {
    const [showTabs, setShowTabs] = useState(false);

    const handleCreateCourseClick = () => {
        setShowTabs(true);
    };

    const handleAddSectionClick = () => {

    }
    const breadcrumbItems = ['Dashboard', 'My courses', 'Create Course'];

    return (
        <div className='create-course-wraper'>
            {/* <Breadcrumb items={breadcrumbItems} /> */}
            {!showTabs ? (
                <>
                    <CreatedCourses
                        onAddSectionClick={handleAddSectionClick}
                        courses={[]}
                        img=''
                    />
                    <CoursesCount onCreateCourseClick={handleCreateCourseClick} />
                </>
            ) : (
                <CourseTabs />
            )}

        </div>
    );
}

export default CreateCourse;
