// 🌌 3D 태양계 시뮬레이션 - 확장 버전
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
        moons: '1개 (달)',
        satellites: ['moon']
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
        moons: '2개 (포보스, 데이모스)',
        satellites: ['phobos', 'deimos']
    },
    jupiter: {
        name: '목성',
        nameEn: 'Jupiter',
        radius: 2.5,
        color: 0xffaa77,
        distance: 45,
        orbitSpeed: 0.002,
        rotationSpeed: 0.02,
        info: '목성은 태양계에서 가장 큰 행성이며 거대한 가스 행성입니다.',
        diameter: '139,820 km',
        distanceFromSun: '7억 7,860만 km',
        orbitalPeriod: '11.86년',
        moons: '95개+',
        satellites: ['io', 'europa', 'ganymede', 'callisto']
    },
    saturn: {
        name: '토성',
        nameEn: 'Saturn',
        radius: 2,
        color: 0xeecc88,
        distance: 60,
        orbitSpeed: 0.0009,
        rotationSpeed: 0.018,
        hasRing: true,
        info: '토성은 아름다운 고리로 유명한 가스 거대 행성입니다.',
        diameter: '116,460 km',
        distanceFromSun: '14억 3,400만 km',
        orbitalPeriod: '29.46년',
        moons: '146개+',
        satellites: ['titan', 'enceladus']
    },
    uranus: {
        name: '천왕성',
        nameEn: 'Uranus',
        radius: 1.5,
        color: 0x66ddff,
        distance: 75,
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
        distance: 90,
        orbitSpeed: 0.0001,
        rotationSpeed: 0.012,
        info: '해왕성은 태양계의 가장 바깥쪽 행성이며 강한 바람으로 유명합니다.',
        diameter: '49,244 km',
        distanceFromSun: '45억 km',
        orbitalPeriod: '165년',
        moons: '16개'
    }
};

// ===== 위성 데이터 =====
const moonData = {
    // 지구의 달
    moon: {
        name: '달',
        nameEn: 'Moon',
        radius: 0.27,
        color: 0xcccccc,
        distance: 2.5,
        orbitSpeed: 0.05,
        parent: 'earth',
        info: '달은 지구의 유일한 자연 위성입니다.',
        diameter: '3,474 km'
    },
    // 화성의 위성
    phobos: {
        name: '포보스',
        nameEn: 'Phobos',
        radius: 0.08,
        color: 0x887766,
        distance: 1.2,
        orbitSpeed: 0.1,
        parent: 'mars',
        info: '포보스는 화성의 두 위성 중 더 큰 위성입니다.',
        diameter: '22.4 km'
    },
    deimos: {
        name: '데이모스',
        nameEn: 'Deimos',
        radius: 0.05,
        color: 0x998877,
        distance: 1.8,
        orbitSpeed: 0.07,
        parent: 'mars',
        info: '데이모스는 화성의 작은 바깥쪽 위성입니다.',
        diameter: '12.4 km'
    },
    // 목성의 갈릴레이 위성
    io: {
        name: '이오',
        nameEn: 'Io',
        radius: 0.28,
        color: 0xffdd44,
        distance: 4,
        orbitSpeed: 0.08,
        parent: 'jupiter',
        info: '이오는 태양계에서 가장 화산 활동이 활발한 천체입니다.',
        diameter: '3,643 km'
    },
    europa: {
        name: '유로파',
        nameEn: 'Europa',
        radius: 0.24,
        color: 0xddeeFF,
        distance: 5,
        orbitSpeed: 0.06,
        parent: 'jupiter',
        info: '유로파는 얼음 아래에 바다가 있을 것으로 추정됩니다.',
        diameter: '3,122 km'
    },
    ganymede: {
        name: '가니메데',
        nameEn: 'Ganymede',
        radius: 0.4,
        color: 0xaabbcc,
        distance: 6.5,
        orbitSpeed: 0.04,
        parent: 'jupiter',
        info: '가니메데는 태양계에서 가장 큰 위성입니다.',
        diameter: '5,268 km'
    },
    callisto: {
        name: '칼리스토',
        nameEn: 'Callisto',
        radius: 0.38,
        color: 0x667788,
        distance: 8,
        orbitSpeed: 0.03,
        parent: 'jupiter',
        info: '칼리스토는 태양계에서 세 번째로 큰 위성입니다.',
        diameter: '4,821 km'
    },
    // 토성의 위성
    titan: {
        name: '타이탄',
        nameEn: 'Titan',
        radius: 0.4,
        color: 0xffaa66,
        distance: 5,
        orbitSpeed: 0.04,
        parent: 'saturn',
        info: '타이탄은 두꺼운 대기를 가진 토성의 가장 큰 위성입니다.',
        diameter: '5,150 km'
    },
    enceladus: {
        name: '엔셀라두스',
        nameEn: 'Enceladus',
        radius: 0.15,
        color: 0xffffff,
        distance: 3.5,
        orbitSpeed: 0.08,
        parent: 'saturn',
        info: '엔셀라두스는 얼음 간헐천을 분출하는 위성입니다.',
        diameter: '504 km'
    }
};

