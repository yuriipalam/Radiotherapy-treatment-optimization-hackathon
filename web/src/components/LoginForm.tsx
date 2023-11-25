import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log("submitted");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/patients");
    }, 1000);
  }

  return (
    <div className={cn("grid ", className)} {...props}>
      <div className="flex flex-col gap-11">
        <div className="items-center w-80 gap-3">
          <h1 className="text-2xl font-bold">Dear Doctor, Welcome back</h1>
          <div className="flex items-center gap-2">
            <img src="@/../public/heartbeat.svg" alt="heartbeat" />
            Thank you for your work and helping us to save lives!
          </div>
        </div>
        <form className="w-80" onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="login">
                Doctor id
              </Label>
              <Input
                id="login"
                placeholder="Doctor ID"
                defaultValue="thebestdoctor@gmail.com"
                type="email"
                required
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <div className="grid mb-5 gap-1">
              <Label className="sr-only" htmlFor="Password">
                Password
              </Label>
              <Input
                id="Password"
                placeholder="Password"
                type="password"
                defaultValue="password"
                required
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
