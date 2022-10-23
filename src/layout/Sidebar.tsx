/**
 * @file sidebar
 * @author Mingze Ma
 */

import {AppstoreOutlined, SettingOutlined, HomeOutlined, DesktopOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import React, {useCallback, useState} from 'react';
import {useMediaQuery, useTheme} from "@mui/material";
import {SIDEBAR_WIDTH, SIDEBAR_WIDTH_M} from "src/constant/constants";
import {useNavigate} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/teacher/dashboard', <HomeOutlined/>),
  getItem('Module Management', '/teacher/module', <DesktopOutlined />, [
    getItem('Module List', '/teacher/module/list'),
    getItem('Create Module', '/teacher/module/create'),
  ]),
  getItem('Course Management', '/teacher/course', <AppstoreOutlined />, [
    getItem('Course List', '/teacher/course/list'),
    getItem('Create Course', '/teacher/course/create'),
  ]),
  getItem('Settings', 'settings', <SettingOutlined/>, [
    getItem('Option 1', '9'),
    getItem('Option 2', '10'),
    getItem('Option 3', '11'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const upSm = useMediaQuery(theme.breakpoints.up('sm'))

  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleClick = useCallback<Exclude<MenuProps['onClick'], undefined>>(({ key }) => {
    navigate(key);
  }, [navigate]);

  return (
    <Menu
      inlineCollapsed={!upSm}
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{width: upSm ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_M}}
      items={items}
      onClick={handleClick}
    />
  );
};

export default Sidebar;
