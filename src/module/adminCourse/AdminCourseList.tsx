/**
 * @file admin course list
 * @author Mingze Ma
 */
import React from "react";
import {CardContent} from "@mui/material";
import {Table, TableColumnsType} from "antd";
import Card from "@mui/material/Card";
import _ from "lodash";
import moment from "moment/moment";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from '@mui/icons-material/Videocam';

interface AdminCourseListProps {
  listData: any[];
  commodityId?: string;
}

const columnConfig = (payloads: any): TableColumnsType<any> => {
  const {commodityId} = payloads;

  return [
    {
      dataIndex: 'course_sequence',
      title: 'Display Sequence',
      render: (text) => (text + 1),
    },
    {
      dataIndex: 'course_name',
      title: 'Course Name',
      render: (text, record) => (
        <a href={`/course/${commodityId}/` + _.get(record, 'course_id')}>
          {text}
        </a>
      ),
    },
    {
      dataIndex: 'course_resource',
      title: 'Preview',
      render: (_text, record) => (
        <IconButton onClick={() => window.open(`/course${record.course_id}`)}>
          <VideocamIcon/>
        </IconButton>
      ),
    },
    {
      dataIndex: 'commodity_create_time',
      title: 'Created on',
      render: (text) => moment(text).format('LLL'),
    },
    {
      dataIndex: 'course_update_time',
      title: 'Last Updated',
      render: (text) => moment(text).format('LLL'),
    }
  ];
};


const AdminCourseList: React.FC<AdminCourseListProps> = (props) => {
  const {listData, commodityId} = props;

  const payloads = {commodityId};
  return (
    <Card>
      <CardContent>
        <Table
          dataSource={listData}
          columns={columnConfig(payloads)}
          rowKey="course_id"
        />
      </CardContent>
    </Card>
  );
};

export default AdminCourseList;
