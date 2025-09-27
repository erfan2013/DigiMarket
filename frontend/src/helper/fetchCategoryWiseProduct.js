import SummaryApi from "../common"

const fetchCategoryWiseProduct = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
      method: SummaryApi.categoryWiseProduct.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category }),
      credentials: "include", // اگر نیاز داری
    });
    if (!response.ok) throw new Error("Bad response");
    const dataResponse = await response.json();
    return { data: Array.isArray(dataResponse?.data) ? dataResponse.data : [] };
  } catch (e) {
    return { data: [] }; // همیشه data داشته باشه
  }
};

export default fetchCategoryWiseProduct;








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