// ===== 왜소행성 데이터 =====
const dwarfPlanetData = {
    ceres: {
        name: '세레스',
        nameEn: 'Ceres',
        radius: 0.35,
        color: 0x888888,
        distance: 36,
        orbitSpeed: 0.004,
        rotationSpeed: 0.02,
        info: '세레스는 소행성대에서 가장 큰 천체이자 왜소행성입니다.',
        diameter: '940 km',
        distanceFromSun: '4억 1,400만 km',
        orbitalPeriod: '4.6년',
        type: '왜소행성'
    },
    pluto: {
        name: '명왕성',
        nameEn: 'Pluto',
        radius: 0.18,
        color: 0xddaa88,
        distance: 105,
        orbitSpeed: 0.00004,
        rotationSpeed: 0.008,
        info: '명왕성은 2006년에 왜소행성으로 재분류되었습니다.',
        diameter: '2,377 km',
        distanceFromSun: '59억 km',
        orbitalPeriod: '248년',
        type: '왜소행성'
    },
    eris: {
        name: '에리스',
        nameEn: 'Eris',
        radius: 0.18,
        color: 0xeeeeee,
        distance: 120,
        orbitSpeed: 0.00002,
        rotationSpeed: 0.006,
        info: '에리스는 명왕성보다 질량이 큰 왜소행성입니다.',
        diameter: '2,326 km',
        distanceFromSun: '100억 km',
        orbitalPeriod: '558년',
        type: '왜소행성'
    }
};

// ===== 전역 변수 =====
let scene, camera, renderer, controls;
let planets = {};
let moons = {};
let dwarfPlanets = {};
let orbits = {};
let labels = [];
let asteroids = [];
let comets = [];
let animationSpeed = 1;
let showOrbits = true;
let showLabels = true;
let selectedPlanet = null;
let nebulaParticles;

// ===== 초기화 =====
function init() {
    // 씬 생성
    scene = new THREE.Scene();
    
    // 카메라 설정
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );
    camera.position.set(80, 60, 120);
    
    // 렌더러 설정
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000008);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // 카메라 컨트롤
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 500;
    controls.enablePan = true;
    
    // 조명
    createLights();
    
    // 은하/성운 배경
    createNebulaBackground();
    
    // 별 배경
    createStars();
    
    // 태양계 생성
    createSolarSystem();
    
    // 위성 생성
    createMoons();
    
    // 왜소행성 생성
    createDwarfPlanets();
    
    // 소행성대 생성
    createAsteroidBelt();
    
    // 혜성 생성
    createComets();
    
    // 이벤트 리스너
    setupEventListeners();
    
    // 애니메이션 시작
    animate();
}

// ===== 조명 설정 =====
function createLights() {
    // 태양 빛 (포인트 라이트)
    const sunLight = new THREE.PointLight(0xffffff, 2, 800);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // 부드러운 환경광
    const ambientLight = new THREE.AmbientLight(0x222233, 0.4);
    scene.add(ambientLight);
}

