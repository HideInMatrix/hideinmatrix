"""Create transparent, contrast-appropriate README images for both GitHub themes.

Usage: python scripts/theme-profile-images.py generated
Run after the upstream generators; SVG geometry and animations remain untouched.
"""
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

COLORS = re.compile(r"#[0-9a-fA-F]{8}(?![0-9a-fA-F])|#[0-9a-fA-F]{6}(?![0-9a-fA-F])|#[0-9a-fA-F]{3}(?![0-9a-fA-F])")
LIGHT = {
    "#000000": "none", "#00000000": "none",
    "#ffe70b": "#9a6700", "#e6edf3": "#1f2328", "#e4e2e2": "#1f2328",
    "#1c1c14": "#ebedf0", "#554d04": "#f3e6b1",
    "#928406": "#dcc46a", "#c9b609": "#b39124",
    "#827600": "#656d76", "#b7a500": "#806600",
}
DARK = {"#000000": "none", "#00000000": "none", "#1c1c14": "#21262d"}


def apply_palette(svg: str, palette: dict[str, str]) -> str:
    return COLORS.sub(lambda match: palette.get(match[0].lower(), match[0]), svg)


def main(directory: Path) -> None:
    for name in ["stats", "top-langs", "trophy", "snake", "profile-3d"]:
        source = directory / f"{name}.svg"
        if not source.exists():
            continue  # Independent jobs may publish successfully while another fails.
        svg = source.read_text()
        for theme, palette in [("light", LIGHT), ("dark", DARK)]:
            result = apply_palette(svg, palette)
            assert ET.fromstring(result).tag == "{http://www.w3.org/2000/svg}svg"
            target = directory / f"{name}-{theme}.svg"
            target.write_text(result)
            print(f"Generated {target.name}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
