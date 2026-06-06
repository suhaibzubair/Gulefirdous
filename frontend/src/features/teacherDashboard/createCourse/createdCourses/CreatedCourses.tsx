import React, { useState, useEffect } from 'react';
import { CreatedCoursesProps } from './CreatedCourses.d';
import Button from '../../../../components/shared/button/Button';
import CourseDetail from '../courseDetail/CourseDetail';
import IMG from '../../../../assets/images/Back.png';
import './CreatedCourses.scss';
import { Modal } from 'antd';
import ReactHtmlParser from 'react-html-parser';

const CreatedCourses: React.FC<CreatedCoursesProps> = ({
  courses,
  onAddSectionClick,
  img,
}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleData = () => {
    setIsModalVisible(false);
  };

  const AddSectionModal = (
    <Modal open={isModalVisible} onCancel={handleCancel} width="900px" footer={null}>
      {/* Content for your modal */}
      <CourseDetail onsaveclick={handleData} oncancelsave={handleCancel} width="90%" />
    </Modal>
  );

  return (
    <div className="created-courses-wrapper">
      {courses &&
        Object.keys(courses)?.length &&
        courses?.map((course: any, index: number) => (
          <div key={index} className="course-item">
            <div className="left-section">
              <img src={IMG} alt={`Course ${index + 1} Image`} />
            </div>
            <div className="right-section">
              <div className="course-title-wrapper">
                <h2>{`Course Title: ${course.title}`}</h2>
                <Button
                  variant="primary"
                  className="custom-button"
                  childClasses=""
                  customStyle={{ backgroundColor: '#10baac' }}
                  onClick={showModal}
                >
                  + Section
                </Button>
              </div>
              <div className="course-description-wrapper">
                <h3>Description:</h3>
                {ReactHtmlParser(course.description)}
              </div>
            </div>
          </div>
        ))}
      {AddSectionModal}
    </div>
  );
};

export default CreatedCourses;