// ===== 은하/성운 배경 =====
function createNebulaBackground() {
    // 성운 파티클 시스템
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = 3000;
    const positions = new Float32Array(nebulaCount * 3);
    const colors = new Float32Array(nebulaCount * 3);
    const sizes = new Float32Array(nebulaCount);
    
    // 여러 색상의 성운
    const nebulaColors = [
        { r: 0.5, g: 0.2, b: 0.8 },  // 보라색
        { r: 0.2, g: 0.4, b: 0.9 },  // 파란색
        { r: 0.8, g: 0.3, b: 0.5 },  // 분홍색
        { r: 0.2, g: 0.7, b: 0.6 },  // 청록색
        { r: 0.9, g: 0.5, b: 0.2 },  // 주황색
    ];
    
    for(let i = 0; i < nebulaCount; i++) {
        const i3 = i * 3;
        
        // 랜덤 위치 (구 형태)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 700 + Math.random() * 800;
        
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
        
        // 랜덤 색상
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        sizes[i] = Math.random() * 15 + 5;
    }
    
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const nebulaMaterial = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    
    nebulaParticles = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebulaParticles);
    
    // 은하수 효과
    createMilkyWay();
}

// ===== 은하수 =====
function createMilkyWay() {
    const milkyWayGeometry = new THREE.BufferGeometry();
    const milkyWayCount = 8000;
    const positions = new Float32Array(milkyWayCount * 3);
    const colors = new Float32Array(milkyWayCount * 3);
    
    for(let i = 0; i < milkyWayCount; i++) {
        const i3 = i * 3;
        
        // 띠 형태로 분포
        const theta = Math.random() * Math.PI * 2;
        const spread = (Math.random() - 0.5) * 150;
        const r = 600 + Math.random() * 500;
        
        positions[i3] = r * Math.cos(theta);
        positions[i3 + 1] = spread;
        positions[i3 + 2] = r * Math.sin(theta);
        
        // 은하수 색상 (흰색 ~ 연한 파란색)
        const brightness = 0.5 + Math.random() * 0.5;
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness + Math.random() * 0.2;
    }
    
    milkyWayGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    milkyWayGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const milkyWayMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.4
    });
    
    const milkyWay = new THREE.Points(milkyWayGeometry, milkyWayMaterial);
    milkyWay.rotation.x = Math.PI / 6;
    scene.add(milkyWay);
}

// ===== 별 배경 생성 =====
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 8000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    for(let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // 랜덤 위치 (구 형태로 분포)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 500 + Math.random() * 1000;
        
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
        
        // 다양한 색상
        const colorChoice = Math.random();
        if(colorChoice < 0.6) {
            // 흰색
            colors[i3] = 1;
            colors[i3 + 1] = 1;
            colors[i3 + 2] = 1;
        } else if(colorChoice < 0.75) {
            // 파란색
            colors[i3] = 0.7;
            colors[i3 + 1] = 0.85;
            colors[i3 + 2] = 1;
        } else if(colorChoice < 0.9) {
            // 노란색
            colors[i3] = 1;
            colors[i3 + 1] = 0.95;
            colors[i3 + 2] = 0.7;
        } else {
            // 빨간색 (적색거성)
            colors[i3] = 1;
            colors[i3 + 1] = 0.6;
            colors[i3 + 2] = 0.4;
        }
        
        sizes[i] = Math.random() * 2 + 0.5;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
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
        opacity: 0.95
    });
    
    const sun = new THREE.Mesh(geometry, material);
    scene.add(sun);
    planets.sun = sun;
    
    // 태양 코로나 효과 (여러 레이어)
    const coronaLayers = [
        { scale: 1.15, color: 0xffaa00, opacity: 0.4 },
        { scale: 1.3, color: 0xff6600, opacity: 0.25 },
        { scale: 1.5, color: 0xff4400, opacity: 0.15 },
        { scale: 1.8, color: 0xff2200, opacity: 0.08 }
    ];
    
    coronaLayers.forEach(layer => {
        const glowGeometry = new THREE.SphereGeometry(data.radius * layer.scale, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: layer.color,
            transparent: true,
            opacity: layer.opacity,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        scene.add(glow);
    });
    
    // 태양 플레어 효과
    createSunFlares(data.radius);
    
    // 라벨
    createLabel('sun', data.name, sun);
}

