"""Build local WOFF2 fonts from the official Google Fonts variable TTFs.
Usage: python scripts/subset-fonts.py /path/to/downloaded-fonts
Requires: fonttools[woff]. Original filenames and licenses are in public/fonts/README.md.
"""
from pathlib import Path
import sys
from fontTools import subset
from fontTools.ttLib import TTFont

source = Path(sys.argv[1])
output = Path(__file__).resolve().parents[1] / "public" / "fonts"
output.mkdir(parents=True, exist_ok=True)

latin = set(range(0x20, 0x250)) | set(range(0x2000, 0x2070)) | set(range(0x2190, 0x2200))
chinese = set(range(0x3000, 0x3040)) | set(range(0xFF00, 0xFFF0)) | set(range(0x2000, 0x2070))
for high in range(0xA1, 0xF8):
    for low in range(0xA1, 0xFF):
        try:
            chinese.update(map(ord, bytes([high, low]).decode("gb2312")))
        except UnicodeDecodeError:
            pass
for path in (Path(__file__).resolve().parents[1] / "src").rglob("*"):
    if path.suffix in {".ts", ".tsx"}:
        chinese.update(ord(c) for c in path.read_text() if ord(c) >= 0x2E80)

for filename, target, unicodes in [
    ("source-sans-3.ttf", "source-sans-3-latin.woff2", latin),
    ("noto-sans-sc.ttf", "noto-sans-sc-common.woff2", chinese),
]:
    font = TTFont(source / filename)
    options = subset.Options()
    options.flavor = "woff2"
    options.name_IDs = [0, 1, 2, 4, 5, 6, 13, 14]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(output / target)
    print(f"{target}: {(output / target).stat().st_size / 1024:.0f} KiB")

for license_name in ["OFL-NotoSansSC.txt", "OFL-SourceSans3.txt"]:
    (output / license_name).write_text("\n".join(line.rstrip() for line in (source / license_name).read_text().splitlines()) + "\n")
