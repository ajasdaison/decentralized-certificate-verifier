import { useState } from "react";
import { LockKeyhole, User, UserPlus } from "lucide-react";

function AuthForm({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("viewer");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
      role,
    };

    if (isLogin) {
      onLogin(data);
    } else {
      onRegister(data);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
      "
    >
      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          w-full
          max-w-md
        "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="
              bg-blue-500
              text-white
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center
              mx-auto
              mb-4
            "
          >
            {isLogin ? <LockKeyhole size={32} /> : <UserPlus size={32} />}
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            {isLogin ? "Login" : "Register"}
          </h1>

          <p className="text-gray-500 mt-2">
            Certificate Verification Dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  pl-11
                  pr-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-gray-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-400
                "
              >
                <option value="viewer">Viewer</option>

                <option value="issuer">Issuer</option>
              </select>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              text-white
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="
              text-blue-500
              hover:underline
              text-sm
            "
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
