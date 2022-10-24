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
import {useTheme} from "@mui/material";

const AdminCourse: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();

  const [moduleList, setModuleList] = useState<any[]>([]);
  const [_selectedModule, setSelectedModule] = useState<object | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(searchParams.get('module_id'));

  const [noModule, setNoModule] = useState(false);

  const {userInfo, AuthCheck} = useAdminCheck();

  const getPublishedCommodityList = useCallback(async () => {
    try {
      const res: any = await actions.getPublishedCommodityList({
        userId: _.get(userInfo, 'user_id'),
      });
      const filteredRes = _.filter(res, (i) => _.isObject(i));
      setModuleList(filteredRes);
      console.log('--res--\n', filteredRes);
      if (filteredRes.length >= 1) {
        if (_.isNil(selectedId)) {
          // set the first module as default selection
          setSelectedModule(filteredRes[0]);
          setSearchParams({module_id: _.get(filteredRes, '0.commodity_id', '')});
        }
      } else {
        setNoModule(true);
      }
    } catch (e: any) {
      console.error(e);
      setModuleList([]);
    }
  }, [selectedId, setSearchParams, userInfo]);

  const handleSelectChange = useCallback<Exclude<SelectProps['onChange'], undefined>>((value, option) => {
    setSelectedId(value);
    setSearchParams({module_id: value});
    setSelectedModule(option);
  }, [setSearchParams]);


  useEffect(() => {
    !_.isEmpty(userInfo) && getPublishedCommodityList();
    return () => setModuleList([]);
  }, [getPublishedCommodityList, userInfo]);

  return (
    <AuthCheck>
      <AdminPage
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
        {!noModule
          ? <></>
          : <Box sx={{py: 4}}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 60,
              }}
              description={<span>No Module existed.</span>}
            >
              <Button variant="outlined" onClick={() => window.open('/teacher/module/create')}>
                Create Module Now</Button>
            </Empty>
          </Box>
        }
      </AdminPage>
    </AuthCheck>
  );
};

export default AdminCourse;
