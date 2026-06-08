import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GetFaqApi,
  GetFaqsearchApi,
  GetFaqCategoriesApi,
} from "../../Redux/supportSlice";

const FAQ = () => {
  const dispatch = useDispatch();

  const {
    faqs,
    faqCategories,
    loading,
  } = useSelector((state) => state.support);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Initial APIs
  useEffect(() => {
    dispatch(GetFaqsearchApi());
    dispatch(GetFaqCategoriesApi());
  }, [dispatch]);

  // Search + Category Filter API
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(
        GetFaqApi({
          search,
          category: selectedCategory,
        })
      );
    }, 500);

    return () => clearTimeout(delay);
  }, [search, selectedCategory, dispatch]);

  return (
    <div className="bg-[var(--card)]/10 p-6 rounded-2xl shadow-md h-full">

      <h1 className="text-xl font-semibold mb-4">
        Frequently Asked Questions
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search FAQ..."
        className="w-full p-3 border rounded-lg mb-4 bg-[var(--bg-card)]/10 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-5">

        <button
          onClick={() => setSelectedCategory("")}
          className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
            selectedCategory === ""
              ? "bg-blue-500 text-white"
              : "bg-[var(--card)]"
          }`}
        >
          All
        </button>

        {faqCategories?.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-[var(--card)]"
            }`}
          >
            {cat}
          </button>
        ))}

      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center py-4">
          Loading FAQs...
        </p>
      )}

      {/* FAQ List */}
      <div className="space-y-3">

        {!loading && faqs?.length > 0 ? (
          faqs.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-[var(--card)] border border-[var(--border)] rounded-lg"
            >
              <h3 className="font-medium text-lg mb-2">
                {item.question}
              </h3>

              <p className="text-sm text-gray-600">
                {item.answer}
              </p>

              {item.category && (
                <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {item.category}
                </span>
              )}
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              No FAQs Found
            </p>
          )
        )}

      </div>

      {/* Footer */}
      <p className="text-center text-sm mt-6 text-blue-500 cursor-pointer">
        Still need help? Contact Support
      </p>

    </div>
  );
};

export default FAQ;