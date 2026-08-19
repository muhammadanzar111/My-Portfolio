import { getAbout, getSkills, getCertifications, getProjects } from "@/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { CertificationsVault } from "@/components/sections/CertificationsVault";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600; // fallback revalidation even without a manual sync

export default async function Home() {
  const [about, skills, certifications, projects] = await Promise.all([
    getAbout(),
    getSkills(),
    getCertifications(),
    getProjects(),
  ]);

  return (
    <main>
      <Hero headline={about?.headline} resumeUrl={about?.resumeUrl} />
      <About bio={about?.bio} education={about?.education} />
      <ProjectsShowcase projects={projects || []} />
      <Skills skills={skills || []} />
      <CertificationsVault certifications={certifications || []} />
      <Contact />
    </main>
  );
}
