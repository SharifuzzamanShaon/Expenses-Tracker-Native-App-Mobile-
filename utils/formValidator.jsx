export  function checkRegFormData(formData) {
  const {email, username, password} = formData;
  const errors = [];
  if(!email || !username || !password){
    errors.push("All fields are required");
  }
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email is invalid");
  }
  if (!username || username.trim() === "") {
    errors.push("Username is required");
  }else if(username.length <5 || username.length >10 ){
    errors.push("username name should be 5 to 10 characters")
  }
  if (!password || password.trim() === "") {
    errors.push("Password is required");
  }
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }
  if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password)) {
    errors.push("Password must contain at least 1 uppercase, 1 special character");
  }

  return errors;
}
export function checkLoginFormData (formData){
  const {email, password} = formData
  const errors = [];
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.push("Email is invalid");
  }
  if (!password || password.trim() === "") {
    errors.push("Password is required")  
}
  return errors;
}
