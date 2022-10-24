/**
 * @file admin page index
 * @author Mingze Ma
 */

import React from "react";
import Container, {ContainerProps} from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface AdminPageProps extends ContainerProps {
  headerText: React.ReactNode | string | null,
  headerContent?: React.ReactNode | null,
  headerAction?: React.ReactNode | null,
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const {headerText, headerContent, children, headerAction, ...containerProps} = props;

  return (
    <Container
      maxWidth="xl"
      disableGutters
      {...containerProps}
      sx={{
        p: {xs: 1, sm: 3},
        minHeight: '100%',
        ...containerProps.sx
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 3}}>
        <Typography
          variant="h2"
          sx={{flexGrow: 1}}
        >
          {headerText}
        </Typography>
        {headerContent && <Box sx={{flexGrow: 2}}>
          {headerContent}
        </Box>}
        <Box sx={{flexGrow: 0}}>
          {headerAction}
        </Box>
      </Box>
      {children}
    </Container>
  );
};

export default AdminPage;
