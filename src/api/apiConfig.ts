/**
 * @file api urls config
 * @author Mingze Ma
 */

const apiConfig = {
  commodity: {
    search: '/commodity/search_commodity',
    recommend: '/commodity/show_commodity_in_home_page'
  },
  user: {
    create: '/user/add',
    update: '/user/update'
  },
  cart: {
    create: ''
  }
};

export default apiConfig;
