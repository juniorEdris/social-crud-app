import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const PostOptions = ({
  children,
  customClasses = "",
  menuBtnClasses = "",
  menuClasses = "",
  handleEdit = () => {},
  handleDelete = () => {},
}) => {
  return (
    <div className={customClasses}>
      <Menu as="div" className={`relative ${menuClasses}`}>
        <div>
          <Menu.Button className={menuBtnClasses}>{children}</Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-[185px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-sky-600 text-white" : "text-gray-900"
                    } group w-full rounded-md px-2 py-2 font-medium text-base capitalize`}
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? "bg-sky-600 text-white" : "text-gray-900"
                    } group w-full rounded-md px-2 py-2 font-medium text-base capitalize`}
                    onClick={handleEdit}
                  >
                    edit
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default PostOptions;
