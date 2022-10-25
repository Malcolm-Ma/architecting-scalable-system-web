/**
 * @file video player
 * @author Mingze Ma
 */
import React from "react";
import Box from "@mui/material/Box";
import Player from 'griffith'

const VideoPlayer: React.FC = () => {

  return (
    <Box>
      <Player
        // url={`http://localhost:8090/minio/video/show?videoName=6cf802a706ea4aae9321a83100332af4.mp4`}
        sources={{sd: {play_url: `http://localhost:8090/api/minio/video/show?videoName=760358628aae4b58bb718c96e7b1f9df.mp4`}}}
        // sources={{sd: {play_url: `https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4`}}}
        id="player"
      />
    </Box>
  );
};

export default VideoPlayer;
