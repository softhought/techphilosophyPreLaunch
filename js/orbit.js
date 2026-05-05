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

function createOrbitAnimation({ path1Id, path2Id, ball1Id, ball2Id, cacheKey }) {
  const {
    cx,
    cy,
    resolution,
    a,
    b,
    angleTilt,
    initialTime,
    speed,
  } = ORBIT_CONFIG;

  const maxAngles = 360 * resolution;
  let trackBounds = Array.from({ length: maxAngles }, () => ({
    min: Infinity,
    max: 0,
  }));

  let animationId = null;
  let time = initialTime;

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

    const gapWidth = bounds.max - bounds.min;

    if (bounds.min !== Infinity && gapWidth > 2) {
      ballGroup.style.opacity = 1;

      const trackRadius = (bounds.min + bounds.max) / 2;
      const actualX = cx + trackRadius * Math.cos(angleRad);
      const actualY = cy + trackRadius * Math.sin(angleRad);

      ballGroup.setAttribute("transform", `translate(${actualX}, ${actualY})`);

      const ballRadius = gapWidth / 3;
      const core = ballGroup.querySelector(".core");
      const ring = ballGroup.querySelector(".ring");

      core?.setAttribute("r", ballRadius);
      ring?.setAttribute("r", Math.max(ballRadius - 0.5, 0.5));
    } else {
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

function initCurveBallMobile() {
  const path = document.getElementById("curveTopMobile");
  const ball = document.getElementById("movingBallMobile");

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

    const offset = 5.5;

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
    cacheKey: "orbitBoundsHero",
  });

  createOrbitAnimation({
    path1Id: "orbitPath1Center",
    path2Id: "orbitPath2Center",
    ball1Id: "ball1Center",
    ball2Id: "ball2Center",
    cacheKey: "orbitBoundsCenter",
  });

  createOrbitAnimation({
    path1Id: "orbitPath1About",
    path2Id: "orbitPath2About",
    ball1Id: "ball1About",
    ball2Id: "ball2About",
    cacheKey: "orbitBoundsAbout",
  });

  initCurveBall();
});