import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface IconWithTextProps {
  href: string;
  icon: LucideIcon;
  text: string;
}
function IconWithText({ href, icon: Icon, text }: IconWithTextProps) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center cursor-pointer">
        <Icon className="h-10 w-10 text-primary" />
        <span className="text-xs text-gray-500 mt-1 cursor-pointer">
          {text}
        </span>
      </div>
    </Link>
  );
}

export default IconWithText;
