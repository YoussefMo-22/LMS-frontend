import  { useRef, useState } from "react";
import ReactPlayer from "react-player";
import course from '../../../assets/course.png'

export default function VideoPlayer() {
  const playerRef = useRef<ReactPlayer>(null);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleProgress = (state: { playedSeconds: number }) => {
    // Save progress every few seconds or limit seeking
    if (Math.abs(state.playedSeconds - playedSeconds) > 5) {
      // This can be used to detect fast-forwarding
      console.log("Seek detected or progress jump");
    }
    setPlayedSeconds(state.playedSeconds);
  };

  const handleEnded = () => {
    setIsCompleted(true);
    // Call your API here to mark the lesson as completed
    console.log("✅ Lesson completed");
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <ReactPlayer
        ref={playerRef}
        url="/videos/lesson01.mp4"
        light={course} // optional thumbnail before play
        controls
        width="100%"
        height="100%"
        onEnded={handleEnded}
        onProgress={handleProgress}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload", // hides download option
              disablePictureInPicture: true,
            },
          },
        }}
      />
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-sm px-3 py-1 rounded">
          Completed
        </div>
      )}
    </div>
  );
}
