import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  width?: "full" | "auto";
  className?: string;
};

export function Dropdown({
  trigger,
  children,
  align = "right",
  width = "auto",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        className="w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </button>
      <div
        className={`absolute ${align === "right" ? "right-0" : "left-0"
          } mt-1 ${width === "full" ? "w-full" : "min-w-[120px]"
          } rounded-md bg-white shadow-lg transition-all duration-200 overflow-hidden z-50 ${isOpen ? "block" : "hidden"
          }`}
        onClick={() => setIsOpen(false)}
      >
        {children}
      </div>
    </div>
  );
}
