import React from 'react';
import { PlayCircleOutlined, WarningOutlined, ClockCircleOutlined, ShareAltOutlined, BookOutlined } from '@ant-design/icons';
import Button from '../../../components/shared/button/Button';
import CourseImg from '../../../assets/images/videobg.png';
import { ReactComponent as User } from '../../../assets/images/reader 1.svg';
import './FixedSidebar.scss';

const FixedSidebar: React.FC = () => {
    const courseData = [
        {
            title: "Web Development and Design",
            cutoffPrice: "$959",
            activePrice: "$415.99",
        },
        {
            title: "The Complete Cyber Security Course: Hackers",
            cutoffPrice: "$959",
            activePrice: "$415.99",
        },
        {
            title: "Fashion Photography From Professional",
            cutoffPrice: "$959",
            activePrice: "$415.99",
        },
        {
            title: "The Complete Financial Analyst Course 2020",
            cutoffPrice: "$959",
            activePrice: "$415.99",
        },
    ];
    const courseDetailsData = [
        {
            icon: <ClockCircleOutlined style={{ fontSize: '16px', color: '#77838F', width: '16px', height: '16px' }} />,
            text: "Duration",
            value: "43 Weeks",
        },
        {
            icon: <BookOutlined style={{ fontSize: '16px', color: '#77838F', width: '16px', height: '16px' }} />,
            text: "Lectures",
            value: "32",
        },
        {
            icon: <User />,
            text: "Enrolled",
            value: "1982 Students",
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: '16px', color: '#77838F', width: '16px', height: '16px' }} />,
            text: "Language",
            value: "English",
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: '16px', color: '#77838F', width: '16px', height: '16px' }} />,
            text: "Skill Level",
            value: "Beginner",
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: '16px', color: '#77838F', width: '16px', height: '16px' }} />,
            text: "Deadline",
            value: "06 April 2020",
        },
        {
            icon: <ClockCircleOutlined style={{ fontSize: '16px', color: '#77838F', width: '16px', height: '16px' }} />,
            text: "Certificate",
            value: "Yes",
        },
    ];

    return (
        <div className="fixed-sidebar">
            <div className="features-and-price">
                <div className="video-placeholder">
                    <div className="video-icon">
                        <PlayCircleOutlined style={{ fontSize: '22px' }} />
                    </div>
                </div>
                <div className="pricing-details">
                    <div className="price">
                        <div className="price-wraper">
                            <span className="original-price">$67.98</span>
                            <span className="discounted-price">$10.00</span>
                            <button className="discount-button">10% off</button>
                        </div>
                    </div>
                    <div className="time-left">
                        <WarningOutlined style={{ fontSize: '16px', color: '#E63946' }} />
                        <span>2 days left in this price</span>
                    </div>
                </div>
                <div className="buttons">
                    <Button variant="primary" className="custom-btn-buy" customStyle={{ /* your custom styles here */ }}
                        onClick={() => {/* your click handler here */ }}
                        childClasses=""> BUY NOW</Button>
                    <Button variant="primary" className="custom-btn-enroll" customStyle={{ /* your custom styles here */ }}
                        onClick={() => {/* your click handler here */ }}
                        childClasses=""> ENROLL</Button>
                </div>
                <div className="course-details-wrapper">
                    {courseDetailsData.map((detail, index) => (
                        <div className="course-wrap" key={index}>
                            <div className="course-detail" >
                                <div className="detail-icon">{detail.icon}</div>
                                <div className="detail-text">
                                    {detail.text}
                                </div>

                            </div>
                            <div className="detail-value">{detail.value}</div>
                        </div>
                    ))}
                    <div className="course-share">
                        <a href="">
                            <ShareAltOutlined style={{ fontSize: '35px', color: '#10baac', width: '16px', height: '16px' }} />
                            <div className="share-text">Share this Course</div>
                        </a>
                    </div>
                </div>


            </div>
            <div className="latest-courses">
                <div className="courses-wrapper">
                    <h2>Latest Courses</h2>
                    {courseData.map((course, index) => (
                        <div className="course-item" key={index}>
                            <div className="course-image">
                                <img src={CourseImg} alt="Course" />
                            </div>
                            <div className="course-details">
                                <div className="course-title">{course.title}</div>
                                <div className="course-prices">
                                    <span className="cutoff-price">{course.cutoffPrice}</span>
                                    <span className="active-price">{course.activePrice}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default FixedSidebar;
