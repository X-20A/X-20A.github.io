---
name: branch-policy
description: このリポジトリでのブランチ運用ルール。git操作(checkout / diff / merge / rebase / log / show / pull / push / PR作成など)を行う前、mainブランチや他ブランチに触れそうになった時、デプロイや公開の仕組みについて質問された時は、必ずこのスキルを参照すること。ブランチ名を指定するあらゆる操作の前に適用される。
---

# ブランチ運用ポリシー(cost)

## 絶対ルール: mainブランチに触れない

**すべての作業(参照・編集・比較・チェックアウト)は `cost_dev` ブランチで完結させること。mainブランチの参照・編集はいかなる目的でも禁止。**

### なぜ禁止なのか

- このリポジトリ(X-20A.github.io)のmainブランチには、**costとは無関係な他プロジェクトの成果物**が置かれている。
- cost_devで開発した内容は、**mainブランチの特定ディレクトリへ自動デプロイされる**仕組みになっている。mainへの反映は自動化されており、手動で行う必要は一切ない。
- mainを参照すると無関係な成果物をcostのコードと誤認する恐れがあり、mainを編集すると自動デプロイと衝突して他プロジェクトを壊す恐れがある。

### 具体的にやってはいけないこと

- `git checkout main` / `git switch main`
- `git merge main` / `git rebase main` / `git pull origin main`
- `git diff main...HEAD` など、mainを比較対象にする操作
- `git show main:<file>` / `git log main` など、mainの内容や履歴の参照
- mainをbaseにしたPRの作成、mainへの直接push
- 「mainではどうなっているか確認する」といった調査目的の参照も含めて禁止

### 正しい振る舞い

- ブランチが `cost_dev` であることを前提に作業する。違うブランチにいたら、まず `git branch --show-current` で確認し、`cost_dev` に戻る(mainを経由しない)。
- 差分確認・履歴確認・比較は、すべて `cost_dev` 内の履歴(例: `git diff HEAD~1`、`git log cost_dev`)で行う。
- コミット・pushは `cost_dev` に対してのみ行う。
- mainとの比較や統合が必要に見えるタスクを依頼された場合は、実行せずにこのルールを説明し、ユーザーに確認する。
