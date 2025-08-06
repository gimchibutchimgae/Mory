const API_BASE_URL = 'https://mory-backend-production.up.railway.app';

export const deleteAccountApi = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원 탈퇴 실패');
  }

  return response.json();
};

export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '로그인 실패');
  }

  return response.json();
};

export const registerApi = async (email: string, name: string, password: string, mbti: string, provider: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password, mbti, provider }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '회원가입 실패');
  }

  return response.json();
};

export const googleSignInApi = async () => {
  try {
    const result = await WebBrowser.openBrowserAsync(
      `${API_BASE_URL}/auth/google`
    );
    console.log("WebBrowser result:", result);

    if (result.type === 'success') {
      const successResult = result as WebBrowser.WebBrowserRedirectResult;
      if (successResult.url) {
        const url = new URL(successResult.url);
        const status = url.searchParams.get('status');
        const accessToken = url.searchParams.get('accessToken');
        const email = url.searchParams.get('email');
        const name = url.searchParams.get('name');
        const provider = url.searchParams.get('provider');

        return { status, accessToken, email, name, provider };
      }
    }
    throw new Error('Google 로그인 응답이 유효하지 않습니다.');
  } catch (error) {
    console.error("Error in googleSignInApi:", error);
    throw error;
  }
};