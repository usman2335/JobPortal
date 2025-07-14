import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod-schemas";

import type { LoginFormData } from "@/lib/zod-schemas";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { checkCandidate } from "@/services/candidate.service";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const res = await loginUser(payload);
      console.log("Login response:", res);
      setSuccessOpen(true);
      setErrorOpen(false);
      setUser({
        id: res.user._id,
        fullName: res.user.fullName,
        email: res.user.email,
        role: res.user.role,
      });
      if (res.user.role === "candidate") {
        try {
          const { exists } = await checkCandidate(res.user._id);
          // const check = isRegistered.exists;
          console.log(exists);

          if (exists) {
            // navigate("/candidate/dashboard"); // navigate
            console.log("Candidate is registered");
            console.log(exists);
            navigate("/candidate");
          } else {
            navigate("/register/candidate");
          }
        } catch (error) {
          console.error(error);
        }
      } else if (res.user.role === "recruiter") {
        navigate("/recruiter");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data.message || "Login failed");
      setErrorOpen(true);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Glad to see you again. Please log in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>

      {/* ✅ Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Successful</DialogTitle>
            <DialogDescription>
              You have been logged in successfully.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setSuccessOpen(false)}>Continue</Button>
        </DialogContent>
      </Dialog>
      <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Failed</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setErrorOpen(false)}>Try Again</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
