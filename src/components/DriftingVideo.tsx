import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

interface FloatingVideo {
    id: number;
    x: number;
    y: number;
    moveX: number;
    moveY: number;
    rotation: number;
    scale: number;
    duration: number;
}

export const DriftingVideo = ({ src }: { src: string }) => {
    const [videos, setVideos] = useState<FloatingVideo[]>([]);
    const counter = useRef(0);

    const spawnVideo = () => {
        const id = counter.current++;

        const winWidth =
            typeof window !== 'undefined' ? window.innerWidth : 1000;
        const winHeight =
            typeof window !== 'undefined' ? window.innerHeight : 800;

        const x = Math.random() * (winWidth * 0.8) + winWidth * 0.1;
        const y = Math.random() * (winHeight * 0.8) + winHeight * 0.1;
        const angle = Math.random() * Math.PI * 2;
        const speed = 100 + Math.random() * 300; // Distance to drift
        const moveX = Math.cos(angle) * speed;
        const moveY = Math.sin(angle) * speed;
        const rotation = (Math.random() - 0.5) * 15;
        const scale = 0.5 + Math.random() * 0.5;
        const duration = 5 + Math.random() * 5;

        setVideos((prev) => [
            ...prev,
            { id, x, y, moveX, moveY, rotation, scale, duration },
        ]);
    };

    useEffect(() => {
        // Initial spawn immediately
        spawnVideo();

        // Spawn loop
        const interval = setInterval(
            () => {
                if (!document.hidden) {
                    spawnVideo();
                }
            },
            3000 + Math.random() * 6000,
        );

        return () => clearInterval(interval);
    }, []);

    const removeVideo = (id: number) => {
        setVideos((prev) => prev.filter((v) => v.id !== id));
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
            {videos.map((video) => (
                <VideoInstance
                    key={video.id}
                    video={video}
                    src={src}
                    onComplete={() => removeVideo(video.id)}
                />
            ))}
        </div>
    );
};

const VideoInstance = ({
    video,
    src,
    onComplete,
}: {
    video: FloatingVideo;
    src: string;
    onComplete: () => void;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime =
                Math.random() * videoRef.current.duration;
        }
    };

    return (
        <motion.video
            ref={videoRef}
            onLoadedMetadata={handleLoadedMetadata}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            // Styling: Translucent, rounded, subtle shadow, slight blur to blend
            className="absolute rounded-3xl object-cover opacity-0 shadow-2xl brightness-90 grayscale-20"
            style={{
                left: 0,
                top: 0,
                width: '1000px', // Base width, scaled by transform
                maxWidth: '60vw',
                x: video.x,
                y: video.y,
                translateX: '-50%',
                translateY: '-50%',
            }}
            initial={{
                opacity: 0,
                scale: video.scale * 0.9,
                rotate: video.rotation - 5,
            }}
            animate={{
                opacity: [0, 0.8, 0.8, 0],
                x: video.x + video.moveX,
                y: video.y + video.moveY,
                rotate: video.rotation + 5,
                scale: video.scale,
            }}
            transition={{
                duration: video.duration,
                ease: 'easeInOut',
                times: [0, 0.2, 0.8, 1], // Fade in 20%, stay 60%, fade out 20%
            }}
            onAnimationComplete={onComplete}
        />
    );
};
