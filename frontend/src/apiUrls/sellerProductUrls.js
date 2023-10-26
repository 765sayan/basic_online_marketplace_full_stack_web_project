import { API_VERSION, DOMAIN_NAME } from "./baseUrls";

export const GET_ALL_PRODUCTS_URL_AS_SELLER = `${DOMAIN_NAME}${API_VERSION}/products`;
export const CREATE_PRODUCT_URL = `${DOMAIN_NAME}${API_VERSION}/products`;
export const deleteProductUrl = (id) =>
  `${DOMAIN_NAME}${API_VERSION}/products/${id}`;
export const updateProductUrl = (id) =>
  `${DOMAIN_NAME}${API_VERSION}/products/${id}`;
export const GET_ALL_ORDERED_PRODUCTS_URL_AS_SELLER = `${DOMAIN_NAME}${API_VERSION}/products/ordered`;
