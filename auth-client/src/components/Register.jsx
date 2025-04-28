import { useState } from 'react';
import { registerUser } from '../Service/userApi';
import Swal from 'sweetalert2';

export default function Register() {
    const [form, setForm] = useState({ username: '', password: '', role: 'user' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!form.username || !form.password) {
            Swal.fire({
                icon: 'error',
                title: 'All fields are required!',
            });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // Show loading indicator
        try {
            await registerUser(form);
            Swal.fire({
                icon: 'success',
                title: 'Registered successfully!',
                confirmButtonColor: 'red',
                confirmButtonText: 'Close'
            });
            resetForm();
        } catch (err) {
            // Handle specific error codes and messages
            if (err.message.includes('Username already exists')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed!',
                    text: 'Username already taken. Please choose a different username.',
                });
            } else {
                // Handle other errors
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed!',
                    text: err.message || 'Something went wrong. Please try again later.',
                });
            }
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    const resetForm = () => {
        setForm({
            username: '',
            password: '',
            role: 'user'
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    value={form.username}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />

                <select
                    name="role"
                    onChange={handleChange}
                    value={form.role}
                    className="w-full px-4 py-2 mb-4 border rounded-md bg-white"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
