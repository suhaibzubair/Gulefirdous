import React, { useState } from 'react';
import { Input, Dropdown, Menu } from 'antd';
import { FiFilter, FiSearch, FiBarChart2, FiSettings, FiStar, FiChevronDown } from 'react-icons/fi';
import './courseManagement.scss';
import Button from '../../../../components/shared/button/Button';
import CourseDetail from '../courseDetail/CourseDetail';
import CourseCard from '../../../../components/shared/courseCards/courseCards/CourseCards';
import Course from '../courseContainer/course/Course';
import Breadcrumb from '../breadCrumb/BreadCrumb';

const { Search } = Input;

const CourseManagement: React.FC = () => {
    const sortingOptions = [
        { key: 'newest', label: 'Newest' },
        { key: 'oldest', label: 'Oldest' },
    ];

    const sortingMenu = (
        <Menu onClick={({ key }) => handleSortingChange(key)}>
            {sortingOptions.map((option) => (
                <Menu.Item key={option.key}>{option.label}</Menu.Item>
            ))}
        </Menu>
    );

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [courses, setCourses] = useState(['course']);
    const [sortingOption, setSortingOption] = useState('Newest');
    const [showCourse, setShowCourse] = useState(false);

    const handleSortingChange = (option: string) => {
        setSortingOption(option);
        const sortedCourses = sortCourses(option);
        setCourses(sortedCourses);
    };

    const sortCourses = (sortingOption: string) => {
        if (sortingOption === 'newest') {
            return [...courses].sort((a, b) => a.localeCompare(b));
        } else if (sortingOption === 'oldest') {
            return [...courses].sort((a, b) => b.localeCompare(a));
        }

        return courses;
    };

    return (
        <>

            {showCourse ? (
                <Course oncancelsave={() => { }} setCourses={() => { }} />
            ) : (
                <>
                    <div className="course-management-container">
                        <Breadcrumb items={['Dashboard', 'Courses', 'My courses']} />
                        <div className="course-management-header d-flex">
                            <h2>Course Management</h2>
                            <div className="filter-icons">
                                <span className='single-icon'><FiFilter /></span>
                                <span className='multiple-icons'>
                                    <FiBarChart2 />
                                    <FiSettings />
                                    <FiStar />
                                </span>
                            </div>
                        </div>
                        <div className="course-management-content">
                            <div className="search-bar">
                                <Search placeholder="Search..." style={{ width: 200 }} />
                            </div>
                            <div className="filter-wraper">
                                <div className="sorting-filter">
                                    <span>Sort by:</span>
                                    <Dropdown overlay={sortingMenu} trigger={['click']}>
                                        <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                            {sortingOption} <FiChevronDown />
                                        </span>
                                    </Dropdown>
                                </div>
                                <Button
                                    variant="primary"
                                    className="custom-button"
                                    customStyle={{ backgroundColor: '#10baac' }}
                                    onClick={() => setShowCourse(true)}
                                    childClasses=""
                                >
                                    + Add Course
                                </Button>
                            </div>
                        </div>
                        <div className='courses-cards'>
                            {courses.map((course, index) => (
                                <CourseCard key={index} style={{ width: '350px', height: 'auto' }} />
                            ))}
                        </div>
                        <CourseCard simpleCourses={true} style={{ width: '450px', height: '100px', alignItems: 'center' }} />
                    </div >
                </>

            )}

        </>
    );
};

export default CourseManagement;
