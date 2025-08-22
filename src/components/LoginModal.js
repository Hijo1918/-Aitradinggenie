// src/components/LoginModal.js
export function LoginModal() {
  return `
    <div id="login-modal" class="modal flex">
      <form id="loginForm" aria-label="Login form">
        <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
        <input type="email" id="login-email" placeholder="Email" required aria-label="Email" class="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
        <input type="password" id="login-password" placeholder="Password" required aria-label="Password" class="w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
        <p id="login-error" class="error hidden">Invalid email or password</p>
        <button type="submit" class="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Login</button>
        <p class="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account? 
          <button type="button" id="show-signup" class="text-blue-600 hover:underline">Sign Up</button>
        </p>
      </form>
    </div>
  `;
}
