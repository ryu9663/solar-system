// 🌌 3D 태양계 시뮬레이션
// Three.js 기반 - API 키 불필요

// ===== 행성 데이터 =====
const planetData = {
    sun: {
        name: '태양',
        nameEn: 'Sun',
        radius: 5,
        color: 0xffdd00,
        emissive: 0xff8800,
        distance: 0,
        orbitSpeed: 0,
        rotationSpeed: 0.002,
        info: '태양은 우리 태양계의 중심에 있는 항성입니다.',
        diameter: '1,391,000 km',
        mass: '1.989 × 10³⁰ kg',
        temperature: '5,500°C (표면)',
        type: '황색 왜성'
    },
    mercury: {
        name: '수성',
        nameEn: 'Mercury',
        radius: 0.4,
        color: 0xaaaaaa,
        distance: 10,
        orbitSpeed: 0.04,
        rotationSpeed: 0.005,
        info: '수성은 태양계에서 가장 작고 가장 안쪽에 있는 행성입니다.',
        diameter: '4,879 km',
        distanceFromSun: '5,790만 km',
        orbitalPeriod: '88일',
        moons: '0개'
    },
    venus: {
        name: '금성',
        nameEn: 'Venus',
        radius: 0.9,
        color: 0xffcc66,
        distance: 15,
        orbitSpeed: 0.015,
        rotationSpeed: 0.003,
        info: '금성은 지구와 크기가 비슷하며 밤하늘에서 가장 밝게 빛납니다.',
        diameter: '12,104 km',
        distanceFromSun: '1억 820만 km',
        orbitalPeriod: '225일',
        moons: '0개'
    },
    earth: {
        name: '지구',
        nameEn: 'Earth',
        radius: 1,
        color: 0x2288ff,
        distance: 20,
        orbitSpeed: 0.01,
        rotationSpeed: 0.01,
        info: '지구는 생명체가 존재하는 것으로 알려진 유일한 행성입니다.',
        diameter: '12,742 km',
        distanceFromSun: '1억 4,960만 km',
        orbitalPeriod: '365.25일',
        moons: '1개 (달)'
    },
    mars: {
        name: '화성',
        nameEn: 'Mars',
        radius: 0.5,
        color: 0xff4422,
        distance: 28,
        orbitSpeed: 0.008,
        rotationSpeed: 0.009,
        info: '화성은 "붉은 행성"으로 불리며 인류의 다음 탐사 목표입니다.',
        diameter: '6,779 km',
        distanceFromSun: '2억 2,790만 km',
        orbitalPeriod: '687일',
        moons: '2개 (포보스, 데이모스)'
    },
    jupiter: {
        name: '목성',
        nameEn: 'Jupiter',
        radius: 2.5,
        color: 0xffaa77,
        distance: 40,
        orbitSpeed: 0.002,
        rotationSpeed: 0.02,
        info: '목성은 태양계에서 가장 큰 행성이며 거대한 가스 행성입니다.',
        diameter: '139,820 km',
        distanceFromSun: '7억 7,860만 km',
        orbitalPeriod: '11.86년',
        moons: '95개+'
    },
    saturn: {
        name: '토성',
        nameEn: 'Saturn',
        radius: 2,
        color: 0xeecc88,
        distance: 55,
        orbitSpeed: 0.0009,
        rotationSpeed: 0.018,
        hasRing: true,
        info: '토성은 아름다운 고리로 유명한 가스 거대 행성입니다.',
        diameter: '116,460 km',
        distanceFromSun: '14억 3,400만 km',
        orbitalPeriod: '29.46년',
        moons: '146개+'
    },
    uranus: {
        name: '천왕성',
        nameEn: 'Uranus',
        radius: 1.5,
        color: 0x66ddff,
        distance: 70,
        orbitSpeed: 0.0004,
        rotationSpeed: 0.015,
        info: '천왕성은 옆으로 누워서 자전하는 독특한 얼음 거대 행성입니다.',
        diameter: '50,724 km',
        distanceFromSun: '28억 7,100만 km',
        orbitalPeriod: '84년',
        moons: '27개'
    },
    neptune: {
        name: '해왕성',
        nameEn: 'Neptune',
        radius: 1.4,
        color: 0x3355ff,
        distance: 85,
        orbitSpeed: 0.0001,
        rotationSpeed: 0.012,
        info: '해왕성은 태양계의 가장 바깥쪽 행성이며 강한 바람으로 유명합니다.',
        diameter: '49,244 km',
        distanceFromSun: '45억 km',
        orbitalPeriod: '165년',
        moons: '16개'
    }
};

// ===== 전역 변수 =====
let scene, camera, renderer, controls;
let planets = {};
let orbits = {};
let labels = [];
let animationSpeed = 1;
let showOrbits = true;
let showLabels = true;
let selectedPlanet = null;

