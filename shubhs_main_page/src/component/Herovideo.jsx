import React, { useState, useRef, useEffect } from "react";
import style from "./Herovideo.module.css";
import { VscUnmute, VscMute } from "react-icons/vsc";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Herovideo = ({ video, onNext, onPrevious, bookNow, moreInfo }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={style.videocontainer}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => (videoRef.current.style.display = "block")}
        onError={() => alert("Video failed to load")}
        style={{ display: "none" }}
      >
        <source src={video.vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={style.contentContainer}>
        <h1 className={style.title}>{video.title}</h1>
        <div className={style.buttons}>
          <button className={style.bookButton} onClick={() => bookNow(video)}>
            Booking
          </button>
          <button className={style.infoButton} onClick={() => moreInfo(video)}>
            more info 
          </button>
        </div>
      </div>
      <button className={style.leftButton} onClick={onPrevious}>
        <FaAngleLeft className={style.iconNav} />
      </button>
      <button className={style.rightButton} onClick={onNext}>
        <FaAngleRight className={style.iconNav} />
      </button>
      <button onClick={toggleMute} className={style.muteButton}>
        {isMuted ? (
          <VscUnmute className={style.icon3} />
        ) : (
          <VscMute className={style.icon3} />
        )}
      </button>
    </div>
  );
};

export default Herovideo;
