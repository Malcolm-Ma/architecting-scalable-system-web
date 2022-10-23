/**
 * @file admin module create index
 * @author Mingze Ma
 */

import React, {useCallback} from "react";
import AdminPage from "src/components/AdminPage";
import {Paper} from "@mui/material";
import {Button, Form, Input, InputNumber, message} from "antd";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import _ from "lodash";
import actions from "src/actions";

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
    const reqBody = {
      ...values,
      commodityStatus: 1,
      userId: _.get(userInfo, 'user_id'),
    }
    console.log('--reqBody--\n', reqBody);
    try {
      const res = await actions.createCommodity(reqBody);
      console.log('--res--\n', res);
    } catch (e: any) {
      console.error(e);
      message.error(e.message);
    }
  }, [userInfo]);

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
          <Form.Item name="commodityName" label="Module Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="commodityIntroduction" label="Module Introduction" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="commodityPrice" label="Price" rules={[{ type: 'number', required: true }]}>
            <InputNumber
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="commodityDiscount"
            label="Discount"
            rules={[{ type: 'number', min: 0, max: 1 }]}
            help="Please enter a decimal number less than one.
             e.g, 0.7 means the current selling price is 70% of the pricing.
             Enter 1 or leave empty to indicate no discount."
          >
            <InputNumber/>
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
