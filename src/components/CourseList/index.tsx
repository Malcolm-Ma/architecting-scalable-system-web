/**
 * @file course list
 * @author Mingze Ma
 */
import React, {useMemo} from "react";
import Container from "@mui/material/Container";
import {List, ListItem, ListItemIcon, ListItemText, ListItemProps, SxProps, Divider} from "@mui/material";
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
  divider?: boolean
}

const Index: React.FC<CourseListProps> = (props) => {
  const {moduleData, size = 'normal', listItemSx, listItemProps, divider = false} = props;
  const normalSize = size === 'normal';

  // @ts-ignore
  const navigate = useNavigate()

  const courseList = useMemo(() => {
    const original = _.get(moduleData, 'course_list', []);
    return _.sortBy(original, 'course_sequence');
  }, [moduleData]);

  return (
    <Container maxWidth={normalSize ? 'md' : 'sm'}>
      <List>
        {_.map(courseList, (course: any, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  ...(normalSize && {py: {xs: 2, sm: 3}}),
                  ...listItemSx
                }}
                secondaryAction={
                  <IconButton
                    sx={{color: 'primary.main'}}
                    edge="end"
                    onClick={() => window.open(`/course/${moduleData.commodity_id}/${course.course_id}`)}>
                    <SmartDisplayOutlinedIcon/>
                    {/*<PlayDisabledOutlinedIcon />*/}
                  </IconButton>
                }
                {...listItemProps}
              >
                <ListItemIcon>
                  <DuoIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={<Typography
                    variant={normalSize ? 'h4': 'h5'}
                    sx={{...(!normalSize && {color: 'grey.700', fontWeight: 'bold'})}}
                  >
                    {_.startCase(course.course_name)}
                  </Typography>}
                />
              </ListItem>
              {(divider && index + 1 < courseList.length) && <Divider component="li"/>}
            </React.Fragment>
          );
        })}
      </List>
    </Container>
  );
};

export default Index;
