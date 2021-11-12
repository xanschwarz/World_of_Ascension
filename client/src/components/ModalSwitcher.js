import React from 'react';

export default function ModalSwitcher() {
  return (
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          <option selected>Team Members</option>
          <option>Billing</option>
        </select>
      </div>
      <div class="hidden sm:block">
        <nav class="flex space-x-4" aria-label="Tabs">
          <a
            href="https://tailwindui.com/components/application-ui/navigation/tabs"
            class="bg-gray-100 text-gray-700 px-3 py-2 font-medium text-sm rounded-md"
            aria-current="page"
          >
            Team Members
          </a>
          <a
            href="https://tailwindui.com/components/application-ui/navigation/tabs"
            class="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md"
          >
            Billing
          </a>
        </nav>
      </div>
    </div>
  );
}
