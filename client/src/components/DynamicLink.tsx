import React from "react";
import { Link as WouterLink } from "wouter";

interface DynamicLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "nav" | "footer";
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * DynamicLink Component
 * Wraps Wouter Link with auto-scroll-to-top functionality
 * Automatically scrolls page to top when navigating to new route
 * All styling uses CSS variables - fully dynamic
 */
export default function DynamicLink({
  href,
  children,
  variant = "default",
  className = "",
  onClick,
  style,
  onMouseEnter,
  onMouseLeave,
}: DynamicLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Check for hash link (in-page navigation)
    if (href.startsWith("#")) {
      e.preventDefault(); // Prevent wouter from handling it as a route change
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback to scroll to top if element not found
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // For full page navigation, scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Variant styles using CSS variables
  const variantStyles = {
    default: {
      color: "var(--color-text)",
      textDecoration: "none",
      transition: "color var(--transition-fast)",
    },
    nav: {
      color: "var(--color-text-secondary)",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color var(--transition-fast)",
      cursor: "pointer",
    },
    footer: {
      color: "var(--color-text-secondary)",
      textDecoration: "none",
      fontSize: "0.95rem",
      transition: "color var(--transition-fast)",
      cursor: "pointer",
    },
  };

  const baseStyle = variantStyles[variant];
  const mergedStyle = { ...baseStyle, ...style };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onMouseEnter) {
      onMouseEnter(e);
    } else {
      (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onMouseLeave) {
      onMouseLeave(e);
    } else {
      if (variant === "default") {
        (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
      } else {
        (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
      }
    }
  };

  return (
    <WouterLink href={href} asChild onClick={handleClick}>
      <a
        style={mergedStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    </WouterLink>
  );
}
