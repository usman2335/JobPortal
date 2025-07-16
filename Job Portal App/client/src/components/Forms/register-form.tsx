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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/zod-schemas";
import { registerUser } from "@/services/auth.service";

import type { RegisterFormData } from "@/lib/zod-schemas";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState<string | null>(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const navigate = useNavigate();
  // const [role, setRole] = useState<string>("");
  const { setUser } = useAuthStore();

  //   const { setValue } = useForm();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  // useEffect(() => {
  //   setValue("role", role);
  //   console.log(role);
  // }, [role, setValue]);
  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Form data:", data);
      const response = await registerUser(data);
      setSuccessOpen(true);
      setErrorOpen(null);
      console.log("Registration successful:", response);
      setUser({
        id: response.user._id,
        fullName: response.user.fullName,
        email: response.user.email,
        role: response.user.role,
      });
    } catch (error: any) {
      console.log("Form data:", data);
      setErrorDialog(true);
      setErrorOpen(error.response?.data.message || "Registration failed");
      console.log("Error from backend:", error.response?.data.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            It only takes a few seconds to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="FullName">Full Name</Label>
                  <Input
                    id="FullName"
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@gmail.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
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
                <div className="grid gap-3">
                  <Label htmlFor="reEnterPassword">Re-enter Password</Label>
                  <Input
                    id="reEnterPassword"
                    type="password"
                    {...register("reEnterPassword")}
                  />
                  {errors.reEnterPassword && (
                    <p className="text-sm text-red-500">
                      {errors.reEnterPassword.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="selectRole">Select Role</Label>

                  <Select
                    onValueChange={(value) => {
                      setValue("role", value, { shouldValidate: true });
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="candidate">Candidate</SelectItem>
                        <SelectItem value="recruiter">Recruiter</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <input type="hidden" {...register("role")} />

                  {errors.role && (
                    <p className="text-sm text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!watch("role")}
                >
                  Register
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
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
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account created!</DialogTitle>
            <DialogDescription>
              You’ve successfully registered. You can now log in.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => {
              setSuccessOpen(false);
              navigate("/login");
            }}
          >
            Go to Login
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={errorDialog} onOpenChange={setErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registration Failed</DialogTitle>
            <DialogDescription>{errorOpen}</DialogDescription>
          </DialogHeader>
          <Button onClick={() => setErrorDialog(false)}>Try Again</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
