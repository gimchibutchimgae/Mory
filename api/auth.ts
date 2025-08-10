import * as WebBrowser from "expo-web-browser";

import * as Linking from "expo-linking";
import { Platform } from "react-native";
const API_BASE_URL = "https://mory-backend-production.up.railway.app";

WebBrowser.maybeCompleteAuthSession();

export const deleteAccountApi = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원 탈퇴 실패");
  }

  return response.json();
};

export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "로그인 실패");
  }

  return response.json();
};

export const registerApi = async (
  email: string,
  name: string,
  password: string,
  mbti: string,
  provider: string
) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, password, mbti, provider }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입 실패");
  }

  return response.json();
};
export const googleSignInApi = async () => {
  try {
    const redirectUri =
      Platform.OS === "web"
        ? "http://localhost:8081/oauth" // 또는 배포된 웹 주소
        : Linking.createURL("oauth");
    // 결과적으로 myapp://oauth 로 리다이렉트 됨

    const result = await WebBrowser.openAuthSessionAsync(
      `${API_BASE_URL}/auth/google`,
      redirectUri
    );
    console.log('A');
    if (result.type === "success" && result.url) {
      console.log('B');
      const url = new URL(result.url);
      return {
        status: url.searchParams.get("status"),
        accessToken: url.searchParams.get("accessToken"),
        email: url.searchParams.get("email"),
        name: url.searchParams.get("name"),
        provider: url.searchParams.get("provider"),
      };
    }

    throw new Error("Google 로그인 실패");
  } catch (error) {
    console.error("Error in googleSignInApi:", error);
    throw error;
  }
};
