"use client";
import React, { useRef } from "react";
import { TwitchEmbed } from "react-twitch-embed";
function TwitchPlayer() {
  const embed = useRef();
  const handleReady = (e: any) => {
    embed.current = e;
  };
  return (
    <div className="items-center justify-center text-center mt-20">
      <h1 className="text-center text-2xl text-white ">Web Tv Live</h1>
      <div className="h-[750px] w-full">
        <TwitchEmbed
          channel="cryptokking"
          autoplay
          width="100%"
          height="100%"
          withChat
          darkMode={true}
          onVideoReady={handleReady}
          className="text-center text-2xl text-white mx-auto mt-10"
        />
      </div>
    </div>
  );
}

export default TwitchPlayer;
