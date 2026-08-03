import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => {
                    // Ignore AbortError from React StrictMode double-invoke in dev
                });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error('HLS fatal error:', data);
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            controls
            muted
            playsInline
            className="w-full rounded-lg bg-black"
        />
    );
}