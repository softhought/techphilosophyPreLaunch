const ORBIT_CONFIG = {
  cx: 660,
  cy: 250,
  resolution: 10,
  a: 648,
  b: 240,
  angleTilt: 2 * (Math.PI / 180),
  initialTime: 3.65,
  speed: 0.004,
};

function createOrbitAnimation({
  path1Id,
  path2Id,
  ball1Id,
  ball2Id,
  cacheKey,
  config,
  startDelay = 0,
}) {
  const {
    cx,
    cy,
    resolution,
    a,
    b,
    angleTilt,
    initialTime,
    speed,
    ballSizeMultiplier = 1,
  } = { ...ORBIT_CONFIG, ...config };

  const maxAngles = 360 * resolution;
  const minGapWidth = 2;
  const narrowSmoothGapWidth = 14;
  const repairWindow = 4;
  let trackBounds = Array.from({ length: maxAngles }, () => ({
    min: Infinity,
    max: 0,
  }));

  let animationId = null;
  let time = initialTime;
  const narrowStates = new WeakMap();

  function isVisibleBound(bounds) {
    return bounds.min !== Infinity && bounds.max - bounds.min > minGapWidth;
  }

  function getRepairedBounds(angleIndex) {
    let previous = null;
    let next = null;
    let previousOffset = 0;
    let nextOffset = 0;

    for (let offset = 1; offset <= repairWindow; offset++) {
      const previousBounds =
        trackBounds[(angleIndex - offset + maxAngles) % maxAngles];
      const nextBounds = trackBounds[(angleIndex + offset) % maxAngles];

      if (!previous && isVisibleBound(previousBounds)) {
        previous = previousBounds;
        previousOffset = offset;
      }

      if (!next && isVisibleBound(nextBounds)) {
        next = nextBounds;
        nextOffset = offset;
      }

      if (previous && next) break;
    }

    if (!previous || !next) return null;

    const ratio = previousOffset / (previousOffset + nextOffset);

    return {
      min: previous.min + (next.min - previous.min) * ratio,
      max: previous.max + (next.max - previous.max) * ratio,
    };
  }

  function mapPathDataAsync(pathId, done) {
    const path = document.getElementById(pathId);
    if (!path) {
      done && done();
      return;
    }

    const len = path.getTotalLength();
    let i = 0;

    function processChunk() {
      const chunkSize = 200;

      for (let count = 0; count < chunkSize && i < len; count++, i += 0.5) {
        const pt = path.getPointAtLength(i);

        const dx = pt.x - cx;
        const dy = pt.y - cy;
        const dist = Math.hypot(dx, dy);

        let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 360;
        angleDeg %= 360;

        let angleIndex = Math.floor(angleDeg * resolution);

        trackBounds[angleIndex].min = Math.min(
          trackBounds[angleIndex].min,
          dist,
        );
        trackBounds[angleIndex].max = Math.max(
          trackBounds[angleIndex].max,
          dist,
        );
      }

      if (i < len) {
        requestAnimationFrame(processChunk);
      } else {
        done && done();
      }
    }

    processChunk();
  }

  function updateBall(ballGroup, t) {
    if (!ballGroup) return;

    let idealX = a * Math.cos(t);
    let idealY = b * Math.sin(t);

    let tiltX =
      cx + (idealX * Math.cos(angleTilt) - idealY * Math.sin(angleTilt));
    let tiltY =
      cy + (idealX * Math.sin(angleTilt) + idealY * Math.cos(angleTilt));

    let dx = tiltX - cx;
    let dy = tiltY - cy;
    let angleRad = Math.atan2(dy, dx);

    let angleDeg = (angleRad * 180) / Math.PI + 360;
    angleDeg %= 360;

    let angleIndex = Math.floor(angleDeg * resolution);
    let bounds = trackBounds[angleIndex];

    if (bounds.min === Infinity) {
      let bPrev = trackBounds[(angleIndex - 1 + maxAngles) % maxAngles];
      let bNext = trackBounds[(angleIndex + 1) % maxAngles];
      if (bPrev.min !== Infinity) bounds = bPrev;
      else if (bNext.min !== Infinity) bounds = bNext;
    }

    let gapWidth = bounds.max - bounds.min;

    if (bounds.min !== Infinity && gapWidth <= minGapWidth) {
      const repairedBounds = getRepairedBounds(angleIndex);

      if (repairedBounds) {
        bounds = repairedBounds;
        gapWidth = bounds.max - bounds.min;
      }
    }

    if (bounds.min !== Infinity && gapWidth > minGapWidth) {
      ballGroup.style.opacity = 1;

      let trackRadius = (bounds.min + bounds.max) / 2;
      let ballRadius = gapWidth / 3;

      if (gapWidth <= narrowSmoothGapWidth) {
        const state = narrowStates.get(ballGroup) || {
          trackRadius,
          ballRadius,
        };

        state.trackRadius += (trackRadius - state.trackRadius) * 0.45;
        state.ballRadius += (ballRadius - state.ballRadius) * 0.45;
        narrowStates.set(ballGroup, state);

        trackRadius = state.trackRadius;
        ballRadius = state.ballRadius;
      } else {
        narrowStates.delete(ballGroup);
      }

      const actualX = cx + trackRadius * Math.cos(angleRad);
      const actualY = cy + trackRadius * Math.sin(angleRad);

      ballGroup.setAttribute("transform", `translate(${actualX}, ${actualY})`);

      const core = ballGroup.querySelector(".core");
      const ring = ballGroup.querySelector(".ring");

      const finalRadius = ballRadius * ballSizeMultiplier;
      core?.setAttribute("r", finalRadius);
      ring?.setAttribute("r", Math.max(finalRadius - 0.5, 0.5));
    } else {
      narrowStates.delete(ballGroup);
      ballGroup.style.opacity = 0;
    }
  }

  function animateOrbit(ball1, ball2) {
    function loop() {
      updateBall(ball1, time);
      updateBall(ball2, time + Math.PI);
      time -= speed;
      animationId = requestAnimationFrame(loop);
    }

    if (startDelay > 0) {
      window.setTimeout(loop, startDelay);
      return;
    }

    loop();
  }

  function init() {
    const ball1 = document.getElementById(ball1Id);
    const ball2 = document.getElementById(ball2Id);

    if (!ball1 || !ball2) {
      requestAnimationFrame(init);
      return;
    }

    const cached = cacheKey ? sessionStorage.getItem(cacheKey) : null;

    if (cached) {
      trackBounds = JSON.parse(cached);
      animateOrbit(ball1, ball2);
    } else {
      mapPathDataAsync(path1Id, () => {
        mapPathDataAsync(path2Id, () => {
          if (cacheKey) {
            sessionStorage.setItem(cacheKey, JSON.stringify(trackBounds));
          }
          animateOrbit(ball1, ball2);
        });
      });
    }
  }

  init();

  window.addEventListener("beforeunload", () => {
    if (animationId) cancelAnimationFrame(animationId);
  });
}


