import { useAppData } from "@/contexts/DataContext";
import { useParams } from "wouter";
import NotFound from "./NotFound";
import { convertMarkdownToHtml } from "@/lib/markdown";
import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const { content } = useAppData();
  const posts = content.blog?.posts || [];
  const post = posts.find((p: any) => p.slug === slug);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!post) {
    return <NotFound />;
  }

  // Convert Markdown content to HTML
  const htmlContent = convertMarkdownToHtml(post.content);

  // Add copy button functionality to code blocks
  useEffect(() => {
    const blogContent = document.querySelector('.blog-content');
    if (!blogContent) return;

    const codeBlocks = blogContent.querySelectorAll('pre');
    codeBlocks.forEach((block, index) => {
      // Create a wrapper div for the code block with copy button
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.marginBottom = 'var(--spacing-lg)';
      wrapper.style.borderRadius = 'var(--radius-lg)';
      wrapper.style.overflow = 'hidden';

      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      copyButton.className = 'copy-code-btn';
      copyButton.style.position = 'absolute';
      copyButton.style.top = '8px';
      copyButton.style.right = '8px';
      copyButton.style.padding = '6px 12px';
      copyButton.style.backgroundColor = 'var(--color-primary)';
      copyButton.style.color = 'white';
      copyButton.style.border = 'none';
      copyButton.style.borderRadius = 'var(--radius-md)';
      copyButton.style.cursor = 'pointer';
      copyButton.style.fontSize = '12px';
      copyButton.style.fontWeight = '600';
      copyButton.style.display = 'flex';
      copyButton.style.alignItems = 'center';
      copyButton.style.gap = '6px';
      copyButton.style.transition = 'all var(--transition-fast)';
      copyButton.style.zIndex = '10';

      copyButton.addEventListener('click', () => {
        const codeText = block.textContent || '';
        navigator.clipboard.writeText(codeText).then(() => {
          copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          copyButton.style.backgroundColor = 'var(--color-success)';
          
          setTimeout(() => {
            copyButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
            copyButton.style.backgroundColor = 'var(--color-primary)';
          }, 2000);
        });
      });

      copyButton.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '0.9';
        copyButton.style.transform = 'scale(1.05)';
      });

      copyButton.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '1';
        copyButton.style.transform = 'scale(1)';
      });

      // Insert the button into the pre element
      block.style.position = 'relative';
      block.style.paddingTop = '40px';
      block.insertBefore(copyButton, block.firstChild);
    });
  }, [htmlContent]);

  // Define common styles as objects to simplify JSX and avoid syntax errors
  const sectionStyle = { padding: "clamp(40px, 8vw, 80px) 0", borderBottom: "1px solid var(--color-border)" };
  const containerStyle = { maxWidth: "800px", margin: "0 auto", padding: "0 var(--spacing-md)" };
  
  const titleStyle = { 
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: "800", 
    marginBottom: "12px", 
    color: "var(--color-text)", 
    fontFamily: "'Space Grotesk', sans-serif",
    lineHeight: "1.2",
    whiteSpace: "normal" as "normal",
    overflow: "visible" as "visible",
    textOverflow: "clip" as "clip",
  };

  const dateStyle = { fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--color-text-secondary)" };
  
  const imageStyle = { 
    width: "100%", 
    height: "auto", 
    objectFit: "cover" as "cover", 
    borderRadius: "var(--radius-lg)", 
    marginBottom: "clamp(20px, 4vw, 40px)" 
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <section style={{ ...sectionStyle, backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div style={containerStyle}>
            <h1 style={titleStyle}>{post.title}</h1>
            <p style={dateStyle}>{post.date}</p>
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: "var(--color-bg)", borderBottom: "none" }}>
        <div className="container">
          <div style={containerStyle}>
            {post.image && <img src={post.image} alt={post.title} style={imageStyle} />}
            {/* The blog-content class is defined in index.css */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </section>

      <style>{`
        .copy-code-btn:hover {
          opacity: 0.9 !important;
          transform: scale(1.05) !important;
        }
      `}</style>
    </div>
  );
}
