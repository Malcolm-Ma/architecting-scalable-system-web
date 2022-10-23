/**
 * @file video player
 * @author Mingze Ma
 */
import React from "react";
import Box from "@mui/material/Box";
// import {Player} from 'video-react';
// import ReactPlayer from 'react-player'
import Player from 'griffith'

const VideoPlayer: React.FC = () => {

  return (
    <Box>
      <Player
        // url={`http://localhost:8090/minio/video/show?videoName=6cf802a706ea4aae9321a83100332af4.mp4`}
        sources={{sd: {play_url: `http://localhost:8090/minio/video/show?videoName=5a964f29b1db404abd5c806c90b93b54.mp4`}}}
        // sources={{sd: {play_url: `https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4`}}}
        id="player"
      />
    </Box>
  );
};

export default VideoPlayer;
