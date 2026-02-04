import { profile } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export function ProfileCard() {
  const IconMap: Record<string, any> = {
    Github: Github,
    Twitter: Twitter,
    Linkedin: Linkedin,
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-muted">
          <Image
            src={profile.avatar}
            alt={profile.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.role}</p>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        {profile.bio}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.socials.map((social) => {
          const Icon = IconMap[social.icon] || Mail;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
