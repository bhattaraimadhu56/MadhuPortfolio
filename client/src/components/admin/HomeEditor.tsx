import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Eye, Edit2 } from 'lucide-react';

interface HomeEditorProps {
  initialData: any;
}

export const HomeEditor: React.FC<HomeEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const [editingAchievementId, setEditingAchievementId] = useState<number | null>(null);
  const [viewingBannerId, setViewingBannerId] = useState<number | null>(null);
  const [viewingAchievementId, setViewingAchievementId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('home_content', JSON.stringify(data));
  }, [data]);

  // ============ BANNER MANAGEMENT ============
  const addBanner = () => {
    setData((prev: any) => ({
      ...prev,
      banner: {
        ...prev.banner,
        banners: [
          ...prev.banner.banners,
          { image: '', title: 'New Banner' }
        ]
      }
    }));
  };

  const deleteBanner = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      banner: {
        ...prev.banner,
        banners: prev.banner.banners.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateBanner = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.banner.banners[index][field] = value;
      return newData;
    });
  };

  const handleBannerImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateBanner(index, 'image', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ============ ACHIEVEMENT MANAGEMENT ============
  const addAchievement = () => {
    setData((prev: any) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: [
          ...prev.achievements.items,
          { title: 'New Achievement', description: '', icon: '🏆' }
        ]
      }
    }));
  };

  const deleteAchievement = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: prev.achievements.items.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateAchievement = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.achievements.items[index][field] = value;
      return newData;
    });
  };

  // ============ SKILLS MANAGEMENT ============
  const addSkill = () => {
    setData((prev: any) => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: [...prev.skills.items, { name: 'New Skill', icon: '⭐' }]
      }
    }));
  };

  const deleteSkill = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      skills: {
        ...prev.skills,
        items: prev.skills.items.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const updateSkill = (index: number, field: string, value: string) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.skills.items[index][field] = value;
      return newData;
    });
  };

  const saveBanner = () => {
    setEditingBannerId(null);
  };

  const saveAchievement = () => {
    setEditingAchievementId(null);
  };

  const saveSkill = () => {
    // Skills are auto-saved
  };

  return (
    <div className="w-full space-y-8 pb-8">
      {/* ============ PAGE SETTINGS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Page Settings</h3>
        
        <div className="space-y-6">
          <div className="w-[90%] space-y-2">
            <label className="text-sm font-medium text-foreground">Page Title</label>
            <Input
              value={data.pageTitle || ''}
              onChange={(e) => setData({ ...data, pageTitle: e.target.value })}
              placeholder="Enter page title"
              className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="w-[90%] space-y-2">
            <label className="text-sm font-medium text-foreground">Page Subtitle</label>
            <Textarea
              value={data.pageSubtitle || ''}
              onChange={(e) => setData({ ...data, pageSubtitle: e.target.value })}
              placeholder="Enter page subtitle"
              rows={2}
              className="w-[90%] resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </Card>

      {/* ============ BANNERS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Banners</h3>
          <Button
            onClick={addBanner}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Banner
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Image</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.banner?.banners?.map((banner: any, index: number) => (
                <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <span className="text-foreground">{banner.title}</span>
                  </td>
                  <td className="py-3 px-4">
                    {banner.image && (
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="h-10 w-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      onClick={() => setViewingBannerId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      onClick={() => setEditingBannerId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => deleteBanner(index)}
                      size="sm"
                      variant="destructive"
                      className="hover:bg-destructive/90 transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Banner Form */}
        {editingBannerId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">Edit Banner</h4>
            <div className="space-y-4">
              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input
                  value={data.banner.banners[editingBannerId].title}
                  onChange={(e) => updateBanner(editingBannerId, 'title', e.target.value)}
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleBannerImageUpload(editingBannerId, e.target.files[0]);
                    }
                  }}
                  className="w-[90%] p-2 border border-border rounded transition-all duration-200 hover:border-primary/50"
                />
                {data.banner.banners[editingBannerId].image && (
                  <img
                    src={data.banner.banners[editingBannerId].image}
                    alt="Preview"
                    className="h-32 w-full object-cover rounded mt-2"
                  />
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={saveBanner}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                >
                  Save Banner
                </Button>
                <Button
                  onClick={() => setEditingBannerId(null)}
                  variant="outline"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Banner */}
        {viewingBannerId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">View Banner</h4>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Title:</strong> {data.banner.banners[viewingBannerId].title}</p>
              {data.banner.banners[viewingBannerId].image && (
                <img
                  src={data.banner.banners[viewingBannerId].image}
                  alt={data.banner.banners[viewingBannerId].title}
                  className="h-48 w-full object-cover rounded"
                />
              )}
              <Button
                onClick={() => setViewingBannerId(null)}
                variant="outline"
                className="mt-4 hover:bg-accent/50 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* ============ SKILLS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Skills</h3>
          <Button
            onClick={addSkill}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Skill
          </Button>
        </div>

        <div className="space-y-3">
          {data.skills?.items?.map((skill: any, index: number) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-accent/20 rounded-lg border border-accent/50 hover:border-primary/50 transition-all duration-200 group">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                placeholder="Skill name"
                className="flex-1 w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Input
                value={skill.icon}
                onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                placeholder="Icon"
                maxLength={2}
                className="w-12 transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Button
                onClick={() => deleteSkill(index)}
                size="sm"
                variant="destructive"
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive/90"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* ============ ACHIEVEMENTS ============ */}
      <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          <Button
            onClick={addAchievement}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
          >
            <Plus size={18} /> Add Achievement
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Icon</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.achievements?.items?.map((achievement: any, index: number) => (
                <tr key={index} className="border-b border-border/30 hover:bg-accent/30 transition-colors duration-200">
                  <td className="py-3 px-4">
                    <span className="text-foreground">{achievement.title}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-2xl">{achievement.icon}</span>
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <Button
                      onClick={() => setViewingAchievementId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      onClick={() => setEditingAchievementId(index)}
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/20 transition-all duration-200"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => deleteAchievement(index)}
                      size="sm"
                      variant="destructive"
                      className="hover:bg-destructive/90 transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Achievement Form */}
        {editingAchievementId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">Edit Achievement</h4>
            <div className="space-y-4">
              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input
                  value={data.achievements.items[editingAchievementId].title}
                  onChange={(e) => updateAchievement(editingAchievementId, 'title', e.target.value)}
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  value={data.achievements.items[editingAchievementId].description}
                  onChange={(e) => updateAchievement(editingAchievementId, 'description', e.target.value)}
                  placeholder="Achievement description"
                  rows={2}
                  className="w-[90%] resize-y transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="w-[90%] space-y-2">
                <label className="text-sm font-medium text-foreground">Icon</label>
                <Input
                  value={data.achievements.items[editingAchievementId].icon}
                  onChange={(e) => updateAchievement(editingAchievementId, 'icon', e.target.value)}
                  maxLength={2}
                  className="w-[90%] transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={saveAchievement}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                >
                  Save Achievement
                </Button>
                <Button
                  onClick={() => setEditingAchievementId(null)}
                  variant="outline"
                  className="hover:bg-accent/50 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* View Achievement */}
        {viewingAchievementId !== null && (
          <div className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent/50">
            <h4 className="font-semibold mb-4 text-foreground">View Achievement</h4>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Title:</strong> {data.achievements.items[viewingAchievementId].title}</p>
              <p className="text-foreground"><strong>Description:</strong> {data.achievements.items[viewingAchievementId].description}</p>
              <p className="text-2xl"><strong>Icon:</strong> {data.achievements.items[viewingAchievementId].icon}</p>
              <Button
                onClick={() => setViewingAchievementId(null)}
                variant="outline"
                className="mt-4 hover:bg-accent/50 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default HomeEditor;
