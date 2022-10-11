/**
 * @file lazy loading util
 * @author Mingze Ma
 */

import {Suspense, LazyExoticComponent} from 'react';
import {CircularProgress} from "@mui/material";

export const suspenseLazyComponent = (LazyComponent: LazyExoticComponent<any>) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyComponent />
  </Suspense>
);
