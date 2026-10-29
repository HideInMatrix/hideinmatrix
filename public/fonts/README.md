# Local fonts

Both fonts use the SIL Open Font License 1.1. The original license files are included here.

- **Source Sans 3**: Adobe's Source Sans, distributed by the official [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/sourcesans3).
- **Noto Sans SC**: Simplified Chinese font from the Noto / Source Han Sans family, distributed by the official [Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/notosanssc).

The local WOFF2 files retain variable weights; the site uses weights 400–600.
The Latin file includes Latin characters, punctuation and arrows. The Chinese file
includes GB2312 characters, Chinese punctuation and additional characters used in
the site's source. Rare characters in dynamic repository descriptions fall back to
the visitor's installed Chinese fonts.

To regenerate, install `fonttools[woff]`, download these upstream files into a temporary directory:

```text
https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf  -> source-sans-3.ttf
https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf   -> noto-sans-sc.ttf
https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/OFL.txt                 -> OFL-SourceSans3.txt
https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/OFL.txt                  -> OFL-NotoSansSC.txt
```

Then run `python scripts/subset-fonts.py /path/to/downloads` from the repository root.
The upstream TTFs are not needed when running or building the site.