function initCurveBall() {
  const path = document.getElementById("curveTop");
  const ball = document.getElementById("movingBall");

  if (!path || !ball) return;

  const length = path.getTotalLength();
  let t = 0;

  function animate() {
    const current = path.getPointAtLength(t);
    const next = path.getPointAtLength((t + 1) % length);

    const dx = next.x - current.x;
    const dy = next.y - current.y;

    const mag = Math.hypot(dx, dy);
    const nx = -dy / mag;
    const ny = dx / mag;

    const offset = 7;

    const x = current.x + nx * offset;
    const y = current.y + ny * offset;

    ball.setAttribute("transform", `translate(${x}, ${y})`);

    t += 1.5;
    if (t > length) t = 0;

    requestAnimationFrame(animate);
  }

  animate();
}

window.addEventListener("DOMContentLoaded", () => {
  createOrbitAnimation({
    path1Id: "orbitPath1",
    path2Id: "orbitPath2",
    ball1Id: "ball1",
    ball2Id: "ball2",
    cacheKey: "orbitBoundsHeroV2",
    startDelay: 920,
  });

  createOrbitAnimation({
    path1Id: "orbitPath1Center",
    path2Id: "orbitPath2Center",
    ball1Id: "ball1Center",
    ball2Id: "ball2Center",
    cacheKey: "orbitBoundsCenterV2",
  });

  createOrbitAnimation({
    path1Id: "orbitPath1About",
    path2Id: "orbitPath2About",
    ball1Id: "ball1About",
    ball2Id: "ball2About",
    cacheKey: "orbitBoundsAboutV2",
  });

  createOrbitAnimation({
    path1Id: "orbitPath1Mobile",
    path2Id: "orbitPath2Mobile",
    ball1Id: "ball1Mobile",
    ball2Id: "ball2Mobile",
    cacheKey: "orbitBoundsMobileV1",
    config: { cx: 177, cy: 125, a: 165, b: 110, angleTilt: 2 * (Math.PI / 180), ballSizeMultiplier: 1.6 },
  });

  createOrbitAnimation({
    path1Id: "orbitPath1Mobile2",
    path2Id: "orbitPath2Mobile2",
    ball1Id: "ball1Mobile2",
    ball2Id: "ball2Mobile2",
    cacheKey: "orbitBoundsMobile2V1",
    config: { cx: 177, cy: 125, a: 165, b: 110, angleTilt: 2 * (Math.PI / 180), ballSizeMultiplier: 1.6 },
  });

  initCurveBall();
});
