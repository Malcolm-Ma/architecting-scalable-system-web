/**
 * @file course list
 * @author Mingze Ma
 */
import React, {useMemo} from "react";
import Container from "@mui/material/Container";
import {List, ListItem, ListItemIcon, ListItemText, ListItemProps, SxProps} from "@mui/material";
import _ from "lodash";
import DuoIcon from '@mui/icons-material/Duo';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import {useNavigate} from "react-router-dom";
// import PlayDisabledOutlinedIcon from '@mui/icons-material/PlayDisabledOutlined';

interface CourseListProps {
  size: 'inline' | 'normal',
  moduleData: any,
  listItemProps?: ListItemProps,
  listItemSx?: SxProps,
}

const Index: React.FC<CourseListProps> = (props) => {
  const {moduleData, size = 'normal', listItemSx, listItemProps} = props;
  const normalSize = size === 'normal';

  const navigate = useNavigate()

  const courseList = useMemo(() => {
    const original = _.get(moduleData, 'course_list', []);
    return _.sortBy(original, 'course_sequence');
  }, [moduleData]);

  return (
    <Container maxWidth={normalSize ? 'md' : 'sm'}>
      <List>
        {_.map(courseList, (course: any, index) => {
          console.log('--course--\n', course);
          return (
            <ListItem
              key={index}
              sx={{
                ...(normalSize && {py: { xs: 2, sm: 3}}),
                ...listItemSx
              }}
              secondaryAction={
                <IconButton edge="end" onClick={() => navigate(`/course/${course.course_id}`)}>
                  <SmartDisplayOutlinedIcon />
                  {/*<PlayDisabledOutlinedIcon />*/}
                </IconButton>
              }
              {...listItemProps}
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

export default Index;
