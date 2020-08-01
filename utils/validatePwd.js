exports.isValid = (password) => {
  const pwdMatch = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
  if (password === undefined || !password.match(pwdMatch)) {
    console.log(`Password must: 
  \nBe between 8 to 50 characters
  \nContain at least one numeric digit
  \nOne uppercase
  \nOne lowercase letter`)
    return false;
  };
  console.log(";) good to go")
  return true;
}