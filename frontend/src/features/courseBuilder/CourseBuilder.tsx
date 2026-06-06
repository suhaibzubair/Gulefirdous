import React, { useState } from 'react';
import {ReactComponent as CourseBuilderIcon} from '../../assets/images/Frame.svg';
import {ReactComponent as AddIcon} from '../../assets/images/Group.svg';
import Input from '../../components/inputs/input/Input';
import {CustomButtonProps} from './CourseBuilder.d';
import './CourseBuilder.scss';
interface Section {
  title?: string;
  description?: string;
}



function CustomButton({ children, onClick }: CustomButtonProps) {
  return (
    <button onClick={onClick} className="your-button-class">
      {children}
    </button>
  );
}

export default function CourseBuilder() {
  const [sections, setSections] = useState<Section[]>([]);
  const [section, setSection] = useState<Section>({});
  const [openAddSectionForm, setOpenAddSectionForm] = useState(false);
  const [showAddChapterButton, setShowAddChapterButton] = useState(false);
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className='d-flex flex-column justify-center align-center p-50'>
      <CourseBuilderIcon />

      <span className='build-course-text'>Let's build your course!</span>
      <span className='build-course-description'>
        The ‘Curriculum’ tab is where you'll determine the layout of your course, add your content, and include quizzes,
        surveys, discussions, and more! Click the 'Add Chapter' button on the left to get started.
      </span>
      <div className='course-builder-container'>
        <div className='create-section-button' onClick={() => setOpenAddSectionForm(true)}>
          <AddIcon /> <span className='create-section-text'>Create Section</span>
        </div>

        {!sections.length ? (
          <div className={!openAddSectionForm ? 'empty-section' : ''}></div>
        ) : (
          sections.map((s, i) => {
            return (
              <div className='section' key={i}>
                {s.title}
                <div
                  onMouseOver={() => {
                    setShowAddChapterButton(true);
                    setIndex(i);
                  }}
                  onMouseLeave={() => {
                    setShowAddChapterButton(false);
                    setIndex(null);
                  }}
                  className='create-chapter-button'
                >
                  {showAddChapterButton && index === i && (
                    <div>
                      <AddIcon /> <span className='create-section-text'>Create Chapter</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        {openAddSectionForm && (
          <div className='create-section-dialog d-flex flex-column'>
            <div>
              <label>Title:</label>
              <Input onChange={(e) => setSection({ ...section, title: e.target.value })} />
            </div>
            <div>
              <label>Description:</label>
              <Input onChange={(e) => setSection({ ...section, description: e.target.value })} />
            </div>
            <div style={{ gap: '30px' }} className='d-flex justify-end'>
              <CustomButton onClick={() => { setSections([...sections, section]); setOpenAddSectionForm(false); setSection({}) }}>Save</CustomButton>
              <CustomButton onClick={() => { setOpenAddSectionForm(false); setSection({}) }}>Cancel</CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
