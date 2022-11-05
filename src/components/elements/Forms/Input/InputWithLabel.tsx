export default function InputWithLabel() {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-base font-medium font-JacquesM text-gray-700"
      >
        Email
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
}