// ===== 초기화 =====
function init() {
    // 씬 생성
    scene = new THREE.Scene();
    
    // 카메라 설정
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.set(50, 50, 100);
    
    // 렌더러 설정
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000011);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // 카메라 컨트롤
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 300;
    controls.enablePan = true;
    
    // 조명
    createLights();
    
    // 별 배경
    createStars();
    
    // 태양계 생성
    createSolarSystem();
    
    // 이벤트 리스너
    setupEventListeners();
    
    // 애니메이션 시작
    animate();
}

// ===== 조명 설정 =====
function createLights() {
    // 태양 빛 (포인트 라이트)
    const sunLight = new THREE.PointLight(0xffffff, 2, 500);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // 부드러운 환경광
    const ambientLight = new THREE.AmbientLight(0x333344, 0.5);
    scene.add(ambientLight);
}

// ===== 별 배경 생성 =====
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for(let i = 0; i < starCount * 3; i += 3) {
        // 랜덤 위치 (구 형태로 분포)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 500 + Math.random() * 500;
        
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
        
        // 다양한 색상
        const colorChoice = Math.random();
        if(colorChoice < 0.7) {
            // 흰색
            colors[i] = 1;
            colors[i + 1] = 1;
            colors[i + 2] = 1;
        } else if(colorChoice < 0.85) {
            // 파란색
            colors[i] = 0.7;
            colors[i + 1] = 0.85;
            colors[i + 2] = 1;
        } else {
            // 노란색
            colors[i] = 1;
            colors[i + 1] = 0.95;
            colors[i + 2] = 0.7;
        }
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// ===== 태양계 생성 =====
function createSolarSystem() {
    Object.keys(planetData).forEach(key => {
        const data = planetData[key];
        
        if(key === 'sun') {
            createSun(data);
        } else {
            createPlanet(key, data);
        }
    });
}

// ===== 태양 생성 =====
function createSun(data) {
    // 태양 메쉬
    const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
    const material = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.9
    });
    
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);
    planets.sun = sun;
    
    // 태양 글로우 효과
    const glowGeometry = new THREE.SphereGeometry(data.radius * 1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // 외부 글로우
    const outerGlowGeometry = new THREE.SphereGeometry(data.radius * 1.5, 32, 32);
    const outerGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4400,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const outerGlow = new THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
    scene.add(outerGlow);
    
    // 라벨
    createLabel('sun', data.name, sun);
}

// ===== 행성 생성 =====
function createPlanet(key, data) {
    // 행성을 담을 컨테이너 (공전용)
    const orbitContainer = new THREE.Object3D();
    scene.add(orbitContainer);
    
    // 행성 메쉬
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        color: data.color,
        shininess: 30
    });
    
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = data.distance;
    orbitContainer.add(planet);
    
    // 토성 고리
    if(data.hasRing) {
        createRing(planet, data);
    }
    
    planets[key] = {
        mesh: planet,
        container: orbitContainer,
        data: data
    };
    
    // 궤도 생성
    createOrbit(key, data.distance);
    
    // 라벨
    createLabel(key, data.name, planet);
}

// ===== 토성 고리 =====
function createRing(planet, data) {
    const innerRadius = data.radius * 1.4;
    const outerRadius = data.radius * 2.5;
    
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xccaa77,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    planet.add(ring);
}

// ===== 궤도 생성 =====
function createOrbit(key, distance) {
    const points = [];
    const segments = 128;
    
    for(let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(
            Math.cos(theta) * distance,
            0,
            Math.sin(theta) * distance
        ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0x4466aa,
        transparent: true,
        opacity: 0.3
    });
    
    const orbit = new THREE.Line(geometry, material);
    scene.add(orbit);
    orbits[key] = orbit;
}

