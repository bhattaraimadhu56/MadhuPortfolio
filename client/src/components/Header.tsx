import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useAppData } from "@/contexts/DataContext";
import DynamicLink from "@/components/DynamicLink";

interface NavLink {
  label: string;
  href: string;
}


export default function Header( ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme, switchable } = useTheme();
  const { global } = useAppData();
  
  const siteTitle = global.metadata.siteTitle || "Portfolio";
  const logo = global.header.appLogo || "/images/logo.png";
  const navLinks: NavLink[] = global.header.navigationLinks || [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    return location === href;
  };

  return (
    <header
      style={{
        backgroundColor: theme === 'light' ? "var(--color-menu-bg)" : "var(--color-bg-secondary)",
        borderBottom: theme === 'light' ? "2px solid var(--color-menu-border)" : "1px solid var(--color-border)",
        boxShadow: theme === 'light' ? "0 2px 8px var(--color-menu-shadow)" : "none",
        transition: "all var(--transition-base)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="container">
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "var(--spacing-md) 0",
            gap: "var(--spacing-md)",
            position: "relative",
          }}
        >
          {/* Logo and Site Title */}
          <DynamicLink href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-sm)",
                cursor: "pointer",
                textDecoration: "none",
                minWidth: 0,
              }}
            >
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    border: "2px solid var(--color-primary-light)",
                    boxShadow: "var(--shadow-sm)",
                    objectFit: "cover",
                    transition: "all var(--transition-base)",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px var(--color-primary-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-light)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  }}
                />
              )}
            </div>
          </DynamicLink>

          {/* Desktop Navigation - Centered, Bold, Spaced with Hover Glow and Active State */}
          <div
            style={{
              display: "none",
              gap: "clamp(32px, 6vw, 48px)",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link: NavLink) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "clamp(1rem, 2vw, 1.125rem)",
                      padding: "12px 20px",
                      borderRadius: "var(--radius-lg)",
                      transition: "all var(--transition-fast)",
                      border: active ? "2px solid var(--color-primary)" : "2px solid transparent",
                      backgroundColor: active ? "var(--color-primary-light)" : "transparent",
                      color: active ? "var(--color-primary)" : "var(--color-text-secondary)",
                      cursor: "pointer",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-light)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0, 102, 255, 0.4)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-sm)",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            {/* Theme Toggle Button - Rounded Circle with Border and Hover Effect */}
            {switchable && (
              <button
                onClick={toggleTheme}
                style={{
                  background: "transparent",
                  border: "2px solid var(--color-primary-light)",
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  padding: "0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-text)",
                  transition: "all var(--transition-base)",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px var(--color-primary-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-light)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {theme === "light" ? (
                  <Moon size={18} style={{ color: "var(--color-primary)" }} />
                ) : (
                  <Sun size={18} style={{ color: "var(--color-accent)" }} />
                )}
              </button>
            )}

            {/* Mobile Menu Button - Visible only on Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                color: "var(--color-text)",
                padding: "8px",
                flexShrink: 0,
              }}
              className="md:hidden"
              title={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu - Visible only on Mobile */}
        {isMenuOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-md)",
              paddingBottom: "var(--spacing-lg)",
              borderTop: theme === 'light' ? "2px solid var(--color-menu-border)" : "1px solid var(--color-border)",
              marginTop: "var(--spacing-md)",
              paddingTop: "var(--spacing-lg)",
              backgroundColor: theme === 'light' ? "var(--color-menu-bg)" : "transparent",
              animation: "slideDown 300ms ease-out",
            }}
            className="md:hidden"
          >
            {navLinks.map((link: NavLink) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "700",
                      padding: "12px 16px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: active ? "var(--color-primary-light)" : "transparent",
                      color: active ? "var(--color-primary)" : "var(--color-text-secondary)",
                      border: active ? "2px solid var(--color-primary)" : "2px solid transparent",
                      transition: "all var(--transition-fast)",
                      cursor: "pointer",
                    }}
                    onClick={handleMenuClose}
                  >
                    {link.label}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md\\:flex {
            display: flex !important;
          }
          .md\\:hidden {
            display: none !important;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
