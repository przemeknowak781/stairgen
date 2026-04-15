import { BufferGeometry, Float32BufferAttribute } from 'three';
import type { StairConfig } from '../config/types';
import { computeMetrics } from '../config/metrics';

export function buildSoffitGeometry(cfg: StairConfig): BufferGeometry {
  if (cfg.soffitMode === 'stepped') return buildStepped(cfg);
  if (cfg.soffitMode === 'smooth_helix') return buildSmoothHelix(cfg, cfg.soffitThickness);
  return buildSmoothHelix(cfg, cfg.soffitThickness + cfg.stepThickness);
}

function buildStepped(cfg: StairConfig): BufferGeometry {
  if (!cfg.risersEnabled) return new BufferGeometry();
  const { riseHeight, stepAngle, columnRadius } = computeMetrics(cfg);
  const rIn = columnRadius;
  const rOut = cfg.outerRadius;
  const sign = cfg.direction === 'CW' ? 1 : -1;

  const positions: number[] = [];
  const indices: number[] = [];

  for (let k = 1; k < cfg.stepCount; k++) {
    const a = sign * (k * stepAngle) * Math.PI / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    const yTop = k * riseHeight;
    const yBot = yTop - riseHeight;
    const base = positions.length / 3;
    positions.push(rIn * cos, yTop, rIn * sin);
    positions.push(rOut * cos, yTop, rOut * sin);
    positions.push(rIn * cos, yBot, rIn * sin);
    positions.push(rOut * cos, yBot, rOut * sin);
    indices.push(base, base + 2, base + 3, base, base + 3, base + 1);
  }

  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

function buildSmoothHelix(cfg: StairConfig, thickness: number): BufferGeometry {
  const { columnRadius } = computeMetrics(cfg);
  const N = Math.max(cfg.stepCount * 8, 128);
  const sweepRad = cfg.sweepAngle * Math.PI / 180;
  const sign = cfg.direction === 'CW' ? 1 : -1;
  const rIn = columnRadius + cfg.soffitInset;
  const rOut = cfg.outerRadius;
  const H = cfg.totalHeight;

  const positions: number[] = [];
  const indices: number[] = [];

  // Each i has 4 vertices: iTop, oTop, iBot, oBot (base index = i*4)
  for (let i = 0; i <= N; i++) {
    const a = sign * (i / N) * sweepRad;
    const y = (i / N) * H;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    positions.push(rIn * cos,  y,             rIn * sin);
    positions.push(rOut * cos, y,             rOut * sin);
    positions.push(rIn * cos,  y - thickness, rIn * sin);
    positions.push(rOut * cos, y - thickness, rOut * sin);
  }

  const ring = (ix: number) => ({ iT: ix * 4, oT: ix * 4 + 1, iB: ix * 4 + 2, oB: ix * 4 + 3 });

  for (let i = 0; i < N; i++) {
    const A = ring(i);
    const B = ring(i + 1);
    // Top shell (inner → outer)
    indices.push(A.iT, A.oT, B.oT, A.iT, B.oT, B.iT);
    // Bottom shell (reverse)
    indices.push(A.iB, B.oB, A.oB, A.iB, B.iB, B.oB);
    // Outer side
    indices.push(A.oT, A.oB, B.oB, A.oT, B.oB, B.oT);
    // Inner side (reverse)
    indices.push(A.iT, B.iB, A.iB, A.iT, B.iT, B.iB);
  }

  // End caps
  const s0 = ring(0);
  indices.push(s0.iT, s0.iB, s0.oB, s0.iT, s0.oB, s0.oT);
  const sN = ring(N);
  indices.push(sN.iT, sN.oB, sN.iB, sN.iT, sN.oT, sN.oB);

  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
