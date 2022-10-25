/**
 * @file comment creating
 * @author Mingze Ma
 */

import React, {useCallback, useState} from "react";
import Box from "@mui/material/Box";
import {Form, Input, Button, Comment, Rate, FormProps, message} from 'antd';
import _ from "lodash";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import Avatar from "@mui/material/Avatar";
import actions from "src/actions";

const { TextArea } = Input;

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

interface EditorProps {
  onSubmit: FormProps['onFinish'];
  submitting: boolean;
  disabled?: boolean;
}

interface CommentCreateProps {
  moduleData: any;
  refresh?: () => void
}

const Editor = ({ onSubmit, submitting, disabled = false }: EditorProps) => (
  <Form onFinish={onSubmit}>
    <Form.Item name="review_comment" >
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item name="review_star" label="Rate">
      <Rate tooltips={desc} />
    </Form.Item>
    <Form.Item help={disabled && 'You need login firstly to add a comment'}>
      <Button htmlType="submit" loading={submitting} type="primary" disabled={disabled}>
        Add Comment
      </Button>
    </Form.Item>
  </Form>
);

const CommentCreate: React.FC<CommentCreateProps> = (props) => {
  const {moduleData, refresh} = props;
  const userInfo = useSelector((state: RootState) => state.global.userInfo);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback<Exclude<FormProps['onFinish'], undefined>>(async (values) => {
    setSubmitting(true);
    try {
      const id = _.get(moduleData, 'commodity_id');
      const userId = _.get(userInfo, 'user_id');
      await actions.createReview({
        ...values,
        commodity_id: id,
        user_id: userId,
      });
      message.success('Add comment successfully');
      await refresh?.();
    } catch (e: any) {
      console.error(e);
      message.error(e.message);
    } finally {
      setSubmitting(false);
    }
  }, [moduleData, refresh, userInfo]);


  return (
    <Box sx={{p: 1, pb: 0}}>
      <Comment
        avatar={_.isEmpty(userInfo) && <Avatar
          src={_.get(userInfo, 'user_avatar')}
          alt={_.get(userInfo, 'full_name')}
        />}
        content={
          <Editor
            onSubmit={handleSubmit}
            submitting={submitting}
            disabled={_.isEmpty(userInfo)}
          />
        }
      />
    </Box>
  );
};

export default CommentCreate;
