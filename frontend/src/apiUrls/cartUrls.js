import { API_VERSION, DOMAIN_NAME } from "./baseUrls";

export const GET_CART = `${DOMAIN_NAME}${API_VERSION}/cart`;
export const ADD_TO_CART = `${DOMAIN_NAME}${API_VERSION}/cart`;
export const deleteFromCart = (id) => `${DOMAIN_NAME}${API_VERSION}/cart/${id}`;
export const DELETE_CART = `${DOMAIN_NAME}${API_VERSION}/cart`;
