import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects-section";
import { GitHubActivitySection } from "@/components/sections/github-activity";
import { Achievements } from "@/components/sections/achievements";
import { Certifications } from "@/components/sections/certifications";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { fetchGitHubProfile } from "@/lib/github";
import { GITHUB_USERNAME } from "@/lib/constants";
import { fetchMediumPosts } from "@/lib/medium";

export const revalidate = 3600;

export default async function HomePage() {
  const [profile, mediumPosts] = await Promise.all([
    fetchGitHubProfile(),
    fetchMediumPosts(),
  ]);
  const avatarUrl =
    profile?.avatar_url ?? `https://github.com/${GITHUB_USERNAME}.png`;

  return (
    <>
      <Hero avatarUrl={avatarUrl} />
      <About />
      <Skills />
      <Experience />
      <ProjectsSection />
      <GitHubActivitySection />
      <Achievements />
      <Certifications />
      <Testimonials />
      <BlogSection posts={mediumPosts} />
      <ContactSection />
    </>
  );
}
