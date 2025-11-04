export const SignUpForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-2 text-lg font-semibold text-center">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        className="p-2 w-full rounded-lg border"
      />
      <input
        type="email"
        placeholder="Email"
        className="p-2 w-full rounded-lg border"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 w-full rounded-lg border"
      />
      <button className="py-2 w-full font-semibold text-white bg-green-500 rounded-lg transition hover:bg-green-600">
        Sign Up
      </button>
    </div>
  );
};
