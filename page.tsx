import VideoDownloader from "@/components/video-downloader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "YouTube Video Downloader | Download YouTube Videos Easily",
  description:
    "Download YouTube videos and shorts in high quality. Preview videos before downloading in your preferred format and resolution.",
  keywords:
    "youtube downloader, youtube video downloader, download youtube shorts, youtube to mp4, free youtube downloader",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            YouTube Video Downloader
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Download YouTube videos and shorts in high quality. Preview before downloading.
          </p>
        </header>

        <main>
          <VideoDownloader />

          {/* Ad Space */}
          <div className="my-8 p-4 bg-slate-200 dark:bg-slate-800 rounded-lg text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Advertisement</p>
            <div className="h-[250px] flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-400 dark:text-slate-500">Ad Space (Google AdSense)</p>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          <p className="mb-2">
            Disclaimer: This tool is for educational purposes only. Only download videos you have permission to
            download.
          </p>
          <p>© {new Date().getFullYear()} YouTube Video Downloader. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

