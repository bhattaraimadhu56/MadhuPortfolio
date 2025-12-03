import { useAppData } from "@/contexts/DataContext";
import { useState } from "react";
import DynamicButton from "@/components/DynamicButton";
import { ExternalLink, Github } from "lucide-react";

export default function Portfolio() {
  const { content } = useAppData();
  const portfolioConfig = content.portfolio || {};
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const pageTitle = portfolioConfig.pageTitle || "Portfolio";
  const pageSubtitle = portfolioConfig.pageSubtitle || "My Projects";
  const projects = portfolioConfig.projects || [];
  const allTags: string[] = Array.from(new Set(projects.flatMap((p: any) => p.tags || []))) as string[];

  const filteredProjects = selectedTag
    ? projects.filter((p: any) => p.tags?.includes(selectedTag))
    : projects;

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

      {/* Filter Tags */}
      {allTags.length > 0 && (
        <section style={{ padding: "clamp(32px, 6vw, 48px) 0", backgroundColor: "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                  color: "var(--color-text-secondary)",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 16px 0",
                }}
              >
                {portfolioConfig.filterLabel || "Filter by skill:"}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "clamp(8px, 2vw, 12px)",
                }}
              >
                <button
                  onClick={() => setSelectedTag(null)}
                  style={{
                    padding: "clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 20px)",
                    borderRadius: "var(--radius-full)",
                    border: selectedTag === null ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                    backgroundColor: selectedTag === null ? "var(--color-primary)" : "transparent",
                    color: selectedTag === null ? "white" : "var(--color-text)",
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    if (selectedTag !== null) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTag !== null) {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                    }
                  }}
                >
                  All
                </button>
                {allTags.map((tag: string) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    style={{
                      padding: "clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 20px)",
                      borderRadius: "var(--radius-full)",
                      border: selectedTag === tag ? "2px solid var(--color-primary)" : "2px solid var(--color-border)",
                      backgroundColor: selectedTag === tag ? "var(--color-primary)" : "transparent",
                      color: selectedTag === tag ? "white" : "var(--color-text)",
                      fontSize: "clamp(0.85rem, 2vw, 1rem)",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTag !== tag) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.color = "white";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTag !== tag) {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)" }}>
            {filteredProjects.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 80vw, 350px), 1fr))",
                  gap: "clamp(24px, 4vw, 32px)",
                }}
              >
                {filteredProjects.map((project: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      backgroundColor: "var(--color-bg-secondary)",
                      border: "2px solid var(--color-border)",
                      transition: "all var(--transition-base)",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* Project Image */}
                    <div
                      style={{
                        position: "relative",
                        height: "clamp(150px, 30vw, 200px)",
                        overflow: "hidden",
                        backgroundColor: "var(--color-bg)",
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform var(--transition-base)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        }}
                      />
                    </div>

                    {/* Project Content */}
                    <div style={{ padding: "clamp(16px, 3vw, 24px)", flex: "1", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h3
                        style={{
                          fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                          fontWeight: "700",
                          margin: "0",
                          color: "var(--color-text)",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {project.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: "var(--color-text-secondary)",
                          lineHeight: "1.6",
                          margin: "0",
                          flex: "1",
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                          {project.tags.map((tag: string, tagIndex: number) => (
                            <span
                              key={tagIndex}
                              style={{
                                fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
                                padding: "4px 8px",
                                backgroundColor: "var(--color-primary-light)",
                                color: "var(--color-primary)",
                                borderRadius: "var(--radius-sm)",
                                fontWeight: "600",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links - Always show both buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "auto",
                          paddingTop: "12px",
                          borderTop: "1px solid var(--color-border)",
                        }}
                      >
                        {/* Live View Button */}
                        {project.liveUrl && (
                          <DynamicButton
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              flex: "1",
                              padding: "8px 12px",
                              borderRadius: "var(--radius-sm)",
                              backgroundColor: "var(--color-primary)",
                              color: "white",
                              border: "none",
                              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                              fontWeight: "600",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              transition: "all var(--transition-fast)",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-dark)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                            }}
                          >
                            <ExternalLink size={14} />
                            Live View
                          </DynamicButton>
                        )}
                        
                        {/* Code Button */}
                        {project.githubUrl && (
                          <DynamicButton
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              flex: "1",
                              padding: "8px 12px",
                              borderRadius: "var(--radius-sm)",
                              backgroundColor: "transparent",
                              color: "var(--color-primary)",
                              border: "2px solid var(--color-primary)",
                              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                              fontWeight: "600",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              transition: "all var(--transition-fast)",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                              (e.currentTarget as HTMLElement).style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                              (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                            }}
                          >
                            <Github size={14} />
                            Code
                          </DynamicButton>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "clamp(40px, 8vw, 80px) 0" }}>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {portfolioConfig.emptyMessage || "No projects found"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
