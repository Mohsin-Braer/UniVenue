const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"

const AuthInput = ({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired=false,
    placeholder,
    customClass
}) => {
    return(
        <div className="my-5">
            <label className="sr-only">
              {labelText}
            </label>
            <input
              onChange={handleChange}
              value={value}
              type={type}
              required={isRequired}
              className={fixedInputClass + customClass}
              placeholder={placeholder}
            />
        </div>
    );
}

export default AuthInput;