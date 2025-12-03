import { useAppData } from "@/contexts/DataContext";
import DynamicButton from "@/components/DynamicButton";
import { Download } from "lucide-react";

/**
 * About Page
 * Mobile-first responsive design
 * All images and content loaded dynamically from settings
 * No hardcoding anywhere
 */
export default function About() {
  const { global, content } = useAppData();
  const aboutConfig = content.about || {};
  const profileConfig = global.profile || {};
  const contactInfo = global.contact_info || {};

  const profileImage = profileConfig.profileImage || "/images/profile.jpg";
  const fullName = profileConfig.fullName || "Name";
  const title = profileConfig.title || "Title";
  const personalStory = aboutConfig.personalStory || {};
  const workExperience = aboutConfig.workExperience || {};
  const education = aboutConfig.education || {};
  const certifications = aboutConfig.certifications || {};
  const resumeUrl = contactInfo.resumeFileName || "/madhu_cv.pdf";

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
              {aboutConfig.pageTitle || "About Me"}
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "var(--color-text-secondary)",
                margin: "0",
              }}
            >
              {aboutConfig.pageSubtitle || ""}
            </p>
          </div>
        </div>
      </section>

      {/* Personal Story Section */}
      {personalStory.content && (
        <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 80vw, 400px), 1fr))",
                gap: "clamp(32px, 6vw, 48px)",
                alignItems: "center",
                padding: "0 var(--spacing-md)",
              }}
            >
              {/* Profile Image - Bigger with hover effects like home page */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  order: window.innerWidth < 768 ? 2 : 1,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "clamp(250px, 60vw, 400px)",
                    height: "clamp(250px, 60vw, 400px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid var(--color-primary)",
                    boxShadow: "0 0 0 8px var(--color-primary-light)",
                    transition: "all var(--transition-base)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 0 12px var(--color-primary), 0 0 30px var(--color-primary)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 0 8px var(--color-primary-light)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={profileImage}
                    alt={fullName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>

              {/* Story Content */}
              <div style={{ order: window.innerWidth < 768 ? 1 : 2 }}>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                    fontWeight: "800",
                    margin: "0 0 20px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {personalStory.title || "My Story"}
                </h2>
                <div
                  style={{
                    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                    lineHeight: "1.8",
                    color: "var(--color-text-secondary)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {personalStory.content}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {workExperience.items && workExperience.items.length > 0 && (
        <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                  fontWeight: "800",
                  margin: "0 0 40px 0",
                  color: "var(--color-text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {workExperience.title || "Work Experience"}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 4vw, 32px)" }}>
                {workExperience.items.map((job: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "clamp(24px, 4vw, 32px)",
                      backgroundColor: "var(--color-bg)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      transition: "all var(--transition-base)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "12px" }}>
                      <div>
                        <h3
                          style={{
                            fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                            fontWeight: "700",
                            margin: "0",
                            color: "var(--color-text)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        >
                          {job.position}
                        </h3>
                        <p
                          style={{
                            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                            color: "var(--color-primary)",
                            fontWeight: "600",
                            margin: "4px 0 0 0",
                          }}
                        >
                          {job.company}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "clamp(0.85rem, 2vw, 1rem)",
                          color: "var(--color-text-secondary)",
                          fontWeight: "500",
                        }}
                      >
                        {job.duration}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.6",
                        margin: "0",
                      }}
                    >
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.items && education.items.length > 0 && (
        <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                  fontWeight: "800",
                  margin: "0 0 40px 0",
                  color: "var(--color-text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {education.title || "Education"}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 80vw, 350px), 1fr))",
                  gap: "clamp(20px, 4vw, 32px)",
                }}
              >
                {education.items.map((edu: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "clamp(24px, 4vw, 32px)",
                      backgroundColor: "var(--color-bg-secondary)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
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
                    <h3
                      style={{
                        fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                        fontWeight: "700",
                        margin: "0 0 8px 0",
                        color: "var(--color-text)",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                        color: "var(--color-primary)",
                        fontWeight: "600",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {edu.institution}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 2vw, 1rem)",
                        color: "var(--color-text-secondary)",
                        margin: "0",
                      }}
                    >
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certifications.items && certifications.items.length > 0 && (
        <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                  fontWeight: "800",
                  margin: "0 0 40px 0",
                  color: "var(--color-text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {certifications.title || "Certifications"}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 80vw, 350px), 1fr))",
                  gap: "clamp(20px, 4vw, 32px)",
                }}
              >
                {certifications.items.map((cert: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "clamp(24px, 4vw, 32px)",
                      backgroundColor: "var(--color-bg)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
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
                    <h3
                      style={{
                        fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                        fontWeight: "700",
                        margin: "0 0 8px 0",
                        color: "var(--color-text)",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {cert.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                        color: "var(--color-primary)",
                        fontWeight: "600",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {cert.issuer}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 2vw, 1rem)",
                        color: "var(--color-text-secondary)",
                        margin: "0",
                      }}
                    >
                      {cert.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Download Resume CTA */}
      <section style={{ padding: "clamp(40px, 8vw, 60px) 0", backgroundColor: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)", textAlign: "center" }}>
            <DynamicButton
              download="Madhu_Bhattarai_Resume.pdf"
              href={resumeUrl}
              style={{
                padding: "clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--color-primary)",
                color: "white",
                border: "none",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-dark)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Download size={18} />
              Download Resume
            </DynamicButton>
          </div>
        </div>
      </section>
    </div>
  );
}
