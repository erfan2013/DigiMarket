// src/common/auth.js
function readCookie(name) {
  if (typeof document === "undefined") return "";
  const m = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return m ? decodeURIComponent(m.split("=")[1]) : "";
}

export const authHeaders = () => {
  // اول از localStorage؛ اگر نبود از کوکی token
  const jwt = localStorage.getItem("jwt") || readCookie("token");
  const h = {};
  if (jwt) h["Authorization"] = `Bearer ${jwt}`;
  return h;
};
