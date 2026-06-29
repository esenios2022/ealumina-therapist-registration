export default function AudioPlayer({ contentId }: { contentId: string }) {
  return (
    <audio
      controls
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
      className="w-full"
      src={`/api/media/audio?contentId=${contentId}`}
    />
  );
}
