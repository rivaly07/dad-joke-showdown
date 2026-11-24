#!/usr/bin/env python3
"""Write the dad joke entry to the configured make.fun output directory."""

import os
import sys
from pathlib import Path

JOKE = "I asked my dog what's two minus two. He said nothing."


def main() -> int:
    output_dir = Path(os.environ.get("MAKEFUN_OUTPUT_DIR") or "/output")
    try:
        output_dir.mkdir(parents=True, exist_ok=True)
        (output_dir / "entry.txt").write_text(
            JOKE + "\n", encoding="utf-8", newline="\n"
        )
    except OSError as exc:
        print(f"Cannot write joke to {output_dir}: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())