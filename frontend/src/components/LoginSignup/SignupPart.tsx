import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { googleAuthenticate, postRegister } from "@/services/user/apiMethods";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../../utils/firebase/config";
import { loginSuccess } from "@/utils/context/authSlice";
import { validateEmail,validatePassword } from "@/utils/validations/loginValidations";

export function SignupForm() {
  const dispatch = useDispatch();
  localStorage.removeItem("otpTimer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();



  const submit = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Enter your name");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Enter your email");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Enter your password");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long and contain at least one number and one special character");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    const values = {
      name,
      email,
      password,
    };

    postRegister(values)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          toast.success(data.message);
          navigate(`/login`);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handlegoogleSignUp = () => {
    signInWithPopup(auth, provider).then((data) => {
      const userData = {
        username: data.user.displayName,
        email: data.user.email,
        imageUrl: data.user.photoURL,
      };

      googleAuthenticate(userData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            toast.success(data.message);
            dispatch(loginSuccess({ user: data }));
            navigate("/");
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Name"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              type="password"
              required
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <Button type="button" onClick={submit} className="w-full">
            Create an account
          </Button>
          <Button
            onClick={handlegoogleSignUp}
            variant="outline"
            className="w-full"
          >
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