// ===== 태양 플레어 =====
function createSunFlares(radius) {
    const flareCount = 8;
    for(let i = 0; i < flareCount; i++) {
        const flareGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 8, 8);
        const flareMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6600,
            transparent: true,
            opacity: 0.6
        });
        const flare = new THREE.Mesh(flareGeometry, flareMaterial);
        
        const angle = (i / flareCount) * Math.PI * 2;
        const distance = radius * 1.1;
        flare.position.set(
            Math.cos(angle) * distance,
            (Math.random() - 0.5) * radius,
            Math.sin(angle) * distance
        );
        
        scene.add(flare);
    }
}

// ===== 행성 생성 =====
function createPlanet(key, data) {
    // 행성을 담을 컨테이너 (공전용)
    const orbitContainer = new THREE.Object3D();
    scene.add(orbitContainer);
    
    // 행성 메쉬 (더 디테일한 재질)
    const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: data.color,
        shininess: 20,
        specular: 0x333333
    });
    
    const planet = new THREE.Mesh(geometry, material);
    planet.position.x = data.distance;
    orbitContainer.add(planet);
    
    // 토성 고리
    if(data.hasRing) {
        createRing(planet, data);
    }
    
    // 대기 효과 (지구, 금성, 타이탄)
    if(key === 'earth' || key === 'venus') {
        createAtmosphere(planet, data, key);
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

// ===== 대기 효과 =====
function createAtmosphere(planet, data, key) {
    const atmosColor = key === 'earth' ? 0x88ccff : 0xffdd88;
    const atmosGeometry = new THREE.SphereGeometry(data.radius * 1.05, 32, 32);
    const atmosMaterial = new THREE.MeshBasicMaterial({
        color: atmosColor,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    planet.add(atmosphere);
}

// ===== 토성 고리 =====
function createRing(planet, data) {
    const innerRadius = data.radius * 1.4;
    const outerRadius = data.radius * 2.8;
    
    // 여러 겹의 고리
    const ringLayers = [
        { inner: 1.4, outer: 1.8, opacity: 0.6, color: 0xccaa77 },
        { inner: 1.85, outer: 2.1, opacity: 0.4, color: 0xaa8855 },
        { inner: 2.15, outer: 2.5, opacity: 0.5, color: 0xddbb88 },
        { inner: 2.55, outer: 2.8, opacity: 0.3, color: 0xbb9966 }
    ];
    
    ringLayers.forEach(layer => {
        const ringGeometry = new THREE.RingGeometry(
            data.radius * layer.inner,
            data.radius * layer.outer,
            128
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: layer.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: layer.opacity
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2.2;
        planet.add(ring);
    });
}

// ===== 위성 생성 =====
function createMoons() {
    Object.keys(moonData).forEach(key => {
        const data = moonData[key];
        const parentPlanet = planets[data.parent];
        
        if(!parentPlanet) return;
        
        // 위성 궤도 컨테이너
        const moonOrbitContainer = new THREE.Object3D();
        parentPlanet.mesh.add(moonOrbitContainer);
        
        // 위성 메쉬
        const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: data.color,
            shininess: 10
        });
        
        const moon = new THREE.Mesh(geometry, material);
        moon.position.x = data.distance;
        moonOrbitContainer.add(moon);
        
        moons[key] = {
            mesh: moon,
            container: moonOrbitContainer,
            data: data
        };
        
        // 위성 궤도
        createMoonOrbit(parentPlanet.mesh, data.distance);
    });
}

// ===== 위성 궤도 =====
function createMoonOrbit(parent, distance) {
    const points = [];
    const segments = 64;
    
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
        color: 0x334466,
        transparent: true,
        opacity: 0.2
    });
    
    const orbit = new THREE.Line(geometry, material);
    parent.add(orbit);
}

