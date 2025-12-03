import { useAppData } from "@/contexts/DataContext";
import { useState } from "react";
import DynamicLink from "@/components/DynamicLink";
import { Search, ArrowRight } from "lucide-react";

export default function Blog() {
  const { content } = useAppData();
  const blogConfig = content.blog || {};
  const [searchTerm, setSearchTerm] = useState("");

  const pageTitle = blogConfig.pageTitle || "Blog";
  const pageSubtitle = blogConfig.pageSubtitle || "Articles & Insights";
  const posts = blogConfig.posts || [];

  const filteredPosts = posts.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      {/* Banner Slider Component */}

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

      {/* Search Section */}
      <section style={{ padding: "clamp(32px, 6vw, 48px) 0", backgroundColor: "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)", maxWidth: "600px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "clamp(12px, 3vw, 16px)",
                  color: "var(--color-text-secondary)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "clamp(12px, 2vw, 16px) clamp(12px, 3vw, 16px) clamp(12px, 2vw, 16px) clamp(40px, 6vw, 48px)",
                  borderRadius: "var(--radius-md)",
                  border: "2px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-text)",
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  transition: "all var(--transition-fast)",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px var(--color-primary-light)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - 60% of original size */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)" }}>
            {filteredPosts.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 60vw, 280px), 1fr))",
                  gap: "clamp(16px, 3vw, 24px)",
                }}
              >
                {filteredPosts.map((post: any, index: number) => (
                  <DynamicLink
                    key={index}
                    href={`/blog/${post.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "2px solid var(--color-border)",
                        transition: "all var(--transition-base)",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      {/* Blog Image */}
                      {post.image && (
                        <div
                          style={{
                            position: "relative",
                            height: "clamp(100px, 20vw, 150px)",
                            overflow: "hidden",
                            backgroundColor: "var(--color-bg)",
                          }}
                        >
                          <img
                            src={post.image}
                            alt={post.title}
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
                      )}

                      {/* Blog Content */}
                      <div style={{ padding: "clamp(12px, 2vw, 16px)", flex: "1", display: "flex", flexDirection: "column", gap: "8px" }}>
                        {/* Category & Date */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          {post.category && (
                            <span
                              style={{
                                fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
                                padding: "4px 8px",
                                backgroundColor: "var(--color-primary-light)",
                                color: "var(--color-primary)",
                                borderRadius: "var(--radius-sm)",
                                fontWeight: "600",
                              }}
                            >
                              {post.category}
                            </span>
                          )}
                          {post.date && (
                            <span
                              style={{
                                fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
                                color: "var(--color-text-secondary)",
                                fontWeight: "500",
                              }}
                            >
                              {post.date}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                            fontWeight: "700",
                            margin: "0",
                            color: "var(--color-text)",
                            fontFamily: "'Space Grotesk', sans-serif",
                            lineHeight: "1.4",
                          }}
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p
                          style={{
                            fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
                            color: "var(--color-text-secondary)",
                            lineHeight: "1.5",
                            margin: "0",
                            flex: "1",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "6px" }}>
                            {post.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                              <span
                                key={tagIndex}
                                style={{
                                  fontSize: "clamp(0.65rem, 1.3vw, 0.75rem)",
                                  padding: "2px 6px",
                                  backgroundColor: "var(--color-bg)",
                                  color: "var(--color-primary)",
                                  borderRadius: "var(--radius-sm)",
                                  fontWeight: "500",
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Read More Link */}
                        <div
                          style={{
                            marginTop: "auto",
                            paddingTop: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "var(--color-primary)",
                            fontWeight: "600",
                            fontSize: "clamp(0.8rem, 1.8vw, 0.95rem)",
                          }}
                        >
                          {blogConfig.readMoreLabel || "Read More"}
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </DynamicLink>
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
                  {blogConfig.emptyMessage || "No blog posts found"}
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
