/**
 * @file comment view index
 * @author Mingze Ma
 */
import React, {useCallback, useMemo, useState} from "react";
import Container from "@mui/material/Container";
import {List, Comment, Space} from "antd";
import {ListItemProps, SxProps} from "@mui/material";
import moment from "moment";
import _ from "lodash";
import {StarOutlined} from "@ant-design/icons";
import CommentCreate from "src/components/CommentView/create";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import actions from "src/actions";

interface CommentViewProps {
  moduleData: any,
  listItemProps?: ListItemProps,
  listItemSx?: SxProps,
  summary?: boolean
}

const IconText = ({ icon, text }: { icon?: React.FC; text: string | number }) => (
  <Space>
    {icon && React.createElement(icon)}
    {text}
  </Space>
);

const CommentView: React.FC<CommentViewProps> = (props) => {
  const {moduleData: data, summary = true} = props;

  const [moduleData, setModuleData] = useState<any>(data);

  const refreshComment = useCallback(async () => {
    try {
      const res = await actions.getCommodityDetail({
        commodityID: _.get(data, 'commodity_id'),
      });
      setModuleData(res);
    } catch (e) {
      console.error(e);
    }
  }, [data]);

  const commentData = useMemo(() => {
    console.log('--moduleData--\n', moduleData);
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
                <IconText icon={StarOutlined} text={_.floor(item.review_star, 2)} key="list-vertical-star" />,
              ]}
              author={`${item.user.user_firstname} ${item.user.user_lastname}`}
              avatar={item.user.user_avatar}
              content={item.review_comment}
              datetime={moment(item.review_create_time).format('LLL')}
            />
          </li>
        )}
      />
      <Card sx={{p: 2, pb: 0, mt: 2}}>
        <Typography variant="h4" sx={{px: 1}}>
          Add a Comment
        </Typography>
        <CommentCreate moduleData={moduleData} refresh={refreshComment} />
      </Card>
    </Container>
  );
};

export default CommentView;