// ===== 왜소행성 생성 =====
function createDwarfPlanets() {
    Object.keys(dwarfPlanetData).forEach(key => {
        const data = dwarfPlanetData[key];
        
        // 궤도 컨테이너
        const orbitContainer = new THREE.Object3D();
        scene.add(orbitContainer);
        
        // 왜소행성 메쉬
        const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: data.color,
            shininess: 5
        });
        
        const dwarf = new THREE.Mesh(geometry, material);
        dwarf.position.x = data.distance;
        orbitContainer.add(dwarf);
        
        dwarfPlanets[key] = {
            mesh: dwarf,
            container: orbitContainer,
            data: data
        };
        
        // 궤도 (점선 스타일)
        createDwarfOrbit(key, data.distance);
        
        // 라벨
        createLabel(key, data.name, dwarf, true);
    });
}

// ===== 왜소행성 궤도 (점선) =====
function createDwarfOrbit(key, distance) {
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
    const material = new THREE.LineDashedMaterial({
        color: 0x666688,
        transparent: true,
        opacity: 0.3,
        dashSize: 3,
        gapSize: 2
    });
    
    const orbit = new THREE.Line(geometry, material);
    orbit.computeLineDistances();
    scene.add(orbit);
    orbits[key] = orbit;
}

// ===== 소행성대 생성 =====
function createAsteroidBelt() {
    const asteroidCount = 2000;
    const innerRadius = 33;
    const outerRadius = 42;
    
    const asteroidGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(asteroidCount * 3);
    const colors = new Float32Array(asteroidCount * 3);
    const sizes = new Float32Array(asteroidCount);
    
    for(let i = 0; i < asteroidCount; i++) {
        const i3 = i * 3;
        
        // 소행성대 분포
        const angle = Math.random() * Math.PI * 2;
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
        const height = (Math.random() - 0.5) * 3;
        
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = height;
        positions[i3 + 2] = Math.sin(angle) * radius;
        
        // 회색 톤
        const brightness = 0.3 + Math.random() * 0.4;
        colors[i3] = brightness;
        colors[i3 + 1] = brightness * 0.9;
        colors[i3 + 2] = brightness * 0.8;
        
        sizes[i] = Math.random() * 0.3 + 0.1;
    }
    
    asteroidGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    asteroidGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const asteroidMaterial = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const asteroidBelt = new THREE.Points(asteroidGeometry, asteroidMaterial);
    scene.add(asteroidBelt);
    asteroids.push(asteroidBelt);
    
    // 카이퍼 벨트 (해왕성 바깥)
    createKuiperBelt();
}

// ===== 카이퍼 벨트 =====
function createKuiperBelt() {
    const kuiperCount = 3000;
    const innerRadius = 95;
    const outerRadius = 140;
    
    const kuiperGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(kuiperCount * 3);
    const colors = new Float32Array(kuiperCount * 3);
    
    for(let i = 0; i < kuiperCount; i++) {
        const i3 = i * 3;
        
        const angle = Math.random() * Math.PI * 2;
        const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
        const height = (Math.random() - 0.5) * 10;
        
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = height;
        positions[i3 + 2] = Math.sin(angle) * radius;
        
        // 얼음빛 색상
        const brightness = 0.4 + Math.random() * 0.3;
        colors[i3] = brightness * 0.9;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness * 1.1;
    }
    
    kuiperGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    kuiperGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const kuiperMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.5
    });
    
    const kuiperBelt = new THREE.Points(kuiperGeometry, kuiperMaterial);
    scene.add(kuiperBelt);
}

