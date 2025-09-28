// src/helper/fetchCategoryWiseProduct.js
import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
  try {
    const payload = {
      // اگر آبجکت بود، name یا _id را بردار؛ وگرنه خود category را بفرست
      category: category?.name || category?._id || category || ""
    };

    const res = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // اگر auth/کوکی داری، باز کن:
      // credentials: "include",
    });

    if (!res.ok) {
      // برای دیدن پیام خطا
      const msg = await res.text().catch(() => "");
      console.warn("category-product 400 →", msg);
      return { data: [] };
    }

    const data = await res.json();
    return { data: Array.isArray(data?.data) ? data.data : [] };
  } catch (e) {
    return { data: [] };
  }
};

export default fetchCategoryWiseProduct;









// import SummaryApi from "../common"

// const fetchCategoryWiseProduct = async (category) => {
//   try {
//     const response = await fetch(SummaryApi.categoryWiseProduct.url, {
//       method: SummaryApi.categoryWiseProduct.method,
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ category }),
//       credentials: "include", // اگر نیاز داری
//     });
//     if (!response.ok) throw new Error("Bad response");
//     const dataResponse = await response.json();
//     return { data: Array.isArray(dataResponse?.data) ? dataResponse.data : [] };
//   } catch (e) {
//     return { data: [] }; // همیشه data داشته باشه
//   }
// };

// export default fetchCategoryWiseProduct;








// import SummaryApi from "../common"

// const fetchCategoryWiseProduct =  async (category) => {
//     const response = await fetch(SummaryApi.categoryWiseProduct.url,{
//         method: SummaryApi.categoryWiseProduct.method,
//         headers: {
//             "content-type": "application/json",
//         },
//         body: JSON.stringify({
//             category: category
//         })
        
//     })

//     const dataResponse = await response.json()
//     return dataResponse
    
// }

// export default fetchCategoryWiseProduct