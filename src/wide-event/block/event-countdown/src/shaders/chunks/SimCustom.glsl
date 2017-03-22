    {
#ifdef SIM_CUSTOM01

#define K_NUM_ARMS 10.0
#define K_HEIGHT 3.0
#define K_SPIN_SPEED 0.25

#define K_NOISE_ACCEL 0.1

// cylindrical coords
float radius = vUv.y;
float theta = vUv.x * M_2PI;

float randVal = rand(vec2(theta, radius));

// jitter coords
radius += randVal * 0.9;
theta += randVal * 0.1;

float radialArms = sin(theta);

float taperComponent = cos(0.6*radius*M_PI/2.0);
taperComponent *= taperComponent;
float heightParam = K_HEIGHT                              // height constant
                  * (rand(vec2(radius, theta))-0.5)   // provide unit thickness with rand
                  * taperComponent;                 // taper along radius using cosine curve

float spinParam = theta                   // angle parameter
                + radius*radius           // twist at rate r^2
                - K_SPIN_SPEED * uTime;   // spin at constant speed

vec2 coords = vUv;
    coords.x = coords.x * M_2PI - M_PI; // theta (lat)
    coords.y = coords.y * M_PI;         // phi (long)
vec3 sphereCoords = vec3(
        sin(coords.y) * cos(coords.x),
        cos(coords.y),
        sin(coords.y) * sin(coords.x)
    );

float r = 1.0;
//vec3 targetPos = r * sphereCoords;

vec3 targetPos = vec3(
    radius * sin(spinParam),
    heightParam,
    radius * cos(spinParam)
);
targetPos *= 4.0;

vec3 toTarget = targetPos - currPos;
float toTargetLength = length(toTarget);
accel += uShapeAccel * toTarget/toTargetLength
    * (radialArms/2.0+0.5)  // gravity stronger in arms
    * randVal;    // randomize gravity prevents banding

// noise
float noiseTime = uTime;
accel += K_NOISE_ACCEL * curlNoise(currPos);// + vec3(sin(noiseTime), cos(noiseTime), sin(noiseTime)*cos(noiseTime)));

#endif
}

#pragma glslify: export(SimCustom)