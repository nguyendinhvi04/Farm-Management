// app/register/page.jsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../services/userService";
import '../../styles/loginPage.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);

    try {
      await createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name
      });

      // Redirect to login after successful registration
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-overlay"></div>

      <div className="auth-card">
        <h2 className="auth-title">FARM MANAGEMENT</h2>
        <p className="auth-subtitle">Register to manage your farm</p>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Full name</label>
          <input
            type="text"
            name="full_name"
            placeholder="Nguyễn Văn A"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
