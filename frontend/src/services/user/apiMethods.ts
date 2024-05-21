import { apiCall } from "./apiCalls";
import { userUrls } from "../endPoints";

//@dec      Register user
//method    POST

export const postRegister = (userData: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.register, userData)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      OTP Verification
//method    POST

export const postOTP = (otp: { otp: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(otp);
      apiCall("post", userUrls.registerOtp, otp)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Resend OTP
//method    POST

export const postResendOTP = (email: { email: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(email);
      apiCall("post", userUrls.resendOtp, email)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      User Login
//method    POST

export const postLogin = (userData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Google signup  user
//method    POST

export const googleAuthenticate = (userData: {
  username: string | null;
  email: string | null;
  imageUrl: string | null;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.googleAuth, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Forgot Password
//method    POST

export const forgotPassword = (email: { email: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(email);
      apiCall("post", userUrls.forgotPassword, email)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Forgot Password OTP sent
//method    POST

export const forgotOTP = (otp: { otp: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(otp);
      apiCall("post", userUrls.forgotOtp, otp)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Renew Password
//method    POST

export const renewPassword = (userData: {
  password: string;
  confirmPassword: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.resetPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Renew Password
//method    POST

export const shortenUrl = (urlData: { fullUrl: string; userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.shortenUrl, urlData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Renew Password
//method    POST

export const getUrls = (userId: string) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", `${userUrls.getUrl}/${userId}`, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


//@dec      Remove URL
//method    POST

export const removeUrl = (shortUrl: string) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("delete", `${userUrls.removeUrl}/${shortUrl}`, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


