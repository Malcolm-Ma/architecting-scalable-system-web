/**
 * @file admin module create index
 * @author Mingze Ma
 */

import React, {useCallback} from "react";
import AdminPage from "src/components/AdminPage";
import {Paper} from "@mui/material";
import {Button, Form, Input, InputNumber, message, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import _ from "lodash";
import actions from "src/actions";
import { PlusOutlined } from '@ant-design/icons';
import apiConfig from "src/api/apiConfig";
import {SERVICE_BASE_URL} from "src/constant/network";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ModuleCreate: React.FC = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state: RootState) => state.global.userInfo);

  const onFinish = useCallback(async (values: any) => {
    const {commodity_cover: cover, commodity_discount: discount} = values;
    const reqBody = {
      ...values,
      ...(!discount && {commodity_discount: 1}),
      commodity_status: 1,
      user_id: _.get(userInfo, 'user_id'),
      course_id: []
    }
    if (cover) {
      _.set(reqBody, 'commodity_cover', _.get(cover, 'file.response.data', ''));
    }
    console.log('--reqBody--\n', reqBody);
    try {
      await actions.createCommodity(reqBody);
      message.success('Create module successfully');
      navigate('/teacher/module/list');
    } catch (e: any) {
      console.error(e);
      message.error(e.message);
    }
  }, [navigate, userInfo]);

  return (
    <AdminPage
      headerText="Create Module"
    >
      <Paper
        sx={{p: 3}}
      >
        <Form
          {...layout}
          size="large"
          onFinish={onFinish}
        >
          <Form.Item name="commodity_name" label="Module Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="commodity_introduction" label="Module Introduction" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="commodity_price" label="Price" rules={[{ type: 'number', required: true }]}>
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="commodity_discount"
            label="Discount"
            rules={[{ type: 'number', min: 0, max: 1 }]}
            help="Please enter a decimal number less than one.
             e.g, 0.7 means the current selling price is 70% of the pricing.
             Enter 1 or leave empty to indicate no discount."
          >
            <InputNumber/>
          </Form.Item>
          <Form.Item
            label="Upload Cover Image"
            name="commodity_cover"
            valuePropName="file"
            rules={[{required: true}]}
          >
            <Upload
              accept="image/*"
              action={SERVICE_BASE_URL + apiConfig.upload.image}
              listType="picture-card"
              maxCount={1}
              data={{imageType: 'COMMODITY', id: ''}}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
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
    </AdminPage>
  );
};

export default ModuleCreate;
