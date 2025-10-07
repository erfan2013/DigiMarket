import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import ProductGrid from "../components/ui/ProductGrid";

const SearchProduct = () => {
  const query = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.search]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}

      <p className="text-lg font-semibold my-3">
        Search result : {data?.length ?? 0}
      </p>

      {!loading && (!data || data.length === 0) && (
        <p className="text-lg text-center p-4 bg-white rounded-2xl">
          No data found...
        </p>
      )}

      <ProductGrid
        items={data}
        loading={loading}
        onClickItem={(p) => navigate(`/product/${p._id}`)}
      />
    </div>
  );
};

export default SearchProduct;
