/**
 * @file video player
 * @author Mingze Ma
 */
import React from "react";
import Box from "@mui/material/Box";
import Player from 'griffith'
import apiConfig from "src/api/apiConfig";
import _ from "lodash";

interface VideoPlayerProps {
  src: string,
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const {src} = props;

  console.log(`${apiConfig.video.show}?videoName=${_.get(_.split(src, '/'), '1')}`)
  return (
    <Box>
      <Player
        sources={{sd: {play_url: `${apiConfig.video.show}?videoName=${_.get(_.split(src, '/'), '1')}`}}}
        id="player"
      />
    </Box>
  );
};

export default VideoPlayer;
