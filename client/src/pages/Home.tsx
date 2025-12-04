import { useAppData } from "@/contexts/DataContext";
import BannerSlider from "@/components/BannerSlider";

export default function Home() {
  const { global, content } = useAppData();
  const homeConfig = content.home || {};
  const profileConfig = global.profile || {};

  const heroTagline = homeConfig.heroTagline || "Welcome";
  const heroHeading = homeConfig.heroHeading || "Heading";
  const heroSubheading = homeConfig.heroSubheading || "Subheading";
  const skills = homeConfig.skills || [];
  const achievements = homeConfig.achievements || [];

  return ( 
    // Container with proper spacing to fit 100vh
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", width: "100%", minHeight: "100vh" }}> 
      {/* Banner Slider Component with Profile - Now 35vh */}
      <BannerSlider />

      {/* Skills Section - Adjusted padding to fit within 100vh with banner */}
      {skills.length > 0 && (
        <section 
          style={{ 
            padding: "clamp(80px, 12vw, 120px) 0 clamp(40px, 8vw, 80px) 0", // Extra top padding for profile card overlap
            backgroundColor: "var(--color-bg)",
            minHeight: "calc(50vh - 80px)", // Ensures it fits with 50vh banner in 100vh (50vh banner + 50vh skills)
          }}
        >
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 48px)" }}>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                    fontWeight: "800",
                    margin: "0 0 12px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {homeConfig.skillsTitle || "Technical Skills"}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    color: "var(--color-text-secondary)",
                    margin: "0",
                  }}
                >
                  {homeConfig.skillsSubtitle || ""}
                </p>
              </div>

              {/* Smaller skill boxes similar to portfolio filter tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(8px, 2vw, 12px)",
                  justifyContent: "center",
                }}
              >
                {skills.map((skill: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: "clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 20px)",
                      backgroundColor: "var(--color-bg-secondary)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-full)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all var(--transition-fast)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg-secondary)";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                    }}
                  >
                    <span style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
                      {skill.icon}
                    </span>
                    <span
                      style={{
                        fontSize: "clamp(0.85rem, 2vw, 1rem)",
                        fontWeight: "600",
                        color: "inherit",
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 60px)" }}>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
                    fontWeight: "800",
                    margin: "0 0 12px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {homeConfig.achievementsTitle || "Key Achievements"}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    color: "var(--color-text-secondary)",
                    margin: "0",
                  }}
                >
                  {homeConfig.achievementsSubtitle || ""}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 80vw, 300px), 1fr))",
                  gap: "clamp(20px, 4vw, 32px)",
                }}
              >
                {achievements.map((achievement: any, index: number) => (
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
                        margin: "0 0 12px 0",
                        color: "var(--color-text)",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.6",
                        margin: "0",
                      }}
                    >
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Keyframe Animations for Fancy Button */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 8px 24px rgba(18, 140, 126, 0.3), 0 0 0 0 var(--color-primary);
          }
          50% {
            box-shadow: 0 8px 24px rgba(18, 140, 126, 0.5), 0 0 0 6px var(--color-primary-light);
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
          }
          50%, 100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
