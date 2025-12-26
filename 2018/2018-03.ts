import { V2, Vec2, Vec2Map } from "../common/vector2.ts";

type Claim = {
  id: number;
  position: Vec2;
  size: Vec2;
};

const parseClaim = (line: string): Claim => {
  const match = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  if (!match) throw new Error(`Invalid claim: ${line}`);
  const [, id, left, top, width, height] = match.map((n) => parseInt(n));
  return {
    id,
    position: { x: left, y: top },
    size: { x: width, y: height },
  };
};

const getClaimsMap = (claims: Claim[]): Vec2Map<number> => {
  const map = new V2.Map<number>();
  for (const claim of claims) {
    for (let x = claim.position.x; x < claim.position.x + claim.size.x; x++) {
      for (let y = claim.position.y; y < claim.position.y + claim.size.y; y++) {
        const position = { x, y };
        const value = map.get(position) || 0;
        map.set(position, value + 1);
      }
    }
  }
  return map;
};

const getMultiClaimedPositionsTotal = (claimMap: Vec2Map<number>): number =>
  Array.from(claimMap.values()).filter((n) => n > 1).length;

const findFullyExclusiveClaimId = (
  claims: Claim[],
  claimsMap: Vec2Map<number>,
): number => {
  const isExclusive = (claim: Claim): boolean => {
    for (let x = claim.position.x; x < claim.position.x + claim.size.x; x++) {
      for (let y = claim.position.y; y < claim.position.y + claim.size.y; y++) {
        const position = { x, y };
        const claims = claimsMap.get(position) ?? 0;
        if (claims > 1) return false;
      }
    }
    return true;
  };
  const exclusiveClaim = claims.find(isExclusive);
  if (!exclusiveClaim) throw new Error("Could not find exclusive claim");
  return exclusiveClaim.id;
};

// "How many square inches of fabric are within two or more claims?"
export function part1(input: string): number {
  const claims = input.split("\n").map(parseClaim);
  const claimsMap = getClaimsMap(claims);
  return getMultiClaimedPositionsTotal(claimsMap);
}

// "What is the ID of the only claim that doesn't overlap?"
export function part2(input: string): number {
  const claims = input.split("\n").map(parseClaim);
  const claimsMap = getClaimsMap(claims);
  return findFullyExclusiveClaimId(claims, claimsMap);
}
