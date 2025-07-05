"use client";

import { useSearchContext } from "fumadocs-ui/provider";

export function SearchButton() {
  const search = useSearchContext();

  return (
    <button
      className="flex h-5 items-center space-x-0.5 rounded border border-gray-300 bg-white px-2 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
      onClick={() => {
        search.setOpenSearch(true);
      }}
    >
      {search.hotKey.map((item, index) => (
        <span key={index}>{item.display}</span>
      ))}
    </button>
  );
}
