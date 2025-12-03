import { useAppData } from "@/contexts/DataContext";
import { useState } from "react";
import DynamicButton from "@/components/DynamicButton";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const { global, content } = useAppData();
  const contactConfig = content.contact || {};
  const contactInfo = global.contact_info || {};
  const profileConfig = global.profile || {};
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const pageTitle = contactConfig.pageTitle || "Get In Touch";
  const pageSubtitle = contactConfig.pageSubtitle || "Let's discuss your next project";
  const formspreeEndpoint = "https://formspree.io/f/mblvazwn";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formspreeEndpoint) {
      try {
        await fetch(formspreeEndpoint, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>

      {/* Page Header */}
      <section style={{ padding: "clamp(40px, 8vw, 60px) 0", backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: "800",
                margin: "0 0 12px 0",
                color: "var(--color-text)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {pageTitle}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "var(--color-text-secondary)",
                margin: "0",
              }}
            >
              {pageSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(clamp(200px, 80vw, 280px), 1fr))",
                gap: "clamp(20px, 4vw, 32px)",
                marginBottom: "clamp(40px, 8vw, 60px)",
              }}
            >
              {/* Email */}
              <div
                style={{
                  padding: "clamp(24px, 4vw, 32px)",
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Mail size={32} style={{ color: "var(--color-primary)", margin: "0 auto 12px" }} />
                <h3
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    fontWeight: "700",
                    margin: "0 0 8px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Email
                </h3>
                <a
                  href={`mailto:${contactInfo.primaryEmail}`}
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "none";
                  }}
                >
                  {contactInfo.primaryEmail}
                </a>
              </div>

              {/* Phone */}
              <div
                style={{
                  padding: "clamp(24px, 4vw, 32px)",
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Phone size={32} style={{ color: "var(--color-primary)", margin: "0 auto 12px" }} />
                <h3
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    fontWeight: "700",
                    margin: "0 0 8px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Phone
                </h3>
                <a
                  href={`tel:${contactInfo.phone}`}
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "none";
                  }}
                >
                  {contactInfo.phone}
                </a>
              </div>

              {/* LinkedIn */}
              <div
                style={{
                  padding: "clamp(24px, 4vw, 32px)",
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Linkedin size={32} style={{ color: "var(--color-primary)", margin: "0 auto 12px" }} />
                <h3
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    fontWeight: "700",
                    margin: "0 0 8px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  LinkedIn
                </h3>
                <a
                  href={contactInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "none";
                  }}
                >
                  Connect on LinkedIn
                </a>
              </div>

              {/* GitHub */}
              <div
                style={{
                  padding: "clamp(24px, 4vw, 32px)",
                  backgroundColor: "var(--color-bg-secondary)",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  transition: "all var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Github size={32} style={{ color: "var(--color-primary)", margin: "0 auto 12px" }} />
                <h3
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    fontWeight: "700",
                    margin: "0 0 8px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  GitHub
                </h3>
                <a
                  href={contactInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.textDecoration = "none";
                  }}
                >
                  View GitHub Profile
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "clamp(32px, 6vw, 48px)",
                backgroundColor: "var(--color-bg-secondary)",
                border: "2px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1.01) translateY(-2px)";
                el.style.boxShadow = "0 12px 32px rgba(18, 140, 126, 0.5), 0 0 0 8px var(--color-primary-light)";
                el.style.borderColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "scale(1) translateY(0)";
                el.style.boxShadow = "var(--shadow-lg)";
                el.style.borderColor = "var(--color-border)";
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: "800",
                  margin: "0 0 24px 0",
                  color: "var(--color-text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  textAlign: "center",
                }}
              >
                {contactConfig.contactForm?.title || "Send Me a Message"}
              </h2>

              {submitted && (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--color-success-bg)",
                    color: "var(--color-success)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "24px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {contactConfig.contactForm?.successMessage || "Thank you! I'll get back to you soon."}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "var(--color-text)",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      transition: "all var(--transition-fast)",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "var(--color-text)",
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      transition: "all var(--transition-fast)",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "var(--color-text)",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      transition: "all var(--transition-fast)",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: "var(--color-text)",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      transition: "all var(--transition-fast)",
                      resize: "vertical",
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                    }}
                  />
                </div>

                <DynamicButton
                  type="submit"
                  style={{
                    padding: "14px 32px",
                    fontSize: "clamp(1rem, 2vw, 1.125rem)",
                    fontWeight: "700",
                    backgroundColor: "var(--color-primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    margin: "0 auto",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-dark)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <Send size={18} />
                  {contactConfig.contactForm?.submitButton || "Send Message"}
                </DynamicButton>
                {submitted && (
                <div
                  style={{
                    padding: "16px",
                    backgroundColor: "var(--color-success-bg)",
                    color: "var(--color-success)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "24px",
                    textAlign: "center",
                    fontWeight: "600",
                  }}
                >
                  {contactConfig.contactForm?.successMessage || "Thank you! I'll get back to you soon."}
                </div>
              )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
