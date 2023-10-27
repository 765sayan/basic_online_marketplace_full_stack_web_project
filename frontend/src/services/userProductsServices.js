import {
  BUY_PRODUCT_URL,
  GET_ALL_ORDERED_PRODUCTS_URL,
  GET_ALL_PRODUCTS_URL,
  cancelProductUrl,
  getCollectionOfProducts,
} from "../apiUrls/userProductUrls";

export const getAllProductsAsUserService = async () => {
  let res = await fetch(GET_ALL_PRODUCTS_URL);
  res = await res.json();

  if (!res.msg) {
    return res;
  }
};

export const getAllOrderedProductsAsUser = async (token) => {
  if (token) {
    const options = {
      method: "GET",
      headers: {
        auth: token,
      },
    };

    let res = await fetch(GET_ALL_ORDERED_PRODUCTS_URL, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const getCollectionOfProductsService = async (limit, offset) => {
  if (limit && offset >= 0) {
    const options = {
      method: "GET",
    };

    let res = await fetch(getCollectionOfProducts(limit, offset), options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const buyProduct = async (productInfo, token) => {
  if (token) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: token,
      },
      body: JSON.stringify(productInfo),
    };

    let res = await fetch(BUY_PRODUCT_URL, options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};

export const cancelProductService = async (productId, token) => {
  if (token) {
    const options = {
      method: "DELETE",
      headers: {
        auth: token,
      },
    };

    let res = await fetch(cancelProductUrl(productId), options);
    res = await res.json();

    if (res) {
      return res;
    }
  }
};
