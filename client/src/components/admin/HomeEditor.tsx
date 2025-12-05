import React, { useState, useEffect } from 'react';
import { EditorWrapper } from './EditorWrapper';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface HomeEditorProps {
  initialData: any;
}

export const HomeEditor: React.FC<HomeEditorProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(data) !== JSON.stringify(initialData));
  }, [data, initialData]);

  const handleReset = () => {
    setData(initialData);
  };

  const updateField = (path: string[], value: any) => {
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const addBanner = () => {
    setData((prev: any) => ({
      ...prev,
      banner: {
        ...prev.banner,
        banners: [
          ...prev.banner.banners,
          {
            image: '/images/banners/new_banner.jpg',
            title: 'New Banner Title',
          },
        ],
      },
    }));
  };

  const removeBanner = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      banner: {
        ...prev.banner,
        banners: prev.banner.banners.filter((_: any, i: number) => i !== index),
      },
    }));
  };

  const addSkill = () => {
    setData((prev: any) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { name: 'New Skill', icon: '🎯' },
      ],
    }));
  };

  const removeSkill = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((_: any, i: number) => i !== index),
    }));
  };

  const addAchievement = () => {
    setData((prev: any) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          icon: 'award',
          title: 'New Achievement',
          description: 'Description here',
        },
      ],
    }));
  };

  const removeAchievement = (index: number) => {
    setData((prev: any) => ({
      ...prev,
      achievements: prev.achievements.filter((_: any, i: number) => i !== index),
    }));
  };

  return (
    <EditorWrapper
      fileName="home_content.json"
      data={data}
      onReset={handleReset}
      hasChanges={hasChanges}
    >
      {/* Banner Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Banner Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="autoScrollInterval">Auto Scroll Interval (ms)</Label>
            <Input
              id="autoScrollInterval"
              type="number"
              value={data.banner.autoScrollInterval}
              onChange={(e) => updateField(['banner', 'autoScrollInterval'], parseInt(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="profilePosition">Profile Position</Label>
            <select
              id="profilePosition"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={data.banner.profilePosition}
              onChange={(e) => updateField(['banner', 'profilePosition'], e.target.value)}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>

        <Separator />

        {/* Banner Slides */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Banner Slides</h4>
            <Button size="sm" onClick={addBanner}>
              <Plus className="h-4 w-4 mr-2" />
              Add Banner
            </Button>
          </div>

          {data.banner.banners.map((banner: any, index: number) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-2" />
                
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <Label>Image Path</Label>
                    <Input
                      value={banner.image}
                      onChange={(e) => {
                        const newBanners = [...data.banner.banners];
                        newBanners[index].image = e.target.value;
                        updateField(['banner', 'banners'], newBanners);
                      }}
                      placeholder="/images/banners/banner.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={banner.title}
                      onChange={(e) => {
                        const newBanners = [...data.banner.banners];
                        newBanners[index].title = e.target.value;
                        updateField(['banner', 'banners'], newBanners);
                      }}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeBanner(index)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Hero Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Hero Section</h3>
        
        <div className="space-y-2">
          <Label htmlFor="heroTagline">Tagline</Label>
          <Input
            id="heroTagline"
            value={data.heroTagline}
            onChange={(e) => updateField(['heroTagline'], e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroHeading">Heading</Label>
          <Input
            id="heroHeading"
            value={data.heroHeading}
            onChange={(e) => updateField(['heroHeading'], e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="heroSubheading">Subheading</Label>
          <Input
            id="heroSubheading"
            value={data.heroSubheading}
            onChange={(e) => updateField(['heroSubheading'], e.target.value)}
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Skills Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Skills Section</h3>
          <Button size="sm" onClick={addSkill}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skillsTitle">Section Title</Label>
          <Input
            id="skillsTitle"
            value={data.skillsTitle}
            onChange={(e) => updateField(['skillsTitle'], e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skillsSubtitle">Section Subtitle</Label>
          <Input
            id="skillsSubtitle"
            value={data.skillsSubtitle}
            onChange={(e) => updateField(['skillsSubtitle'], e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.skills.map((skill: any, index: number) => (
            <Card key={index} className="p-3">
              <div className="flex items-center gap-3">
                <Input
                  value={skill.icon}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[index].icon = e.target.value;
                    updateField(['skills'], newSkills);
                  }}
                  className="w-16 text-center"
                  placeholder="🎯"
                />
                <Input
                  value={skill.name}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[index].name = e.target.value;
                    updateField(['skills'], newSkills);
                  }}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(index)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Achievements Section</h3>
          <Button size="sm" onClick={addAchievement}>
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="achievementsTitle">Section Title</Label>
          <Input
            id="achievementsTitle"
            value={data.achievementsTitle}
            onChange={(e) => updateField(['achievementsTitle'], e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="achievementsSubtitle">Section Subtitle</Label>
          <Input
            id="achievementsSubtitle"
            value={data.achievementsSubtitle}
            onChange={(e) => updateField(['achievementsSubtitle'], e.target.value)}
          />
        </div>

        {data.achievements.map((achievement: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Input
                    value={achievement.icon}
                    onChange={(e) => {
                      const newAchievements = [...data.achievements];
                      newAchievements[index].icon = e.target.value;
                      updateField(['achievements'], newAchievements);
                    }}
                    placeholder="award"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={achievement.title}
                    onChange={(e) => {
                      const newAchievements = [...data.achievements];
                      newAchievements[index].title = e.target.value;
                      updateField(['achievements'], newAchievements);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    value={achievement.description}
                    onChange={(e) => {
                      const newAchievements = [...data.achievements];
                      newAchievements[index].description = e.target.value;
                      updateField(['achievements'], newAchievements);
                    }}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeAchievement(index)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </EditorWrapper>
  );
};
