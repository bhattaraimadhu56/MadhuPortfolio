import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useAppData } from "@/contexts/DataContext";
import { resolveAssetPath } from "@/lib/pathUtils";

interface BannerSliderProps {
  banners?: string[];
}

export default function BannerSlider({ banners = [] }: BannerSliderProps) {
  const { global, content } = useAppData();
  const homeConfig = content.home || {};
  const bannerConfig = homeConfig.banner || {};
  const profileConfig = global.profile || {};
  
  const defaultBanners = bannerConfig.banners || [
    { image: resolveAssetPath("/images/banners/banner_01.jpg"), title: "" },
    { image: resolveAssetPath("/images/banners/banner_02.jpg"), title: "" },
    { image: resolveAssetPath("/images/banners/banner_03.jpg"), title: "" },
  ];

  const displayBanners = banners.length > 0 
    ? banners.map(b => ({ image: b, title: "" })) 
    : defaultBanners;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  // Get auto-scroll interval from settings (default 5000ms)
  const autoScrollInterval = bannerConfig.autoScrollInterval || 5000;
  const showProfileOnBanner = bannerConfig.showProfileOnBanner !== false;
  const profileImage = profileConfig.profileImage || resolveAssetPath("/images/profile.jpg");
  const fullName = profileConfig.fullName || "Name";
  const title = profileConfig.title || "Title";
  const location = profileConfig.location || "Location";

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [isAutoplay, displayBanners.length, autoScrollInterval]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayBanners.length - 1 : prev - 1
    );
    setIsAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false);
  };

  return (
    <>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "var(--color-bg-secondary)",
          // Reduced height: 35vh for banner to fit everything in 100vh
          height: "35vh",
          minHeight: "250px",
        }}
      >
        {/* Banner Container */}
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Banner Images */}
          {displayBanners.map((banner: any, index: number) => (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: index === currentIndex ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            >
              <img
                src={banner.image}
                alt={banner.title || `Banner ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Banner Text Overlay */}
              {banner.title && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "white",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                    padding: "0 20px",
                    width: "100%",
                    maxWidth: "1200px",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                      fontWeight: "800",
                      margin: 0,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {banner.title}
                  </h2>
                </div>
              )}
            </div>
          ))}

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            style={{
              position: "absolute",
              left: "clamp(12px, 3vw, 24px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "none",
              borderRadius: "50%",
              padding: "clamp(8px, 2vw, 12px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all var(--transition-fast)",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255, 255, 255, 1)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255, 255, 255, 0.8)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-50%) scale(1)";
            }}
          >
            <ChevronLeft size={20} style={{ color: "var(--color-primary)" }} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            style={{
              position: "absolute",
              right: "clamp(12px, 3vw, 24px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              border: "none",
              borderRadius: "50%",
              padding: "clamp(8px, 2vw, 12px)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all var(--transition-fast)",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255, 255, 255, 1)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255, 255, 255, 0.8)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-50%) scale(1)";
            }}
          >
            <ChevronRight size={20} style={{ color: "var(--color-primary)" }} />
          </button>

          {/* Dot Indicators - Positioned at bottom center of banner */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(12px, 3vw, 20px)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "clamp(6px, 2vw, 10px)",
              zIndex: 10,
            }}
          >
            {displayBanners.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: index === currentIndex ? "clamp(24px, 5vw, 32px)" : "clamp(8px, 2vw, 12px)",
                  height: "clamp(8px, 2vw, 12px)",
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentIndex
                      ? "var(--color-primary)"
                      : "rgba(255, 255, 255, 0.6)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255, 255, 255, 0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255, 255, 255, 0.6)";
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* LinkedIn-Style Profile Section - Bottom center of banner with glowing effects */}
        {showProfileOnBanner && (
          <div
            style={{
              position: "absolute",
              bottom: "clamp(-60px, -10vw, -80px)", // Overlaps slightly below banner
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 15,
              width: "clamp(300px, 80%, 600px)",
              padding: "0 var(--spacing-md)",
            }}
          >
            <div
              className="profile-card-glow"
              style={{
                backgroundColor: "var(--color-bg)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                padding: "clamp(20px, 4vw, 32px)",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "clamp(16px, 3vw, 24px)",
                border: "2px solid var(--color-border)",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* Profile Image with Glowing Border */}
              <div
                className="profile-image-glow"
                style={{
                  position: "relative",
                  width: "clamp(100px, 20vw, 150px)",
                  height: "clamp(100px, 20vw, 150px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid var(--color-primary)",
                  boxShadow: "0 0 0 4px var(--color-bg), 0 0 20px rgba(0,102,255,0.3)",
                  flexShrink: 0,
                  transition: "all 0.4s ease",
                  cursor: "pointer",
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

              {/* Profile Info */}
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    fontWeight: "800",
                    margin: "0 0 8px 0",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {fullName}
                </h2>
                <p
                  style={{
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    color: "var(--color-text-secondary)",
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    color: "var(--color-text-secondary)",
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <MapPin size={18} style={{ color: "var(--color-accent)" }} /> {location}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* Glowing Hover Effects Styles */}
      <style>{`
        /* Profile Card Glowing Hover Effect */
        .profile-card-glow:hover {
          transform: scale(1.03) translateY(-6px);
          box-shadow: 
            0 0 30px rgba(59, 130, 246, 0.4),
            0 0 60px rgba(59, 130, 246, 0.2),
            0 20px 40px rgba(0, 0, 0, 0.2);
          border-color: var(--color-primary);
          animation: cardPulseGlow 2s ease-in-out infinite;
        }

        /* Profile Image Glowing Border on Hover */
        .profile-card-glow:hover .profile-image-glow {
          border-color: var(--color-accent);
          box-shadow: 
            0 0 0 4px var(--color-bg),
            0 0 30px rgba(59, 130, 246, 0.8),
            0 0 50px rgba(34, 211, 238, 0.6),
            0 0 70px rgba(59, 130, 246, 0.4);
          animation: imagePulseGlow 2s ease-in-out infinite;
        }

        /* Keyframe for Card Glow Pulse */
        @keyframes cardPulseGlow {
          0%, 100% {
            box-shadow: 
              0 0 30px rgba(59, 130, 246, 0.4),
              0 0 60px rgba(59, 130, 246, 0.2),
              0 20px 40px rgba(0, 0, 0, 0.2);
          }
          50% {
            box-shadow: 
              0 0 40px rgba(59, 130, 246, 0.6),
              0 0 80px rgba(59, 130, 246, 0.3),
              0 20px 40px rgba(0, 0, 0, 0.2);
          }
        }

        /* Keyframe for Image Glow Pulse */
        @keyframes imagePulseGlow {
          0%, 100% {
            box-shadow: 
              0 0 0 4px var(--color-bg),
              0 0 30px rgba(59, 130, 246, 0.8),
              0 0 50px rgba(34, 211, 238, 0.6),
              0 0 70px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 
              0 0 0 4px var(--color-bg),
              0 0 40px rgba(59, 130, 246, 1),
              0 0 70px rgba(34, 211, 238, 0.8),
              0 0 90px rgba(59, 130, 246, 0.6);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .profile-card-glow {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .profile-card-glow > div:last-child {
            text-align: center;
          }
          .profile-card-glow > div:last-child p:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
