export  function checkRegFormData(formData) {
  const errors = [];
  if (!formData.email || formData.email.trim() === "") {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push("Email is invalid");
  }
  if (!formData.username || formData.username.trim() === "") {
    errors.push("Username is required");
  }
  if (!formData.password || formData.password.trim() === "") {
    errors.push("Password is required");
  }
  const password = formData.password;
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password)) {
    errors.push("Password must contain at least 1 uppercase, 1 special character");
  }

  return errors;
}
export function checkLoginFormData(formData) {
  const errors = [];
  if (!formData.email || formData.email.trim() === "") {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push("Email is invalid");
  }
  if (!formData.password || formData.password.trim() === "") {
    errors.push("Password is required")  
}
  return errors;
}
