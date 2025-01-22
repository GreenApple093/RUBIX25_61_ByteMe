import signup from '../assets/graphics/sign.jpg';

const Signup = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${signup})` }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold mt-4">Sign Up</h1>
        </div>

        <div className="mt-6">
          <button className="w-full py-2 flex items-center justify-center bg-blue-100 text-gray-800 rounded-md shadow hover:shadow-md transition">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
              <path d="..." fill="#4285f4" />
              <path d="..." fill="#34a853" />
              <path d="..." fill="#fbbc04" />
              <path d="..." fill="#ea4335" />
            </svg>
            Sign Up with Google
          </button>

          <div className="my-6 text-center text-sm text-gray-500">Or</div>

          <input
            type="email"
            placeholder="Email"
            className="w-full py-2 px-4 mb-4 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full py-2 px-4 mb-4 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full py-2 px-4 mb-4 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
