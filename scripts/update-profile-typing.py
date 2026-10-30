"""Refresh the README typing SVGs with 24px of padding on both sides.

Run directly to fetch the upstream animations, or pass a directory containing
light.svg and dark.svg to reuse previously downloaded animations.
"""
from pathlib import Path
import sys
from urllib.parse import urlencode
from urllib.request import urlopen
import xml.etree.ElementTree as ET

NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", NS)
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")
assets = Path(__file__).resolve().parents[1] / "assets"
padding, width, height = 24, 900, 62

for theme, background, color in [("light", "F6F8FA", "1F2328"), ("dark", "000000", "FFE70B")]:
    options = {
        "font": "Source Sans 3", "weight": 600, "size": 25,
        "duration": 2400, "pause": 1400, "background": background,
        "vCenter": "true", "width": width - 2 * padding, "height": height,
        "lines": "https://micromatrix.org;https://blog.micromatrix.org", "color": color,
    }
    data = (Path(sys.argv[1]) / f"{theme}.svg").read_bytes() if len(sys.argv) > 1 else urlopen(
        "https://readme-typing-svg.demolab.com?" + urlencode(options), timeout=45,
    ).read()
    animation = ET.fromstring(data)
    if animation.tag != f"{{{NS}}}svg":
        raise ValueError("Typing service did not return an SVG")
    animation.set("x", str(padding))
    animation.set("y", "0")
    frame = ET.Element(f"{{{NS}}}svg", {
        "width": str(width), "height": str(height), "viewBox": f"0 0 {width} {height}",
    })
    ET.SubElement(frame, f"{{{NS}}}rect", {"width": str(width), "height": str(height), "fill": f"#{background}"})
    frame.append(animation)
    target = assets / f"profile-typing-{theme}.svg"
    target.write_text(ET.tostring(frame, encoding="unicode") + "\n")
    print(f"Updated {target.name}")
