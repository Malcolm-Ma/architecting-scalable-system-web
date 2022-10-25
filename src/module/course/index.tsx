/**
 * @file course index
 * @author Mingze Ma
 */
import React from "react";
import Box from "@mui/material/Box";
import VideoPlayer from "src/module/course/VideoPlayer";
import {useParams} from "react-router-dom";
import _ from "lodash";
import Container from "@mui/material/Container";

const Course: React.FC = () => {
  const param = useParams();
  // @ts-ignore
  const courseId = _.get(param, 'courseId');

  return (
    <Container maxWidth="xl" sx={{py: 3}}>
      <Box>
        <VideoPlayer/>
      </Box>
    </Container>
  );
};

export default Course;
