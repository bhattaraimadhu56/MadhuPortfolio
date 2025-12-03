import React from "react";

interface DynamicButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  download?: string | boolean;
  children?: React.ReactNode;

  // Added props so Contact.tsx and Portfolio.tsx usage compiles without errors
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  target?: string;
  rel?: string;
}


 // DynamicButton Component


export default function DynamicButton({
  label,
  onClick,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  className = "",
  download,
  children,
  type = "button",
  style: customStyle,
  onMouseEnter,
  onMouseLeave,
  target,
  rel,
}: DynamicButtonProps) {
  // Button size configurations
  const sizeConfig = {
    sm: { padding: "8px 16px", fontSize: "0.875rem" },
    md: { padding: "12px 24px", fontSize: "1rem" },
    lg: { padding: "16px 32px", fontSize: "1.125rem" },
  };

  // Variant styling using CSS variables
  const variantStyles = {
    primary: {
      backgroundColor: "var(--color-primary)",
      color: "white",
      border: "2px solid var(--color-primary)",
      hoverBg: "var(--color-primary-dark)",
      hoverBorder: "var(--color-primary-dark)",
    },
    secondary: {
      backgroundColor: "var(--color-secondary)",
      color: "white",
      border: "2px solid var(--color-secondary)",
      hoverBg: "var(--color-secondary-dark)",
      hoverBorder: "var(--color-secondary-dark)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-primary)",
      border: "2px solid var(--color-primary)",
      hoverBg: "var(--color-primary-light)",
      hoverBorder: "var(--color-primary)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-text)",
      border: "2px solid transparent",
      hoverBg: "var(--color-bg-secondary)",
      hoverBorder: "transparent",
    },
  } as const;

  const style = variantStyles[variant];
  const sizeStyle = sizeConfig[size];

  const baseButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: fullWidth ? "100%" : "auto",
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: "600",
    fontFamily: "inherit",
    backgroundColor: style.backgroundColor,
    color: style.color,
    border: style.border,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all var(--transition-fast)",
    opacity: disabled ? 0.6 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      (e.currentTarget as HTMLElement).style.backgroundColor = style.hoverBg;
      (e.currentTarget as HTMLElement).style.borderColor = style.hoverBorder;
      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = style.backgroundColor;
    // Try to preserve a sensible borderColor even if border uses CSS var string
    try {
      (e.currentTarget as HTMLElement).style.borderColor = (style.border as string).split(" ")[2] || "";
    } catch {
      (e.currentTarget as HTMLElement).style.borderColor = "";
    }
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
  };

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children || label}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </>
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={href}
        style={{ ...baseButtonStyle, ...customStyle }}
        className={className}
        download={typeof download === "string" ? download : (download ? "" : undefined)}
        target={target}
        rel={rel}
        onMouseEnter={onMouseEnter || handleMouseEnter}
        onMouseLeave={onMouseLeave || handleMouseLeave}
      >
        {buttonContent}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseButtonStyle, ...customStyle }}
      className={className}
      onMouseEnter={onMouseEnter || handleMouseEnter}
      onMouseLeave={onMouseLeave || handleMouseLeave}
    >
      {buttonContent}
    </button>
  );
}
