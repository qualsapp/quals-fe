import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary-800/50",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const id = React.useId();

  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <Input
          ref={ref}
          id={id}
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          className={cn(`pr-9`, className)}
          {...props}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className="sr-only">
            {isVisible ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    </div>
  );
});

InputPassword.displayName = "InputPassword";

export { Input, InputPassword };
