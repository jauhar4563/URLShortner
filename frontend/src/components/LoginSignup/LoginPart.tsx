import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { provider, auth } from "../../utils/firebase/config";
import { googleAuthenticate, postLogin } from "@/services/user/apiMethods";
import { loginSuccess } from "@/utils/context/authSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import {
  validateEmail,
  validatePassword,
} from "@/utils/validations/loginValidations";

export function LoginPart() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Enter email");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Enter password");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number and one special character"
      );
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    const values = {
      email,
      password,
    };

    postLogin(values)
      .then((response: any) => {
        const data = response.data;
        if (response.status === 200) {
          toast(data.message);
          dispatch(loginSuccess({ user: data }));
          navigate("/");
        } else {
          console.log(response.message);
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.message);
        console.log(error?.message);
      });
  };

  const handlegoogleSignUp = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data);

      const userData = {
        username: data.user.displayName,
        email: data.user.email,
        imageUrl: data.user.photoURL,
      };
      console.log(userData);

      googleAuthenticate(userData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            toast.success(data.message);
            dispatch(loginSuccess({ user: data }));
            navigate("/");
          } else {
            console.log(response.message);
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error(error?.message);
        });
    });
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Login to your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              required
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              type="password"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>
          <Button type="submit" onClick={submit} className="w-full">
            Login
          </Button>
          <Button
            onClick={handlegoogleSignUp}
            variant="outline"
            className="w-full"
          >
            Login with Google
          </Button>
        </div>

        <div className="mt-1 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
