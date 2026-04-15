import { BufferGeometry, Float32BufferAttribute } from 'three';
import type { StairConfig } from '../config/types';
import { computeMetrics } from '../config/metrics';

const ARC_SEGMENTS = 12;

export function buildStepGeometry(cfg: StairConfig, k: number): BufferGeometry {
  const { riseHeight, stepAngle, columnRadius } = computeMetrics(cfg);
  const a0 = (k * stepAngle) * Math.PI / 180;
  const a1 = ((k + 1) * stepAngle) * Math.PI / 180;
  const sign = cfg.direction === 'CW' ? 1 : -1;
  const yTop = (k + 1) * riseHeight;
  const yBot = yTop - cfg.stepThickness;
  const rIn = columnRadius;
  const rOut = cfg.outerRadius + cfg.nosingOvershoot;

  const positions: number[] = [];
  const indices: number[] = [];
  const topRing: number[] = [];
  const botRing: number[] = [];

  for (let i = 0; i <= ARC_SEGMENTS; i++) {
    const t = i / ARC_SEGMENTS;
    const a = sign * (a0 + (a1 - a0) * t);
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    topRing.push(positions.length / 3); positions.push(rIn  * cos, yTop, rIn  * sin);
    topRing.push(positions.length / 3); positions.push(rOut * cos, yTop, rOut * sin);
    botRing.push(positions.length / 3); positions.push(rIn  * cos, yBot, rIn  * sin);
    botRing.push(positions.length / 3); positions.push(rOut * cos, yBot, rOut * sin);
  }

  for (let i = 0; i < ARC_SEGMENTS; i++) {
    const a = i * 2;
    const b = (i + 1) * 2;
    const iT_a = topRing[a]!;
    const oT_a = topRing[a + 1]!;
    const iT_b = topRing[b]!;
    const oT_b = topRing[b + 1]!;
    const iB_a = botRing[a]!;
    const oB_a = botRing[a + 1]!;
    const iB_b = botRing[b]!;
    const oB_b = botRing[b + 1]!;

    // Top face
    indices.push(iT_a, oT_a, oT_b, iT_a, oT_b, iT_b);
    // Bottom face (reverse winding)
    indices.push(iB_a, oB_b, oB_a, iB_a, iB_b, oB_b);
    // Outer arc wall
    indices.push(oT_a, oB_a, oB_b, oT_a, oB_b, oT_b);
    // Inner arc wall (reverse winding)
    indices.push(iT_a, iT_b, iB_b, iT_a, iB_b, iB_a);
  }

  // Riser front at a0 (first arc position)
  const iT0 = topRing[0]!;
  const oT0 = topRing[1]!;
  const iB0 = botRing[0]!;
  const oB0 = botRing[1]!;
  indices.push(iT0, iB0, oB0, iT0, oB0, oT0);

  // Back closure at a1 (last arc position)
  const last = ARC_SEGMENTS * 2;
  const iTN = topRing[last]!;
  const oTN = topRing[last + 1]!;
  const iBN = botRing[last]!;
  const oBN = botRing[last + 1]!;
  indices.push(iTN, oBN, iBN, iTN, oTN, oBN);

  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
