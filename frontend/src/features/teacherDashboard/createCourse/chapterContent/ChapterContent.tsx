import React, { useState } from 'react';
import { Tabs } from 'antd';
import { ReactComponent as DownArrow } from '../../../../assets/images/chevron-down.svg';
import Button from '../../../../components/shared/button/Button';
import Video from '../uploadedContent/Video';
import { ChapterContentProps } from './ChapterContent.d';
import './ChapterContent.scss';

const { TabPane } = Tabs;

const tabData: Record<string, number> = {
    "Video": 22,
    "Audio": 20,
    "PDF": 15,
    "TEXT": 10,
    "Downloads": 5,
};

function ChapterContent({ showChapterContentModal }: ChapterContentProps) {
    const [showTabsContent, setShowTabsContent] = useState(true);


    return (
        <div className="chapter-content-section-tabs">
            <Tabs defaultActiveKey="0">
                {Object.keys(tabData).map((tabKey, index) => (
                    <TabPane tab={`${tabKey} ${tabData[tabKey]}`} key={index.toString()}>
                        {showTabsContent && index === 0 ? <Video /> : null}
                    </TabPane>
                ))}
            </Tabs>
            <Button className='add-content-btn' onClick={showChapterContentModal} variant="primary"
                customStyle={{ /* your custom styles here */ }}
                childClasses=""><span className='btn-icon' >+</span> Content</Button>
        </div>
    );
}

export default ChapterContent;
