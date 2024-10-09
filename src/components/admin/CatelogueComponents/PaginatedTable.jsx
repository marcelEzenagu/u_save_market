import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Menu } from "@headlessui/react";
import { PiDotsThreeOutline } from "react-icons/pi";

const PaginatedTable = React.memo(({ columns, data, actions, itemsPerPage = 12 }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="w-full overflow-x-auto overflow-y-visible mt-4 min-h-96 animate-fade-in">
        <table className="min-w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-medium text-nowrap text-regal-black tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-2 text-xs text-regal-black whitespace-nowrap font-[500]"
                  >
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-2 whitespace-nowrap text-xs text-regal-black">
                    <Menu as="button" className="relative inline-block text-right">
                      <div>
                        <Menu.Button className="rounded-full text-sm md:text-lg focus:outline-none">
                          <PiDotsThreeOutline />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right z-10 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                        <div className="py-1">
                          {actions.map((action, idx) => (
                            <Menu.Item key={idx}>
                              {({ active }) => (
                                <button
                                  className={`flex items-center w-full px-4 py-2 text-xs gap-2 text-regal-black ${
                                    active ? "bg-gray-100" : ""
                                  }`}
                                  onClick={() => action.onClick(item)}
                                >
                                  {action.icon}
                                  {action.label}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Menu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mt-4 px-4">
        <h6 className="text-xs text-regal-crum-gray">
          Showing {currentItems.length} items out of {data.length} results found
        </h6>

        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< "
          pageClassName="py-1 px-2 rounded-md text-xs md:text-sm mx-2 border border-gray-200 text-regal-paginate-color"
          previousClassName="py-1 px-2 text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
          nextLinkClassName="py-1 px-2 text-regal-paginate-color rounded-md text-xs md:text-sm mx-2"
          breakClassName="page-item"
          breakLinkClassName="text-xs md:text-sm mx-2 py-1 px-2"
          containerClassName="flex flex-row items-center justify-end"
          activeClassName="border border-regal-sky-blue text-white bg-regal-sky-blue font-[500]"
        />
      </div>
    </div>
  );
});

export default PaginatedTable;
