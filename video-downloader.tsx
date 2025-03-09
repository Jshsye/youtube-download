"use client"

import type React from "react"

import { useState } from "react"
import { Download, ExternalLink, Loader2, Play } from "lucide-react"
import { downloadVideo } from "@/lib/download-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VideoDownloader() {
  const [url, setUrl] = useState("")
  const [videoInfo, setVideoInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [downloading, setDownloading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!url) {
      setError("Please enter a YouTube URL")
      return
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      const info = await fetchVideoInfo(url)
      setVideoInfo(info)
    } catch (err) {
      setError("Failed to fetch video information. Please check the URL and try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function fetchVideoInfo(videoUrl: string) {
    // This would be implemented in a real application to fetch video metadata
    // For demo purposes, we'll return mock data
    return {
      title: "Sample YouTube Video",
      thumbnail: "/placeholder.svg?height=720&width=1280",
      duration: "10:15",
      author: "Content Creator",
      formats: [
        { label: "360p MP4", value: "360p", size: "15 MB" },
        { label: "720p MP4", value: "720p", size: "45 MB" },
        { label: "1080p MP4", value: "1080p", size: "120 MB" },
        { label: "MP3 Audio", value: "mp3", size: "8 MB" },
      ],
    }
  }

  async function handleDownload(format: string) {
    setDownloading(true)

    try {
      await downloadVideo(url, format)
      // In a real implementation, this would trigger the download
      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
    } catch (err) {
      setError("Download failed. Please try again.")
      console.error(err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Paste YouTube URL here (video or shorts)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                "Get Video"
              )}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {videoInfo && (
        <div className="grid gap-6">
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="download">Download Options</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden mb-4">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <img
                        src={videoInfo.thumbnail || "/placeholder.svg"}
                        alt={videoInfo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="icon" variant="secondary" className="rounded-full w-16 h-16">
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-2">{videoInfo.title}</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <p>Duration: {videoInfo.duration}</p>
                      <p>By: {videoInfo.author}</p>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Watch on YouTube <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="download" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Select Format to Download</h3>
                  <div className="grid gap-3">
                    {videoInfo.formats.map((format: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{format.label}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Size: {format.size}</p>
                        </div>
                        <Button onClick={() => handleDownload(format.value)} disabled={downloading} size="sm">
                          {downloading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Secondary Ad Space */}
          <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-lg text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Advertisement</p>
            <div className="h-[100px] flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-400 dark:text-slate-500">Ad Space (Google AdSense)</p>
            </div>
          </div>
        </div>
      )}

      {!videoInfo && !loading && (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-2">How to use this downloader</h2>
          <ol className="text-left max-w-md mx-auto space-y-2 text-slate-600 dark:text-slate-400">
            <li>1. Copy the YouTube video or shorts URL</li>
            <li>2. Paste the URL in the input field above</li>
            <li>3. Click "Get Video" to load the video information</li>
            <li>4. Preview the video and select your preferred format</li>
            <li>5. Click "Download" to save the video to your device</li>
          </ol>
        </div>
      )}
    </div>
  )
}

