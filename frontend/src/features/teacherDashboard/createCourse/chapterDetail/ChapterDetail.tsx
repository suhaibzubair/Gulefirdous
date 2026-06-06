import React, { useState } from 'react';
import Button from '../../../../components/shared/button/Button';
import { ReactComponent as Swamp } from '../../../../assets/images/swap.svg';
import { ReactComponent as Edit } from '../../../../assets/images/edit.svg';
import { ReactComponent as DownArrow } from '../../../../assets/images/chevron-down.svg';
import ChapterContent from '../chapterContent/ChapterContent';
import Upload from '../upload/Upload';
import { SMALL_MODAL, MEDIUM_MODAL, LARGE_MODAL } from '../../../../constants/ModalSizes';
import { Modal } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { ChapterDetailProps } from './ChapterDetail.d';
import './ChapterDetail.scss';

const ChapterDetail: React.FC<ChapterDetailProps> = ({ title, description }) => {
    const [showTabsContent, setShowTabsContent] = useState(false);
    const [arrowRotation, setArrowRotation] = useState(180);
    const [isChapterModalVisible, setIsChapterModalVisible] = useState(false);

    const toggleTabsContent = () => {
        setShowTabsContent(!showTabsContent);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const showChapterContentModal = () => {
        setIsChapterModalVisible(true);
    }

    const handleOk = () => {
        setIsChapterModalVisible(false);
    }

    const handleCancel = () => {
        setIsChapterModalVisible(false);
    };

    const AddChapterContentModal = (
        <Modal
            title="Add Chapter's Content"
            open={isChapterModalVisible}
            onCancel={handleCancel}
            onOk={handleOk}
            width="900px"
            footer={null}
        >
            <Upload />
        </Modal>
    );

    return (
        <div className='chapter-detail-wraper'>
            <div className="chapter-section-header">
                <div className="section-title-wraper">
                    <Swamp />
                    <div className="chaptr-title">
                        <div className="title-detial">
                            <h4>{title}</h4>
                            <p>{ReactHtmlParser(description)}</p>
                        </div>
                        <Edit style={{ fontSize: '16px' }} />
                    </div>
                </div>
                <div className="section-btns">
                    <Button variant="primary"
                        customStyle={{ /* your custom styles */ }}
                        childClasses="string" className='add-content-btn' onClick={showChapterContentModal}><span className='btn-icon'>+</span> Content</Button>
                    <span className="down-arrow-icon" onClick={toggleTabsContent} style={{ transform: `rotate(${arrowRotation}deg)` }}><DownArrow /></span>
                </div>
            </div>
            {showTabsContent && <ChapterContent showChapterContentModal={showChapterContentModal} />}
            {AddChapterContentModal}
        </div>
    );
}

export default ChapterDetail;
