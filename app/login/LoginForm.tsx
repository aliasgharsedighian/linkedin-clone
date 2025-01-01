"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api-client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";

export function LoginForm() {
  const { push } = useRouter();
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const { setUserInfo } = useAppStore();

  const validateSignin = () => {
    if (!signinEmail.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!signinPassword.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!signinEmail.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!signupPassword.length) {
      toast.error("Password is required.");
      return false;
    }
    if (signupPassword !== signupConfirmPassword) {
      toast.error("Password and confirm password should be same.");
      return false;
    }
    return true;
  };

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSignin()) {
      const response = await apiClient
        .post(
          LOGIN_ROUTE,
          {
            email: signinEmail,
            password: signinPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.data);
            setUserInfo(res.data.data);
            localStorage.setItem("activity", "user");
            toast.success(res.data.message);
            // push(`/user/${res.data.data.userId}`);
            // setTimeout(() => {
            //   push("/profile");
            // }, 1000);
          }
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateSignup()) {
      const response = await apiClient
        .post(
          SIGNUP_ROUTE,
          {
            email: signupEmail,
            password: signupPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            setUserInfo(res.data.data);
            localStorage.setItem("activity", "user");
            toast.success(res.data.message);
            // push(`/user/${res.data.data.userId}`);
            // setTimeout(() => {
            //   push("/profile");
            // }, 1000);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };

  return (
    <Tabs defaultValue="signin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign in</TabsTrigger>
        <TabsTrigger value="signup">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>SignIn</CardTitle>
            {/* <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription> */}
          </CardHeader>
          <form onSubmit={handleSignin}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  value={signinEmail}
                  onChange={(e) => setSigninEmail(e.target.value)}
                  id="login-email"
                  placeholder="Type your email ..."
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  placeholder="password"
                  type="password"
                  value={signinPassword}
                  onChange={(e) => setSigninPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            {/* <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription> */}
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  id="signup-email"
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-confirm-password">
                  Confirm Password
                </Label>
                <Input
                  id="signup-confirm-password"
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Sign up</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
