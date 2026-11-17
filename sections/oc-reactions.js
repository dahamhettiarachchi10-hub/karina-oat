registerSection({
  "id": "oc-reactions",
  "subject": "Organic Chemistry",
  "title": "Alkenes, substitution & other reactions",
  "subtitle": "ORG 3",
  "source": "Organic Chemistry Lessons",
  "addedOn": "2026-11-17",
  "topics": [
    {
      "id": "addition",
      "title": "Alkene & alkyne additions",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 7, PDF pp. 28–39."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "First ask what atoms add, then decide regioselectivity and stereochemistry. Ordinary ionic HX addition to a simple unsymmetrical alkene usually follows Markovnikov orientation. Hydroboration–oxidation gives anti-Markovnikov, syn addition overall. Br₂ addition through a bridged intermediate gives anti addition in standard cases. For alkynes, Lindlar gives a cis alkene and dissolving-metal reduction generally gives a trans alkene from an internal alkyne."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Propene gives propan-2-ol by standard acid-catalyzed hydration, and propan-1-ol by hydroboration–oxidation."
        }
      ]
    },
    {
      "id": "substitution",
      "title": "SN1, SN2, E1 & E2",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 8, PDF pp. 40–45. Compare substrate, reagent, solvent, and geometry."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "SN2 is concerted backside displacement and favors less hindered sites. SN1 and E1 form a carbocation in the simplest models; rearrangement and competition are possible. E2 is concerted and normally requires an anti-periplanar β-H and leaving group; bulky strong base often favors elimination."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A primary bromide with iodide in an appropriate polar aprotic solvent favors SN2. A tertiary bromide with strong bulky base favors E2. In a chair, check for trans-diaxial alignment in an E2 elimination."
        },
        {
          "type": "diagram",
          "src": "diagrams/substitution-energy.svg",
          "body": "Compare a one-step SN2 with the two-step SN1 model. The valley between the SN1 barriers represents the carbocation."
        }
      ]
    },
    {
      "id": "radical",
      "title": "Radicals & Diels–Alder",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 9, PDF pp. 46–47."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "Radical initiation creates radicals, propagation regenerates a radical, and termination consumes radicals without regeneration. A Diels–Alder reaction pairs a conjugated diene in s-cis geometry with a dienophile to make a six-membered ring; substituent relationships transfer stereospecifically."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "A cis-disubstituted dienophile retains its cis substituent relationship in the new ring. For radical arrows, one-headed arrows show motion of one electron."
        }
      ]
    },
    {
      "id": "aromatic",
      "title": "Aromaticity & substitution directing",
      "notes": [
        {
          "type": "text",
          "body": "Lessons ch. 10, PDF pp. 48–50."
        },
        {
          "type": "key",
          "title": "Rule",
          "body": "A simple aromatic ring is cyclic, planar, continuously conjugated and has 4n+2 π electrons. Electrophilic aromatic substitution restores aromaticity after temporary loss. Electron donors usually direct ortho/para; strong electron withdrawers such as nitro tend to direct meta. Halogens are deactivating but ortho/para directing."
        },
        {
          "type": "text",
          "title": "Worked example",
          "body": "Methoxybenzene favors ortho/para substitution through electron donation. Nitrobenzene generally directs new electrophiles meta."
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "oc-reactions-addition-1",
      "topic": "addition",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "Which alcohol is the usual product of hydroboration–oxidation of 1-butene?",
      "options": [
        "Butan-1-ol",
        "Butan-2-ol",
        "Butanone",
        "But-2-en-1-ol"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Hydroboration–oxidation places OH at the less substituted alkene carbon and consumes the double bond."
    },
    {
      "id": "oc-reactions-addition-2",
      "topic": "addition",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "Which product does Lindlar reduction give from 2-butyne?",
      "options": [
        "cis-2-Butene",
        "trans-2-Butene",
        "Butane",
        "1-Butene"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Lindlar catalysis partially hydrogenates the alkyne by syn addition, giving the cis alkene."
    },
    {
      "id": "oc-reactions-addition-3",
      "topic": "addition",
      "skill": "Reaction choice",
      "difficulty": "analysis",
      "stem": "Which stereochemical result is expected for Br₂ addition to an alkene through a bromonium ion?",
      "options": [
        "Anti addition across the initial double bond",
        "Syn addition only",
        "Complete inversion at an unrelated saturated carbon",
        "No carbon–bromine bonds form"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The nucleophile opens the bridged bromonium from the opposite face. The two bromines add across the original double bond."
    },
    {
      "id": "oc-reactions-substitution-1",
      "topic": "substitution",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "An appropriate unhindered primary alkyl bromide reacts with iodide in a polar aprotic solvent. What pathway is favored?",
      "options": [
        "SN2",
        "SN1",
        "E1",
        "Unimolecular E2"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Iodide is a good nucleophile and weak base. A primary substrate favors backside displacement rather than formation of a primary carbocation."
    },
    {
      "id": "oc-reactions-substitution-2",
      "topic": "substitution",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "What β-H/leaving-group relationship usually supports the lowest-energy E2 pathway?",
      "options": [
        "Anti-periplanar",
        "Exactly 90° apart",
        "Parallel but separated by two additional carbons",
        "Any arrangement is equally favorable"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Anti-periplanar alignment enables effective overlap as the β C–H and C–leaving-group bonds break and the π bond forms."
    },
    {
      "id": "oc-reactions-substitution-3",
      "topic": "substitution",
      "skill": "Reaction choice",
      "difficulty": "analysis",
      "stem": "An ionization step forms a rearrangeable carbocation. Doubling nucleophile concentration at fixed substrate does not change the observed initial rate. Which substitution pathway fits?",
      "options": [
        "SN1",
        "SN2",
        "E2",
        "Concerted nucleophile-controlled addition"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "SN1 is limited by substrate ionization and can rearrange; SN2 is concerted and normally depends on nucleophile concentration too."
    },
    {
      "id": "oc-reactions-radical-1",
      "topic": "radical",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "What identifies a radical-chain propagation step?",
      "options": [
        "A radical reacts and another radical is regenerated",
        "Two radicals combine and no radical remains",
        "No radical is initially present and none is produced",
        "Only an acid and conjugate base change protonation"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "A propagation step consumes a chain carrier but creates another. Radical coupling without regeneration is termination."
    },
    {
      "id": "oc-reactions-radical-2",
      "topic": "radical",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "Which diene conformation is needed for a normal Diels–Alder cycloaddition?",
      "options": [
        "s-cis",
        "s-trans locked",
        "A nonconjugated arrangement only",
        "A fully saturated conformation"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "s-cis brings the ends of the conjugated diene close enough to bond to the dienophile."
    },
    {
      "id": "oc-reactions-radical-3",
      "topic": "radical",
      "skill": "Reaction choice",
      "difficulty": "analysis",
      "stem": "What normally happens to substituents that start cis on the dienophile in a Diels–Alder reaction?",
      "options": [
        "They remain cis in the product",
        "They must become trans",
        "One necessarily disappears",
        "Their relative configuration is completely randomized"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "The concerted stereospecific cycloaddition retains that relative stereochemistry."
    },
    {
      "id": "oc-reactions-aromatic-1",
      "topic": "aromatic",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "How many π electrons does benzene contribute to its aromatic system?",
      "options": [
        "6",
        "4",
        "8",
        "12"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "There are six conjugated carbon p orbitals, each contributing one electron, for a 4n+2 count with n=1."
    },
    {
      "id": "oc-reactions-aromatic-2",
      "topic": "aromatic",
      "skill": "Reaction choice",
      "difficulty": "application",
      "stem": "Which is the usual directing effect of a nitro group in electrophilic aromatic substitution?",
      "options": [
        "Meta directing and deactivating",
        "Ortho/para directing and activating",
        "No effect on rate or position",
        "Ortho/para directing and activating like methoxy"
      ],
      "answer": 0,
      "mustGet": false,
      "explanation": "Nitro withdraws electron density and destabilizes the relevant ortho/para pathways relative to meta."
    },
    {
      "id": "oc-reactions-aromatic-3",
      "topic": "aromatic",
      "skill": "Reaction choice",
      "difficulty": "analysis",
      "stem": "Why does chlorobenzene direct new electrophiles ortho/para even though it reacts more slowly than benzene?",
      "options": [
        "Chlorine withdraws inductively but can donate by resonance in the directing step",
        "Chlorine donates inductively and cannot participate in resonance",
        "Chlorine makes the ring nonaromatic at equilibrium",
        "Deactivation forces all substituents to direct meta"
      ],
      "answer": 0,
      "mustGet": true,
      "explanation": "Inductive withdrawal deactivates the ring. Lone-pair resonance stabilizes ortho/para σ complexes relative to meta."
    }
  ]
});
