import { CalendarDays, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Image from "next/image";
interface ArticleHeaderProps {
    title: string;
    description: string;
    author: {
        name: string;
        image: string;
    };
    publishDate: string;
    readingTime: string;
    category: string;
}

export function ArticleHeader({
    title,
    description,
    author,
    publishDate,
    readingTime,
    category,
}: ArticleHeaderProps) {
    return (
        <div className="space-y-6 pb-8 border-b">
            <div className="space-y-2">
                <div className="text-sm text-primary font-medium uppercase tracking-wider">
                    {category}
                </div>
                <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
                <p className="text-xl text-muted-foreground">{description}</p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                            src={author.image}
                            alt={author.name}
                            className="object-cover object-bottom"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div>
                        <p className="font-medium text-foreground">{author.name}</p>
                        <p>Auteur</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <time dateTime={publishDate}>
                        {formatDistanceToNow(new Date(publishDate), {
                            addSuffix: true,
                            locale: fr,
                        })}
                    </time>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min de lecture</span>
                </div>
            </div>
        </div>
    );
} 