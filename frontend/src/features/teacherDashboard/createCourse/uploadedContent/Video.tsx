import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReactComponent as Dots } from '../../../../assets/images/more-vertical.svg';
import { ReactComponent as ListIcon } from '../../../../assets/images/grid-horizontal.svg';
import { ReactComponent as CarouselIcon } from '../../../../assets/images/grid-vertical.svg';
import { ReactComponent as PlayIcon } from '../../../../assets/images/Play.svg';
import PlayImg from '../../../../assets/images/videobg.png';
import {Video} from './Video.d';
import './Video.scss';

function AudioVideoSection() {
    const [view, setView] = useState<'list' | 'carousel'>('list'); // State to toggle between list and carousel view
    const [videos, setVideos] = useState<Video[]>([
        { title: 'Learn how to make the frames and their use', duration: '3:25', watchHours: '13 hours', thumbnailUrl: 'thumbnail1.jpg' },
        { title: 'Learn how to make the frames and their use', duration: '4:15', watchHours: '9 hours', thumbnailUrl: 'thumbnail2.jpg' },
        { title: 'Learn how to make the frames and their use', duration: '4:15', watchHours: '9 hours', thumbnailUrl: 'thumbnail2.jpg' },
        { title: 'Learn how to make the frames and their use', duration: '4:15', watchHours: '9 hours', thumbnailUrl: 'thumbnail2.jpg' },
        
    ]);

    const toggleView = (newView: 'list' | 'carousel') => {
        setView(newView);
    };

    return (
        <div>
            <div className="view-toggle-wraper">
                <div className="view-toggle">
                    <div onClick={() => toggleView('list')}>
                        <ListIcon className={view === 'list' ? 'selected' : 'not-selected'} style={{ marginRight: 10 }} />
                    </div>
                    <div onClick={() => toggleView('carousel')}>
                        <CarouselIcon className={view === 'carousel' ? 'selected' : 'not-selected'} />
                    </div>
                </div>
            </div>

            {view === 'carousel' ? (
                <div className="carousel-view">
                    <Carousel>
                        {videos.map((video, index) => (
                            <div key={index}>
                                <div className="carousel-item">
                                    <div className="thumbnail-container">
                                        <PlayIcon className='play-icon' />
                                        <img src={PlayImg} alt={`Thumbnail for ${video.title}`} />
                                    </div>
                                    <div className="video-details">
                                        <div className="video-title">
                                            <h3>{video.title}</h3>
                                            <Dots className="dots"/>
                                        </div>
                                        <div className="video-info">
                                            <div className="watch-hours">
                                                Watch Hours: {video.watchHours}
                                            </div>
                                            <div className="duration">
                                                Duration: {video.duration}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div className="list-view">
                    {videos.map((video, index) => (
                        <div key={index} className="video-item">

                            <div className="video-details-wraper">
                                <div className="thumbnail-container">
                                    <PlayIcon className='play-icon' />
                                    <img src={PlayImg} alt={`Thumbnail for ${video.title}`} />
                                </div>
                                <div className="video-details">
                                    <div className="video-title">
                                        <h3>{video.title}</h3>
                                    </div>
                                    <div className="video-info">
                                        <div className="watch-hours">
                                            Watch Hours: {video.watchHours}
                                        </div>
                                        <div className="duration">
                                            Duration: {video.duration}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dots"><Dots /></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AudioVideoSection;
