import React from "react";

const PublishPost = ({ post, handlePost, handlePostSubmit }) => {
  return (
    <div>
      <form>
        <div className="flex items-center gap-2 mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex-1 bg-white rounded-b-lg dark:bg-gray-800">
            <label for="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              name="text"
              rows="6"
              className="block w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 p-2 resize-none"
              placeholder="Write an post..."
              value={post?.text}
              onChange={(e) => handlePost(e)}
              required
            ></textarea>
          </div>
          {/* image section start here */}
          <div className="">
            <div className="flex justify-center items-center h-fit w-fit">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-full h-28 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center px-2 pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="mb-3 w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          {/* image section ends here */}
        </div>
        <button
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-20 hover:bg-blue-800"
          onClick={handlePostSubmit}
        >
          Publish post
        </button>
      </form>
    </div>
  );
};

export default PublishPost;
