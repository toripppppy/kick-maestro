export class Question {
  constructor(name, dropTime, url) {
    this.name = name;
    this.dropTime = dropTime;
    this.url = url;
  }
}

export class QuestionListController {
  constructor(question_list) {
    this.question_list = question_list;
  }

  makeQuestion(questionMemory) {
    // 出題リストからランダムな問題を取得
    const rand_index = Math.floor(Math.random() * this.question_list.length);
    const new_question = this.question_list[rand_index]

    // ランダムなドロップを選択
    const drop_index = Math.floor(Math.random() * new_question.drops.length);

    // 直近5題の重複を防ぐ
    const maxMemory = 5;
    const key = `${new_question.name}_${new_question.drops[drop_index]}`;

    if (questionMemory.includes(key)) {
      // 再帰
      return makeQuestion(questionMemory);
    }
    // 直近5題を記憶
    questionMemory.push(key)
    if (questionMemory.length > maxMemory) {
      questionMemory.shift()
    }

    // debug
    console.log(new_question)
    
    // 問題にフォーマットして返す
    return new Question(
      new_question.name,
      new_question.drops[drop_index],
      new_question.url,
    )
  }

  // 登録されたdropの合計を返す
  sumOfPatterns() {
    return this.question_list.reduce((sum, q) => sum + q.drops.length, 0);
  }

  getURLByName(name) {
  for (const q of this.question_list) {
    if (q.name === name) {
      return q.url
    }
  }
}
}