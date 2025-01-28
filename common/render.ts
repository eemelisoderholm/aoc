import { Line } from "./line.ts";
import { V2 } from "./vector2.ts";
import { Vec2Map } from "./vector2.ts";
import { Vec2 } from "./vector2.ts";

interface GridElements {
  cells?: Vec2[][]; // Boxes in the grid, drawing a box to cover the given cell with color
  points?: Vec2[][]; // Points in the grid, drawing a small colored circle in the given point
  lines?: Line[][]; // Lines in the grid, drawing a thin line from one point to another
}

const directionArrows: Vec2Map<string> = new V2.Map([
  [V2.directions.north, "↑"],
  [V2.directions.northEast, "↗"],
  [V2.directions.east, "→"],
  [V2.directions.southEast, "↘"],
  [V2.directions.south, "↓"],
  [V2.directions.southWest, "↙"],
  [V2.directions.west, "←"],
  [V2.directions.northWest, "↖"],
]);

export class GridRenderer {
  private items: Vec2Map<string | Vec2> = new V2.Map();
  public add(pos: Vec2, val: string | Vec2) {
    this.items.set(pos, val);
  }
  public render(
    { empty, bounds }: { empty: string; bounds?: [Vec2, Vec2] } = {
      empty: ".",
    },
  ) {
    if (!bounds) bounds = V2.getBounds(Array.from(this.items.keys()));
    const lines: string[] = [];
    for (let y = bounds[0].y; y <= bounds[1].y; y++) {
      let line = "";
      for (let x = bounds[0].x; x <= bounds[1].x; x++) {
        const value = this.items.get({ x, y });
        if (typeof value === "undefined") {
          line += empty;
        } else if (typeof value === "string") {
          line += value;
        } else {
          line += directionArrows.get(value) ?? "?";
        }
      }
      lines.push(line);
    }
    return lines.join("\n");
  }
}

export function renderGridElementsAsSvg(
  elements: GridElements,
  size: Vec2 = { x: 100, y: 100 },
  origin: Vec2 = { x: 0, y: 0 },
) {
  const colors = [
    "rgba(255, 0, 0, 0.25)",
    "rgba(0, 255, 0, 0.25)",
    "rgba(0, 0, 255, 0.25)",
    "rgba(255, 255, 0, 0.25)",
    "rgba(255, 0, 255, 0.25)",
    "rgba(0, 255, 255, 0.25)",
    "rgba(128, 0, 0, 0.25)",
    "rgba(0, 128, 0, 0.25)",
    "rgba(0, 0, 128, 0.25)",
    "rgba(128, 128, 128, 0.25)",
  ];

  const width = size.x;
  const height = size.y;
  // Start the SVG element
  let svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background: #eee;">`;

  // Render the grid
  const gridSpacing = 10;
  for (let x = 0; x <= width; x += gridSpacing) {
    svg +=
      `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="#ccc" stroke-width="0.5" />`;
  }
  for (let y = 0; y <= height; y += gridSpacing) {
    svg +=
      `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#ccc" stroke-width="0.5" />`;
  }

  // Render cell groups
  if (elements.cells) {
    elements.cells.forEach((group, groupIndex) => {
      const color = colors[groupIndex % colors.length];
      group.forEach((cell) => {
        const x = origin.x + cell.x * gridSpacing;
        const y = origin.y + cell.y * gridSpacing;
        svg +=
          `<rect x="${x}" y="${y}" width="${gridSpacing}" height="${gridSpacing}" fill="${color}" />`;
      });
    });
  }

  // Render point groups
  if (elements.points) {
    elements.points.forEach((group, groupIndex) => {
      const color = colors[groupIndex % colors.length];
      group.forEach((point) => {
        const cx = origin.x + point.x * gridSpacing;
        const cy = origin.y + point.y * gridSpacing;
        svg += `<circle cx="${cx}" cy="${cy}" r="${
          gridSpacing / 4
        }" fill="${color}" />`;
      });
    });
  }

  // Render line groups
  if (elements.lines) {
    elements.lines.forEach((group, groupIndex) => {
      const color = colors[groupIndex % colors.length];
      group.forEach(([start, end]) => {
        const x1 = origin.x + start.x * gridSpacing;
        const y1 = origin.y + start.y * gridSpacing;
        const x2 = origin.x + end.x * gridSpacing;
        const y2 = origin.y + end.y * gridSpacing;
        svg +=
          `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" />`;
      });
    });
  }

  // Close the SVG element
  svg += "</svg>";

  return svg;
}
