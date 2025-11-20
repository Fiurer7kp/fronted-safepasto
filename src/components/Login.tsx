import { useState } from 'react';
import { login } from '../services/authService';
import type { User } from '../types';

interface Props {
  onSuccess: (user?: User) => void;
}

export default function Login({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.includes('@') && password.length >= 6 && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      const res = await login(email.trim(), password);
      onSuccess(res.user);
    } catch (err) {
      setError((err as Error).message || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          placeholder="tu@correo.com"
          autoComplete="email"
          autoFocus
          required
          spellCheck={false}
          tabIndex={0}
          className="text-input"
        />
        <small style={{color:'#6c757d'}}>{email ? `Email: ${email}` : ''}</small>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          placeholder="••••••••"
          autoComplete="current-password"
          minLength={6}
          required
          spellCheck={false}
          tabIndex={0}
          className="text-input"
        />
        <small style={{color:'#6c757d'}}>{password ? `Password length: ${password.length}` : ''}</small>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={!canSubmit} className="primary" aria-disabled={!canSubmit}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}