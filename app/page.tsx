import { getAbout, getCertifications, getProjects } from "@/lib/sanity";
import { Hero } from "@/components/sections/Hero";
import { CertificationsVault } from "@/components/sections/CertificationsVault";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600; // fallback revalidation even without a manual sync

export default async function Home() {
  const [about, certifications, projects] = await Promise.all([
    getAbout(),
    getCertifications(),
    getProjects(),
  ]);

  return (
    <main>
      <Hero headline={about?.headline} resumeUrl={about?.resumeUrl} />
      <ProjectsShowcase projects={projects || []} />
      <CertificationsVault certifications={certifications || []} />
      <Contact />
    </main>
  );
}
