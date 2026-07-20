import { describe, expect, it } from "vitest";
import {
    can_redo, can_undo, commit, create_history, current, redo, undo,
} from "../src/logics/history";

describe('create_history', () => {
    it('初期状態を基準点として持つ', () => {
        const h = create_history('a');

        expect(current(h)).toBe('a');
        expect(can_undo(h)).toBe(false);
        expect(can_redo(h)).toBe(false);
    });
});

describe('commit', () => {
    it('新しい状態を積む', () => {
        const h = commit(create_history('a'), 'b');

        expect(current(h)).toBe('b');
        expect(can_undo(h)).toBe(true);
    });

    it('入力を破壊しない', () => {
        const h = create_history('a');
        commit(h, 'b');

        expect(h.entries).toEqual(['a']);
        expect(h.index).toBe(0);
    });

    it('上限を超えたら古い方から捨てる', () => {
        let h = create_history(0);
        for (let i = 1; i <= 10; i++) h = commit(h, i, false, 5);

        expect(h.entries).toEqual([6, 7, 8, 9, 10]);
        expect(current(h)).toBe(10);
    });

    it('上限で捨てても現在位置がずれない', () => {
        let h = create_history(0);
        for (let i = 1; i <= 10; i++) h = commit(h, i, false, 5);

        expect(h.index).toBe(h.entries.length - 1);
    });

    describe('coalesce', () => {
        it('直前の履歴を置き換える', () => {
            let h = commit(create_history('a'), 'b');
            h = commit(h, 'bc', true);

            expect(current(h)).toBe('bc');
            // 戻り先は 'b' ではなく 'a'
            expect(current(undo(h))).toBe('a');
        });

        it('連続した入力が1件にまとまる', () => {
            let h = commit(create_history(''), 'あ');
            h = commit(h, 'あа', true);
            h = commit(h, 'あああ', true);

            expect(h.entries).toHaveLength(2);
            expect(current(undo(h))).toBe('');
        });

        it('基準点は置き換えない', () => {
            const h = commit(create_history('a'), 'b', true);

            expect(h.entries).toEqual(['a', 'b']);
            expect(current(undo(h))).toBe('a');
        });
    });

    it('Undo 後に編集するとやり直せる先が消える', () => {
        let h = create_history('a');
        h = commit(h, 'b');
        h = commit(h, 'c');
        h = undo(h);              // 'b'
        h = commit(h, 'd');

        expect(h.entries).toEqual(['a', 'b', 'd']);
        expect(can_redo(h)).toBe(false);
    });
});

describe('undo / redo', () => {
    it('戻ってやり直せる', () => {
        let h = create_history('a');
        h = commit(h, 'b');
        h = commit(h, 'c');

        h = undo(h);
        expect(current(h)).toBe('b');

        h = undo(h);
        expect(current(h)).toBe('a');

        h = redo(h);
        expect(current(h)).toBe('b');
    });

    it('基準点より前には戻らない', () => {
        const h = create_history('a');
        expect(undo(h)).toBe(h);
    });

    it('最新より先へは進まない', () => {
        const h = commit(create_history('a'), 'b');
        expect(redo(h)).toBe(h);
    });

    it('往復しても内容が保たれる', () => {
        let h = create_history('a');
        h = commit(h, 'b');
        h = commit(h, 'c');

        expect(current(redo(redo(undo(undo(h)))))).toBe('c');
    });
});
