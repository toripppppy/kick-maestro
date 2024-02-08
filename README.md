# kick-maestro
曲のキックだけで曲を当てる新感覚早押しイントロクイズ！<br>
以下のリンクから遊べます！<br>
https://toripppppy.github.io/kick-maestro/

全曲全出題パターンを網羅した問題一覧「キック道場」はこちら！<br>
https://toripppppy.github.io/kick-maestro/pages/drop_list.html

# 遊び方
遊び方はカンタン！水色のボタンを押すだけです。<br>

<img width="720" alt="スクリーンショット 2024-02-07 22 28 26" src="https://github.com/toripppppy/kick-maestro/assets/96613082/1a648e36-dfa4-4aec-a536-0712304e6338">

ゲームが始まると、ランダムに選ばれた曲のキックが再生され、曲の波形が同時に表示されます。<br>
何の曲か分かったら、ボタンを押しましょう！

<img width="720" alt="スクリーンショット 2024-02-07 22 29 44" src="https://github.com/toripppppy/kick-maestro/assets/96613082/bc73b090-a95e-4259-ab79-0af7eefc5a14">

答えられたら [答えを見る]を押しましょう。<br>
なお正誤判定はプレイヤーに委ねています。スポーツマンシップに則って正々堂々と遊びましょう。<br>
やっぱり答えられない時は、そーっと、[もう一回]。

<img width="720" alt="スクリーンショット 2024-02-07 22 31 44" src="https://github.com/toripppppy/kick-maestro/assets/96613082/cfafac29-f854-4bb0-82f2-3809bdacfe73">

見事答えられたあなたは立派なキックマエストロ！<br>
[当然です]を押して、次の問題に進みましょう。

<img width="720" alt="スクリーンショット 2024-02-07 22 35 46" src="https://github.com/toripppppy/kick-maestro/assets/96613082/eedf991c-d82a-4ee0-93c2-29a0e0381e2f">

このゲームにはルールもありません。<br>
己の実力を磨くもよし、時には友人と知識比べをするもよし。（スペースキーでの早押しにも対応しています。）<br>
時に戦い、時に感動する。このゲームのゴールはただ一つ、最高のキックマエストロになること！<br>

キックを愛し、キックに愛される者こそ真のキックマエストロと言えるでしょう。<br>
共に最高のキックマエストロを目指しましょう！

# 開発者より
この「キックマエストロ」には問題を追加することができます。詳しくは src/js/question_list.js からファイル内のコメントを参照ください。<br>
新曲、新機能のPRは大歓迎です！お待ちしております！

# Youtubeの曲を使用したい人へ（補足）
...とは言っても、中々手元にキックの音声データって無いですよね。<br>
そんな時には、toolディレクトリの中にある`youtube-to-mp3.py`を使用しましょう。<br>
このPythonスクリプトを実行すると、Youtubeのリンクを入力するだけで、簡単にmp3形式のデータが手に入ります！！
### 使用方法
たった3ステップでmp3形式のデータが手に入ります。
1. ダウンロードしたいYoutubeの曲のURLをメモする。
2. yt-dlpライブラリをインストールする。`pip install yt-dlp`で出来るよ！！
3. `youtube-to-mp3.py`を実行しましょう！
<br>
後は、指示通りにURLを入力すると<b>カレントディレクトリにデータが保存されます！！<b>
