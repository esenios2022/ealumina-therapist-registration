import { extractVimeoId } from "@/lib/vimeo";

export default function VideoPlayer({ vimeoId }: { vimeoId: string }) {
  const id = extractVimeoId(vimeoId);
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
      <iframe
        src={`https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0`}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="strict-origin"
        title="Terra Araras"
      />
    </div>
  );
}
