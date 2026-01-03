import { AreaId } from "../../src/types";

type MockData = {
    area: AreaId,
    routes: string[], // 編成と、能動分岐以外のoptionが同じなら複数設定可
    option: Record<string, string>, // 能動分岐は不要
    deck: string,
}

export const normal_mock_datas: MockData[] = [
    {
        area: '60-1', routes: ['1-A-B-B2-C1-C2'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpBUAK4RscQRGYx6AX2w4ADmgDMJbIxgB3NAHZRBPQGMA1mhkHlZiZPQgMmgAbMoKSqiq6lpo1IwEMIaRJmaW1naoABwArM5uItg%2BAaTRoTD2EVGo0dGFlcSJaiCa2qi6BkY55pKhtmjF9mXuRR6VfoGoxSR16I2yGLHtKrPdKahpGVnGpsPAowWOUzFkc9WoJMp1xWvjLVtF0cm9B5mDJ3m4C6TEAuabRG6KeZBCh1aIvRYUNqKDqFJE9VLpX7Zf4jfIxJwg8qobxQ%2B72CyhajhXEgagNGnUVYjCxAA',
    },
    {
        area: '60-1', routes: ['1-A-D-D2-D3-E-H'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpBUAK4RscQRGYx6AX2w4ADmgDMJbIxgB3NAHZRBPQGMA1mhkHlZiZPQgMmgAbMoKSqiq6lpo1IwEMIaRJmaW1naoABwArM5uItg%2BAaTRoTD2EVEYsZXEiR7J2qhpGVnGpuaSobYOTiAu7qjRZJV%2BgagkynXojbKoxdHRrWiFWyCaXT2ZRjmDwMMF9vZlk9Oz1aiUdcWraMUUhdtFn-sp3enHbIDPK4ArRMYTCqKOakewWULUcJDGgNZEgagrIYWIA',
    },
    {
        area: '60-1', routes: ['1-A-B-B1-B2-C-G-M-O'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpBUAK4RscQRGYx6AX2w4ADmgDMJbIxgB3NAHZRBPQGMA1mhkHlZiZPQgMqTKAKzYSqiq6lo6%2BoaRJmaW1nao9mTObmgAbGqKfoGoMSShMPYRUYkeZQkAHKKa2qjUjAQw6cam5pKhtkEehe6ozfEVpCHYMOgNsqjFxa3xxIllnakGRpnDwKO5MfaTaK0tc1VktTEraDEUm4rbrW973b39h0PZXC5YpOEAuKbeW4key1YpPNbKBQJJIgb49PoDI6AsaoVpxMFFVCQgKkYoWULUcIjGj1akgajLEYWIA',
    },
    {
        area: '60-1', routes: ['1-A-B-B2-C1-C2', '1-A-D-D3-E-H'],
        option: {
            'phase': '2',
            'is_third': '0',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGTR0OT9VVDUAdi1dNGpGAhgTGPNLGztHVBcSdy95MhUg0NQSNQiYF2jY%2Bo0VYlRFOXS9VCycvLMLK0kIhzQyiu9UJ0Ta0hSm9FbZDDksfy61ZRAdfsHc0wKx4AmS6ZAPWbk0-0WMFyanNbjUzvU-A8zs4-zRkVcJdytdKt17gEQktrBFqFFxjQWoiQNRVuNrEA',
    },
    {
        area: '60-1', routes: ['2-F-C-G-M-O'],
        option: {
            'phase': '2',
            'is_third': '0',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGWcKZX9iVEUEnT1UakYCGBMY80sbO0dUORJ3LxEVINDUEhcImBdo2Nr0LET1PzT9I1yzCytJCIc0FzKQD29UAHZRAJC0MmmG9GbZWrUnFSSNLV0e41N8weBh4pcycqm5P3mapxIGpzX1Uu3OvfSDQ7yBwtxzu1Jj4EndnE4GnIXhhfO9ktNPmhMtk%2Bsd-iNUGMruCqgtaooGtNoeg5O1VKg1Kl9hksjkjn8hkVRuNgSUEf5qmh0PUItQooyQNQmgLqKshtYgA',
    },
    {
        area: '60-1', routes: ['2-F-C-G-M-O'],
        option: {
            'phase': '3',
            'is_third': '0',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGVI1LH9iVA0tXTRqRgIYExjzSxs7R1QnAHZ3LxEVINDUEjUImBdo2Nr0BNVkvx09VANjUzyrSQiHNBcScu9UEtEAkLQyEob0ZtkMOTLE9S601AysnLMLIeARopK-DynZ6ucKBqdVtHRyFSS1OVSe-eyB44LcOdNlcFsp-LdWg05E8ML43j5Nt10plfrl-sNCmMJiAQcUnFV5rVFA0SjD0HJ2u8wUi9ijDoMAaNUONJvJNnMaugXNYItQohiQNQmgLqCthtYgA',
    },
    {
        area: '60-2', routes: ['1-A-A2-B-D-E-F1', '1-A-A2-B-D-E-F-F2','1-A-A2-B-C-H-I-K'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmadGQAc2ImgCcAVmwQAHozSCoAVwjY4giMxj0AvthwAHNOoDs2RjADuI5YYDGAa1J0WzEyehAZNDIyEmViVA0tXTRqRgIYEwjzSxs7RwwAZjdPNGcANh8A0jIQmALwyIxyOLUKkB09VFT0zLMLK0kQh1LXEHcvVEVKwNQSYOwYdAbZWdU2lQSlduSutIzTbIHgIfyy0fHvEAI-GfUKWvVluVVRjdVVJM7u-az%2B3Nx8gVYmMSqgFK8bqRnLUyk8MGUsFd4u9Pik9r1Dv9hqggcUJmUttcqjiFLVnHD1OoPki1NSOmiegc-oM8mgCkUQRNwdModYQtQwiyQNR6kLqEtBtYgA',
    },
    {
        area: '60-2', routes: ['2-L-M-N-P-R-T-U'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmpAJxYQRNHLnYIAD0ZpqjAjAjY4giMxj0AvthwAHNAFYA7NkYwA7mipKArgGMA1vJWIDBk9CAyaOhkzkrEqHKxmtqouvqGESZmltZ2qE4u7p7YBH6BqCRywTAAzOGRFXKicSrNyTp6BkZZ5pLBtg4AbIUeqF6lAaQAHNXo9bKojhT2JfFyKyDtqZ0Zxqa9wP159s2uo44bE%2BWU1fbzUTWKyglqm1od6d37Obh5MSNoQavK6kdDVQb3VBkQbjNavLZpLqZb59XIiRRnBzAsqkMgWYLUMKSEBMVjsDhkPgCEDCKFiCRSBYkexTVYqDYInZfbKo35RV6YxbNEEVMFiImM9nAuHqd6oQRQby7Ho-AaoGokAGoQaXHEVezVOrEhroRJsl6ylKI5Uow5o9WakCCqaxEUkRyzSHoQZPGVvK1c5E8u18h1awasnyTdUzMR3Y0Lez2aUqeFy63cg5HNA1Gpal0lPXu8GQxKXNaRrYKpWZ1V5DVaxyuoszAlGkPUOZ9CxAA',
    },
    {
        area: '60-2', routes: ['2-L-M-N-O-Q-V-V1-W'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmadGQDs2ImgCcSkBAAejNNUYEYEbHEERmMegF9sOAA5oArBsYwA7miogCAVwDGANakqjYgMGT0IDJyChoqqKpYmjp6BkYmZhbWtg4YoiCuHqgAbHH%2BQagkCqEwAMyR0agAHC3KxAmq2Nq6qIJQPsZRmZaSofZoxbXYhXLFyuVyZDXoDbIJxSRtap3JPX0DGeYjwGO5tUkzzU3zgU6ONY6rE46b3u2qO91o%2B4OmR9m4M6OabuCZeXy3EoUGrFJ6oRzoKZvbZdFK9fq-YYA8aoWpIy7Fa7eBa46GhagRSQgJisdgcMh8AQgYSofLiOHoVRzZHrVE9fSGTH-UY5Cb5S7gklVGqUqRrYqOfLxJqfNEC9JDYUnUUYbmXBTA4mQkjFGr1KmNdSG%2BKqIlfdEHTVZEWAtC1V76srGprLOGlcHvO1on6HZ3a124-GgkpEiEVMgkB5w1SOa2BvnfDGh46nN1RoqxG7xkJiWEWtZcuLp3apQXZ7FnIkE7lx0i1Kzk83h6grUZWIA',
    },
    {
        area: '60-3', routes: ['1-A-C-E-E2-F-F1-G', '1-A-C-D-D3', '1-A-B-B2-B4'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJxlsRNAuwQAHozTVGBGBGxxBEZjHoBfbDgAOaAKwA2bIxgB3EUoCuAYwDWpAA5LMTJ6EBk0dHQAdiViVDlYkA0tVB09A3DjUwsrWwTFEBd3VFECH39UIOwYAGYwiNQyEicQZVRouTVNbV19Q2yzSWCbSMLitAck8r9SMmCYdAbZVFqyVvaAkm7U9P6skyHgEfza7aK3SfOZypaFu2XIimn4gMKU3oyBw9zcU9rnJdUFMvLNVvMag5HsCHHY4mgAgEdp99kYfsM8mgzoCSg4um0KoEFtFoY4Xgj3j00n1Mmichi-liARdcddCU10OZgtRQgzqPU%2BUthuYgA',
    },
    {
        area: '60-3', routes: ['1-A-C-E-F-F1-G'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJxlsRNAuwQAHozTVGBGBGxxBEZjHog4EqbNRkAbAA5sUaiIC%2Bb7DgAOaAKx22IwwAO4iSgCuAMYA1qQOnmJk5jJo6GROIMqocn5qmmiCUBEGFsam9Ik%2B-gDsQaHhWdFxqCToiTAAzCk2ZCSBWcSoNXL5Wqg6eqVGJmaSFlYWvY7OrqgUHl6%2BGIogwWGodnVNsaRkHeg9aJ32SkMOJGPauvqG5XPAVdudj3sNh78CM1SHYOn4rhgKMdsg5dhpxpNXmVZpUttdOvUDkdIqdUDcOnYIXY7HlBmgHJl4c8pm8UZIvtdfvs0HZRicWiQEtgYDUIQFofc4QUJi9pu8UotUrYViAXO4GXiMX8sYDgbZ2olqMl6TRujqQNRLvS3EA',
    },
    {
        area: '60-3', routes: ['2-H-H1-H3'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0QcAMzWZaMkuxRqIgL4fsOAA5oAVltsRhgAdzRFTRACQwBjAGtAsm8xMgdZVFsglWJUNSwQHT1UakYCGBMbc0t6VL80AHZlEFCI1FFYxKbUmHtJG0z0bNz1aOK0MoqqswsrSXr-VDJGkPD5aK6k1BJbXvQMtHQV0fzVot1J8srTGvmpdIHHZZcQN09FwPO2kRV47ZIal6AUOWVsnTyGi0l1K1xmdzqPiWtm%2B61QjTIf26OxS2BgclBaleqny4xhBmMtzmiNwyOiP3RASxAMUvUahLk5xJUIuJQp8OpCyRaFsLQZck2-1I6C8NEewFS1H6CpoBwWHiAA',
    },
    {
        area: '60-3', routes: ['2-H-I-I2-I3'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGTQXVxViVDUsEB09VGpGAhgTGPNLGztHVAB2ZRAPb1RRAJC0UoiYF2jYjHjE9T90tCycvLMLK0kIhzQyUvcveT860NQSFyb0VtkMCc7kybTdXuzc0wLhqSjJGLWyJWwoahFrUZKnbaqRFSD5kjUmp1W4l1qkhotLtMvsBkcirgSi5ntMymQ3vUFuFsDA5L9kld-IDuiCDMZDkNIWNUC4-C8yk5ER9FE1Shi1HJtqpkriMvjwUSRsU4hUKXJZu9SOh7jRTsAItQWtyQNQViNrEA',
    },
    {
        area: '60-3', routes: ['2-H-I-I1'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGTQXVxViVDUsEB09VGpGAhgTGPNLGztHVAB2ZRAPb1RRAJC0UoiYF2jYjHjE9T90tCycvLMLK0kIhzQyUvcveT860NQSFyb0VtkMCc7kybTdXuzc0wLh4FGSp22qkRUg%2BZI1JqdV5xIK1WTu3cz9gaOi3BK-JcyrUbnEnE05E9kkpNhotJ8DMZDkM-mNUC5AdMyk5rvUFoomqUoWo5Ns3nCdhlET8USNinEKkC5LNQQt0NYItQonSQNQWjzqCsRtYgA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M1-P-O1-R', '3-K-L-M-M2-P-O1-R'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdEYJABsCWjJTtq6qNSMBDBZpuaWkqH28vHObh7KvgGoJOjV6HWyqI1yol6JyRogHWjdvf05Q8AjBejNEyUxctMVc43VcstoQTEbKqg3aZ0HfSbHPK4c7jYpTLwzEQUaqNF6oIKqcafFI-fY9f7ZQZA0ZfIqTUp3WYkEKhagRSQgJisdgcMh8AQgYSoDbiOEkEg7ZE7PaofRGAFY4b5QKg-ExTmQ1ByaFiclSFboZIxFpJVK7dJddFHQWnYUYW5XVqXcpEmLVWoU%2BrBA1c1Gaw4C3JC4EiZWG1YS%2B7ExZw1RyTmJdR2vnap26l3wvElNaE0hVMTPS0K1Ru23q35ax0nM6vKOtVOSkhmsSwpOBRpYTZqbkav6h7N6oJ51Zqk2vZJWUkW8PUJbDKxAA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-P-O1-R'],
        option: {
            'phase': '4',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdEYJABsCWjJTtq6qNSMBDBZpuaWkqH28vHObh7KvgGoJOjV6HWyqI1yol6JyRogHWjdvf05Q8AjBejNEyUxctMVc43VcstoQTEbKqg3aZ0HfSbHPK4c7jYpTLwzEQUaqNF6oIKqcafFI-fY9f7ZQZA0ZfIqTUp3WYkEKhagRSQgJisdgcMh8AQgYSoDbiOEkEg7ZE7PaofRGAFY4b5QKg-ExTmQ1ByaFiclSFboZIxFpJVK7dJddFHQWnYUYW5XVqXcpEmLVWoU%2BrBA1c1Gaw4C3JC4EiZWG1YS%2B7ExZw1RyTmJdR2vnap26l3wvElNaE0hVMTPS0K1Ru23q35ax0nM6vKOtVOSkhmsSwpOBRpYTZqbkav6h7N6oJ51Zqk2vZJWUkW8PUJbDKxAA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-S-S1-T-F3-U'],
        option: {
            'phase': '4',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2B6ABsysSocmogmtqougZGJmZhcH7ZsqgAHADs2FDUrkFwGnloAMy1peWogUG29iCOLs3KXr6otehBMLU1qCRyou5xE%2BpaaNSMBDCG4Znmkq12qH4xHc6uPT6kBUPooztuKvEFsykLSyvGpuvAm-6JnWjoJe69X2RDXKScL5AK7K4JW46fSPNaWaxbKJKPZdS5-bYkIZRUZkOTguLFKGoe7LDLPeG4LZ%2BG4og6-I5jWoWILUULApisdgcMh8AQgYSoSbiUaKRIQxLJaHpVbkjYIr4NWmoIpi9EBIZsqT5KJRGniolpWGy17y7aKz6FH4eBl%2BTFiEbAiIYWp%2BWLtSXExakmVZOWUkQ-C1RVUMkhMsRnR35OR%2BMXTCVzVIwsm%2Bk3%2B-rIoOu%2Bl9Eh%2BQGjdByK3xokko2pt4Zhz7S2HXNFLGFqJYKbuxPllMvKu1TO13X1uonFkOtPUSOvCxAA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-S-S2-V-X'],
        option: {
            'phase': '4',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2B6ABsysSocmogmtqougZGJmZhcH7ZsqgAHADs2FDUrkFwGnloAMy1peWogUG29iCOLs3KXr6otehBMLU1qCRyou5xE%2BpaaNSMBDCG4Znmkq12qH4xHc6uPT6kBUPooztuKvEFsykLSyvGpuvAm-6JnWjoJe69X2RDXKScL5KJ%2BRJXOS7ZLzRbLDLPSzWLZyBp7LqXP79E5iKKjMhQ2JoYq3WEPBFZDbI-w3dEHX5HMa1CxBaihYFMVjsDhkPgCEDCVCTcSjRQQ6aJGGpfSPNZI3BbdBoz6oIoQrEBIbsqSgqK0yGSubS9KrRFUhX%2BZX7Qo-DyMvwkIYjYERbYUXYG0nG2Vm17U1BRJR07oMvoO06jOTgonxQ0pNI%2Byl%2Bi39IMqsGHPokPyA0boOS2iVe%2B7w01Jt6phzWkmh0hFIZ4l35aJYKbtKUlxMvCu1NPWvWZuonVnO5PUM4bCxAA',
    },
    {
        area: '60-4', routes: ['1-A-B-C-U-W', '1-A-D-F-F1-F2', '1-A-D-F-G-H-M-O-P-R'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJxYQRNHLnYIAD0ZpqjAjAjY4giMxj0AvthwAHNAFYA7NkYwA7iOwEArgGMA1vJWYmT0IDJoAGyRABxexKiq6lpoglDehuEmZpbWdqj2AMwu7mgxzkp%2BgQUkwTCFYREYsfEqaiCa2qi6%2BpnGpuaSwbZohYquHqgx7T4BpI516I2yBfaRrYntnTp6BkbZg8DD%2BYXFIBNlcZVzqCQxdfbLKvb2G0kdKahpGfsDubgnM4XVCOK6zapkOR1SJPAqFCrKTbJLo9PZZP5DPKjK7AxwkLxVUYLbAwRywyKQt5bT7fPoHf4jVCFHGlRIIwkYBbBaihTEgagNPnUJZDCxAA',
    },
    {
        area: '60-4', routes: ['1-A-D-F-G-G1-I-L'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkUB2FYYAxgDWziS2YmT0IDLyasogqqgaWrr6RiYx5pY2do6oilggHt6oogRBoagkihEwLtGxqE5qbonEyZogOnqo1IwEMJlmFlaSEQ4%2BTu5eIgEhaOi12DDojbIFiglJKd1pqAbGptljwBP5cm0li3LzVehkdU7rzhS37epdPelHWaO5uAuJBmpXKlTQZF8dTkLwwLmmH06qV6-UGwxOAMmqEhILid1ILjqvlhcjIXR2X32h3R-3GeTQLgS12S-kS4IwUIi1CidJA1AavOoa3G1iAA',
    },
    {
        area: '60-4', routes: ['1-A-D-F-G-H-M-O-P-R'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkUB2FYYAxgDWziS2YmT0IDLyasogqqgaWrr6RiYx5pY2do6oilggHt6oogRBoagkihEwLtGxqE5qbonEyZogOnqo1IwEMJlmFlaSEQ4%2BTu5eIgEhaOi12DDojbIYLkVJKd1pfQNDptljwBP5ZP7Fs6hyXRUL1eh1TutoLmrbHbs96cbHo1yuHyLhIM1KajI8yqTicdTkb0203a6i6vwOg2GJyBk1Ql3BcWhpBcdV8iLkZHu3zR%2BwM-yygPGeXeCRK6iuDyq6F81gi1CiTJA1Aaguoa3G1iAA',
    },
    {
        area: '60-4', routes: ['1-A-B-T-C-W'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKwBOEtiJoFC7BAAejNNUYEYEbHEERmMegF9sOAA5oAHADZsjGAHc0VEAQCuAMYA1qSONiAwZPQgMvIKor7EqOqaOnoGRiZmFta2Dqgubp7eKoEhqCRy4TAAzNGxFQpYiWoaINq6qPqGxjHZlpLh9vIA7EVeqD7%2BwaQK1ej1sqjOzo4qSSntaaiCUH69puYDwEP5cjXjTmO%2BZfIk1XKLas7KLcltHWi7%2B1lHubj5GrNdwTRxrG4zVByKpiZxPZYKcGqd6pTrfA79f7DArA4qTUqQkhhcLUKKSEBMVjsDhkPgCEDCVAJcTw9COa7IxGo9I9X45QZ5NDoOSXAquCHlEgjapkqRLdA1EVvTafLoZDF-AUAkTXEFoZxtaaSmrVOrkhoKRTrVrcnZ7DX8k6C1A1V565ZKo2kGERBbm%2BUKDkbD7bbqZPqap3al1uvHsgmS6ViR7%2BoWra0oradMMO46nNBA0WOQ23CpJiJw1NQuTizkh7Pqvl5501C4gd1ghOhKwks1R6h%2Bk5WIA',
    },
    {
        area: '60-5', routes: ['1-C-D-D1-D2', '1-C-D-E-E2-F-F2'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAJwA2ABzYi8udggAPRmkFQArhGxxBEZjHoBfbDgAOaAMwaQjGAHc0AdgWqDAYwBrUjkbMTJ6EBk0BTkvVWJULxdtXVRqRgIYYyizC2tbB1Q5Emw3T1RRAgDg1EcFMJhHSOjUWJUQNWKUnT1DHNNzS0kw%2BzQlLFcPET8g0iVG9BbZYoBWUs7EuQ7UvqMTPOHgUaLHVbLptt9OmpDG1eWYpRcu7c1e9Mzsg6GC3FPJuVxi9bhgKI0FI9UCQSC8tj00vp9rlfiNCmh0I4LhUlFVQetGl4oQplAl1O9Ef0fvk0f80KssVMcfEbnNUASwtQIrTqM0eUsRlYgA',
    },
    {
        area: '60-5',
        routes: ['1-A-B-B1-H-I-J1-J-K', '1-A-B-B2-G-H-I-J1-J-K'], // 含輸送
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdxHK9AYwDWaAKwUrYmT0IDJoAGxyAOzKxKiRaiCa2qjUjAQwhiEmZpbWdqgKDs6uIAQe3qgAzGEBMJXBoag%2B6EqlsXIJSTr6mcam5pIBtvKtji6oomVeaOiVtegNsk0%2BlTH2iVrdBkbZA8BD%2BZEAHEXjk%2BUz-tgwPovhZKtt612outtZ-bm4%2BS2naJGPKYVHxkWphO4FMInJ4FTqbV49HafQZ5NCVBJjf5hNzTVAkOS1SIQlbQlSQ9Tw1LpXq7L7DKrQzGoCI4iqVI4WALUIIokDUeq86gLQYWIA',
    },
    {
        area: '60-5',
        routes: ['2-L-M-N-P-P2-R-T'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdGoJKrxXonJGiDauqjUjAQwWabmlpKh9vIAbNjFHsq%2BAaiU1eh1sqhBZE4qSTFpXfpGJjnDwKMF6DvObmhBqV5z1xTVcivyFFgtanK7aD19A0d5XAFcaiS4lMr3BohMTjF5Jca3Lbqb6ofb-IaAsZrdrTVAxL53CoNZJWULUCKSEBMVjsDhkPgCEDCBZiCRSVaqGJlVqTDrpbq9fqHDEjfKBXm4oLtcrzIJVMQU9lqZK8pHNTo-QXo3KioHXIpXVAg2ZEkgxaq1Sn1dCUBJoZKgjUCv7CnUnMVrA0lcabSEkcZLOGqOQEpHtJ1o13HU7XZq4mKIyFkVRPOFyBN2pLh-mR7Ii916tZxw3JZoyh7VWFW1bocbvMMo35CvNumOeqaGhEm2UksmWgvUZYjKxAA',
    },
    {
        area: '60-5',
        routes: ['2-L-M-U1-U2-U3-X-P2-R-Z'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKwB2AGzYiaAJwLsEAB6M01RgRgRscQRGYx6AX2w4ADhoDM2RjADuaKiAIBXAGMAaxEADjsQGDJ6EBk0JTJXX2JUdXVtPTRBKD9TWIsrW3snDBI3TzQFJP9g%2BTIImGcYuNQ5Ci1kjSwQXX1UQ2M880trSQjHeXSQdy9UHxqQ1DIFBvRm2VaKFU7Uqd6snKGC0eBxkqUy6Yq51UDFuRIGuXXK5dUUhW79-qMTM2OirgSiQpjNvLdaqgSBQGkoXptqik0hk%2Btlcv8RoCJqgLuVZvM7qR0DYItRopIQExWOwOGQ%2BAIQMIlmIJFINiDEWhQntMj9BhjCmNivJtmCbr5CUsYWJyWy0M4yJc1KkOt80UdMUKgWh0B0xc5QhDFs5pZEmhSWuglN1lepDT1eQM-vlNadhahnJcxUoOgsdc5VvDFPbbTzUYcBSczvKkmLQtVJSanvD1HI5O8NGGDuiXYK3dqPbHrgoQ5KyOpYSmSOmdnaUQZfhq89HC3j4jbJdWSTRzfnqGsxjYgA',
    },
    {
        area: '60-6', routes: ['1-A-C-D-F'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdGoJKrxXomqoiDauqjUjAQwWabmlpKh9vIAbNjFHsq%2BAaiU1eh1sqhyFFgtanJpXT19AznDwKMF4%2B3TpbMVDSFicivyFDEJapudaPv9Jkd5uAVyDTONwzLxzEQxarjR5JcapLZJIEfVD6Iw-IZ-MaoIJAy4xHZgm4kZJWULUCKSEBMVjsDhkPgCEDCBZiCRSVaqOQElSI3YZNHZDEjfJoILNPHw8rzMiqaoU9mishOHmqF4ddIozLo3LC-6BNWXIKS8HYijVWqU%2BrocabFXw5FfQ5Ck4i7FFEGocZqqWBEhLGHjOSTBHqPmagWDHUuvXYgl420m8Z3MIPS0cr2vJL2jWO7XHU6i%2BGXcbBn23KEwuQxSWtJEa1FOqMF7Hij3JZploJmskW6PUZYjKxAA',
    },
    {
        area: '60-6', routes: ['2-G-H-C2-I', '2-G-J-J2-K-J3-J4-M-N-O'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKxyAzNiJoAnGuwQAHozSCoAVwjY4giMxj0QcCVNmoAHAHZsUamgoBfU2Wsy0FzcPVG9TRX8HRWUQd08vH1wABzRnR2xGGAB3TxVDAGMAazR0MJAYP0kbBwUsEFVUDS1dfSMTG3NLfztqwNdYkLK4Svs%2B4PjwyLRo8dCE7BwU1DSM7MC5PKKSspgIqoCnR3T64kbNEB09VANjU06rfZ6DoIGJmxHep364ucn9qJiP28iUWaAAbDFMjkMGDNsUMGREjB0FNUGCKFQToESM0rtRGAQYO0zBYHlIng4XkDEsNUVTBjS9qNUDNXnMQUs5HUobl6gV4ZQkXJUSQjipTmpjpc0PjCcT7t06d8Gb4lbMhkzPqzqRz5OceaE4aQ5EiwailMcGmpYRcWqhZUS7qTFf8xmyhh9nsq3nBNQdtQzdSzjgawecCPzpo55iBqB8mKx2BwyHwBCBhKhROUKakKDaGo4Nrarjd5c7Hmr3TTPZTvb8bH6AeqY6DMzaDc4sxGtsGkTXSOh%2BlbztL7QTHR1y%2BTK9TVa6vs2-syA-Eg4p%2Bh2h5HMztG%2BCwZaJSO7aWnV0K-P6T7%2Bwuq0utYDAwtOZC1k5w9u5IixCj5%2BgSOGEpZqODplue06XnWHoziqDaoiu7LPtMWahpan6KEK5p5uK6jHiWbRnmSNg5res7vDBPp7iyj6rkhaI4iABqYt28JyCQpqotaDHDrirS3JO4HERR9a0pBi5wfOCHAnRijcm%2BYp8j2CgxtQTKJNQv7AAkQA',
    },
    {
        area: '60-6', routes: ['2-G-J-J3-M-N-O'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNAGZsMOqlBwAJmgCs8sSCJoAnGuwQAHozSCoAVwjY4giMxj0QcSdLmoAHAHZsUamgoBfU2Wuy0FzcPVG9TEX8HEWV3Ty8fXAAHNGdHbEYYAHdPbAJDAGMAazR0MJAYPykbB0UsFWJUDS1dfSMTG3NLfztqwNcQWNCEuEr7PuC48MjRGJDvBJxk1FT0rMD5XILijDKYCKqAjDUqevUyZr1UakYCGHazCysDnsOggbnh0d6nfsGyuH2Y1Q0QmQwWSxEJFW2VQ8gAbJsiqRnAkYOhpkd%2BqpGpoQDpLtdbvdOk9pC8HG8-p8MZSPlMDlFZnFwaIoSAMjC3nkkagSCjxPIMSR0HVsWo0niWqgDMZTCTujTfnSbF9XkrJjZAd8Qe9mdhFqzoWg4RLudtKKi4RilKaGmoEZKCTc7nLHgqGeNdUNfIrQf8tYcdVSWcCJRzjbizaJHPEaF8mKx2BwyHwBCBhMDxOTjSbcnbcfjWrKOm7nr6vf9VRT1d7NRigx8Q0ojU5I1sFGRUVXSOgsfmLmhCS6S10yx6fn7qePaRqAfWmWD9RD%2BuHllj26gLeIAw5nBQHdjHBtHUXiaWyeWqT7pzX-fPJyGyA7V85zioNyIY%2BJ0eP0CRI3ab6FlczpnqOF43pO15AjOtZzuODZ6kkohvquubvjySiooK47yPuebqAWUoymBpI2NmE4VlOMG3sMO4zA%2BS7Gmyq4nFGsIkJaGL2myYpEZcJGuuB5GXsqIyibO9HAgu8xMcCdSro4poboosYgNQgIJNQP7APEQA',
    },
    {
        area: '60-6', routes: ['3-J-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKwBOAMzYiaBQuwQAHozTVGBGBGxxBEZjHoBfbDgAOaABxzsjGAHc0VEAQCuAMYA1mjoTrYgMGT0IDLyciq%2BxKgaWrpoglB%2BJrHmljFwElKyqE4A7NhQ1N4RcNGSsSXlldWoFLVKBSVKiVU1EQ5oZU5unt6qgSEY7WKdDXGocnJYSeqaIDp6qJnZpnlW80WNzhUgfW219cUnLTWmc9eoPbcXA46ow6Nepa6%2Bk6EzSLoLqkZSqZIKUQbdKoAxGHJmCwHYBveQANi%2B4z%2BwREgJgchBqBIChWahS602%2BkMxj2SJsdneclO7m%2BPn8OKJCgiMDRhLR6Axq3JaS2OwR%2B3puHeThWLOcpP%2BRPCEWoVxATFY7A4ZD4AhAwlQUPEfLRIyFqWhoqy4rpklRi0SctK63ZUzkZG5aoWJHQpIhFJhYtp%2BTtDLQShImI%2BbMVZDK3Iex05vzJFsp22tweR9qUUKdaJdirkJG5wPmJQFfvUZvTcJpuVtKLDT0jIHzp1doRLYgJ5fkn3NAatuwbIabUvDjrGpUSnaeeN5fZSS3BaxFGUzo%2BzzeebenA7nZC5KoeKrLKOsQA',
    },
    {
        area: '60-6', routes: ['3-J-J1-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2BfgDMysSocmogmtqougZGJmZhcBJSsqgAHADs2FDUrkFwoZLh%2BVExIGUVQbZoRQUOzq7KXr4YgWJR2fl%2BfljucQnqWjr6huGZ5jU5w2jFpeWoA%2BHVeWj1G83WdqjtnS6Ffj0%2BaOjbMOirqCRyVxP2STOpcxmmS8AtE5RUQgRwXABsiQ8N1QfhIQRgfieAXGKnib2SaGojAIMHmxj%2BlmOaHBILB3XcvVIUQR4Ke6AKHXe8USmNQ2Nx%2BMWRNwJ3Qb3JhQa0L6JHBFiC1F2ICYrHYHDIfAEIGEqBB4ie4PBTLRU0%2BKTSXMJkkB-gagoKUKpsLICOlEXi4KUzL1bMNvyyJuJqCi4wtOutowRQ2W%2BQZULi631WJxeI9-1NPudgtG11FBQRj1Dt3BqMmTLZHLjC2NAO9UWTXVQ4JKlJh6HhYiR2dhZxdrK%2B7pLnrLvP25qrBWF1qi9zpLdeb11HYNP27CfLA4ubZFIjkEpoId71CzAIsQA',
    },
    {
        area: '60-6', routes: ['1-A-C-D-F'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdGoJKrxXomqoiDauqjUjAQwWabmlpKh9vIAbNjFHsq%2BAaiU1eh1sqhyFFgtanJpXT19AznDwKMF4%2B3TpbMVDSFicivyFDEJapudaPv9Jkd5uAVyDTONwzLxzEQxarjR5JcapLZJIEfVD6Iw-IZ-MaoIJAy4xHZgm4kZJWULUCKSEBMVjsDhkPgCEDCBZiCRSVaqOQElSI3YZNHZDEjfJoILNPHw8rzMiqaoU9mishOHmqF4ddIozLo3LC-6BNWXIKS8HYijVWqU%2BrocabFXw5FfQ5Ck4i7FFEGocZqqWBEhLGHjOSTBHqPmagWDHUuvXYgl420m8Z3MIPS0cr2vJL2jWO7XHU6i%2BGXcbBn23KEwuQxSWtJEa1FOqMF7Hij3JZploJmskW6PUZYjKxAA',
    },
    {
        area: '60-6', routes: ['2-G-H-C2-I'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKxyAzNiJoAnGuwQAHozSCoAVwjY4giMxj0QcCVNmoAHAHZsUamgoBfU2Wsy0FzcPVG9TRX8HRWUQd08vH1wABzRnR2xGGAB3TxVDAGMAazR0MJAYP0kbBwUsEFVUDS1dfSMTG3NLfztqwNdYkLK4Svs%2B4PjwyLRo8dCE7BwU1DSM7MC5PKKSspgIqoCnR3T64kbNEB09VANjU06rfZ6DoIGJmxHep364ucn9qJiP28iUWaAAbDFMjkMGDNsUMGREjB0FNUGCKFQToESM0rtRGAQYO0zBYHlIng4XkDEsNUVTBjS9qNUDNXnMQUs5HUobl6gV4ZQkXJUSQjipTmpjpc0PjCcT7t06d8Gb4lbMhkzPqzqRz5OceaE4aQ5EiwailMcGmpYRcWqhZUS7qTFf8xmyhh9nsq3nBNQdtQzdSzjgawecCPzpo55iBqB8mKx2BwyHwBCBhKhROUKakKDaGo4Nrarjd5c7Hmr3TTPZTvb8bH6AeqY6DMzaDc4sxGtsGkTXSOh%2BlbztL7QTHR1y%2BTK9TVa6vs2-syA-Eg4p%2Bh2h5HMztG%2BCwZaJSO7aWnV0K-P6T7%2Bwuq0utYDAwtOZC1k5w9u5IixCj5%2BgSOGEpZqODplue06XnWHoziqDaoiu7LPtMWahpan6KEK5p5uK6jHiWbRnmSNg5res7vDBPp7iyj6rkhaI4iABqYt28JyCQpqotaDHDrirS3JO4HERR9a0pBi5wfOCHAnRijcm%2BYp8j2CgxtQTKJNQv7AAkQA',
    },
    {
        area: '60-6', routes: ['2-G-J-J3-M-N-O'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNAGZsMOqlBwAJmgCs8sSCJoAnGuwQAHozSCoAVwjY4giMxj0QcSdLmoAHAHZsUamgoBfU2Wuy0FzcPVG9TEX8HEWV3Ty8fXAAHNGdHbEYYAHdPbAJDAGMAazR0MJAYPykbB0UsFWJUDS1dfSMTG3NLfztqwNcQWNCEuEr7PuC48MjRGJDvBJxk1FT0rMD5XILijDKYCKqAjDUqevUyZr1UakYCGHazCysDnsOggbnh0d6nfsH57EWohIq2yqHkADZNkVSM4EjB0NMjv1VI1NCAdJdrrd7p0ntIXg43n9PoiiR8pgcorM4gsliJgSAMqC3nloagSLDxPJESR0HUUWo0uiWqgDMZTLjuqTfuSbF9XjLJjZ9mNUNEJkNaUCQWhwULWdtKHDwYilPqGmpIcLMTc7hLHlLKeN3kqRtKNWU4CrvuqXZqAXShUzdWiDaJHPEaF8mKx2BwyHwBCBhGrxATdXrcha0RjWuKOg7nu6-Z75YTFUMKarfcStWDlMGnKGtgoyHCy6R0Mjsxc0Fi7QWukWnT8PSSR2TXd7DjWPnWRP1G85kS3UEbxNOHM4KFaUY4Nta8zjC-ji8TfGfZV7EbOaQG0GQrUvzipVyII%2BIESP0CRQxaX7mVy2seQ6nhOFalpeU43tS-pJKIL6Npmr5skocLciO8g7lm6g5iKYogXiNjpqOJbjqqk6VsqMFjnW4IMo2JxhmCJDGoiloMgKeGXAR9qgcRUFUW64FjlWPqwf88FqnUjaOPqq6KJGIDUCqCTUF%2BwDxEAA',
    },
    {
        area: '60-6', routes: ['3-J-J1-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2BfgDMysSocmogmtqougZGJmZhcBJSsqgAHADs2FDUrkFwoZLh%2BVExIGUVQbZoRQUOzq7KXr4YgWJR2fl%2BfljucQnqWjr6huGZ5jU5w2jFpeWoA%2BHVeWj1G83WdqjtnS6Ffj0%2BaOjbMOirqCRyVxP2STOpcxmmS8AtE5RUQgRwXABsiQ8N1QfhIQRgfieAXGKnib2SaGojAIMHmxj%2BlmOaHBILB3XcvVIUQR4Ke6AKHXe8USmNQ2Nx%2BMWRNwJ3Qb3JhQa0L6JHBFiC1F2ICYrHYHDIfAEIGEqBB4ie4PBTLRU0%2BKTSXMJkkB-gagoKUKpsLICOlEXi4KUzL1bMNvyyJuJqCi4wtOutowRQ2W%2BQZULi631WJxeI9-1NPudgtG11FBQRj1Dt3BqMmTLZHLjC2NAO9UWTXVQ4JKlJh6HhYiR2dhZxdrK%2B7pLnrLvP25qrBWF1qi9zpLdeb11HYNP27CfLA4ubZFIjkEpoId71CzAIsQA',
    },
    {
        area: '60-6', routes: ['2-G-J-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKxyAzNiJoAnGuwQAHozSCoAVwjY4giMxj0QcCVNmoAHAHZsUamgoBfU2Wsy0RWUQd08vH1wABzRnR2xGGAB3TxVDAGMAazR0bzE-SRsHBSwQVVQNLV19IxMbc0t-O0K0FzcPVFybfPtA4NCO8OwcaNRY%2BKSWuVTM7M6YRX8HRTISFWJUORKdPVRqRgIYWrMLK0kI4ezXEATk1BXprNRFOfRF0jVgsrVREG20PYOR3qp2A5xGcgAbONblRSulHpQIjA5G8nI44qV1hVflVUAZjKZgfQwWgIcEbtkoXCZhgyEiIai1BCMV9NDidvigSdiUMRoo2RTRlNqY8SI5BiBqN0QExWOwOGQ%2BAIQMI7mImgFUBDmWt1Gy-niaoTuWdefJyRMnGyCPD5HS8qiSOgSl8MQbOcaGqaooFVtdLTqRSI5gsCpqSGphazKhyjXUTaCzU8foKIVHbRgXqj0BCXVi3biAYdPSCSU8-amrjaaegSEiUWGimNMXqY9UCfGvYmfU8LbdHJ8M896YyFLryvrcR7O6Wk0FoTEWRmyGoJdRQ93qK8zl4gA',
    },
    {
        area: '60-6', routes: ['2-G-J-J2-K-L-Q-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKxyAzNiJoAnGuwQAHozSCoAVwjY4giMxj0QcMtZlpFykFGpoKAXw-YcABzQA7AAc2IwwAO7uKoYAxgDWaOieYnaSNrKoClggqqgaWrr6RiY25pb2qVIZTtiu7l4%2B-qjBoRFoQXLR8YnJIDCK9tVkJCrEmdk6eqjUjAQwJWYWVpLeuE3oAa2RqMNdCaiKvTDog6RqzrlqoiCTaDNzC2XLwKt%2B8gBsW1E5sfuUqzA5KdUEFQaN1JoboVUAZjKYnvRXk13s4wtt0J8ft0MGQAe9gWp3iEcmN8lCprDHktEY1HJC0YFOlj9iQgg0QNRKiAmKx2BwyHwBCBhDsxBIqmh3kTwXlIbcYcV4dSVrTMqi2iDIQRfvJcSlgSR0NlLsT5ZSleUVWtHCMQAzUNLmSIjgM0g5UCQ1EzLnLoebSsqXqrFNd7e9vTqMEcTm6MhjjaTTdD7vMLc8kTavg7Nk6MCQAUDY-IWiSIQUKYqA5ag9aDurtkELpHDniCQoZWSzZXFtWM3WsyXtdiyGp2dRXTXqDGXh4gA',
    },
    {
        area: '60-6', routes: ['3-J-J1-P-R-S-X-Z'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKwB2AGzYiaAJwLsEAB6M0gqAFcI2OIIjMY9EHAlTZqMsuxRqGgL5myNmaQAcAMyu7hhetoG%2BjnJkJCGk2MyM1qgK4XDoUWj%2BWiBuaGlmOlmogcF5oRQe4TgADhrlyQDuaFggBEYAxgDWIv7hMD6Sto4k6uVqqOqiILr6qNSMBDCmthZW9DX1qHIqIM1oVO1dvU5VYpHDfjtyE8RT6tp6Bsar5pYpUvYjIupH%2BWFvCUyH94k50pcHKQSP4wW0kilCrZMldHIEyDMASQjgiCuk5CUcmCkXBiqi0GUwVUtgVYfsYC0pqoTq1ziAYCioVMlHTJupHrNnqhDCYzOtPjTSgKDqk5MyegEBgTyTc2nyBXMXqK1h9fN9roEYXD0kMuegecazJCfqUMVTEsk8WZOTayIEBQCcY7UvjCbkASSyVzKRVDtVsHVadgZdijh0FRg2TAlIT-Lz7vynvMRW9xZsI9slI0Ga09vHTugyOGQNRTSAmKx2BwyHwBCBhE4xPrHOa1Rm6ZqFksVmLdZJJYboyXUEpcuXWiQBnXrgpAmX7nIjoPFstc2PgJLnFPGXI5ccE5QBtaDbFVBncoOc6ONuOC61cjLAryWaUky7ruoShxO0GYakKT46i%2BB5vqUbQymm8qnKeSolIo6YaGB2avM%2BEowSG8ETD%2BgRJimKrqKed4YVmWp7lBE7FoyCjfhe6jVtQkLhNQnLVEAA',
    },

    {
        area: '61-1', routes: ['1-A-B-E'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDJo8gDs2EqoqupaOnoGRiZmltZ2SWTObiIJ-kGoABxhMPaR0ageHuUJxEnemtqouvqGUVnmkmG2aACs9oXuFaIEpaSxVei1sqgkysPNKm2pnek9xqb9wIN59gUgLhMeY76BMRRVw4sxyvGKLckg7Wndmfs5uMdOM5FCpXaY3ZYeKoeR6oWIkUFvTYdLoZXq-Aa5NCxBTnYrXMohCxhagRDEgag1MnUBYDCxAA',
    },
    {
        area: '61-1', routes: ['1-A-B-C-D'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDJoAKwA7E6KxKiq6lo6egZGJmaW1naoABxkzm4i2AT%2BQahk6GEw9pHRqB4ehRXJqSCa2qi6%2BoZROeaSYbax9qXuRaKVgaRx9ehNsqgkyjEdKt49GQPZpiPAYwX2JSAu0x6TvvMYFPUxK2joynFbKTvpfZmDxod5XCnRKXNCFG5zaokDz1DzPVAJCGdL69fpZIYA0b5NBxBSg1CzKrBUJhagRLEgaiNCnUZajCxAA',
    },
    {
        area: '61-1', routes: ['1-A-F-G-I'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDJo8gDs2EqoqupaOnoGRiZmltZ2SWTObiIJ-kGoABxhMPaR0ageHuUJxEnemtqouvqGUVnmkmG2aACs9oXuFaIEpaSxVei1sqgkysPNKm2pnek9xqb9wIN59gUgLhMeY76BMRRVw4sxyvGKLckg7Wndmfs5uMdOM5FCpXaY3ZYeKoeR6oWIkUFvTYdLoZXq-Aa5NCxBTnYrXMohCxhagRDEgag1MnUBYDCxAA',
    },
    {
        area: '61-1', routes: ['1-A-F-J-L-M-N-O'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDJoAKwA7E6KxKiq6lo6egZGJmaW1naoABxkzm4i2AT%2BQahk6GEw9pHRqB4ehRXJqSCa2qi6%2BoZROeaSYbax9qXuRaKVgaRx9ehNsqgkyjEdKt49GQPZpiPAYwX2JSAu0x6TvvMYFPUxK2joynFbKTvpfZmDxod5XCnRKXNCFG5zaokDz1DzPVAJCGdL69fpZIYA0b5NBxBSg1CzKrBUJhagRLEgaiNCnUZajCxAA',
    },
    {
        area: '61-1', routes: ['1-A-F-J-L-M-O'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDJo6AAc3kqoqupaOnoGRiZmltZ2qI7Obp6iBP5BqCSxYTD2kdGoAKwA7LHYickgmtqouvqGUVnmkmG2DvaF7qhNHm1lwVXYMOh1so0eM4rESd5daX2ZpkPAI3n24yAukx5Ns4HBFNUNKyrNbVsduz3p-caHObh5BoNCYxYG%2BO75ZTVDzPRoUDbtHapL77AZ-Ya5TxOC5FVAlOYVBZiJqw%2BQ3TYqJHdXoZNHZDEAlRkEF427lKphagRBnUWo85bDCxAA',
    },
    {
        area: '61-1', routes: ['1-A-F-J-L-P-S-T-V'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDJo6AAc3kqoqupaOnoGRiZmltZ2qI7Obp6iBP5BqCSxYTD2kdGoAKwA7LHYickgmtqouvqGUVnmkmG2DvaF7qhNHm1lwVXYMOh1sknNbcRJ3l1pfZmmQ8AjeQ0NEzFnvoEOytUNK2gNFDOKmx07Pen9xgc5uHkeJwgFyTEpzCoLMQeB4YdAvdrbVKfPYDX7DXIqMjnVBg675CjVJowp6tV4qRHdXoZVHZdH-TxAkEiWZ4kj2CxhagROnUWo85bDCxAA',
    },
    {
        area: '61-1', routes: ['1-A-F-J-K-Q-S-T-V'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmadAA4AnNiJpFykBAAejNNUYEYEbHEERmMegF9sOAA5oAzCWyMYAdzQA2UQQCuAMYA1qTyNmJk9CAyaACsAOzyKsSo6tjauqj6hsbRZhbWtg6ojo6uHmjxXiqBIahkYdgwjlExqLFe1SCqqRoZegZGJvmWkuH2TmUgbp6oXvE1wWiU4TDorbKpXi7dKWmaOgM5w%2BajwOPFjljTFajySd21cbGrsRtx6GTJan2HWYO5UynQq4S5TGaVBaPJaoEiNMRed6wxQPHr7fr-Y55YFjIpOHYQu47fwwkgvJrxJHoLzXNG-TLZIbYgq40H48qzLyop4leJWcLUSKs6gtYXrMZWIA',
    },
    {
        area: '61-2', routes: ['1-A-B-D-K-L-M'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJwBWbETRy52CAA9GaaowIwI2OIIjMY9AL7YcABzQBmMtkYwA7mgBsD5QFcAxgDWaOgU1mJk9CAyIXIA7MrEqGoa2rr6hsam5lY29qgOJC7uaAAcPiAEAcGoJJ7hMA5RMagK6BUqyeogWjqoegZG0dkWkuF2jhWuHqiepX5BjmHYMOjNshjeiardvemDWWajwOP5hcUzCt1Vi7VxDQrrqgoJlUkpPWn9GUMmR7m4fIKJQgaYhEE3GoOOQNTxPDByTzbLqpPoDTLDf5jPJeZygkqoUSQ0j3FZxeEKTxE967L7o34jAETVrdMEYeaVaohMiWcLUSLYkDUJqC6hrMaWIA',
    },
    {
        area: '61-2', routes: ['1-A-F-I-J-R'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJwBWbETRy52CAA9GaaowIwI2OIIjMY9AL7YcABzQBmMtkYwA7mgBsD5QFcAxgDWaOgU1mJk9CAyIXIA7MrEqGoa2rr6hsam5lY29qgOJC7uaAAcPiAEAcGoJJ7hMA5RMagK6BUqyeogWjqoegZG0dkWkuF2jhWuHqiepX5BjmHYMOjNshjeiardvemDWWajwOP5hcUzCt1Vi7VxDQrrqgoJlUkpPWn9GUMmR7m4fIKJQgaYhEE3GoOOQNTxPDByTzbLqpPoDTLDf5jPJeZygkqoUSQ0j3FZxeEKTxE967L7o34jAETVrdMEYeaVaohMiWcLUSLYkDUJqC6hrMaWIA',
    },
    {
        area: '61-2', routes: ['1-A-B-D-K-E-S'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpqjAjAjY4giMxj0AvthwAHNAGYS2RjADuaAGxrFAVwDGANZoZGRWYmT0IDIqAKwA7NhKqKrqWjp6BkYmZpbWdqgxMc5uaOhFvoEOymEw9pHRGMoeicTJ3praqLr6hlHZ5pJhtp5kxe6oogT%2BQagkcTXo9bIYJE6KrSkgHek9WaYDwEP5cQkgLuNkAByJ06T2NTFLck0tKu1pXRm9xvu5uPnKNbnEQ3SoYCg1DxPVBxezlJKbbafXZ9X6DPJoS7eYETUEzOY1OLQsgnV5tVKdbqZVE5dH-NCks4lXEVfGhMLUCJ06h1bmLQYWIA',
    },
    {
        area: '61-2', routes: ['2-K-O-P-Q-T-V-W-X'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNAGZsMOqlBwAJmgCsFAOzYiaAJzrsEAB6M01RgRgRscQRGYx6AX2w4ADgq0hGMAO5oqIAgFcAxgDWpGR2IDBk9CCyaABssQAcqsSomtp6BkYmZhZWtvZOqPJirh5oCd5%2BQaRKYTAiUTGoJOhYPilpILr6qIbGptG51lJhjqIk2G6eqLEuVcGoZKHi6I1yGAlzHS7dmf05lsPAo4UiE6XTsZUBCyQJdfJrCvHJGjsZvVkD5of5uKclKZxFQ%2BG5oSh1WJPIpKJLtN7pHp9bKDX4jAqiQFlVBKWKqMGLe5haiRKQgJisdgcMh8AQgYSoEoSaGxSivVLvJFfA55dH-BRY6boa7VZoiOqk6TreQJOFqDmIvYon6844YxneIGoBJ40GikgUOoNMlNGUg%2BWdXaffao1UncaTbEJMj40UQlbQ9CzdmWj7I75DP5jRnnLWxErzUjqB7Q9QJCPbRXW5WBvnBkSC8oihZLSHQ%2BTe%2BEKrp%2B7m2o72xmZ7XZ8GhYnGtUgairEY2IA',
    },
    {
        area: '61-2', routes: ['2-K-P-Q-T-V-W-X'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNAGZsMOqlBwAJmgCsFAOzYiaAJzrsEAB6M01RgRgRscQRGYx6AX2w4ADgq0hGMAO5oqIAgFcAxgDWpGR2IDBk9CCyaABssQAcqsSomtp6BkYmZhZWtvZOqPJirh5oCd5%2BQaRKYTAiUTGoJOhYPilpILr6qIbGptG51lJhjqIk2G6eqLEuVcGoZKHi6I1yGAlzHS7dmf05lsPAo4UiE6XTsZUBCyQJdfJrCvHJGjsZvVkD5of5uKclKZxFQ%2BG5oSh1WJPIpKJLtN7pHp9bKDX4jAqiQFlVBKWKqMGLe5haiRKQgJisdgcMh8AQgYSoEoSaGxSivVLvJFfA55dH-BRY6boa7VZoiOqk6TreQJOFqDmIvYon6844YxneIGoBJ40GikgUOoNMlNGUg%2BWdXaffao1UncaTbEJMj40UQlbQ9CzdmWj7I75DP5jRnnLWxErzUjqB7Q9QJCPbRXW5WBvnBkSC8oihZLSHQ%2BTe%2BEKrp%2B7m2o72xmZ7XZ8GhYnGtUgairEY2IA',
    },
    {
        area: '61-2', routes: ['1-A-B-D-K-E-S'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmadAE4S2ImnnzsEAB6M01RgRgRscQRGYx6AX2w4ADnLLZGMAO4jlAVwDGAa1IB2azEyehAZVQBWf2ViVDUNbV19Q2NTcysbe1QIiKdXOVyQAm8-VABmeSCYMtDw1BJ5QpU49RAtHVQ9AyMwtItJILs0MscQZzdUADYyz185Cir0WtkMEiUi2Pi2xM7knpMzfuBBrP9osfzUMgAOWdKSMqqI5dIFSZjVVvak7tTDjNwWUUeQmomKcwwC2wMEmL1Q-jKTU2Xx2XRSvX%2BA0yaGurXG7iKJQCVX8cLIZw%2BLQSHTR%2Bz6AKG8PO%2BNQYKJ9TIliC1BCWJA1BqfOoSwGliAA',
    },
    {
        area: '61-2', routes: ['2-K-O-P-Q-T-V-Y'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0ATgBss7ETlKQEAB6M01RgRgRscQRGYx6AX2w4ADnJLZGMAO5oqIAgFcAxgGs0ZAAcViAwZPQg0mgA7GRYHsSosmqa2qi6%2BoaRJmaW1naogYGOLm7KPv6oZGQhMADMEVGodbJ1yonJ2Kk6egZGOeYSIbYxDiBOrqjuXn6kdbXojTKoAKwUxQmqXVo9mf2mg8DDBfJjE2UeFXO1K0toa-LtW%2Bo76b1Zxgd5uCdnpVPlWaoEjBUTyO5JFbRJ5JFKvDJ9bJfIb5e4rEqTdDoy5AloWELUcISEBMVjsDhkPgCEDCYGicSSZbRCjYlSw7ZpBEfAbfEarMgYmLQnGVSi1ImM0iyAWbdkvTnvfa5FE-e6Pcb-aZXYGg0INYlNEjoeJszry3aIz7Ko6o5p-SaKQGimqiRYG5boQJqU1whV7JHW45oOr2tDyLVAkE3CFQjY%2BjkW7nIm2q5ptDWTaLqmai3UwcHutXZjq%2BxNKw5BtOC1DyYU5gIUfE0fUp6huo4WIA',
    },
    {
        area: '61-3', routes: ['1-A-A1-A2-Q'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpBUAK4RscQRGYx6AX2w4ADmgDMJbIxgB3NAHZRBPQGMA1mhkylZiZPQgMqTKAKzYSqiq6lo6%2BoaRJmaW1nao9mTObmgAbGqKfoGoMSShMPYRUVXo9vHEiWWa2qi6BkaZ5pKhtg4tIC7uqMUAHPEVDhS16A2yk9OtKh0p3Wl9pgPAQ7kxo%2BNoUx6zAWjVtTHLaOhkF4ptys%2BdaNSMBDDpxnvZXBHZ6nVDeOaoSi1Yr3RKldaJd5bL4-P79QHDRJOMZFMGXSpkKa1DywkjKYoI5QzEAfVAo367LKDHIlEG48FXKr2CyhajhZkgaj1AXUJaDCxAA',
    },
    {
        area: '61-3', routes: ['1-A-A1-B-C-C1-C2'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpdFhBE0ATmXYIAD0ZpBUAK4RscQRGYx6AX2w4ADmgDMJbIxgB3NAHZRBPQGMA1mhkylZiZPQgMqTKAKzYSqiq6lo6%2BoaRJmaW1nao9mTObmgAbGqKfoGoMSShMPYRUVXo9vHEiWWa2qi6BkaZ5pKhtg4tIC7uqMUAHPEVDhS16A2yk9OtKh0p3Wl9pgPAQ7kxo%2BNoUx6zAWjVtTHLaOhkF4ptys%2BdaNSMBDDpxnvZXBHZ6nVDeOaoSi1Yr3RKldaJd5bL4-P79QHDRJOMZFMGXSpkKa1DywkjKYoI5QzEAfVAo367LKDHIlEG48FXKr2CyhajhZkgaj1AXUJaDCxAA',
    },
    {
        area: '61-3', routes: ['2-E-F-H-I-J-K-M'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0AThIlsRObOwQAHozSCoAVwjY4giMxj0AvthwAHFdkYwA7miogCugMYBrNAFYKliAwZPQg0n7oAGxKxKiyqiAaWqg6%2BobGphZWtnEJDs6oru7efgGiAMyh4RiR0W6x8WqaaNSMBDAGYRlmEoE2aADsABz2Ti5Knj6olIEw6FUyqJGyI-V2ic0pep1GJj3AfTlDWCD5426TpEOzvguDJOUxcgNNya3tO91ZuDkDJ2eFCYlaZkWaRO6ocq%2BR5rOInJItNoddJ7b79VDDUYFIqXDHmQLUEISEBMVjsDhkPgCEDCVCKILiSSLWqrZS5V7abYozK9bJ%2BGEAoYvC7A3wkWZEpmlOpsxobZKpT6o3k-NCRekAnHAsgDWaVYnVBQJWUJBFbNJdZUHPkYAVjVBDVm49Di0TzA2LEjoE6y1ZmxXc-aHNDlDX2yJO7Wg0S3D2kWS%2BJ7s%2BWci27HnW1WQshYtWJkVTdBlILguNxdVJuX%2BrmWjPByH-e2OoFTXy%2BfE0fWZ6jug7mIA',
    },
    {
        area: '61-3', routes: ['2-E-F-G-G1-G2-S'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0AThIlsRObOwQAHozSCoAVwjY4giMxj0AvthwAHFdkYwA7miogCugMYBrNAFYKliAwZPQg0n7oAGxKxKiyqiAaWqg6%2BobGphZWtnEJDs6oru7efgGiAMyh4RiR0W6x8WqaaNSMBDAGYRlmEoE2aADsABz2Ti5Knj6olIEw6FUyqJGyI-V2ic0pep1GJj3AfTlDWCD5426TpEOzvguDJOUxcgNNya3tO91ZuDkDJ2eFCYlaZkWaRO6ocq%2BR5rOInJItNoddJ7b79VDDUYFIqXDHmQLUEISEBMVjsDhkPgCEDCVCKILiSSLWqrZS5V7abYozK9bJ%2BGEAoYvC7A3wkWZEpmlOpsxobZKpT6o3k-NCRekAnHAsgDWaVYnVBQJWUJBFbNJdZUHPkYAVjVBDVm49Di0TzA2LEjoE6y1ZmxXc-aHNDlDX2yJO7Wg0S3D2kWS%2BJ7s%2BWci27HnW1WQshYtWJkVTdBlILguNxdVJuX%2BrmWjPByH-e2OoFTXy%2BfE0fWZ6jug7mIA',
    },
    {
        area: '61-3', routes: ['1-A-A1-B-C-T-W'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAKwBObETQKAbNggAPRmmqMCMCNjiCIzGPQC%2B2HAAc0cktkYwA7mgDsADmUBXAGMAa1IAZhsxMnoQGUcKDRAVVAUlEG1dVEEoP2MYswtrWwdUNWcQVw9UUQJAkNQnCJhQ6NiShSxE4mTU9L0DIxN8y0kI%2BzRvORd3EX9g0jVG9BbZDDUEpJTNHT7DXNNzYeBR4p8pyuratEpGuWXSdA6N3zTtzOy9ocLcYtCyirQ1M8anNUGQyI01HdUCQFJNOqoeq8sjlBgcvmNUKEyGcAXDgXV0BRGp4oeoyhtERlkR80SMimhQh1-qhvEDLvU5FYItQonSQNRmnzqEsRlYgA',
    },
    {
        area: '61-3', routes: ['1-A-A1-B-C-C1-P'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAKwBObETQKAbNggAPRmmqMCMCNjiCIzGPQC%2B2HAAc0cktkYwA7mgDsADmUBXAGMAa1IAZhsxMnoQGTR0NQ0QFVQFJRBtXVR9Q2MYswtrWwdUHxd3EX9gtEoImFDo2NQSdWViFN90nT0DIxN8y0kI%2BzQ1TzKPVFECQJDUOXDsGHQG2TmKROTUzS7UQSg-XNNzAeAh4rVnEFcJqZnHElq5FZGFLCS2rc7M7N6848LcMVvHJxhUkncmmpampnnNPBsPokMt0cn1-pIYhIpKtQqFsFBqCIInAohjGt4xiACUSzqo8VdypNKrMyN5ap5YSR0G9Nmlkbt9od%2BgDhqhQpdrl5blVUGQFFYItRSacaPVBjRloMrEA',
    },
    {
        area: '61-3', routes: ['1-A-A1-A2-Q'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAKwBObETQKAbNggAPRmmqMCMCNjiCIzGPQC%2B2HAAc0cktkYwA7mgDsADmUBXAGMAa1IAZhsxMnoQGTR0NQ0QFVQFJRBtXVR9Q2MYswtrWwdUHxd3EX9gtEoImFDo2NQSdWViFN90nT0DIxN8y0kI%2BzQ1TzKPVFECQJDUOXDsGHQG2TmKROTUzS7UQSg-XNNzAeAh4rVnEFcJqZnHElq5FZGFLCS2rc7M7N6848LcMVvHJxhUkncmmpampnnNPBsPokMt0cn1-oMiqpQqDJpVZmRvLVPLCSOg3ps0sjdvtDv0AcNUKFLtcvLcqqgyAorBFqFEMSBqPV%2BdRloMrEA',
    },
    {
        area: '61-3', routes: ['2-E-F-G-G1-G2-S'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2B6ABsysSocgAc6lpo1IwEMIbhJmaW1nbxaiCOLqhuHj6kgWIAzGERqH5R5XFyRZraqLoGRjnmkkG2-kUlaOhJ7l6%2BGGRBMOj1sqg1CS1oCe0pqGkZWcam-cCDBegA7A7OaKfnk5Xxc36LpH5FKvExIB2p6Zm9B3m4Ap%2BJTFS6oU4TCrTEg1OZRJ6oKJRSGtTadbp7PoAoaNGoXUoJG5Q-wkCxBaihSQgJisdgcMh8AQgYSoUTBCRSJZIlH2T5bDF-XIDfL%2BPGggmvKb%2BWZiSmc-wUD5vNrJdH6TH-YWAtBREGjMrKKWNUm1BGKV6o1U6dWCw7HMZi-WrQ13PzoOYLKkNEjoLDuVoTL5dG3ZTVHEXLPVg5Eu6ZkGXBR5epYkOR%2BWK8oMC0NC8Pa5Zs-VRdO3aboarBeHJ%2BS6jOFK3Bno5u0Rmp%2Bp2Qo1%2BPxkmh1LXUT1HCxAA',
    },
    {
        area: '61-3', routes: ['3-N-V-X-O-Z'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0AZgBsWEETQBOABzYIAD0ZpqjAjAjY4giMxj0AvthwAHNOrLZGMAO5oqygK4BjAGs0AHYKWxAYMnoQaRDZWWwVVA0tXX1DY1NzSxs7R1R1BJA3T1RvAn8gjDDRWWjYjHl5ROJk1VS9VAMjExjsqwlwhxDNYo8vRMq0SnCYdHqZVBJVZuVWlJAdTu7MvosB4CH8%2BWDXcbLJwLQAVllZ64W0JtGk1XbNtNRBKB9es33crh8rczqV1KdfFdUNcSLN5I8ltd3q9Vlt0j0sgDBnkbiRQSNLlUSHdwtQohIQExWOwOGQ%2BAIQMIlqJxJJFs8Wmp3mivj8-v1AcNoUUSk5kVNoWRZuS2Wh0GQIa8ITydvysYccdCIaKLpCqjNagiSOglK9Rjzvr9MTlsUC5HixqV5C8JWQpaJ5hSGstrpy2h00Ja1TaNXbULIXI6nr69XKahEHl7FisHa9uZ8g9aDkc5EodeoXVDrtc4Qj0Opka0KwGuhlg9nNbIHTrrqsKlCSOprKS6rbqJ7DtYgA',
    },
    {
        area: '61-4', routes: ['1-A-B-H-I'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNAGZsMOqlBwAJmgCsANiogiaAJzrsEAB6M0gqAFcI2OIIjMY9AL7YcABwVaQjGAHc06ABzYCRgGMAay8yOxAYMnoQWQUKRT9iVE1tPQNjUxiLK1t7J1RFEmw3T1QVf2C0MgB2cJgRaNjUEnV5RI0XXX1UQxMzbOspcMdRMmKPNEU21UCQjAo69Ea5ZvQsVST1XxAu9L6sy0HgYfyRItcJgu2KubIw8XlljUVq9uTt3dRqRgIYTPNDrlcKdtiVJgkZpVmiI6oonhhvC41O9Ut1vr9-gMgSNUGdxqV5EjZqRvDZwtQolIQExWOwOGQ%2BAIQMJceJJNIVopFNdNp00j0Mv1AUM8goxBdSt5XpC5vISHVKRzRC03uppZ90X8hTkRcCFBCwWU-MTcfI6g0qU0fEjNh9%2BZrMcLjqLcedDYTjVCSKTxEtLSt5OhxciUjt%2Bb1HTrnXrceLDdzPXMRAsHvClBDkd47WiflqDlGTqI45dFGMZVUUxE4f7nucQ3zuhHtUdC7j1oas4mFGbyRbo9Q-ccbEA',
    },
    {
        area: '61-4', routes: ['1-B1-C-D-D2-E'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKwUAbNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNIpLZGMAO5oqIAoYDGANbyJLYgMGT0IDKkagDMKsSoagAcWrr6RiZR5pY2do6ocsogbp6o3r6BIhShMLGR0UmKmj6JagDsaXqo1IwEMFlmFlaSoQ7qLiUeXir%2BQahkybXoDbKoioqpreotOt0GxqY5I8BjBXLxU2XJnT5zwbVyq06UCWjJcl1ovf2Dx3m4c6XUpoWJYO5VVAkWK1RTPBZqYqqJpfHp9AZHYYA8aFLYg8qzSHQ6yhagRSQgJisdgcMh8AQgYQLMQSKRrDZbZEaVEHP5Y0b5eTA6aoZItSrzORkWrktkxT7bJK7dKoXmY3ICwGg0RXJwKiVodA1MT1CmNEjocFcrZ7DKHbL806C1CxSb4zaE%2BZkaViFZmtaI27W1E-DEOjVOrUuvEijae0gwsRPf2GsVvJI2lWhvkRs6gt0iuTi%2B5QpZiOEpwroS5c5X7TLqk55l3CsoeiHzWI1UmmyPUP2naxAA',
    },
    {
        area: '61-4', routes: ['1-B1-C-F-F2-G-R-R2-S-T'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKwUAbNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNIpLZGMAO5oqIAoYDGANbyJLYgMGT0IDKkagDMKsSoagAcWrr6RiZR5pY2do6ocsogbp6o3r6BIhShMLGR0UmKmj6JagDsaXqo1IwEMFlmFlaSoQ7qLiUeXir%2BQahkybXoDbKoioqpreotOt0GxqY5I8BjBXLxU2XJnT5zwbVyq06UCWjJcl1ovf2Dx3m4c6XUpoWJYO5VVAkWK1RTPBZqYqqJpfHp9AZHYYA8aFLYg8qzSHQ6yhagRSQgJisdgcMh8AQgYQLMQSKRrDZbZEaVEHP5Y0b5eTA6aoZItSrzORkWrktkxT7bJK7dKoXmY3ICwGg0RXJwKiVodA1MT1CmNEjocFcrZ7DKHbL806C1CxSb4zaE%2BZkaViFZmtaI27W1E-DEOjVOrUuvEijae0gwsRPf2GsVvJI2lWhvkRs6gt0iuTi%2B5QpZiOEpwroS5c5X7TLqk55l3CsoeiHzWI1UmmyPUP2naxAA',
    },
    {
        area: '61-4', routes: ['1-A-B-H-I'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwA2OdiLyA7NggAPRmmqMCMCNjiCIzGPQC%2B2HAAd5JbIxgB3NFRAEArgGMA1iIAHDYgMGT0IDJoamRYXsSoipo6egZGJmYW1rYOqEFBzm4eKn6BqGRkoTAAzJHRGGQKKolqntq6qPqGxlFZlpKh9mg1TiAu7qgArFOlAaQhYuj1shVkhQloBSmd3Rl95gPAQ3k1ouPF081eZWgKFNVTK3cK16pJ7ald6b2mhzm4U6eCYxTw%2BeaoEhTaoKZ7TChvRJyZQgDpoQRQby-foA4aoBRjEGoMG3CpqKyhagRSQgJisdgcMh8AQgYQVMQSKSrV4bd7InbozHY-6DXJoKY1IqTIIaG4QqYkarUrlodBBFHvdUC749TIi45i1CjKXit6kkiLMJ1GkNKZqXlIlFo1AYrF67KiwEjSUXaU%2B8HlGoPJZwhRtFryDbO13Cj0Gr1Gn1EhS80lkRViJ421YkfmbfJRr57WNHE4jQmXKYa83ksSw7Om%2BKa67O4vu0uGmpJy6xObldMUmjW%2BPUZaDKxAA',
    },
    {
        area: '61-4', routes: ['2-F-F2-G-N'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0ATgBss7ETkB2bBAAejNNUYEYEbHEERmMegF9sOAA5yS2RjADuaKiAIBXAMYBrNDIADmsQGDJ6EGk0VTIsT2JUBQ1tXX1DY1NzKxt7VCCgp1d3ZV8A1DIyUJgAZkjo1ABWCkKEtAKUnVQ9AyMorIsJULs0eUcQZzdUD29-Uhrq9HqZJvkZxNlWrS6ejP6zQeBhvMalCeKMdU8ytHQq0Ubl9o62pLPttEEoLz6TA5zcHl5DUilN0PJSnMMPcwvInqh5PJWio3p1Pt9fgMASMmiDzlMgmdZuVGlVQtQIhIQExWOwOGQ%2BAIQMJUOMxPDEciNu9Uqgvj9Mv8hrk0I08ZN2ldiaKSNVKZIViQSETuWjuulMUKjiKMOKLqoiTdUDUKNU6lSGsrGspVSAPnyMYLssLAWgamRQaNrdcoehTaIlhbFeh4ijNmr%2BZrndrXcbxhKEcijZVqo8g3J5FKNltebso4djm7WgnEZDyiQFqI4emMISbXIczsNU6CzqavGLqcy6QQuTzTHqIGjpYgA',
    },
    {
        area: '61-4', routes: ['3-G-R-R2-S-T'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0ADnnYiaAJzLsEAB6M0gqAFcI2OIIjMY9AL7YcABzQA2AMzZGMAO5p09xXoDGAa08yKxAYMnoQaU97bxAlVFV1LTRqRgIYQ0iTM0trO1QAdlkXdzQqOL9A1EoQmEcIqNQAVibnOOIEtRBNbVRdAyNs8wkQ2zQiko9UcoJKzwpa9AaZZqasdpUunp19TONTYeBR-ImQVynZJp8A%2Bdqm5fGSNvjlAqTe1PS9odzcE-XzmVrlUyMFRPYHs17DMOspit1kqhPhlBgdfmNml1ARg3hUbhhgiFqOEJCAmKx2BwyHwBCBhKgSKJxJIViQmvCXrjtki0iismiRnlPFjSoVnnMGehaiSWaQSBzYVtEf1vgKjkKMG1sbIZhL0I5avVSY0SMorhtOu8dgN%2BTlBX80I4yJMHObZvj0AtREtjaz0OsXvDuSrUXb1Q7UI5GWdRfYORLQXdIcp7LjA1aeV9Q4djo74diYsDSAbwZC1s9FRmQ7acxrHFrY-H8Y4FkSjeHqD6jhYgA',
    },
    {
        area: '61-4', routes: ['4-B-U-V-X-Z'],
        option: {
            'phase': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkUB2FYYAxgDWziS2YmT0IDJo6CT%2BIKqoamRaumjUjAQwJjHmljZ2jqhOaSAe3qiiBEGhqOQRMC7RsQ1qTirEKZogOnqoBsamBVaSEQ5oLuWV8p1JdXEUTeitsg3oWEndasp9GYNGeWYWY8ATJS4k7l7ye7UhaGRkTU5r6nKJybvpA1k5x1GRVwlz2s1QCgCjwaLiacneGEUvW%2Be36mWyuRGp2Bk1QVxuVScyMWDUUTV8CKc6Dc23UvTRh2G%2BWx42KUxp4KUUPqLmWEWoUVZIGoLSF1FW42sQA',
    },
    {
        area: '61-5', routes: ['1-A1-A2-E-I-Q-Y-Z-ZZ'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAGwBOAOzYiaBXOwQAHozTVGBGBGxxBEZjHoBfbDgAO6ktkYwA7miogCAVwDGANZoAMxytiAwZPQgMvIArAqqxKgKoiA6eqgGRiYx5pY2do4pwS7unqr%2BQajBABzhMMHRsRhymt7JConpuvqGxqb5VpLhDmhKtWUeqF6%2BgSIUDejNshgaSertGX05gxbDwKPFcmmu07NVpEoNcStocRTtaind26iCUD65ZvuFuMfOEBnCreS6oOIkBpyO6oNqTDrqV69d6fb5DP5jcGlIHlVC1FSg%2BbgyHhahRSQgJisdgcMh8AQgYSoNLiGFKChxDYpTk9TLZAZ5X4jIr3U64pQ8ubVSgNclSVYaQHPLpaZEfL57ArC-4hLA46a1eFS%2B5xBpNCktOLoNLPWpbZH8tFCw4imrY4GodmVIkkepiZYW1YkBRG5K1JF8-pOrUunU1QEepRPMEkU1iW6BtDoOR65URnYCn4xo4hBO4uRGsF1KEwhQQrnh1WR3aC4uu4I8j1ybHG1DB6yk82x6gBw7WIA',
    },
    {
        area: '61-5', routes: ['1-A1-A2-B2-F-H-Y-Z-ZZ'],
        option: {
            'phase': '1',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAGwBOAOzYiaBXOwQAHozTVGBGBGxxBEZjHoBfbDgAO6ktkYwA7miogCAVwDGANZoAMxytiAwZPQgMvIArAqqxKgKoiA6eqgGRiYx5pY2do4pwS7unqr%2BQajBABzhMMHRsRhymt7JConpuvqGxqb5VpLhDmhKtWUeqF6%2BgSIUDejNshgaSertGX05gxbDwKPFcmmu07NVpEoNcStocRTtaind26iCUD65ZvuFuMfOEBnCreS6oOIkBpyO6oNqTDrqV69d6fb5DP5jcGlIHlVC1FSg%2BbgyHhahRSQgJisdgcMh8AQgYSoNLiGFKChxDYpTk9TLZAZ5X4jIr3U64pQ8ubVSgNclSVYaQHPLpaZEfL57ArC-4hLA46a1eFS%2B5xBpNCktOLoNLPWpbZH8tFCw4imrY4GodmVIkkepiZYW1YkBRG5K1JF8-pOrUunU1QEepRPMEkU1iW6BtDoOR65URnYCn4xo4hBO4uRGsF1KEwhQQrnh1WR3aC4uu4I8j1ybHG1DB6yk82x6gBw7WIA',
    },
    {
        area: '61-5', routes: ['2-J-M-N-P'],
        option: {
            'phase': '2',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaABwBOLCCJoFC7BAAejNNUYEYEbHEERmMeiDhkrM%2BQHZsUamgcBfEwGY7sjBTJnV1QKd09cAAc0AFYnEEYYAHc0ADYNFQBXAGMAaxjQ7BhbSWs-dAUU7FVUCs0dPQMjEzMLenCcKNQUwPikkSrsvNQSD0KfEvsulLkq4hr07V1UQSgM42sWy0l2zuivbATk1Dk4gkGYknCYdF9SBWjZtQX65dX103Mt4B20Lx7D1IPTK5NDoApiaK3YboZTVBQzECLNArNbNT5tbAdX4kA59LoIs4g1BkMhXFJQiqnObwupLfSGd6bDGRX4IgFTAZEkheK4OKHoRSPGoIpGoelNDbo7aYzpeHG9I7RdKEoYkORhGjFb40cbakDUG7bdxAA',
    },
    {
        area: '61-5', routes: ['2-C-R-S-D-U'],
        option: {
            'phase': '3',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAKwBOEtiJoFC7BAAejNNUYEYEbHEERmMegF9sOAA5oAHADZsjGAHcRKgK4BjAGtSRxsxMnoQGXkFMhViVHVNHT0DIxMzC2tbB1QXN09vEAJ-INQSOVCYAGYIqNRnBUc4tQ0QbV1UQSgfY0iMy0lI8MG69ApYkChqEStQ%2BycsEHcvVFFiwODK9FrZDAVXIvj9pI79Q17TcwHgOZznCeXC9dKSAHZKuR3SBTlmhNb2mguj10lcsrgclUHgV6r8iiU0GNKs4vmV0ItVAkmm1kp1uhd%2BuD5qgqsoljDnNjnmgyGRKq9UftXn9GicUudQZlJLc0FVsY96gdqWUqrMaMMbjQatyaNtuVYgA',
    },
    {
        area: '61-5', routes: ['1-A-E-I-W-X'],
        option: {
            'phase': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkAbNiLy52CAA9GaQVACuEbHEERmMegF9sOAA5rsjGAHc06ABwr9AYwDWaAFYKaxAYMnoQGVIAdlEQVVQ5TxAtHVRqRgIYI0jTcysbe0SsECdXVCp4n39UEmCxAGYIqNQA9BIVYkT1FO1dAxyTMwtJELt5DtKXNEqCasCSEJh0ZtkMCmSEuWiNPvTM7OM8keAxooCAx2mKrz83RbEA1dIySa3L3rSMrMHjgtxzpUyjNbjU6ktFM9WhQGp0HJ9%2BoYjsN-uNUIpJsCblU7rV0JYQtRwpIQExWOwOGQ%2BAIQMJUHFxFDFIpNl05D1UojfijRoVArCpuV3DscTUAg9QsSpGsgsp4myOXs9EjcjzTnz0ZjrrN5vToksmiSWiQ5B8toq0srufleQC0A04ljFGbdeh6qEVka1iR0CUtslOagrcibeq7agGlryizQSIyEsnl75IoRf7dl8DtaTmd7cknXK5riSA0IVCPD00wj9j8Q9mNZGruUAhXdSR3ASaIaw9RPadLEA',
    },
    {
        area: '61-5', routes: ['1-A-E-I-W-X'],
        option: {
            'phase': '5',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkAbNiLy52CAA9GaQVACuEbHEERmMegF9sOAA5rsjGAHc06ABwr9AYwDWaAFYKaxAYMnoQGVIAdlEQVVQ5TxAtHVRqRgIYI0jTcysbe0SsECdXVCp4n39UEmCxAGYIqNQA9BIVYkT1FO1dAxyTMwtJELt5DtKXNEqCasCSEJh0ZtkMCmSEuWiNPvTM7OM8keAxooCAx2mKrz83RbEA1dIySa3L3rSMrMHjgtxzpUyjNbjU6ktFM9WhQGp0HJ9%2BoYjsN-uNUIpJsCblU7rV0JYQtRwpIQExWOwOGQ%2BAIQMJUHFxFDFIpNl05D1UojfijRoVArCpuV3DscTUAg9QsSpGsgsp4myOXs9EjcjzTnz0ZjrrN5vToksmiSWiQ5B8toq0srufleQC0A04ljFGbdeh6qEVka1iR0CUtslOagrcibeq7agGlryizQSIyEsnl75IoRf7dl8DtaTmd7cknXK5riSA0IVCPD00wj9j8Q9mNZGruUAhXdSR3ASaIaw9RPadLEA',
    },
    {
        area: '61-5', routes: ['1-A-E-I-Q-Y-Z-ZZ'],
        option: {
            'phase': '5',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkAbNiLy52CAA9GaQVACuEbHEERmMegF9sOAA5rsjGAHc06ABwr9AYwDWaAFYKaxAYMnoQGVIAdlEQVVQ5TxAtHVRqRgIYI0jTcysbe0SsECdXVCp4n39UEmCxAGYIqNQA9BIVYkT1FO1dAxyTMwtJELt5DtKXNEqCasCSEJh0ZtkMCmSEuWiNPvTM7OM8keAxooCAx2mKrz83RbEA1cD3ZXiuuR7UtAysweOCrgiugemUZrcanUlopnq0KA1Og5emk9IYjsNAeNUIpJmCblU7rV0JYQtRwpIQExWOwOGQ%2BAIQMJUHFxLDFIpNh8vntUf8MaNCoEEVNyu4dgSagEHqFyVI1kE3ltuSiBuj8gKgWgcVdyrN5szoksmhSWiQ5Jd3kjvqheWqTmc0A04njFBa5oT0PVQisTWsSOgSltktbbbl%2BadBagGrjrhyISIyEsnr75IpxUHdmlfocw%2BqI5qo8kXYr9SQGtDYR4ehnkT8Dny8w6ozHygFq6X3CSaMb89QfadLEA',
    },
    {
        area: '61-5', routes: ['2-C-R-S-D-U'],
        option: {
            'phase': '5',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAKwBOEtiJoFC7BAAejNNUYEYEbHEERmMegF9sOAA5oAHADZsjGAHcRKgK4BjAGtSRxsxMnoQGXkFMhViVHVNHT0DIxMzC2tbB1QXN09vEAJ-INQSOVCYAGYIqNRnBUc4tQ0QbV1UQSgfY0iMy0lI8MG69ApYkChqEStQ%2BycsEHcvVFFiwODK9FrZDAVXIvj9pI79Q17TcwHgOZznCeXC9dKSAHZKuR3SBTlmhNb2mguj10lcsrgclUHgV6r8iiU0GNKs4vmV0ItVAkmm1kp1uhd%2BuD5qgqsoljDnNjnmgyGRKq9UftXn9GicUudQZlJLc0FVsY96gdqWUqrMaMMbjQatyaNtuVYgA',
    },
    {
        area: '61-5', routes: ['2-J-M-N-P'],
        option: {
            'phase': '5',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaABwBOLCCJoFC7BAAejNNUYEYEbHEERmMeiDhkrM%2BQHZsUamgcBfEwGY7sjBTJnV1QKd09cAAc0AFYnEEYYAHc0ADYNFQBXAGMAaxjQ7BhbSWs-dAUU7FVUCs0dPQMjEzMLenCcKNQUwPikkSrsvNQSD0KfEvsulLkq4hr07V1UQSgM42sWy0l2zuivbATk1Dk4gkGYknCYdF9SBWjZtQX65dX103Mt4B20Lx7D1IPTK5NDoApiaK3YboZTVBQzECLNArNbNT5tbAdX4kA59LoIs4g1BkMhXFJQiqnObwupLfSGd6bDGRX4IgFTAZEkheK4OKHoRSPGoIpGoelNDbo7aYzpeHG9I7RdKEoYkORhGjFb40cbakDUG7bdxAA',
    },
    {
        area: '61-5', routes: ['3-B2-X1-X2-Y-Z-ZZ'],
        option: {
            'phase': '6',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXUthh1UoOABM0AThIlsRObOwQAHozSCoAVwjY4giMxj0AvthwAHFdkYwA7miogCugMYBrNAFYKliAwZPQg0n7oAGxKxKiyABxqmmjUjAQwBmHGpqFw4pIyqADMRdhQ1C6BcCESYYXxAOxlFagN5oE2diAOzqiu7t6kAaJFuYVR0W6xsqogGlqoqemZRiZmEh22rYndTi5Knj6olIEw6GOkspPKcTvzKWkZhtnrwJtokU27vf2HfkWnXwXVAkWRfG7yJILJZPLJrCxWLafex7PoHQYgtqiSLAki%2Ba7TXxQh7LZ7wjaItANVw9fZuP4Ydo0GoMFhsVCcMh8AQgYQg0T5Op%2BCgErr3VA6fRknIU3BIxTfOkDI5kLFBFlC1CRSI7CGzcWSlYvBFy-4o3qNdFHXwkU6jWrhDDxWYQu7JRaPI3kt6U4oK2moXwuhkkeKnc4Owq%2BdClKZi92G6Wvd7FWMBnVWtBFYZBIGRvzamJoeJu6GepMmzqp80fMiZ445mA4-NxSIKvXEiV6L0yn2m4pYRWoEv13y%2BJkgaj2vvUCNvcxAA',
    },
]; // @expansion
/*
{
    area: '61-5', routes: ['1-A'],
        option: {
        'phase': '5',
        },
    deck: '',
},
*/
// TODO: 第三艦隊以降にデータがあるとこける。実機では問題なし
/*
{
    area: '', routes: [''],
    option: {
        'phase': '1',
        'difficulty': '4',
    },
    deck: '',
},
*/

/**
 * 意図的に逸れるようにしたデータ
 */
export const astray_mock_datas: MockData[] = [ 

]; // @expansion