import SummaryApi from "../common";
import { toast } from "react-toastify";
import { authHeaders } from "../common/auth";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const res = await fetch(SummaryApi.addToCart.url, {
    method: SummaryApi.addToCart.method,
    credentials: "include",            // می‌توانی نگه داری
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),                // ⭐️ این باعث حذف 401 می‌شود
    },
    body: JSON.stringify({ productId: id, quantity: 1 }),
  });

  const data = await res.json();

  if (data.success) toast.success(data.message);
  if (data.error) toast.error(data.message);

  return data;
};

export default addToCart;




// import SummaryApi from "../common"
// import { toast } from "react-toastify"

// const addToCart = async (e,id) => {
//     e?.stopPropagation()
//     e?.preventDefault()

//     const response = await fetch(SummaryApi.addToCart.url,{
//         method : SummaryApi.addToCart.method,
//         credentials : 'include', 
//         headers : {
//             'Content-Type' : 'application/json',
//         },
//         body : JSON.stringify({
//             productId : id,
            
//         })
//     })

//     const responseData = await response.json()  

//     if(responseData.success){
//         toast.success(responseData.message)
//     }
//     if(responseData.error){
//         toast.error(responseData.message)
//     }

//     return responseData
// }

// export default addToCart