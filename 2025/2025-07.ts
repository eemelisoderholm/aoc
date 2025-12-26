import { A } from "../common/array.ts";
import { M } from "../common/math.ts";
import { V2, Vec2, Vec2Set } from "../common/vector2.ts";

type Diagram = {
  start: Vec2;
  bounds: Vec2;
  splitters: Vec2Set;
};

const parseDiagram = (input: string): Diagram => {
  const splitters = V2.setFromCharGrid(input, (c) => c === "^");
  const start = V2.setFromCharGrid(input, (c) => c === "S").vals[0];
  const bounds = V2.max(start, ...splitters.vals);
  return { start, splitters, bounds };
};

function resolveBeams({ start, splitters, bounds }: Diagram) {
  const initial = {
    beams: new V2.Map<number>([[start, 1]]), // [position, timelines]
    splits: 0,
  };
  const { beams, splits } = A.range(bounds.y + 1).reduce(
    ({ beams, splits }) => {
      const next = new V2.Map<number>();
      for (const [beam, timelines] of beams.entries()) {
        const target = V2.getDirectionsAround(beam);
        // Beam continues down unless there is a splitter below it
        const beams = splitters.has(target.south)
          ? [target.southWest, target.southEast]
          : [target.south];
        // Create next beams, incrementing timelines in their positions
        beams.forEach((b) => next.set(b, (next.get(b) ?? 0) + timelines));
        splits += beams.length - 1;
      }
      return { beams: next, splits };
    },
    initial,
  );
  return { splits, timelines: M.sum(beams.vals) };
}

// "Analyze your manifold diagram. How many times will the beam be split?"
export function part1(input: string) {
  const diagram = parseDiagram(input);
  return resolveBeams(diagram).splits;
}

// "In total, how many timelines would a single tachyon particle end up on?"
export function part2(input: string) {
  const diagram = parseDiagram(input);
  return resolveBeams(diagram).timelines;
}
