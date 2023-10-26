import {
  CREATE_PRODUCT_URL,
  GET_ALL_ORDERED_PRODUCTS_URL_AS_SELLER,
  GET_ALL_PRODUCTS_URL_AS_SELLER,
  deleteProductUrl,
  updateProductUrl,
} from "../apiUrls/sellerProductUrls";

export const getAllAddedProductsAsSeller = async (token) => {
  if (token) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    };

    let res = await fetch(GET_ALL_PRODUCTS_URL_AS_SELLER, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const addProductServiceAsSeller = async (newProductInfo, token) => {
  if (newProductInfo && token) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(newProductInfo),
    };

    let res = await fetch(CREATE_PRODUCT_URL, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const deleteProductServiceAsSeller = async (productId, token) => {
  if (productId && token) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    };

    let res = await fetch(deleteProductUrl(productId), options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const updateProductServiceAsSeller = async (
  newInfo,
  productId,
  token
) => {
  if (newInfo && productId && token) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(newInfo),
    };

    let res = await fetch(updateProductUrl(productId), options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const getOrderedProductsAsSeller = async (token) => {
  if (token) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
    };

    let res = await fetch(GET_ALL_ORDERED_PRODUCTS_URL_AS_SELLER, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};
