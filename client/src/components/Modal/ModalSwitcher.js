import React from 'react';

export default function ModalSwitcher({ currentModal, handleModalChange }) {
  return (
    <div>
      <div className="sm:hidden">
        <label for="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          <option>Login</option>
          <option>Signup</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <p className="w-full flex justify-center mb-4 text-sm font-medium text-gray-700">
          Do you need to login or signup?
        </p>
        <nav
          className="w-full flex justify-center mb-4 space-x-4"
          aria-label="Tabs"
        >
          <a
            href="#login"
            onClick={() => handleModalChange('LoginModal')}
            className={
              currentModal === 'LoginModal'
                ? 'w-2/4 text-center text-white bg-indigo-600 px-3 py-2 font-medium text-sm border border-transparent rounded-md'
                : 'w-2/4 text-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md'
            }
            aria-current="page"
          >
            Login
          </a>
          <a
            href="#signup"
            onClick={() => handleModalChange('SignupModal')}
            className={
              currentModal === 'SignupModal'
                ? 'w-2/4 text-center text-white bg-indigo-600 px-3 py-2 font-medium text-sm border border-transparent rounded-md'
                : 'w-2/4 text-center text-gray-500 hover:bg-gray-200 hover:text-gray-800 px-3 py-2 font-medium text-sm rounded-md'
            }
          >
            Signup
          </a>
        </nav>
      </div>
    </div>
  );
}
