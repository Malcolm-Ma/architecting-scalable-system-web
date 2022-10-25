/**
 * @file comment view index
 * @author Mingze Ma
 */
import React, {useMemo} from "react";
import Container from "@mui/material/Container";
import {List, Comment, Space} from "antd";
import {ListItemProps, SxProps} from "@mui/material";
import moment from "moment";
import _ from "lodash";
import {StarOutlined} from "@ant-design/icons";

interface CommentViewProps {
  moduleData: any,
  listItemProps?: ListItemProps,
  listItemSx?: SxProps,
  summary?: boolean
}

const IconText = ({ icon, text }: { icon?: React.FC; text: string }) => (
  <Space>
    {icon && React.createElement(icon)}
    {text}
  </Space>
);

const CommentView: React.FC<CommentViewProps> = (props) => {
  const {moduleData, summary = true} = props;

  const commentData = useMemo(() => {
    const originalData = _.get(moduleData, 'review_list', []);
    return _.sortBy(originalData, (i: any) => -moment(i.review_create_time).milliseconds());
  }, [moduleData]);

  return (
    <Container maxWidth="md">
      <List
        className="comment-list"
        header={summary && `${commentData.length} Comment${commentData.length > 1 ? 's' : ''}`}
        itemLayout="horizontal"
        dataSource={commentData}
        renderItem={item => (
          <li>
            <Comment
              actions={[
                <IconText icon={StarOutlined} text={item.review_star} key="list-vertical-star" />,
              ]}
              author={`${item.user.user_firstname} ${item.user.user_lastname}`}
              avatar={item.user.user_avatar}
              content={item.review_comment}
              datetime={moment(item.review_create_time).format('LLL')}
            />
          </li>
        )}
      />
    </Container>
  );
};

export default CommentView;
