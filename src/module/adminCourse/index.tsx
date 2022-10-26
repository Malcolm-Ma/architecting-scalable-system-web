/**
 * @file admin course index
 * @author Mingze Ma
 */
import React, {useCallback, useEffect, useState} from "react";
import useAdminCheck from "src/hooks/useAdminCheck";
import Button from "@mui/material/Button";
import AdminPage from "src/components/AdminPage";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Empty, Select, SelectProps} from "antd";
import actions from "src/actions";
import _ from "lodash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, useTheme} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AdminCourseList from "src/module/adminCourse/AdminCourseList";

const AdminCourse: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();

  const [moduleList, setModuleList] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<object | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [initialId] = useState<string | null>(searchParams.get('module_id'));

  const [noCourse, setNoCourse] = useState(false);
  const [loading, setLoading] = useState(true);

  const {userInfo, AuthCheck} = useAdminCheck();

  const getPublishedCommodityList = useCallback(async () => {
    setLoading(true);
    try {
      const res: any = await actions.getPublishedCommodityList({
        userId: _.get(userInfo, 'user_id'),
      });
      const filteredRes = _.filter(res, (i) => _.isObject(i));
      setModuleList(filteredRes);
    } catch (e: any) {
      console.error(e);
      setModuleList([]);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  const handleSelectChange = useCallback<Exclude<SelectProps['onChange'], undefined>>((value, option) => {
    setSelectedModule(option);
    setSelectedId(value);
    setSearchParams({module_id: value});
  }, [setSearchParams]);


  useEffect(() => {
    !_.isEmpty(userInfo) && getPublishedCommodityList();
    return () => setModuleList([]);
  }, [getPublishedCommodityList, userInfo]);

  useEffect(() => {
    if (moduleList.length >= 1) {
      if (_.isNil(initialId)) {
        // set the first module as default selection
        setSelectedModule(moduleList[0]);
        setSearchParams({module_id: _.get(moduleList, '0.commodity_id', '')});
        setSelectedId(_.get(moduleList, '0.commodity_id', null));
      } else {
        const filteredModule = _.find(moduleList, ['commodity_id', initialId]);
        setSelectedModule(filteredModule);
        setSelectedId(initialId);
      }
    }
  }, [initialId, moduleList, setSearchParams]);

  useEffect(() => {
    console.log('--selectedModule--\n', selectedModule);
    setNoCourse(false);
  }, [selectedModule]);

  return (
    <AuthCheck>
      {
        !loading
          ? <>{
            // check module num
            !_.isEmpty(moduleList)
              ? <AdminPage
                headerText="Course List"
                headerContent={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{pr: 1}} color={theme.palette.grey.A700}>Module:</Typography>
                    <Select

                      options={moduleList}
                      fieldNames={{label: 'commodity_name', value: 'commodity_id'}}
                      style={{width: '200px'}}
                      value={selectedId}
                      onChange={handleSelectChange}
                    />
                  </Box>
                }
                headerAction={<Button variant="contained" onClick={() => navigate({
                  pathname: '/teacher/course/create',
                  search: searchParams.toString(),
                })}>
                  Create Course
                </Button>}
              >
                {
                  selectedModule
                    ? <>{!noCourse
                      ? <>
                        <AdminCourseList
                          listData={_.get(selectedModule, 'course_list', [])}
                          commodityId={_.get(selectedModule, 'commodity_id', '')}
                        />
                      </>
                      : <Box sx={{py: 4}}>
                        <Empty
                          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                          imageStyle={{
                            height: 60,
                          }}
                          description={<span>No Course existed.</span>}
                        >
                          <Button variant="outlined" onClick={() => window.open('/teacher/course/create')}>
                            Create Course Now</Button>
                        </Empty>
                      </Box>
                    }</>
                    : <Alert severity="error">No module found, please check your URL</Alert>
                }
              </AdminPage>
              : <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%'}}>
                <Empty
                  description={
                    <p>
                      No module recorded in your account.<br/>
                      To manage the course, you need to create a module first.
                    </p>
                  }
                >
                  <Button onClick={() => navigate('/teacher/module/create')}>Create Module</Button>
                </Empty>
              </Box>
          }</>
          : <CircularProgress/>
      }
    </AuthCheck>
  );
};

export default AdminCourse;
