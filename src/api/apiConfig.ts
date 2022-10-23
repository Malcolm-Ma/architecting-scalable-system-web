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

  },
  user: {
    create: '/user/add',
    update: '/user/update',
    getAndUpdate: 'user/get_update'
  },
  cart: {
    create: ''
  }
};

export default apiConfig;
