/**
 * @file admin module index
 * @author Mingze Ma
 */

import React from "react";
import AdminPage from "src/components/AdminPage";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const AdminModule: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AdminPage
      headerText="Module List"
      headerAction={<Button variant="contained" onClick={() => navigate('/teacher/module/create')}>
        Create Module
      </Button>}
    >

    </AdminPage>
  );
};

export default AdminModule;
