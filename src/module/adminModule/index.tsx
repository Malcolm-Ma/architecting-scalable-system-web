/**
 * @file admin module index
 * @author Mingze Ma
 */

import React, {useCallback, useEffect} from "react";
import AdminPage from "src/components/AdminPage";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import {Table} from "antd";
import actions from "src/actions";
import useAdminCheck from "src/hooks/useAdminCheck";
import _ from "lodash";

const AdminModule: React.FC = () => {
  const navigate = useNavigate();

  const {userInfo, AuthCheck} = useAdminCheck();

  const getPublishedCommodityList = useCallback(async () => {
    try {
      const res = await actions.getPublishedCommodityList({
        userId: _.get(userInfo, 'user_id'),
      });
      console.log('--res--\n', res);
    } catch (e: any) {
      console.error(e);
    }
  }, [userInfo]);

  useEffect(() => {
    !_.isEmpty(userInfo) && getPublishedCommodityList();
  }, [getPublishedCommodityList, userInfo]);

  return (
    <AuthCheck>
      <AdminPage
        headerText="Module List"
        headerAction={<Button variant="contained" onClick={() => navigate('/teacher/module/create')}>
          Create Module
        </Button>}
      >
        <Card>
          <CardContent>
            <Table

            />
          </CardContent>
        </Card>
      </AdminPage>
    </AuthCheck>
  );
};

export default AdminModule;
