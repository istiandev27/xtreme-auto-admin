const CheckBox = () => {
  return (
    <fieldset className="space-y-5">
      <legend className="sr-only">Notifications</legend>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-base font-semibold font-JacquesSB text-gray-700">
          <label>
            By checking Submit, I agree to share my contact information with
            Xtreme auto under the terms of its Privacy Policy
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default CheckBox;
