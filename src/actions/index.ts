/**
 * @file actions index
 * @author Mingze Ma
 */

import * as commodityActions from './commodity';
import * as userActions from './user';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...commodityActions,
  ...userActions
};
