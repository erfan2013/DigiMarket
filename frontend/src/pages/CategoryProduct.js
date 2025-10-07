// src/pages/CategoryProduct.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helper/ProductCategory";
import SummaryApi from "../common";
import ProductGrid from "../components/ui/ProductGrid";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // خواندن دسته‌بندی‌ها از QueryString
  const URLSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = URLSearch.getAll("category"); // مثلا ?category=phone&category=laptop
  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectedCatgory, setSelectedCatgory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sort, setSort] = useState("");

  // گرفتن دیتا بر اساس فیلتر دسته‌بندی
  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: filterCategoryList }),
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectedCatgory((prev) => ({ ...prev, [value]: checked }));
  };

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategoryList]);

  // هر بار که چک‌باکس‌ها تغییر کنند، QueryString و لیست فیلتر به‌روز می‌شود
  useEffect(() => {
    const arrayofCategory = Object.keys(selectedCatgory)
      .map((key) => (selectedCatgory[key] ? key : null))
      .filter(Boolean);

    setFilterCategoryList(arrayofCategory);

    // ساخت آدرس تمیز: /product-category?category=a&category=b
    const qs = arrayofCategory
      .map((el) => `category=${encodeURIComponent(el)}`)
      .join("&");
    navigate(`/product-category${qs ? `?${qs}` : ""}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCatgory]);

  // سورت قیمت (Low→High / High→Low) بر اساس Selling (درصورت نبود Price)
  const num = (x) => Number(x ?? 0);
  const effective = (p) => num(p?.Selling ?? p?.Price);
  const handleOnchengeSortBy = (e) => {
    const { value } = e.target;
    setSort(value);
    setData((prev) => {
      const next = [...prev];
      if (value === "asc") next.sort((a, b) => effective(a) - effective(b));
      if (value === "dsc") next.sort((a, b) => effective(b) - effective(a));
      return next;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[220px,1fr] gap-6">
        {/* ستون فیلترها */}
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 h-max sticky top-24">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Sort By
            </h3>
            <form className="text-sm flex flex-col gap-2 py-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sort === "asc"}
                  value="asc"
                  onChange={handleOnchengeSortBy}
                />
                <span>Price Low → High</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sort === "dsc"}
                  value="dsc"
                  onChange={handleOnchengeSortBy}
                />
                <span>Price High → Low</span>
              </label>
            </form>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-3">
              {productCategory.map((c) => (
                <label key={c?.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    id={c?.value}
                    checked={!!selectedCatgory[c?.value]}
                    value={c?.value}
                    onChange={handleSelectCategory}
                  />
                  <span>{c?.label}</span>
                </label>
              ))}
            </form>
          </div>
        </aside>

        {/* ستون نتایج */}
        <main>
          <p className="font-semibold mb-3 text-slate-800 text-lg">
            Search Results : {data?.length ?? 0}
          </p>
          <ProductGrid
            items={data}
            loading={loading}
            onClickItem={(p) => navigate(`/product/${p._id}`)}
          />
        </main>
      </div>

      {/* موبایل */}
      <div className="lg:hidden">
        <p className="font-semibold my-2 text-slate-800 text-lg">
          Search Results : {data?.length ?? 0}
        </p>
        <ProductGrid
          items={data}
          loading={loading}
          onClickItem={(p) => navigate(`/product/${p._id}`)}
        />
      </div>
    </div>
  );
};

export default CategoryProduct;
