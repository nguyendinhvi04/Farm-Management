// src/app/auth/login/actions.ts
'use server';

export async function login(formData: FormData) {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password')
    })
  });
  
  // Xử lý lưu token vào cookies/auth context
}