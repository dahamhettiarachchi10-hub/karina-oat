registerSection({
  "id": "ph-fluids-waves",
  "subject": "Physics",
  "title": "Fluids, heat & waves",
  "subtitle": "PHYS 3",
  "source": "Physics Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "fluids",
      "title": "Pressure, buoyancy & fluids",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 9–10. Use pressure relative to the reference surface."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Gauge pressure at depth h in a static uniform fluid is ρgh; absolute pressure adds surface pressure. Buoyant force equals the weight of displaced fluid. For incompressible flow, A₁v₁ = A₂v₂; in ideal steady flow Bernoulli links pressure, speed and elevation."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "At 2 m depth in water, use ρ = 1000 kg/m³ and g = 10 m/s²: gauge pressure is 20 kPa, before adding atmospheric pressure."
        }
      ]
    },
    {
      "id": "thermal",
      "title": "Heat, phase changes & first law",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 11. Use the work-on-system convention stated here."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "For the stated convention ΔU = Q + W_on, heat entering and work on the system are positive. For temperature change without a phase transition use q = mcΔT; during a phase change at fixed pressure use q = mL. Gas temperature must be in kelvins."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A gas absorbs 70 J of heat and does 30 J of work on its surroundings. W_on = −30 J, so ΔU = +40 J."
        }
      ]
    },
    {
      "id": "shm",
      "title": "Springs & pendulums",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 5–6; the simple pendulum formula assumes small angles."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "A Hooke-law spring exerts F = −kx. An ideal mass–spring oscillator has T = 2π√(m/k); a simple small-angle pendulum has T ≈ 2π√(L/g), independent of mass in this model. At maximum displacement speed is zero and restoring acceleration has greatest magnitude."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Quadrupling an ideal spring oscillator’s mass at fixed stiffness doubles the period; quadrupling stiffness at fixed mass halves it."
        }
      ]
    },
    {
      "id": "waves",
      "title": "Wave speed, harmonics & sound",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 7–8. Identify open and closed boundaries before counting modes."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "v = fλ and T = 1/f. On a string with both ends fixed, f₁ = v/(2L), and all integer harmonics are allowed. The ideal pipe closed at one end uses odd harmonics and f₁ = v/(4L). Approach raises observed frequency in the usual Doppler setup."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "An ideal 0.50 m tube closed at one end with sound speed 340 m/s has f₁ = 340/(4×0.50) = 170 Hz; its next mode is 510 Hz."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "ph-fluids-waves-fluids-1",
      "topic": "fluids",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "How does gauge pressure in uniform static water change when depth doubles?",
      "options": [
        "It doubles",
        "It halves",
        "It quadruples",
        "It stays fixed"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Gauge pressure ρgh is linear in depth if ρ and g stay fixed."
    },
    {
      "id": "ph-fluids-waves-fluids-2",
      "topic": "fluids",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "An object floats at rest, displacing 12 N worth of water. What is its weight?",
      "options": [
        "12 N",
        "Less than 12 N",
        "Greater than 12 N",
        "Zero"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "For a floating object at equilibrium, upward buoyancy equals downward weight, so both are 12 N."
    },
    {
      "id": "ph-fluids-waves-fluids-3",
      "topic": "fluids",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "An incompressible fluid flows steadily from a pipe section to another with half the area. What happens to its mean speed?",
      "options": [
        "It doubles",
        "It halves",
        "It quadruples",
        "It stays fixed"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Volumetric flow Av is constant; halving A requires doubling v."
    },
    {
      "id": "ph-fluids-waves-thermal-1",
      "topic": "thermal",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "A gas loses 50 J of heat while 20 J of work is done on it. What is ΔU?",
      "options": [
        "−30 J",
        "+30 J",
        "−70 J",
        "+70 J"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Q = −50 and W_on = +20, so ΔU = −30 J."
    },
    {
      "id": "ph-fluids-waves-thermal-2",
      "topic": "thermal",
      "skill": "Signs and scale",
      "difficulty": "application",
      "stem": "Which equation gives the heat to melt mass m at its melting point, with no temperature change?",
      "options": [
        "q = mL_f",
        "q = mcΔT",
        "q = W_on − ΔU",
        "q = PV/nR"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Latent heat is required at constant temperature during melting, so use the heat of fusion."
    },
    {
      "id": "ph-fluids-waves-thermal-3",
      "topic": "thermal",
      "skill": "Signs and scale",
      "difficulty": "analysis",
      "stem": "Two bodies with equal mass absorb the same heat without phase changes. Body A has twice the specific heat of B. What is ΔT_A relative to ΔT_B?",
      "options": [
        "Half as large",
        "Twice as large",
        "Four times as large",
        "Equal"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "ΔT = q/(mc). Doubling c with fixed q and m halves ΔT."
    },
    {
      "id": "ph-fluids-waves-shm-1",
      "topic": "shm",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "An ideal spring’s stiffness is multiplied by four at fixed mass. What happens to its period?",
      "options": [
        "Halves",
        "Doubles",
        "Quadruples",
        "Stays fixed"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "T ∝ 1/√k. A factor of four in stiffness gives a period factor of 1/2."
    },
    {
      "id": "ph-fluids-waves-shm-2",
      "topic": "shm",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "At the turning point of an ideal mass–spring oscillator, what is the speed?",
      "options": [
        "Zero",
        "Maximum",
        "Half its maximum in every case",
        "It equals the restoring acceleration"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "It stops momentarily before reversing. The restoring force magnitude is maximal there."
    },
    {
      "id": "ph-fluids-waves-shm-3",
      "topic": "shm",
      "skill": "Ratios",
      "difficulty": "analysis",
      "stem": "Two small-angle pendulums have the same length and gravitational acceleration but different bob masses. How do their periods compare in the ideal model?",
      "options": [
        "They are equal",
        "The heavier bob takes longer",
        "The lighter bob takes longer",
        "The ratio equals the masses’ ratio"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "T depends on L and g, not bob mass, for this ideal small-angle formula."
    },
    {
      "id": "ph-fluids-waves-waves-1",
      "topic": "waves",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "A 200 Hz wave has wavelength 1.5 m. What is its speed?",
      "options": [
        "300 m/s",
        "133 m/s",
        "0.0075 m/s",
        "201.5 m/s"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Multiply frequency by wavelength: 200×1.5 = 300 m/s."
    },
    {
      "id": "ph-fluids-waves-waves-2",
      "topic": "waves",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "An ideal pipe closed at one end has fundamental frequency 120 Hz. What is its next allowed frequency?",
      "options": [
        "360 Hz",
        "240 Hz",
        "480 Hz",
        "60 Hz"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The next allowed mode is the third harmonic, 3×120 = 360 Hz."
    },
    {
      "id": "ph-fluids-waves-waves-3",
      "topic": "waves",
      "skill": "Ratios",
      "difficulty": "analysis",
      "stem": "A source emitting a fixed sound frequency moves toward a stationary observer. Which change is heard in the usual subsonic case?",
      "options": [
        "Frequency rises",
        "Frequency falls",
        "Frequency is unchanged because the emitted frequency is fixed",
        "Only the speed of sound changes"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Approach compresses wavefront spacing ahead of the source, increasing observed frequency at unchanged sound speed in the medium."
    }
  ]
});
