// src/components/SignupModal.js
export function SignupModal() {
  return `
    <div id="signup-modal" class="modal flex">
      <form id="signupForm" aria-label="Sign up form">
        <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input type="text" id="signup-name" placeholder="Name" required aria-label="Name" class="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
        <input type="email" id="signup-email" placeholder="Email" required aria-label="Email" class="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
        <input type="password" id="signup-password" placeholder="Password" required aria-label="Password" class="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
        <p id="signup-error" class="error hidden">Please fill all fields correctly</p>
        <button type="submit" class="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Sign Up</button>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account? 
          <button type="button" id="show-login" class="text-blue-600 hover:underline">Login</button>
        </p>
      </form>
    </div>
  `;
}
