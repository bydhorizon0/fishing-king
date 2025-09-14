
export async function login() {

}

export async function getCurrentUser() {
  try {
    const response = await fetch("http://localhost:8080/api/auth/me", {
      method: "GET",
      credentials: "include" // 중요! 쿠키 자동 전송
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error(`Auth check failed: ${err}`);
    return null;
  }
}

export async function logout() {
  await fetch("http://localhost:8080/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  location.reload();
}