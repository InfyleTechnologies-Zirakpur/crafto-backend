// utils/avatarBg.js

const removeAvatarBg = (url) => {
  if (!url) return "";

  // agar pehle se bg remove ho chuka ho
  if (url.includes("e_background_removal")) return url;

  // sirf cloudinary images ke liye
  if (!url.includes("/upload/")) return url;

  return url.replace(
    "/upload/",
    "/upload/e_background_removal,f_png/"
  );
};

module.exports = removeAvatarBg;
