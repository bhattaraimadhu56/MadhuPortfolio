import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { useAppData } from "@/contexts/DataContext";
import DynamicLink from "@/components/DynamicLink";

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

interface QuickLink {
  label: string;
  href: string;
}

/**
 * Footer Component - Smaller, Attractive, Recruiter-Friendly
 * Mobile-first responsive design
 * All styling uses CSS variables - changes instantly with theme toggle
 */
export default function Footer() {
  const { global, content } = useAppData();
  const footerConfig = content.footer || {};
  const profileConfig = global.profile || {};
  const contactInfo = global.contact_info || {};

  const description = footerConfig.description || ""; 
  const location = profileConfig.location || "New Zealand";
  const email = contactInfo.primaryEmail || "madhu.datainsights@gmail.com";
  const socialLinks: SocialLink[] = global.socialLinks || [];
  const sections = footerConfig.sections || [];
  const fullName = profileConfig.fullName || "Madhu Bhattarai";
  const currentYear = new Date().getFullYear();
  const copyright = footerConfig.copyright || `© ${currentYear} ${fullName}. All rights reserved.`;

  // Extract all quick links into a single flat array for the horizontal menu
  const quickLinks: QuickLink[] = sections.flatMap(section => section.links);

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return <Github size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      case "twitter":
        return <Twitter size={20} />;
      case "mail":
        return <Mail size={20} />;
      default:
        return <Mail size={20} />;
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text)",
        transition: "all var(--transition-base)",
      }}
    >
      <div className="container">
        {/* Top Section: Quick Menu and Social Links */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(24px, 5vw, 40px)",
            padding: "clamp(30px, 6vw, 50px) 0",
          }}
        >
          {/* Quick Menu - Horizontal and Attractive */}
          <nav>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "clamp(16px, 4vw, 32px)",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {quickLinks.map((link: QuickLink) => (
                <li key={link.href}>
                  <DynamicLink
                    href={link.href}
                    variant="footer"
                    style={{
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      fontWeight: "600",
                      color: "var(--color-text-secondary)",
                      transition: "all var(--transition-fast)",
                      padding: "4px 8px",
                      borderRadius: "var(--radius-sm)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "var(--color-primary)";
                      el.style.backgroundColor = "var(--color-primary-light)";
                      el.style.boxShadow = "0 0 10px var(--color-primary-light)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "var(--color-text-secondary)";
                      el.style.backgroundColor = "transparent";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {link.label}
                  </DynamicLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links - Centralized and Attractive */}
          <div
            style={{
              display: "flex",
              gap: "clamp(12px, 3vw, 16px)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {socialLinks.map((social: SocialLink, index: number) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-bg)",
                  color: "var(--color-primary)",
                  border: "2px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all var(--transition-base)",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--color-primary)";
                  el.style.color = "white";
                  el.style.borderColor = "var(--color-primary)";
                  el.style.transform = "scale(1.1) rotate(5deg)";
                  el.style.boxShadow = "0 0 15px var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "var(--color-bg)";
                  el.style.color = "var(--color-primary)";
                  el.style.borderColor = "var(--color-border)";
                  el.style.transform = "scale(1) rotate(0deg)";
                  el.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--color-border)", margin: "0 0 clamp(20px, 4vw, 30px) 0" }} />

        {/* Bottom Section: Copyright and Contact */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 2vw, 12px)",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 0 clamp(20px, 4vw, 30px) 0",
            textAlign: "center",
            fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
            color: "var(--color-text-secondary)",
          }}
        >
          <p style={{ margin: 0, fontWeight: "600", color: "var(--color-text)" }}>
            {copyright}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={16} style={{ flexShrink: 0, color: "var(--color-accent)" }} />
            <span style={{ color: "var(--color-text-secondary)" }}>{location}</span>
          </div>
          <a
            href={`mailto:${email}`}
            style={{
              color: "var(--color-primary)",
              textDecoration: "none",
              transition: "all var(--transition-fast)",
              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--color-accent)";
              el.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--color-primary)";
              el.style.textDecoration = "none";
            }}
          >
            {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
