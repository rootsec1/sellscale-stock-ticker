import { INews } from "@/app/interface";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

export default function NewsCard({ news }: { news: INews }) {
  console.log(news);
  return (
    <Card className="mb-4">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          {news.publisher}
        </p>
        <h4 className="text-white/90">{news.title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="source"
        isBlurred
        className="z-0 w-full h-full object-cover filter"
        src={news.thumbnail?.resolutions?.[0]?.url}
      />
      <CardFooter className="absolute bottom-0 z-10 justify-end">
        <Button radius="full" size="sm">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
}
