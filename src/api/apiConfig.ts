/**
 * @file api urls config
 * @author Mingze Ma
 */

const apiConfig = {
  commodity: {
    search: '/commodity/search_commodity',
    recommend: '/commodity/show_commodity_in_home_page',
    detail: '/commodity/get_commodity_info',
    create: '/commodity/create_commodity',
  },
  course: {
    create: '/course/create_course',
  },
  user: {
    create: '/user/add',
    update: '/user/update',
    getAndUpdate: '/user/get_update',
    publishedCommodityList: '/user/get_merchant_commodity',
  },
  cart: {
    create: ''
  },
  upload: {
    image: '/minio/image/update',
    video: '/minio/video/upload',
  },
};

export default apiConfig;
