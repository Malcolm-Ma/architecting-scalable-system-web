/**
 * @file course index
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useMemo, useState} from "react";
import Box from "@mui/material/Box";
import VideoPlayer from "src/module/course/VideoPlayer";
import {useParams} from "react-router-dom";
import _ from "lodash";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import actions from "src/actions";
import CircularProgress from "@mui/material/CircularProgress";
import {Alert, CardContent, Grid, Stack} from "@mui/material";
import CourseList from "src/components/CourseList";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CommentView from "src/components/CommentView";
import useSignInCheck from "src/hooks/useSignInCheck";

const Course: React.FC = () => {
  const param = useParams();
  const commodityId = _.get(param, 'commodityId');
  const courseId = _.get(param, 'courseId');

  // @ts-ignore
  const [detail, setDetail] = useState<{ commodity: any, course: any } | null>(null);

  const [loading, setLoading] = useState(true);

  const {LoginCheck, isPurchased} = useSignInCheck({ commodityInfo: detail?.commodity });

  const getCourseDetail = useCallback(async () => {
    setLoading(true);
    try {
      const [commodityRes, courseRes] = await Promise.all([
        actions.getCommodityDetail({commodityID: commodityId}),
        actions.getCourseInfo({courseId})
      ]);
      console.log('--commodityRes--\n', commodityRes);
      console.log('--courseRes--\n', courseRes);
      setDetail({
        commodity: commodityRes,
        course: courseRes,
      });
    } catch (e: any) {
      setDetail(null);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [commodityId, courseId]);

  const teacherFullName = useMemo(() => {
    if (!_.get(detail?.commodity, 'published_by')) {
      return 'System Course';
    }
    return `${_.get(detail?.commodity, 'published_by.user_firstname', '')} ${_.get(detail?.commodity, 'published_by.user_lastname', '')}`
  }, [detail?.commodity]);

  useEffect(() => {
    getCourseDetail();
    return () => setDetail(null);
  }, [getCourseDetail]);

  const displayTitle = _.startCase(_.get(detail?.commodity, 'commodity_name', ''))
    + ': ' + _.startCase(_.get(detail?.course, 'course_name', ''))

  return (
    <LoginCheck>
      <Container maxWidth="xl" sx={{py: 3, bgcolor: 'grey.A100', minHeight: '100%'}}>
        {!loading
          ? <>{isPurchased
            ? <>
              <Typography sx={{pt: 1, pb: 3}} variant="h2">
                {displayTitle}
              </Typography>
              <Grid container spacing={2} rowSpacing={3}>
                <Grid item sm={12} md={8} xl={10}>
                  <VideoPlayer src={detail?.course.course_resource}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} xl={2}>
                  <Card sx={{height: '100%', py: 2}}>
                    <Typography sx={{px: 3, py: 2}} variant="h4">
                      Sections
                    </Typography>
                    <CourseList
                      size="inline"
                      moduleData={detail?.commodity}
                      listItemSx={{pl: 0}}
                      divider
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Card sx={{pb: 2}}>
                    <Typography variant="h4" sx={{p: 3, pb: 2}}>
                      Comments
                    </Typography>
                    <CommentView moduleData={detail?.commodity} summary={false} />
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Card>
                    <Typography variant="h4" sx={{p: 2, pb: 0}}>
                      Teacher
                    </Typography>
                    <CardContent>
                      <Stack direction="row" spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
                        <Avatar alt={teacherFullName} src={_.get(detail?.commodity, 'published_by.user_avatar', '#')}/>
                        <Typography variant="body1">{teacherFullName}</Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Box></Box>
            </>
            : <Alert severity="error">You are not permitted to view this course. Please enroll in this course first.</Alert>
          }</>
          : <CircularProgress/>
        }
      </Container>
    </LoginCheck>
  );
};

export default Course;
