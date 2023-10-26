import { API_VERSION, DOMAIN_NAME } from "./baseUrls";

export const GET_ALL_PRODUCTS_URL = `${DOMAIN_NAME}${API_VERSION}/products/list`;
export const BUY_PRODUCT_URL = `${DOMAIN_NAME}${API_VERSION}/products/buy`;
export const GET_ALL_ORDERED_PRODUCTS_URL = `${DOMAIN_NAME}${API_VERSION}/products/buy`;
export const cancelProductUrl = (id) =>
  `${DOMAIN_NAME}${API_VERSION}/products/buy/${id}`;
