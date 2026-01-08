import { ReactNode } from "react";

interface ConceptCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "green" | "blue" | "purple";
}

const colorClasses = {
  green: "bg-primary/10 text-primary border-primary/20",
  blue: "bg-docker/10 text-docker border-docker/20", 
  purple: "bg-github/10 text-github border-github/20",
};

const iconBgClasses = {
  green: "bg-primary/20",
  blue: "bg-docker/20",
  purple: "bg-github/20",
};

const ConceptCard = ({ icon, title, description, color }: ConceptCardProps) => {
  return (
    <div className={`p-5 rounded-xl border ${colorClasses[color]} animate-fade-in`}>
      <div className={`inline-flex p-2 rounded-lg ${iconBgClasses[color]} mb-3`}>
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
};

export default ConceptCard;
