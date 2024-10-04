import { INews } from "@/app/interface";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

/**
 * NewsCard component displays a news article in a card format.
 * It shows the publisher, title, and thumbnail of the news article.
 * It also provides a button to read the full article.
 *
 * @param {Object} props - The component props.
 * @param {INews} props.news - The news article data.
 * @returns {JSX.Element} The rendered NewsCard component.
 */
export default function NewsCard({ news }: { news: INews }) {
  return (
    <Card className="mb-4">
      {/* CardHeader displays the publisher and title of the news article */}
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-sm text-white/60 uppercase font-bold">
          {news.publisher}
        </p>
        <h4 className="text-white/90 font-bold text-lg">{news.title}</h4>
      </CardHeader>

      {/* Image displays the thumbnail of the news article */}
      <Image
        removeWrapper
        alt="source"
        isBlurred
        className="z-0 w-full h-full object-cover filter"
        src={news.thumbnail?.resolutions?.[0]?.url}
      />

      {/* CardFooter contains a button to read the full article */}
      <CardFooter className="absolute bottom-0 z-10 justify-end">
        <Button
          radius="full"
          size="sm"
          onPress={() => window.open(news.link, "_blank")}
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
