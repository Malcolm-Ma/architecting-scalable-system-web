/**
 * @file admin course create index
 * @author Mingze Ma
 */

import React, {useCallback, useEffect, useState} from "react";
import AdminPage from "src/components/AdminPage";
import {Alert, Paper} from "@mui/material";
import {Button, Form, Input, message, Select, Upload} from "antd";
import {useNavigate, useSearchParams} from "react-router-dom";
import _ from "lodash";
import actions from "src/actions";
import apiConfig from "src/api/apiConfig";
import {SERVICE_BASE_URL} from "src/constant/network";
import useAdminCheck from "src/hooks/useAdminCheck";
import {UploadOutlined} from "@ant-design/icons";

const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16},
};
const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};

const CourseCreate: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [moduleList, setModuleList] = useState<any[] | undefined>(undefined);
  const [moduleData, setModuleData] = useState({});

  const [errorState, setErrorState] = useState(false);

  const {AuthCheck, userInfo, user} = useAdminCheck();

  const onFinish = useCallback(async (values: any) => {
    const {course_resource: resource, commodity_id: curId} = values;
    const reqBody = {...values}
    if (!_.isEmpty(moduleData)) {
      _.set(reqBody, 'commodity_id', _.get(moduleData, 'commodity_id'));
      _.set(reqBody, 'course_sequence', _.get(moduleData, 'course_list.length', 0));
    } else {
      console.log('--_.find(moduleList, [\'commodity_id\', curId])--\n', _.find(moduleList, ['commodity_id', curId]));
      _.set(reqBody, 'course_sequence', _.get(_.find(moduleList, ['commodity_id', curId]), 'course_list.length', 0));
    }
    if (resource) {
      _.set(reqBody, 'course_resource', _.get(resource, 'file.response.data', ''));
    }
    console.log('--reqBody--\n', reqBody);
    try {
      const res: any = await actions.createCourse(reqBody);
      console.log('--res--\n', res);
      if (!_.isEmpty(res)) {
        message.success(`Successfully create ${_.get(res, 'course_name', '')}`);
        navigate({
          pathname: '/teacher/course/list',
          search: searchParams.toString(),
        }, {replace: true});
      }
    } catch (e: any) {
      console.error(e);
      message.error(e.message);
    }
  }, [moduleData, moduleList, navigate, searchParams]);

  const getCommodityDetail = useCallback(async () => {
    try {
      const res: any = await actions.getCommodityDetail({
        commodityID: searchParams.get('module_id'),
      });
      setModuleData(res);
      setErrorState(!res);
      console.log('--res--\n', res);
    } catch (e: any) {
      console.error(e);
      setModuleData({});
    }
  }, [searchParams]);

  const getPublishedCommodityList = useCallback(async () => {
    try {
      const res: any = await actions.getPublishedCommodityList({
        userId: _.get(userInfo, 'user_id'),
      });
      setModuleList(_.filter(res, i => _.isObject(i)));
      console.log('--res--\n', res);
    } catch (e: any) {
      console.error(e);
      setModuleList([]);
    }
  }, [userInfo]);


  useEffect(() => {
    if (user.loggedIn) {
      if (!_.isEmpty(searchParams.get('module_id'))) {
        getCommodityDetail();
      } else {
        getPublishedCommodityList();
      }
    }
  }, [getCommodityDetail, getPublishedCommodityList, searchParams, user.loggedIn]);

  return (
    <AuthCheck>
      <AdminPage
        headerText="Create Course"
      >
        {!errorState
          ? <Paper
            sx={{p: 3}}
          >
            <Form
              {...layout}
              style={{paddingTop: '24px'}}
              size="large"
              onFinish={onFinish}
            >
              {_.isNil(searchParams.get('module_id')) && <Form.Item
                name="commodity_id" label="Select a Module" rules={[{required: true}]}
              >
                <Select
                  placeholder="Please select a module"
                >
                  {_.map(moduleList, (item: any, index) => {
                    const {commodity_name: name, commodity_id: id} = item;
                    return <Select.Option key={index} value={id} option={item}>{name}</Select.Option>;
                  })}
                </Select>
              </Form.Item>}
              <Form.Item name="course_name" label="Course Name" rules={[{required: true}]}>
                <Input/>
              </Form.Item>
              <Form.Item
                label="Course Video"
                name="course_resource"
                valuePropName="file"
                rules={[{required: true}]}
                help="Accept video format: *.mp4. Max size: 1000MB"
              >
                <Upload
                  accept="video/mp4"
                  action={SERVICE_BASE_URL + apiConfig.upload.video}
                  listType="text"
                  maxCount={1}
                >
                  <Button size="middle" icon={<UploadOutlined/>}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item {...tailLayout} style={{
                paddingTop: '24px',
              }}>
                <Button type="primary" htmlType="submit" style={{
                  marginRight: '40px',
                }}>
                  Submit
                </Button>
                <Button htmlType="button" onClick={() => navigate('/teacher/module')}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Paper>
          : <Alert severity="error">
            Can not find a valid Module, please check your URL and try again.
            <a style={{marginLeft: '8px'}} href="/teacher/course/list">Go back.</a>
          </Alert>
        }
      </AdminPage>
    </AuthCheck>
  );
};

export default CourseCreate;