// ===== 혜성 생성 =====
function createComets() {
    const cometConfigs = [
        { distance: 80, angle: 0.3, speed: 0.003, tailLength: 15 },
        { distance: 100, angle: 1.2, speed: 0.002, tailLength: 20 },
        { distance: 65, angle: 2.5, speed: 0.004, tailLength: 12 }
    ];
    
    cometConfigs.forEach((config, index) => {
        createComet(config, index);
    });
}

function createComet(config, index) {
    const cometGroup = new THREE.Group();
    
    // 혜성 핵
    const nucleusGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nucleusMaterial = new THREE.MeshBasicMaterial({
        color: 0xccddff
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    cometGroup.add(nucleus);
    
    // 혜성 코마 (가스 구름)
    const comaGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const comaMaterial = new THREE.MeshBasicMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.3
    });
    const coma = new THREE.Mesh(comaGeometry, comaMaterial);
    cometGroup.add(coma);
    
    // 혜성 꼬리 (이온 꼬리)
    const tailGeometry = new THREE.ConeGeometry(0.5, config.tailLength, 8, 1, true);
    const tailMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.rotation.x = Math.PI / 2;
    tail.position.z = config.tailLength / 2;
    cometGroup.add(tail);
    
    // 먼지 꼬리
    const dustTailGeometry = new THREE.ConeGeometry(0.8, config.tailLength * 0.8, 8, 1, true);
    const dustTailMaterial = new THREE.MeshBasicMaterial({
        color: 0xffddaa,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
    });
    const dustTail = new THREE.Mesh(dustTailGeometry, dustTailMaterial);
    dustTail.rotation.x = Math.PI / 2;
    dustTail.rotation.y = 0.3;
    dustTail.position.z = config.tailLength * 0.4;
    cometGroup.add(dustTail);
    
    // 타원 궤도 초기 위치
    const eccentricity = 0.7;
    const semiMajor = config.distance;
    
    cometGroup.userData = {
        angle: config.angle,
        speed: config.speed,
        semiMajor: semiMajor,
        eccentricity: eccentricity,
        inclination: (Math.random() - 0.5) * 0.5
    };
    
    updateCometPosition(cometGroup);
    scene.add(cometGroup);
    comets.push(cometGroup);
}

