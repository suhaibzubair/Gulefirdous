import React from 'react';
import Sidebar from '../fixedSidebar/FixedSidebar';
import { ReactComponent as Star } from '../../../assets/images/Vector.svg';
import { HeartOutlined, CheckCircleFilled } from '@ant-design/icons';
import { ReactComponent as Graystar } from '../../../assets/images/gray-vector.svg';
import { ReactComponent as Review } from '../../../assets/images/blogging 1.svg';
import { ReactComponent as User } from '../../../assets/images/reader 1.svg';
import { ReactComponent as PlayerBtn } from '../../../assets/images/player_btn.svg';
import { ReactComponent as GrayRating } from '../../../assets/images/GrayStar.svg';
import { ReactComponent as YellowRating } from '../../../assets/images/yellowStar.svg';
import { ReactComponent as Bullet } from '../../../assets/images/Ellipse 6.svg';
import { ReactComponent as Activebullet } from '../../../assets/images/Rectangle 12.svg';
import ProgressBar from '../../../components/shared/progressBar/ProgressBar';
import Button from '../../../components/shared/button/Button';
import {CourseData} from './Content.d';
import './Content.scss';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Content = () => {

  const handleclick = () => {
  }
  const coursesData = [
    {
      title: 'The Complete JavaScript Course 2020: Real Projects!',
      category: 'Development',
      price: '$21.99',
      lessons: '5 lessons',
      rating: 5,
    },
    {
      title: 'The Complete JavaScript Course 2020: Real Projects!',
      category: 'Development',
      price: '$21.99',
      lessons: '5 lessons',
      rating: 5,
    },
    {
      title: 'The Complete JavaScript Course 2020: Real Projects!',
      category: 'Development',
      price: '$21.99',
      lessons: '5 lessons',
      rating: 5,
    },
    {
      title: 'The Complete JavaScript Course 2020: Real Projects!',
      category: 'Development',
      price: '$21.99',
      lessons: '5 lessons',
      rating: 5,
    },
    
  ];

  const Course = ({ course }: { course: CourseData }) => (
    <div className="courses">
      <div className="img-container">
        <span className="course-price">{course.price}</span>
      </div>
      <div className="course-content">
        <span>{course.category}</span>
        <h4>{course.title}</h4>
        <div className="course-rating">
          <span className="icon-text">
            <User style={{ marginRight: '5px', width: '18px', height: '18px' }} />
            <span>{course.lessons}</span>
          </span>
          <span className="featured-rating">
            {[...Array(course.rating).keys()].map((index) => (
              <Star
                key={index}
                style={{ marginRight: '5px', width: '18px', height: '18px' }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="content">
      <div className="breadcrumbs">
        Home / Courses List / Course Single
      </div>
      <Sidebar />
      <div className="course-inset">
        <div className="course-title">
          <div className="title-header">
            <h2 className='title-text'>Learn Figma: User Interface Design Essentials - UI/UX Design</h2>
            <span className="save-favorite-icon">
              <HeartOutlined style={{ width: '16px', height: '16px', color: 'white', backgroundColor: '#949da6', padding: '10px', borderRadius: '50%' }} />
            </span>
          </div>
          <p className='course-description'>Master Figma app to get a job in UI Design, User Interface, User Experience design, Web Design & UX design.</p>

          <div className="course-details">
            <div className="course-image">
              <div className="eclipseIcon"></div>
            </div>
            <div className="course-info">
              <div className="course-info-details">
                <p>Created by</p>
                <span>John doe</span>
              </div>
              <div className="course-info-details">
                <p>Created by</p>
                <span>John doe</span>
              </div>
              <div className="course-info-details">
                <p>Created by</p>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '3px' }}>
                    <Star />
                  </span>
                  <span style={{ marginRight: '3px' }}>
                    <Star />
                  </span>
                  <span style={{ marginRight: '3px' }}>
                    <Star />
                  </span>
                  <span style={{ marginRight: '3px' }}>
                    <Star />
                  </span>
                  <span style={{ marginRight: '3px' }}>
                    <Star />
                  </span>
                  <span style={{ fontSize: '14px', color: '#77838F' }}>
                    4.87 (3.8k+ reviews)
                  </span>
                </span>
              </div>

            </div>
          </div>
        </div>
        <div className="tabs-container" style={{ height: "1600px", width: '700px' }}>
          <Tabs defaultActiveKey="overview" className="custom-tabs" tabPosition="top">
            <TabPane tab="Overview" key="overview">
              <div className="overview-tab-content">
                <div className="course-description">
                  <h3>Course Description</h3>
                  <p>
                    Do you want to become a UI/UX designer but you don't know where to start? This course will allow you to develop your user interface design skills, and you can add UI designer to your CV and start getting clients for your skills.
                    <br /><br />
                    Hi everyone. I'm Arash, and I'm a UI/UX designer. In this course, I will help you learn and master Figma app comprehensively from scratch. Figma is an innovative and brilliant tool for User Interface design. It's used by everyone from entrepreneurs and start-ups to Apple, Airbnb, Facebook, etc.
                  </p>
                  <div className="read-more">
                    <span>Read More</span>
                    <span className='icon'>+</span>
                  </div>
                  <div className="Learn-section">
                    <h3>What You'll Learn</h3>
                    <div className="learn-items">
                      <div className="learn-items-left">
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Become a UI/UX designer.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          You will be able to start earning Figma skills.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Build a UI project from beginning to end.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Work with colors & fonts.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          You will create your own UI Kit.
                        </div>
                      </div>
                      <div className="learn-items-right">
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Build & test a complete mobile app.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Learn to design mobile apps.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Design 3 different logos.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Create low-fidelity wireframe.
                        </div>
                        <div className="learn-item">
                          <CheckCircleFilled style={{ fontSize: '16px', marginRight: '10px', color: '#10baac' }} />
                          Downloadable exercise files.
                        </div>
                      </div>
                    </div>
                    <div className="requirements">
                      <h3>Requirements</h3>
                      <ul>
                        <li>We do not require any previous experience or pre-defined skills to take this course. A great orientation would be enough to master UI/UX design.</li>
                        <li>A computer with a good internet connection.</li>
                        <li>Adobe Photoshop (OPTIONAL)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Curriculum" key="curriculum">
              <h1>Curriculum Section will be added soon!</h1>
            </TabPane>
            <TabPane tab="Instructor" key="instructor">
              <div className="tab-content">
                <h3>About the Instructor</h3>
                <div className="instructor-info">
                  <div className="instructor-image">
                    <div className="outside-border">
                      <div className="inside-bg"></div>
                    </div>
                  </div>
                  <div className="instructor-details">
                    <div className="instructor-name">
                      Lauren Handerson
                    </div>
                    <div className="instructor-description">
                      iOS Developer & UI Designer
                    </div>
                  </div>
                </div>
                <div className="instructor-icons">
                  <div className="social-item">
                    <span style={{ marginRight: '5px', fontSize: '16px', color: '#949DA6', border: '2px', height: '16px', width: '16px' }}>
                      <Graystar />
                    </span>
                    <span>4.87 Instructor rating</span>
                  </div>
                  <div className="social-item">
                    <span style={{ marginRight: '5px', fontSize: '16px', color: '#949DA6', border: '2px', height: '16px', width: '16px' }}>
                      <Review />
                    </span>
                    <span>1,533 reviews</span>
                  </div>
                  <div className="social-item">
                    <span style={{ marginRight: '5px', fontSize: '16px', color: '#949DA6', border: '2px', height: '16px', width: '16px' }}>
                      <User />
                    </span>
                    <span>23,912 students</span>
                  </div>
                  <div className="social-item">
                    <span style={{ marginRight: '5px', fontSize: '16px', color: '#949DA6', border: '2px', height: '16px', width: '16px' }}>
                      <PlayerBtn />
                    </span>
                    <span>29 courses</span>
                  </div>
                </div>


                <div className="instructor-description">
                  <span>I am a UI/UX designer and an iOS developer with almost six years of experience in application development and also ten years of graphic design and User Interface design.</span> <br />

                  <span>My passion is helping people to learn new skills in a short-term course and achieve their goals. I've been designing for more than ten years and developing iOS apps for four years. It's my honor if I could help you learn to program in a simple word. I currently am teaching iOS 13, Swift 5, ARKit 3, Sketch 5, Illustrator, Photoshop, Cinema 4D, HTML, CSS, JavaScript, etc.</span>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Review" key="review">
              <div className="review-tab-content">
                <div className="review-content">
                  <h3>Student Feedback</h3>
                  <div className="feedback-box-inner">
                    <div className="feedback-box-text">
                      <span className='rating-value'>4.93</span>
                      <span className='rating-text'>Course rating</span>
                      <span className='stars'>
                        <Star style={{ marginRight: '5px' }} />
                        <Star style={{ marginRight: '5px' }} />
                        <Star style={{ marginRight: '5px' }} />
                        <Star style={{ marginRight: '5px' }} />
                        <Star style={{ marginRight: '5px' }} />
                      </span>
                    </div>
                    <div className="feedback-box-star">
                      <div className="progress-bar">
                        <ProgressBar progress={80} />
                        <ProgressBar progress={50} />
                        <ProgressBar progress={40} />
                        <ProgressBar progress={30} />
                      </div>
                      <div className="star-rating">
                        <span>
                          <YellowRating style={{ marginRight: '10px' }} />
                          <YellowRating style={{ marginRight: '10px' }} />
                          <YellowRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px', }} />
                        </span>
                        <span>
                          <YellowRating style={{ marginRight: '10px' }} />
                          <YellowRating style={{ marginRight: '10px' }} />
                          <YellowRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px', }} />
                        </span>
                        <span>
                          <YellowRating style={{ marginRight: '10px' }} />
                          <YellowRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px', }} />
                        </span>
                        <span>
                          <YellowRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px' }} />
                          <GrayRating style={{ marginRight: '10px', }} />
                        </span>
                      </div>
                      <div className="total-rating-value">
                        <span>4132</span>
                        <span>12</span>
                        <span>5</span>
                        <span>2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="reviews-section">
                  <div className="review-item">
                    <div className="reviewer-image">
                      {/* <img src="reviewer-image.jpg" alt="Reviewer" /> */}
                    </div>
                    <div className="reviewer-details">
                      <div className="name-rating">
                        <h4>Oscar Cafeo</h4>
                        <span>
                          <Star style={{ marginRight: '5px' }} />
                          <Star style={{ marginRight: '5px' }} />
                          <Star style={{ marginRight: '5px' }} />
                          <Star style={{ marginRight: '5px' }} />
                          <Star style={{ marginRight: '5px' }} />
                        </span>
                      </div>
                      <span className='review-text'>Beautiful courses</span>
                    </div>
                  </div>

                  <p>This course was well organized and covered a lot more details than any other Figma courses. I really enjoy it. One suggestion is that it can be much better if we could complete the prototype together. Since we created 24 frames, I really want to test it on Figma mirror to see all the connections. Could you please let me take a look at the complete prototype?</p>
                  <div className="review-item">
                    <div className="reviewer-image">
                      {/* <img src="reviewer-image.jpg" alt="Reviewer" /> */}
                    </div>
                    <div className="reviewer-details">
                      <div className="name-rating">
                        <h4>Oscar Cafeo</h4>
                        <span>
                          <Star style={{ marginRight: '5px' }} />
                          {/* <Star style {{ marginRight: '5px' }} /> */}
                          <Star style={{ marginRight: '5px' }} />
                          <Star style={{ marginRight: '5px' }} />
                          <Star style={{ marginRight: '5px' }} />
                        </span>
                      </div>
                      <span className='review-text'>Beautiful courses</span>
                    </div>
                  </div>
                  <p>This course was well organized and covered a lot more details than any other Figma courses. I really enjoy it. One suggestion is that it can be much better if we could complete the prototype together. Since we created 24 frames, I really want to test it on Figma mirror to see all the connections. Could you please let me take a look at the complete prototype?</p>
                </div>
                <div className="add-review-section">
                  <div className="text-wraper">
                    <h3>Add Reviews & Rate</h3>
                    <span className='review-text'>What is it like to Course?</span>
                    <span>
                      <Star style={{ marginRight: '5px' }} />
                      <Star style={{ marginRight: '5px' }} />
                      <Star style={{ marginRight: '5px' }} />
                      <Star style={{ marginRight: '5px' }} />
                      <Star style={{ marginRight: '5px' }} />
                    </span>
                  </div>
                  <div className='review-form'>
                    <div className="input-wraper">
                      <h3>Review title</h3>
                      <input type="text" className="review-input" placeholder='Courses' />
                    </div>
                    <div className="input-wraper">
                      <h3>Review Content</h3>
                      <textarea className="review-textarea" id="" placeholder='Content'></textarea>
                    </div>
                    <Button variant="primary" className="submit-review-btn" childClasses="" customStyle={{ /* your custom styles here */ }} onClick={handleclick}>SUBMIT REVIEW</Button>
                  </div>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <div className="featured-section">
      <div className="feature-heading">
        <h2>Related Courses</h2>
        <span>Discover your perfect program in our courses.</span>
      </div>
      <div className="featured-courses">
        {coursesData.map((course, index) => (
          <Course key={index} course={course} />
        ))}
      </div>
      <div className="featured-bullets">
        <span className='bullets'>
          <Bullet style={{ marginRight: '5px' }} />
          <Activebullet style={{ marginRight: '5px' }} />
          <Bullet style={{ marginRight: '5px' }} />
          <Bullet style={{ marginRight: '5px' }} />
        </span>
      </div>
    </div>
    </div >
  );
};

export default Content;
