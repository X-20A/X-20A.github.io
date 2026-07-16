---
name: branch-implementation
description: 分岐条件表からマップのルート分岐ロジック(calc_X_Y関数)を実装する手順。ユーザーが分岐条件表・分岐ルール・ルート分岐を提示して実装を依頼したとき、「分岐」「ルート」「calc_」「BranchResponse」に関わる src/core/branch 配下の実装・修正を行うときは、コードを書き始める前に必ずこのスキルを参照すること。
---

# 分岐ロジック実装 (compass)

ユーザーが提示する分岐条件表をもとに、マップのルート分岐関数を実装する。

## 実装先と様式

- 実装先は `src/core/branch/world<W>/<W>-<M>.ts` の `calc_<W>_<M>`。既存ファイルがあればそこを修正し、無ければ同worldや近いworldの既存ファイルを様式の手本にする。
- 関数の形は既存に倣う:
  - 型は `CalcFnWithCondition`(`option: Record<string, string>` を使う場合)または `CalcFnNoCondition`。`option` の値は文字列なので数値は `Number()` で変換する。
  - `destructuring_assignment_helper(sim_fleet)` で艦種数・艦隊情報を分割代入する。
  - `switch (node)` で分岐し、`case null` が出撃地点(スタート)の分岐。
  - 関数末尾は `omission_of_conditions(node, sim_fleet)` で締める。
- 新規マップの場合は登録も行う: `world<W>/index.ts` で export、`src/core/branch/index.ts` の `CALC_TABLE` に `requires_option` 付きで登録、必要なら `src/types/index.ts` の `AreaId` を更新。
- 常に最小差分。関係ない箇所のリファクタや整形はしない。

## 実装ルール

1. **評価順序**: 条件表のルールは「上から順に評価」する。条件同士の整合性・重複・組み合わせの最適化は一切考えず、表の順番どおりに if を並べて愚直に実装する。
2. **未指定組合せ**: 表に指定されていない組み合わせに気付いたら、即座に作業を停止してユーザーに確認する。推測で補完しない。実行時の取りこぼしは末尾の `omission_of_conditions` が受ける。
3. **返り値**: `BranchResponse` を返す。確定遷移はノード名の文字列(例 `return 'B';`)、確率分岐は `ProbabilityBranchInfo[]`(例 `return [{ node: 'L', rate: 0.5 }, { node: 'M', rate: 0.5 }];`)。
4. **データ参照**:
   - 艦種名と変数名の対応は `src/models/Composition.ts` を参照する。
   - 遷移先ノードの有無を確認したいときは `src/data/map.ts` の `NODE_DATAS` を参照する。
5. **テスト**: 追加不要。
6. **コメント**: 新たに書くコメントは一切禁止。既存コメントは触らない。
7. **記録**: 作業記録やドキュメント更新は不要。