function updateCometPosition(comet) {
    const data = comet.userData;
    const e = data.eccentricity;
    const a = data.semiMajor;
    
    // 타원 궤도 계산
    const r = a * (1 - e * e) / (1 + e * Math.cos(data.angle));
    
    comet.position.x = r * Math.cos(data.angle);
    comet.position.z = r * Math.sin(data.angle);
    comet.position.y = Math.sin(data.angle) * data.inclination * 10;
    
    // 꼬리가 태양 반대 방향을 향하도록
    comet.lookAt(0, 0, 0);
    comet.rotateY(Math.PI);
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
function createLabel(key, name, parentMesh, isDwarf = false) {
    const labelDiv = document.createElement('div');
    labelDiv.className = 'planet-label';
    labelDiv.textContent = name;
    labelDiv.style.cssText = `
        position: fixed;
        color: ${isDwarf ? '#aabbcc' : 'white'};
        font-size: ${isDwarf ? '10px' : '12px'};
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
        mesh: parentMesh,
        isDwarf: isDwarf
    });
}

// ===== 라벨 위치 업데이트 =====
function updateLabels() {
    labels.forEach(label => {
        let mesh = label.mesh;
        
        // 행성인 경우 월드 좌표 계산
        if(planets[label.key] && planets[label.key].mesh) {
            mesh = planets[label.key].mesh;
        } else if(dwarfPlanets[label.key] && dwarfPlanets[label.key].mesh) {
            mesh = dwarfPlanets[label.key].mesh;
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
    
    // 모든 행성/왜소행성 메쉬 수집
    const meshes = [];
    Object.entries(planets).forEach(([key, value]) => {
        if(key === 'sun') {
            meshes.push({ key, mesh: value });
        } else {
            meshes.push({ key, mesh: value.mesh });
        }
    });
    
    Object.entries(dwarfPlanets).forEach(([key, value]) => {
        meshes.push({ key, mesh: value.mesh, isDwarf: true });
    });
    
    const intersects = raycaster.intersectObjects(meshes.map(m => m.mesh));
    
    if(intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const planetEntry = meshes.find(m => m.mesh === clickedMesh);
        
        if(planetEntry) {
            focusOnPlanet(planetEntry.key, planetEntry.isDwarf);
            
            // 버튼 활성화 (왜소행성은 버튼 없음)
            if(!planetEntry.isDwarf) {
                document.querySelectorAll('#planet-buttons button').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.planet === planetEntry.key);
                });
            }
        }
    }
}

// ===== 행성 포커스 =====
function focusOnPlanet(planetKey, isDwarf = false) {
    selectedPlanet = planetKey;
    
    let data, targetPos;
    
    if(isDwarf || dwarfPlanetData[planetKey]) {
        data = dwarfPlanetData[planetKey];
        const dwarf = dwarfPlanets[planetKey];
        targetPos = new THREE.Vector3();
        dwarf.mesh.getWorldPosition(targetPos);
    } else if(planetKey === 'sun') {
        data = planetData[planetKey];
        targetPos = new THREE.Vector3(0, 0, 0);
    } else {
        data = planetData[planetKey];
        const planet = planets[planetKey];
        targetPos = new THREE.Vector3();
        planet.mesh.getWorldPosition(targetPos);
    }
    
    // 정보 업데이트
    updatePlanetInfo(planetKey, data, isDwarf);
    
    // 카메라 이동
    const distance = (data.radius || 1) * 15 + 15;
    const cameraTarget = new THREE.Vector3(
        targetPos.x + distance * 0.5,
        targetPos.y + distance * 0.3,
        targetPos.z + distance * 0.5
    );
    
    // 애니메이션
    const duration = 1000;
    const startPos = camera.position.clone();
    const startTime = Date.now();
    
    function animateCamera() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        
        camera.position.lerpVectors(startPos, cameraTarget, eased);
        controls.target.lerp(targetPos, eased * 0.1);
        
        if(progress < 1) {
            requestAnimationFrame(animateCamera);
        }
    }
    
    animateCamera();
}

// ===== 행성 정보 업데이트 =====
function updatePlanetInfo(key, data, isDwarf = false) {
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
    } else if(isDwarf || data.type === '왜소행성') {
        html += `
            <div class="planet-stat"><span class="stat-label">지름</span><span class="stat-value">${data.diameter}</span></div>
            <div class="planet-stat"><span class="stat-label">태양까지 거리</span><span class="stat-value">${data.distanceFromSun}</span></div>
            <div class="planet-stat"><span class="stat-label">공전 주기</span><span class="stat-value">${data.orbitalPeriod}</span></div>
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
    
    // 위성 공전
    Object.keys(moons).forEach(key => {
        const moon = moons[key];
        moon.container.rotation.y += moon.data.orbitSpeed * animationSpeed;
    });
    
    // 왜소행성 공전
    Object.keys(dwarfPlanets).forEach(key => {
        const dwarf = dwarfPlanets[key];
        dwarf.container.rotation.y += dwarf.data.orbitSpeed * animationSpeed;
        dwarf.mesh.rotation.y += dwarf.data.rotationSpeed * animationSpeed;
    });
    
    // 소행성대 회전
    asteroids.forEach(belt => {
        belt.rotation.y += 0.0001 * animationSpeed;
    });
    
    // 혜성 이동
    comets.forEach(comet => {
        comet.userData.angle += comet.userData.speed * animationSpeed;
        if(comet.userData.angle > Math.PI * 2) {
            comet.userData.angle -= Math.PI * 2;
        }
        updateCometPosition(comet);
    });
    
    // 성운 천천히 회전
    if(nebulaParticles) {
        nebulaParticles.rotation.y += 0.00005 * animationSpeed;
    }
    
    // 라벨 업데이트
    updateLabels();
    
    // 컨트롤 업데이트
    controls.update();
    
    // 렌더링
    renderer.render(scene, camera);
}

// ===== 시작 =====
init();
