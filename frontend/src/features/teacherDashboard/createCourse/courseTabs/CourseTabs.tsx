import React, { useState } from 'react';
import { Tabs, Menu, Dropdown } from 'antd';
import CourseDetails from '../courseDetail/CourseDetail';
import CourseSectionContainer from '../courseSectionContainer/CourseSectionContainer';
import { Icon } from '@iconify/react';
import './CourseTabs.scss';
import Course from '../courseContainer/course/Course';
import CourseContainer from '../courseContainer/CourseContainer';

const { TabPane } = Tabs;

function CourseTabs({setCourses}:any) {
  const [showSection, setShowSection] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const handleSaveClick = () => {
    setShowSection(!showSection);
  };

  const handleCancel = () => { };


  const handlePreviewClick = (type: any) => {
    setSelectedPreview(type);
  };

  const menu = (
    <Menu onClick={(e) => handlePreviewClick(e.key)}>
      <Menu.Item key="course">Course Preview</Menu.Item>
      <Menu.Item key="section">Section Preview</Menu.Item>
      <Menu.Item key="chapter">Chapter Preview</Menu.Item>
    </Menu>
  );

  // Updated data for tab values
  const tabData = {
    generalinfo: "General Info",
    curriculum: "Curriculum",
    bulkImporter: "Bulk Importer",
    settings: "Settings",
    drip: "Drip",
    pricing: "Pricing",
    publish: "Publish",
  };

  return (
    <>
      <div className="tabs-navbar">
        <div className="back-btn">
          <span> <Icon icon="eva:arrow-ios-back-outline" height="24" /></span>
          Back to courses
        </div>
        <div className="course-name">
          <h3>Course Name here</h3>
        </div>
        <div className="preview-btn">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              {selectedPreview ? `Preview: ${selectedPreview}` : 'Select Preview'}
            </a>
          </Dropdown>
          <span> <Icon icon="eva:arrow-ios-forward-outline" height="24" /></span>

        </div>
      </div>
      <Tabs defaultActiveKey="generalinfo">
        <TabPane tab={tabData.generalinfo} key="generalinfo">
          {showSection ? (
            <CourseSectionContainer />
          ) : (
            // <CourseDetails onsaveclick={handleSaveClick} oncancelsave={handleCancel} />
            <CourseContainer/>
          )}
        </TabPane>
        <TabPane tab={tabData.curriculum} key="curriculum">
        </TabPane>
        <TabPane tab={tabData.bulkImporter} key="bulkImporter">
        </TabPane>
        <TabPane tab={tabData.settings} key="settings">
        </TabPane>
        <TabPane tab={tabData.drip} key="drip">
        </TabPane>
        <TabPane tab={tabData.pricing} key="pricing">
        </TabPane>
        <TabPane tab={tabData.publish} key="publish">
        </TabPane>
      </Tabs>
    </>
  );
}

export default CourseTabs;
