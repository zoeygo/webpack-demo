import React, { useRef, useState, useEffect } from 'react';
import { Carousel, Card, Button, Space } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.css';

interface VideoItem {
  id: number;
  url: string;
  title: string;
}

const VideoCarousel: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 示例视频数据
  const videos: VideoItem[] = [
    {
      id: 1,
      url: 'https://example.com/video1.mp4',
      title: '视频 1',
    },
    {
      id: 2,
      url: 'https://example.com/video2.mp4',
      title: '视频 2',
    },
    {
      id: 3,
      url: 'https://example.com/video3.mp4',
      title: '视频 3',
    },
  ];

  // 处理视频播放结束
  const handleVideoEnd = () => {
    carouselRef.current?.next();
  };

  // 处理轮播切换
  const handleSlideChange = (current: number) => {
    // 暂停当前视频
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.pause();
    }

    setCurrentIndex(current);
    const nextVideo = videoRefs.current[current];
    if (nextVideo && isPlaying) {
      nextVideo.play();
    }
  };

  // 播放/暂停切换
  const togglePlay = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) return;

    if (isPlaying) {
      currentVideo.pause();
    } else {
      currentVideo.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 组件卸载时暂停视频
  useEffect(() => {
    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <Card title="视频轮播" className={styles.card}>
        <Carousel
          ref={carouselRef}
          afterChange={handleSlideChange}
          dots={true}
          effect="fade"
        >
          {videos.map((video, index) => (
            <div key={video.id} className={styles.slideContainer}>
              <video
                ref={el => (videoRefs.current[index] = el)}
                className={styles.video}
                src={video.url}
                onEnded={handleVideoEnd}
                playsInline
                loop={false}
              />
              <div className={styles.videoTitle}>{video.title}</div>
            </div>
          ))}
        </Carousel>

        <Space className={styles.controls}>
          <Button
            type="primary"
            icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={togglePlay}
          >
            {isPlaying ? '暂停' : '播放'}
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default VideoCarousel; 