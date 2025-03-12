import { AreaId } from "@/classes/types";

type MockData = {
    area: AreaId,
    routes: string[], // 編成と、能動分岐以外のoptionが同じなら複数設定可
    option: Record<string, string>, // 能動分岐は不要
    deck: string,
}

export const nomal_mock_datas: MockData[] = [
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
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJxlsRNAuwQAHozTVGBGBGxxBEZjHoBfbDgAOaAKwA2bIxgB3EUoCuAYwDWpAA5LMTJ6EBk0dHQAdiViVDlYkA0tVB09A3DjUwsrWwTFEBd3VFECH39UIOwYAGYwiNQyEicQZVRouTVNbV19Q2yzSWCbSMLitAck8r9SMmCYdAbZVFqyVvaAkm7U9P6skyHgEfza7aK3SfOZypaFu2XIimn4gMKU3oyBw9zcU9rnJdUFMvLNVvMag5HsCHHY4mgAgEdp99kYfsM8mgzoCSg4um0KoEFtFoY4Xgj3j00n1Mmichi-liARdcddCU10OZgtRQgzqPU%2BUthuYgA',
    },
    {
        area: '60-3', routes: ['1-A-C-E-F-F1-G'],
        option: {
            'phase': '2',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmpAJxlsRNAuwQAHozTVGBGBGxxBEZjHog4EqbNRkAbAA5sUaiIC%2Bb7DgAOaAKx22IwwAO4iSgCuAMYA1qQOnmJk5jJo6GROIMqocn5qmmiCUBEGFsam9Ik%2B-gDsQaHhWdFxqCToiTAAzCk2ZCSBWcSoNXL5Wqg6eqVGJmaSFlYWvY7OrqgUHl6%2BGIogwWGodnVNsaRkHeg9aJ32SkMOJGPauvqG5XPAVdudj3sNh78CM1SHYOn4rhgKMdsg5dhpxpNXmVZpUttdOvUDkdIqdUDcOnYIXY7HlBmgHJl4c8pm8UZIvtdfvs0HZRicWiQEtgYDUIQFofc4QUJi9pu8UotUrYViAXO4GXiMX8sYDgbZ2olqMl6TRujqQNRLvS3EA',
    },
    {
        area: '60-3', routes: ['2-H-H1-H3'],
        option: {
            'phase': '3',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0QcAMzWZaMkuxRqIgL4fsOAA5oAVltsRhgAdzRFTRACQwBjAGtAsm8xMgdZVFsglWJUNSwQHT1UakYCGBMbc0t6VL80AHZlEFCI1FFYxKbUmHtJG0z0bNz1aOK0MoqqswsrSXr-VDJGkPD5aK6k1BJbXvQMtHQV0fzVot1J8srTGvmpdIHHZZcQN09FwPO2kRV47ZIal6AUOWVsnTyGi0l1K1xmdzqPiWtm%2B61QjTIf26OxS2BgclBaleqny4xhBmMtzmiNwyOiP3RASxAMUvUahLk5xJUIuJQp8OpCyRaFsLQZck2-1I6C8NEewFS1H6CpoBwWHiAA',
    },
    {
        area: '60-3', routes: ['2-H-I-I2-I3'],
        option: {
            'phase': '3',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGTQXVxViVDUsEB09VGpGAhgTGPNLGztHVAB2ZRAPb1RRAJC0UoiYF2jYjHjE9T90tCycvLMLK0kIhzQyUvcveT860NQSFyb0VtkMCc7kybTdXuzc0wLhqSjJGLWyJWwoahFrUZKnbaqRFSD5kjUmp1W4l1qkhotLtMvsBkcirgSi5ntMymQ3vUFuFsDA5L9kld-IDuiCDMZDkNIWNUC4-C8yk5ER9FE1Shi1HJtqpkriMvjwUSRsU4hUKXJZu9SOh7jRTsAItQWtyQNQViNrEA',
    },
    {
        area: '60-3', routes: ['2-H-I-I1'],
        option: {
            'phase': '3',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGxyAHNiJoAnGuwQAHozSCoAVwjY4giMxj0AvthwAHNAFYAzNkYwA7mkWaQBQwBjAGtnMlsxMnoQGTQXVxViVDUsEB09VGpGAhgTGPNLGztHVAB2ZRAPb1RRAJC0UoiYF2jYjHjE9T90tCycvLMLK0kIhzQyUvcveT860NQSFyb0VtkMCc7kybTdXuzc0wLh4FGSp22qkRUg%2BZI1JqdV5xIK1WTu3cz9gaOi3BK-JcyrUbnEnE05E9kkpNhotJ8DMZDkM-mNUC5AdMyk5rvUFoomqUoWo5Ns3nCdhlET8USNinEKkC5LNQQt0NYItQonSQNQWjzqCsRtYgA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M1-P-O1-R', '3-K-L-M-M2-P-O1-R'],
        option: {
            'phase': '3',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdEYJABsCWjJTtq6qNSMBDBZpuaWkqH28vHObh7KvgGoJOjV6HWyqI1yol6JyRogHWjdvf05Q8AjBejNEyUxctMVc43VcstoQTEbKqg3aZ0HfSbHPK4c7jYpTLwzEQUaqNF6oIKqcafFI-fY9f7ZQZA0ZfIqTUp3WYkEKhagRSQgJisdgcMh8AQgYSoDbiOEkEg7ZE7PaofRGAFY4b5QKg-ExTmQ1ByaFiclSFboZIxFpJVK7dJddFHQWnYUYW5XVqXcpEmLVWoU%2BrBA1c1Gaw4C3JC4EiZWG1YS%2B7ExZw1RyTmJdR2vnap26l3wvElNaE0hVMTPS0K1Ru23q35ax0nM6vKOtVOSkhmsSwpOBRpYTZqbkav6h7N6oJ51Zqk2vZJWUkW8PUJbDKxAA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-P-O1-R'],
        option: {
            'phase': '4',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAKzoS2ImgCcq7BAAejNIKgBXCNjiCIzGPQC%2B2HAAc1SkIxgB3NFRAEDAYwDWaOgAzDYgMGT0IDLyAOxBysSoqgAcmjp6hsZRZhbWtg5JTi7uqJ7e-iJyoTBBkdEYJABsCWjJTtq6qNSMBDBZpuaWkqH28vHObh7KvgGoJOjV6HWyqI1yol6JyRogHWjdvf05Q8AjBejNEyUxctMVc43VcstoQTEbKqg3aZ0HfSbHPK4c7jYpTLwzEQUaqNF6oIKqcafFI-fY9f7ZQZA0ZfIqTUp3WYkEKhagRSQgJisdgcMh8AQgYSoDbiOEkEg7ZE7PaofRGAFY4b5QKg-ExTmQ1ByaFiclSFboZIxFpJVK7dJddFHQWnYUYW5XVqXcpEmLVWoU%2BrBA1c1Gaw4C3JC4EiZWG1YS%2B7ExZw1RyTmJdR2vnap26l3wvElNaE0hVMTPS0K1Ru23q35ax0nM6vKOtVOSkhmsSwpOBRpYTZqbkav6h7N6oJ51Zqk2vZJWUkW8PUJbDKxAA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-S-S1-T-F3-U'],
        option: {
            'phase': '4',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2B6ABsysSocmogmtqougZGJmZhcH7ZsqgAHADs2FDUrkFwGnloAMy1peWogUG29iCOLs3KXr6otehBMLU1qCRyou5xE%2BpaaNSMBDCG4Znmkq12qH4xHc6uPT6kBUPooztuKvEFsykLSyvGpuvAm-6JnWjoJe69X2RDXKScL5AK7K4JW46fSPNaWaxbKJKPZdS5-bYkIZRUZkOTguLFKGoe7LDLPeG4LZ%2BG4og6-I5jWoWILUULApisdgcMh8AQgYSoSbiUaKRIQxLJaHpVbkjYIr4NWmoIpi9EBIZsqT5KJRGniolpWGy17y7aKz6FH4eBl%2BTFiEbAiIYWp%2BWLtSXExakmVZOWUkQ-C1RVUMkhMsRnR35OR%2BMXTCVzVIwsm%2Bk3%2B-rIoOu%2Bl9Eh%2BQGjdByK3xokko2pt4Zhz7S2HXNFLGFqJYKbuxPllMvKu1TO13X1uonFkOtPUSOvCxAA',
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-S-S2-V-X'],
        option: {
            'phase': '4',
            'difficult': '4',
        },
        deck: 'https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNGWww6qUHAAmaAJwkS2IvLnYIAD0ZpBUAK4RscQRGYx6AX2w4ADquyMYAdzRUQBPQGMA1mgCsFFYgMGT0IDL%2B6ABsysSocmogmtqougZGJmZhcH7ZsqgAHADs2FDUrkFwGnloAMy1peWogUG29iCOLs3KXr6otehBMLU1qCRyou5xE%2BpaaNSMBDCG4Znmkq12qH4xHc6uPT6kBUPooztuKvEFsykLSyvGpuvAm-6JnWjoJe69X2RDXKScL5KJ%2BRJXOS7ZLzRbLDLPSzWLZyBp7LqXP79E5iKKjMhQ2JoYq3WEPBFZDbI-w3dEHX5HMa1CxBaihYFMVjsDhkPgCEDCVCTcSjRQQ6aJGGpfSPNZI3BbdBoz6oIoQrEBIbsqSgqK0yGSubS9KrRFUhX%2BZX7Qo-DyMvwkIYjYERbYUXYG0nG2Vm17U1BRJR07oMvoO06jOTgonxQ0pNI%2Byl%2Bi39IMqsGHPokPyA0boOS2iVe%2B7w01Jt6phzWkmh0hFIZ4l35aJYKbtKUlxMvCu1NPWvWZuonVnO5PUM4bCxAA',
    },
]; // @expansion
/*
{
    area: '', routes: [''],
    option: {
        'phase': '1',
        'difficult': '4',
    },
    deck: '',
},
*/

/**
 * 意図的に逸れるようにしたデータ
 */
export const astray_mock_datas: MockData[] = [ 

]; // @expansion