// ===== 라벨 생성 =====
function createLabel(key, name, parentMesh) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label';
    labelDiv.textContent = name;
    labelDiv.style.cssText = `
        position: fixed;
        color: white;
        font-size: 12px;
        font-weight: 500;
        text-shadow: 0 0 10px rgba(100, 170, 255, 0.8);
        pointer-events: none;
        z-index: 50;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(labelDiv);
    
    labels.push({
        key: key,
        element: labelDiv,
        mesh: parentMesh
    });
}

// ===== 라벨 위치 업데이트 =====
function updateLabels() {
    labels.forEach(label => {
        let mesh = label.mesh;
        
        // 행성인 경우 월드 좌표 계산
        if(planets[label.key] && planets[label.key].mesh) {
            mesh = planets[label.key].mesh;
        }
        
        // 월드 좌표 가져오기
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);
        
        // 화면 좌표로 변환
        const vector = worldPos.clone();
        vector.project(camera);
        
        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;
        
        // 카메라 뒤에 있으면 숨김
        if(vector.z > 1) {
            label.element.style.opacity = '0';
        } else {
            label.element.style.opacity = showLabels ? '1' : '0';
            label.element.style.left = `${x}px`;
            label.element.style.top = `${y - 25}px`;
        }
    });
}

// ===== 이벤트 리스너 =====
function setupEventListeners() {
    // 창 크기 변경
    window.addEventListener('resize', onWindowResize);
    
    // 속도 슬라이더
    document.getElementById('speed-slider').addEventListener('input', (e) => {
        animationSpeed = parseFloat(e.target.value);
        document.getElementById('speed-value').textContent = `${animationSpeed}x`;
    });
    
    // 궤도 토글
    document.getElementById('orbit-toggle').addEventListener('change', (e) => {
        showOrbits = e.target.checked;
        Object.values(orbits).forEach(orbit => {
            orbit.visible = showOrbits;
        });
    });
    
    // 라벨 토글
    document.getElementById('labels-toggle').addEventListener('change', (e) => {
        showLabels = e.target.checked;
    });
    
    // 행성 버튼
    document.querySelectorAll('#planet-buttons button').forEach(btn => {
        btn.addEventListener('click', () => {
            const planetKey = btn.dataset.planet;
            focusOnPlanet(planetKey);
            
            // 활성 버튼 스타일
            document.querySelectorAll('#planet-buttons button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // 클릭으로 행성 선택
    renderer.domElement.addEventListener('click', onPlanetClick);
}

// ===== 행성 클릭 =====
function onPlanetClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    // 모든 행성 메쉬 수집
    const meshes = [];
    Object.entries(planets).forEach(([key, value]) => {
        if(key === 'sun') {
            meshes.push({ key, mesh: value });
        } else {
            meshes.push({ key, mesh: value.mesh });
        }
    });
    
    const intersects = raycaster.intersectObjects(meshes.map(m => m.mesh));
    
    if(intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const planetEntry = meshes.find(m => m.mesh === clickedMesh);
        
        if(planetEntry) {
            focusOnPlanet(planetEntry.key);
            
            // 버튼 활성화
            document.querySelectorAll('#planet-buttons button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.planet === planetEntry.key);
            });
        }
    }
}

// ===== 행성 포커스 =====
function focusOnPlanet(planetKey) {
    selectedPlanet = planetKey;
    const data = planetData[planetKey];
    
    // 정보 업데이트
    updatePlanetInfo(planetKey, data);
    
    // 카메라 이동
    let targetPos;
    
    if(planetKey === 'sun') {
        targetPos = new THREE.Vector3(0, 0, 0);
    } else {
        const planet = planets[planetKey];
        targetPos = new THREE.Vector3();
        planet.mesh.getWorldPosition(targetPos);
    }
    
    // 부드러운 카메라 이동
    const distance = data.radius * 10 + 10;
    const cameraTarget = new THREE.Vector3(
        targetPos.x + distance * 0.5,
        targetPos.y + distance * 0.3,
        targetPos.z + distance * 0.5
    );
    
    // 애니메이션 (간단한 선형 보간)
    const duration = 1000;
    const startPos = camera.position.clone();
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        
        camera.position.lerpVectors(startPos, cameraTarget, eased);
        controls.target.lerp(targetPos, eased * 0.1);
        
        if(progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// ===== 행성 정보 업데이트 =====
function updatePlanetInfo(key, data) {
    const infoPanel = document.getElementById('planet-info');
    
    let html = `
        <div class="planet-detail">
            <h3>${data.name} (${data.nameEn})</h3>
            <p>${data.info}</p>
            <div style="margin-top: 15px;">
    `;
    
    if(key === 'sun') {
        html += `
            <div class="planet-stat"><span class="stat-label">지름</span><span class="stat-value">${data.diameter}</span></div>
            <div class="planet-stat"><span class="stat-label">질량</span><span class="stat-value">${data.mass}</span></div>
            <div class="planet-stat"><span class="stat-label">표면 온도</span><span class="stat-value">${data.temperature}</span></div>
            <div class="planet-stat"><span class="stat-label">분류</span><span class="stat-value">${data.type}</span></div>
        `;
    } else {
        html += `
            <div class="planet-stat"><span class="stat-label">지름</span><span class="stat-value">${data.diameter}</span></div>
            <div class="planet-stat"><span class="stat-label">태양까지 거리</span><span class="stat-value">${data.distanceFromSun}</span></div>
            <div class="planet-stat"><span class="stat-label">공전 주기</span><span class="stat-value">${data.orbitalPeriod}</span></div>
            <div class="planet-stat"><span class="stat-label">위성</span><span class="stat-value">${data.moons}</span></div>
        `;
    }
    
    html += '</div></div>';
    infoPanel.innerHTML = html;
}

// ===== 창 크기 변경 =====
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===== 애니메이션 루프 =====
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // 태양 자전
    if(planets.sun) {
        planets.sun.rotation.y += planetData.sun.rotationSpeed * animationSpeed;
    }
    
    // 행성 공전 및 자전
    Object.keys(planets).forEach(key => {
        if(key === 'sun') return;
        
        const planet = planets[key];
        const data = planet.data;
        
        // 공전
        planet.container.rotation.y += data.orbitSpeed * animationSpeed;
        
        // 자전
        planet.mesh.rotation.y += data.rotationSpeed * animationSpeed;
    });
    
    // 라벨 업데이트
    updateLabels();
    
    // 컨트롤 업데이트
    controls.update();
    
    // 렌더링
    renderer.render(scene, camera);
}

// ===== 시작 =====
init();
