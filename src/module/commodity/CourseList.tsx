/**
 * @file course list
 * @author Mingze Ma
 */
import React, {useMemo} from "react";
import Container from "@mui/material/Container";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import _ from "lodash";
import DuoIcon from '@mui/icons-material/Duo';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
// import PlayDisabledOutlinedIcon from '@mui/icons-material/PlayDisabledOutlined';

interface CourseListProps {
  moduleData: any,
}

const CourseList: React.FC<CourseListProps> = (props) => {
  const {moduleData} = props;

  const courseList = useMemo(() => {
    const original = _.get(moduleData, 'course_list', []);
    return _.sortBy(original, 'course_sequence');
  }, [moduleData]);

  return (
    <Container maxWidth="md">
      <List>
        {_.map(courseList, (course: any, index) => {
          console.log('--course--\n', course);
          return (
            <ListItem
              key={index}
              sx={{py: { xs: 2, sm: 3 }}}
              secondaryAction={
                <IconButton edge="end">
                  <SmartDisplayOutlinedIcon />
                  {/*<PlayDisabledOutlinedIcon />*/}
                </IconButton>
              }
            >
              <ListItemIcon>
                <DuoIcon/>
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h4">{_.startCase(course.course_name)}</Typography>}
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default CourseList;
