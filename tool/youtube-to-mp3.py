try:
  from yt_dlp import YoutubeDL
except:
  print("'yt-dlp' が install されていません")
  exit(0)

OPTIONS = {
  "format": "mp3/bestaudio/best",
  "postprocessors": [
    {
      "key": "FFmpegExtractAudio",
      "preferredcodec": "mp3",
    }
  ],
}

def add_youtube_url() -> list:
  urls = list()
  while True:
    url = input("URL : ")
    urls.append(url)
    print(f"[{url}] ダウンロードリストに追加しました")
    if input("もう一曲ダウンロードしますか？ yes/no : ") == "yes":
      print(end = "\n")
      continue
    else:
      break
  print(end = "\n")
  return urls

def download(urls: list):
  with YoutubeDL(OPTIONS) as ydl:
    result = ydl.download(urls)

def main():
  print("YouTubeの曲をmp3形式でダウンロードします。", end = "\n\n")
  
  urls = add_youtube_url()
  download(urls)
  
  print("\n全ての曲のダウンロードに成功しました！")
  print("ダウンロードされた曲はカレントディレクトリにあります。")

if __name__ == "__main__":
  main()