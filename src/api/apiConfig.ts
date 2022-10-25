/**
 * @file api urls config
 * @author Mingze Ma
 */

import * as kcConfig from 'src/constant/keycloakConfig';

const apiConfig = {
  keycloak: {
    assignRole: `/admin/realms/${kcConfig.KC_REALM_NAME}/users/`,
    roleMappingSuffix: '/role-mappings/realm',
    getMerchantRole: `/admin/realms/${kcConfig.KC_REALM_NAME}/roles/${kcConfig.KC_MERCHANT_ROLE}`
  },
  commodity: {
    search: '/commodity/search_commodity',
    recommend: '/commodity/show_commodity_in_home_page',
    detail: '/commodity/get_commodity_info',
    create: '/commodity/create_commodity',
  },
  course: {
    create: '/course/create_course',
    info: '/course/get_course_info',
  },
  user: {
    create: '/user/add',
    update: '/user/update',
    getAndUpdate: '/user/get_update',
    publishedCommodityList: '/user/get_merchant_commodity',
  },
  order: {
    cart: {
      create: '/cart/add_commodity',
      display: 'cart/display',
      remove: '/cart/delete_commodity',
    },
    pay: '/pay/transaction',
  },
  upload: {
    image: '/minio/image/update',
    video: '/minio/video/upload',
  },
};

export default apiConfig;
