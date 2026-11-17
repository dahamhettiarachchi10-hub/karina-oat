registerSection({
  "id": "ph-motion",
  "subject": "Physics",
  "title": "Motion, forces & gravity",
  "subtitle": "PHYS 1",
  "source": "Physics Equation Sheet",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "vectors",
      "title": "Units, vectors & graphs",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 1, 17; QR sheet p. 1 for conversions."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Use consistent units and separate x and y components. For an angle measured from +x, Aₓ = A cos θ and Aᵧ = A sin θ. A position–time slope is velocity; a velocity–time slope is acceleration; signed area under velocity is displacement."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A 10 N vector at 30° above +x has Aᵧ = 10 sin 30° = 5 N. Its x component is about 8.7 N, not 5 N."
        }
      ]
    },
    {
      "id": "kinematics",
      "title": "Constant acceleration & projectiles",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 1; projectile components supplement the listed kinematics equations."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "With constant acceleration, v = v₀ + at, Δx = v₀t + ½at², and v² = v₀² + 2aΔx. Pick an axis and choose an equation omitting the unneeded variable. With negligible drag, projectile horizontal acceleration is zero and vertical acceleration is downward."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A cart starts at 2 m/s and accelerates at 3 m/s² for 4 s. Its final speed is 14 m/s and its displacement is 8 + 24 = 32 m."
        }
      ]
    },
    {
      "id": "forces",
      "title": "Free-body diagrams & friction",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet pp. 1–2. Treat fₛ ≤ μₛN; fₖ = μₖN in the usual model."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Draw only forces acting on the chosen object. ΣF = ma along each axis. N equals mg on a level surface only if vertical acceleration is zero and no other vertical force contributes. Static friction adjusts up to its maximum; kinetic friction opposes sliding."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A block with normal force 40 N and μₛ = 0.50 remains stationary under a 12 N horizontal push. Static friction is 12 N; 20 N is only its maximum."
        }
      ]
    },
    {
      "id": "circular",
      "title": "Circular motion & gravitation",
      "notes": [
        {
          "type": "text",
          "body": "Physics sheet p. 3. Use centre-to-centre separation."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Centripetal acceleration is v²/r toward the center; it is provided by the radial component of real forces, not a separate force. Fg = Gm₁m₂/r². For uniform circular motion, v = rω when ω is in radians per second."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "At the same radius, doubling speed makes the inward force requirement four times larger. Doubling separation between two masses makes gravitational force one quarter as large."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "ph-motion-vectors-1",
      "topic": "vectors",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "How long is 72 cm in SI metres?",
      "options": [
        "0.72 m",
        "7.2 m",
        "72 m",
        "0.072 m"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Divide centimetres by 100. Converting centimetres to metres reduces the numerical value."
    },
    {
      "id": "ph-motion-vectors-2",
      "topic": "vectors",
      "skill": "Unit conversion",
      "difficulty": "application",
      "stem": "What is the vertical component of a 20 N vector 30° above horizontal?",
      "options": [
        "10 N",
        "17.3 N",
        "20 N",
        "5 N"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The angle is from horizontal, so the vertical component is 20 sin 30° = 10 N."
    },
    {
      "id": "ph-motion-vectors-3",
      "topic": "vectors",
      "skill": "Unit conversion",
      "difficulty": "analysis",
      "stem": "A velocity–time graph is a straight line from +2 to +6 m/s over 4 s. What is the displacement?",
      "options": [
        "16 m",
        "4 m",
        "8 m",
        "24 m"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Signed trapezoid area is (2+6)/2 × 4 = 16 m. The endpoints alone do not give the displacement."
    },
    {
      "id": "ph-motion-kinematics-1",
      "topic": "kinematics",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A cart at rest accelerates at 2 m/s² for 5 s. How far does it move?",
      "options": [
        "25 m",
        "10 m",
        "50 m",
        "5 m"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Δx = ½at² = ½×2×25 = 25 m. Ten is the final speed, not the distance."
    },
    {
      "id": "ph-motion-kinematics-2",
      "topic": "kinematics",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "At the highest point of an ideal oblique projectile, what is its vertical acceleration?",
      "options": [
        "Downward at g",
        "Zero",
        "Upward at g",
        "It depends on horizontal speed"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Vertical velocity is momentarily zero; gravity still supplies downward acceleration."
    },
    {
      "id": "ph-motion-kinematics-3",
      "topic": "kinematics",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "A vehicle moving at 12 m/s comes to rest under constant acceleration −3 m/s². What is the stopping distance?",
      "options": [
        "24 m",
        "4 m",
        "48 m",
        "12 m"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Use 0 = 12² + 2(−3)Δx. Solving gives 24 m; 4 is the stopping time in seconds."
    },
    {
      "id": "ph-motion-forces-1",
      "topic": "forces",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A 4 kg cart experiences horizontal forces 20 N right and 8 N left. What is its acceleration?",
      "options": [
        "3 m/s² right",
        "7 m/s² right",
        "5 m/s² right",
        "2 m/s² left"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The net force is 12 N right. Divide by the mass, 4 kg."
    },
    {
      "id": "ph-motion-forces-2",
      "topic": "forces",
      "skill": "Model selection",
      "difficulty": "application",
      "stem": "A box stays at rest under an 8 N horizontal push; maximum static friction is 12 N. What is the friction magnitude?",
      "options": [
        "8 N",
        "12 N",
        "4 N",
        "0 N"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Static friction matches the applied push because 8 N is below its maximum."
    },
    {
      "id": "ph-motion-forces-3",
      "topic": "forces",
      "skill": "Model selection",
      "difficulty": "analysis",
      "stem": "A person of mass 60 kg accelerates downward at 2 m/s² in an elevator. Use g = 10 m/s². What scale force acts on the person?",
      "options": [
        "480 N",
        "600 N",
        "720 N",
        "120 N"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Take up as positive: N − mg = m(−2). N = 600 −120 = 480 N. The scale reads the normal force."
    },
    {
      "id": "ph-motion-circular-1",
      "topic": "circular",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "At fixed speed, doubling the radius of circular motion does what to centripetal acceleration?",
      "options": [
        "Halves it",
        "Doubles it",
        "Quadruples it",
        "Leaves it unchanged"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "a = v²/r; with v fixed, acceleration is inverse in r."
    },
    {
      "id": "ph-motion-circular-2",
      "topic": "circular",
      "skill": "Ratios",
      "difficulty": "application",
      "stem": "At three times the separation, what fraction of the original gravitational force remains?",
      "options": [
        "1/9",
        "1/3",
        "1/6",
        "1/27"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "The force is inverse-square, so the ratio is 1/3²."
    },
    {
      "id": "ph-motion-circular-3",
      "topic": "circular",
      "skill": "Ratios",
      "difficulty": "analysis",
      "stem": "A car rounds a curve at constant speed. What is true of its net radial force?",
      "options": [
        "It points toward the center",
        "It points outward",
        "It is zero because speed is constant",
        "It points tangent to the path"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Velocity direction changes despite constant speed. The inward net force supplies centripetal acceleration."
    }
  ]
});
