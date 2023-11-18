'use client';

import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button
        onClick={() => {
          fetch('api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          }).then(console.log);
        }}
      >
        ログイン
      </button>
    </main>
  );
}
