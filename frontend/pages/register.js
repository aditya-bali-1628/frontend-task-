import { useState } from 'react';
import NavBar from '../components/NavBar';
import Router from 'next/router';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api/v1'}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Register failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      Router.push('/dashboard');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <>
      <NavBar user={null} onLogout={() => {}} />

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
            Create Your Account
          </h2>

          {msg && (
            <p className="text-red-700 bg-red-100 py-2 px-3 rounded-lg mb-4 text-center text-sm animate-pulse">
              {msg}
            </p>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <UserIcon className="h-5 w-5 text-indigo-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition hover:bg-indigo-50"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-indigo-400 absolute left-3 top-3" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition hover:bg-indigo-50"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-indigo-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition hover:bg-indigo-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-5">
            Already have an account?{' '}
            <a href="/" className="text-indigo-600 font-medium hover:underline">
              Login here
            </a>
          </p>
        </div>
      </main>
    </>
  );
}
