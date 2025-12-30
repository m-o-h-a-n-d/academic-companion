import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calculator,
  CircuitBoard,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

// --- استيراد الصور ---
import wienBridge from '@/assets/circuits/weinbridge.png';
import crtDiagram from '@/assets/circuits/crt-diagram.png';
import frequencyMeter from '@/assets/circuits/frequency-meter.png';
import frequencyMeterExplain from '@/assets/circuits/frequency-meter-e.png';
import rampTypeDvm from '@/assets/circuits/dvm-block-diagram.png';
import functionGenerator from '@/assets/circuits/function-generator.png';
import amplitude from '@/assets/circuits/amplitude.png';
import RFCircuit from '@/assets/circuits/RF.png';
import GenerateOscil from '@/assets/circuits/GenerateOscil.png';
import collbits from '@/assets/circuits/collbits.png';
import colbitAndHartly from '@/assets/circuits/colbitAndHartly.png';
import spectrum1 from '@/assets/circuits/spectrum1.png';
import spectrum2 from '@/assets/circuits/spectrum2.png';
import operationOfSpectrum from '@/assets/circuits/operationOfSpectrum.png';
import electric from '@/assets/circuits/electrical.png';
import variable from '@/assets/circuits/variable.png';
import inductive from '@/assets/circuits/inductive.png';
import single from '@/assets/circuits/singleTrac.png';
import Dupel from '@/assets/circuits/Dupel.png';
import basic from '@/assets/circuits/basic.png';

// Calc Images
import calc1 from "@/assets/calculations/calc1.png";
import calc2 from "@/assets/calculations/calc2.png";
import calc3 from "@/assets/calculations/calc3.png";
import calc4 from "@/assets/calculations/calc4.png";
import calc5 from "@/assets/calculations/calc5.png";
import calc6 from "@/assets/calculations/calc6.png";
import calc7 from "@/assets/calculations/calc7.png";
import calc8 from "@/assets/calculations/calc8.png";
import calc9 from "@/assets/calculations/calc9.png";
import calc10 from "@/assets/calculations/calc10.png";
import calc13 from "@/assets/calculations/calc13.png";
import calc17 from "@/assets/calculations/calc17.png";
import calc18 from "@/assets/calculations/calc18.png";
import calc19 from "@/assets/calculations/calc19.png";
import calc20 from "@/assets/calculations/calc20.png";

// --- Interfaces ---
interface Question {
  id: number;
  category: 'theory' | 'calculation' | 'circuit';
  question: {
    ar: string;
    en: string;
  };
  questionImage?: string;
  answer?: {
    ar?: string | string[];
    en?: string | string[];
    slides?: string[];
  };
  calculations?: {
    ar: string[];
    en: string[];
  };
}

// --- Data ---
const questions: Question[] = [
  // 1. Types of DVM
  {
    id: 1,
    category: 'theory',
    question: { ar: 'أنواع أجهزة قياس الجهد الرقمية (Types of DVM)', en: 'Types of DVM' },
    answer: {
      ar: '1. Ramp-type DVM\n2. Dual Slope Integrating DVM\n3. Continuous Balance DVM\n4. Successive Approximation DVM',
      en: '1. Ramp-type DVM\n2. Dual Slope Integrating DVM\n3. Continuous Balance DVM\n4. Successive Approximation DVM'
    }
  },
  // 2. Block diagram of ramp-type DVM
  {
    id: 2,
    category: 'circuit',
    question: { ar: 'المخطط الصندوقي لـ Ramp-type DVM', en: 'Block diagram of Ramp-type DVM' },
    answer: { slides: [rampTypeDvm] }
  },
  // 3. Signal frequency definition
  {
    id: 3,
    category: 'theory',
    question: { ar: 'تعريف تردد الإشارة (Signal Frequency)', en: 'Define Signal Frequency' },
    answer: {
      ar: 'هو عدد مرات تكرار حدث معين لكل وحدة زمنية = عدد دورات الإشارة في الثانية الواحدة.',
      en: 'The number of occurrences of a repeating event per unit time = Number of signal cycles per one second.'
    }
  },
  // 4. Digital Frequency Meter (DFM)
  {
    id: 4,
    category: 'circuit',
    question: { ar: 'عداد التردد الرقمي (DFM) (رسم + شرح)', en: 'Digital Frequency Meter (DFM) (Diagram + Explanation)' },
    answer: { 
      slides: [frequencyMeter, frequencyMeterExplain],
      ar: 'يقوم بعد نبضات الإشارة المجهولة خلال فترة زمنية محددة بدقة (Gate Time).',
      en: 'Counts the pulses of the unknown signal during a precisely determined time interval (Gate Time).'
    }
  },
  // 5. Function of time base
  {
    id: 5,
    category: 'theory',
    question: { ar: 'وظيفة قاعدة الزمن (Function of Time Base)', en: 'Function of Time Base' },
    answer: {
      ar: [
        '1. توفير مصدر توقيت دقيق (Accurate timing source) بتردد ثابت (مثل 1KHz).',
        '2. توفير ترددات مختلفة لتعطي نطاقات قياس متعددة (Several ranges of frequency measurements).',
        '3. التحكم في فترة العد وعرض النتيجة (Display) عن طريق الـ Flip-Flop.'
      ],
      en: [
        '1. Acts as an accurate timing source (e.g., with freq 1KHz).',
        '2. Different time-base frequencies provide several ranges of frequency measurements.',
        '3. Controls the counting/display process via Flip-Flop (Gate Control).'
      ]
    }
  },
  // 6. Low frequency generation types
  {
    id: 6,
    category: 'theory',
    question: { ar: 'أنواع توليد الإشارات (Signal Generation Types)', en: 'Types of Signal Generation' },
    answer: {
      ar: [
        '1. Low Frequency (LF) sine wave generators.',
        '2. Radio Frequency (RF) sine wave generators.',
        '3. Function Generators.',
        '4. Pulse Generators.',
        '5. Sweep Frequency Generators.'
      ],
      en: [
        '1. Low Frequency (LF) sine wave generators.',
        '2. Radio Frequency (RF) sine wave generators.',
        '3. Function Generators.',
        '4. Pulse Generators.',
        '5. Sweep Frequency Generators.'
      ]
    }
  },
  // 7. Wien bridge
  {
    id: 7,
    category: 'circuit',
    question: { ar: 'كيفية تغيير وضبط التردد في قنطرة وين (مع الرسم)', en: 'Frequency Range & Adjustment in Wien Bridge (with diagram)' },
    answer: {
      slides: [wienBridge],
      ar: [
        '1. تغيير النطاق (Range Changing): يتم عن طريق تبديل قيم المكثفات C1 و C2 (Switching capacitors).',
        '2. ضبط التردد (Adjustment): يتم عن طريق تغيير المقاومات R1 و R2 معاً (Simultaneously).',
        'ملاحظة: الخط المتقطع يعني أن التغيير متزامن.'
      ],
      en: [
        '1. Range Changing: By switching capacitor values C1 & C2.',
        '2. Frequency Adjustment: By varying resistors R1 & R2 simultaneously.',
        'Note: Dashed line implies simultaneous adjustment.'
      ]
    }
  },
  // 8. Adjustment Frequency & Amplitude
  {
    id: 8,
    category: 'theory',
    question: { ar: 'مبادئ ضبط التردد والسعة (Adjustment Frequency & Amplitude)', en: 'Adjustment Frequency & Amplitude' },
    answer: {
      ar: 'التردد: يضبط عبر عناصر المذبذب (R, C أو L, C). السعة: تضبط عبر مكبر الخرج (Output Amplifier) أو مقسم الجهد (Attenuator).',
      en: 'Frequency: Adjusted via oscillator components (R, C or L, C). Amplitude: Adjusted via Output Amplifier or Attenuator.'
    }
  },
  // 9. Amplitude Control R2, R3
  {
    id: 9,
    category: 'theory',
    question: { ar: 'التحكم في السعة ووظيفة R2, R3 (Amplitude Control) ', en: 'Control for Amplitude & Job of R2, R3 in sine wave generator ' },
    answer: {
      ar: [
        '1. R2, R3: يشكلان مقسم جهد (Potential Divider) لتوهين خرج المذبذب.',
        '2. R3: مقاومة متغيرة (Potentiometer) لضبط مستوى السعة (Amplitude Adjustment).',
        '3. Op-Amp: يعمل كـ Buffer لتوفير ممانعة خرج منخفضة.'
      ],
      en: [
        '1. R2, R3: Form a Potential Divider to attenuate oscillator output.',
        '2. R3: Potentiometer for Amplitude Adjustment.',
        '3. Op-Amp: Acts as buffer to provide Low Output Impedance.'
      ],
      slides: [amplitude]
    }
  },
  // 10. Function Generator Diagram
  {
    id: 10,
    category: 'circuit',
    question: { ar: 'رسمة مولد الوظائف (Function Generator Diagram)', en: 'Function Generator Diagram' },
    answer: { 
      slides: [functionGenerator],
      ar: 'يولد موجات: جيبية (Sine)، مربعة (Square)، ومثلثة (Triangular).',
      en: 'Generates: Sine, Square, and Triangular waves.'
    }
  },
  // 11. RF Signal Generator
  {
    id: 11,
    category: 'circuit',
    question: { ar: 'المخطط الصندوقي لـ RF Signal Generator ووظيفة كل جزء', en: 'Block diagram of RF Signal Generator + Block Functions' },
    answer: { 
      slides: [RFCircuit],
      ar: [
        '1. RF Oscillator: يولد تردد مستقر.',
        '2. Buffer Amplifier: يعزل المذبذب عن الحمل.',
        '3. Output Amplifier: يكبر الإشارة.',
        '4. Attenuator: يتحكم في مستوى الخرج.'
      ],
      en: [
        '1. Master Oscillator: Generates stable frequency.',
        '2. Buffer Amplifier: Isolates oscillator from load.',
        '3. Output Amplifier: Amplifies signal.',
        '4. Attenuator: Controls output level.'
      ]
    }
  },
  // 12. Function of RF oscillator & Amplifier
  {
    id: 12,
    category: 'theory',
    question: { ar: 'وظيفة RF Oscillator و RF Amplifier', en: 'Function of RF Oscillator & RF Amplifier' },
    answer: {
      ar: 'RF Oscillator: يولد إشارة تردد عالي تُستخدم كموجة حاملة. RF Amplifier: يقوم بتكبير قدرة إشارة RF لتناسب الإرسال أو الحمل.',
      en: 'RF Oscillator: Generates a high-frequency signal used as a carrier wave. RF Amplifier: Amplifies the RF signal power to drive the load or antenna.'
    }
  },
  // 13. Thermal noise voltage
  {
    id: 13,
    category: 'theory',
    question: { ar: 'تعريف جهد الضوضاء الحرارية (Thermal Noise Voltage)', en: 'Define Thermal Noise Voltage' },
    answer: {
      ar: 'هو جهد ضوضاء عشوائي ينشأ نتيجة الاهتزاز الحراري للإلكترونات داخل المقاومات ويعتمد على درجة الحرارة.',
      en: 'A random noise voltage generated due to the thermal agitation of electrons in resistive components and depends on temperature.'
    }
  },
  // 14. Generate Oscillation
  {
    id: 14,
    category: 'theory',
    question: { ar: 'كيفية توليد الاهتزازات (How to Generate Oscillation)', en: 'How to Generate Oscillation' },
    answer: { 
      ar: 'يجب تحقيق شروط Barkhausen:\n1. تغذية راجعة موجبة (Positive Feedback).\n2. كسب الحلقة المغلقة يساوي 1 (Loop Gain = 1).', 
      en: 'Barkhausen Criteria must be met:\n1. Positive Feedback.\n2. Closed Loop Gain = 1.',
      slides: [GenerateOscil]
    }
  },
  // 15. Classification of sinusoidal oscillators
  {
    id: 15,
    category: 'theory',
    question: { ar: 'تصنيف المذبذبات الجيبية (Classification of Sinusoidal Oscillators)', en: 'Classification of Sinusoidal Oscillators' },
    answer: {
      ar: [
        '1. RC Oscillators: للترددات المنخفضة (Audio). أمثلة: Wien Bridge, Phase Shift.',
        '2. LC Oscillators: لترددات الراديو (RF). أمثلة: Hartley, Colpitts.',
        '3. Crystal Oscillators: للاستقرارية العالية جداً.'
      ],
      en: [
        '1. RC Oscillators: For Low Freq (Audio). E.g., Wien Bridge, Phase Shift.',
        '2. LC Oscillators: For Radio Freq (RF). E.g., Hartley, Colpitts.',
        '3. Crystal Oscillators: For High Stability.'
      ]
    }
  },
  // 16. Colpitts oscillator
  {
    id: 16,
    category: 'circuit',
    question: { ar: 'مذبذب كولبتس (Colpitts): الرسم + الوظيفة + القانون', en: 'Colpitts Oscillator: Diagram + Function + Law' },
    answer: { slides: [collbits] },
    calculations: {
      ar: ['$$ F = \\frac{1}{2\\pi \\sqrt{L C_{eq}}} $$', '$$ C_{eq} = \\frac{C_1 C_2}{C_1 + C_2} $$'],
      en: ['$$ F = \\frac{1}{2\\pi \\sqrt{L C_{eq}}} $$', '$$ C_{eq} = \\frac{C_1 C_2}{C_1 + C_2} $$']
    }
  },
  // 17. Hartley vs Colpitts
  {
    id: 17,
    category: 'theory',
    question: { ar: 'مقارنة بين Hartley و Colpitts', en: 'Compare Hartley & Colpitts' },
    answer: {
      ar: [
        'Hartley Oscillator: يستخدم ملفين (L1 , L2) ومكثف واحد. التغذية الراجعة تتم عن طريق مقسم حثي (Inductive Divider). أقل استقرارًا من كولبتس.',
        'Colpitts Oscillator: يستخدم مكثفين (C1 , C2) وملف واحد. التغذية الراجعة تتم عن طريق مقسم سعوي (Capacitive Divider). أكثر استقرارًا.'
      ],
      en: [
        'Hartley Oscillator: Uses two inductors (L1, L2) and one capacitor. Feedback is provided by an inductive divider. Less stable.',
        'Colpitts Oscillator: Uses two capacitors (C1, C2) and one inductor. Feedback is provided by a capacitive divider. More stable.'
      ],
      slides : [colbitAndHartly]
    }
  },
  // 18. TV Oscilloscope
  {
    id: 18,
    category: 'circuit',
    question: { ar: 'رسمة بسيطة للأوسيلوسكوب التلفزيوني ( Oscilloscope)', en: 'Simple Diagram of  Oscilloscope' },
    answer: { slides: [crtDiagram] }
  },
  // 19. Single vs Dual Trace
  {
    id: 19,
    category: 'circuit',
    question: { ar: 'الفرق بين Single Trace و Dual Trace (مع الرسم)', en: 'Difference between Single & Dual Trace (with diagram)' },
    answer: {
      slides: [single,Dupel],
      ar: 'Single Trace: شعاع إلكتروني واحد، قناة واحدة. Dual Trace: شعاع واحد يتم تبديله بسرعة (Multiplexed) بين قناتين لعرض إشارتين معاً.',
      en: 'Single Trace: One beam, one channel. Dual Trace: One beam multiplexed between two channels to display two signals.'
    }
  },
  // 20. DSO
  {
    id: 20,
    category: 'theory',
    question: { ar: 'الأوسيلوسكوب الرقمي (Digital Storage Oscilloscope - DSO)', en: 'Digital Storage Oscilloscope (DSO)' },
    answer: { 
      ar: 'جهاز يحول الإشارة التناظرية إلى رقمية، يخزنها في الذاكرة، ثم يعيد بناءها للعرض. يسمح بتحليل الإشارات وتخزينها.', 
      en: 'Converts analog signals to digital, stores them in memory, then reconstructs them for display. Allows signal analysis and storage.' 
    }
  },
  // 21. Basic Sample Store
  {
    id: 21,
    category: 'theory',
    question: { ar: 'المراحل الأساسية لتخزين العينة (Basic Sample Store)', en: 'Basic Sample Store Stages' },
    answer: { 
      ar: 'نظام أساسي لجهاز راسم الذبذبات الرقمي (DSO) لعرض شكل موجة مخزن. يقوم المحول الرقمي إلى التناظري (DAC) بتحويل العينات الرقمية الموجودة في الذاكرة إلى صورة تناظرية لتطبيقها على ألواح الانحراف الرأسي. يتم إنتاج شكل موجة نقطي عندما يتم دمج العينات مع القاعدة الزمنية لشكل الموجة السلمي ونبضات إلغاء الإطفاء', 
      en: 'Basic DSO system for displaying a stored waveform. A digital-to-analog converter (DAC) converts the digital samples in the memory into analog form for application to the vertical deflection plates. A dot waveform is produced when the samples are combined with the staircase waveform time base and the unblanking pulses.',
      slides : [basic] 
    }

  },
  // 22. Spectrum Analyzer Types
  {
    id: 22,
    category: 'theory',
    question: { ar: 'أنواع محلل الطيف (Types of Spectrum Analyzer)', en: 'Types of Spectrum Analyzer' },
    answer: { 
      ar: '1. Swept-Tuned Spectrum Analyzer.\n2. Real-Time (FFT) Spectrum Analyzer.', 
      en: '1. Swept-Tuned Spectrum Analyzer.\n2. Real-Time (FFT) Spectrum Analyzer.', 
      slides: [spectrum1 ,spectrum2]
    }
  },
  // 23. Operation of Spectrum Analyzer
  {
    id: 23,
    category: 'theory',
    question: { ar: 'طريقة عمل محلل الطيف (Operation of Spectrum Analyzer)', en: 'Operation of Spectrum Analyzer' },
    answer: {
      ar: [
        '1. يعتمد محلل الطيف على مذبذب محلي (Local Oscillator) من نوع VCO يتم التحكم في تردده بواسطة جهد من مولد المسح (Sweep Generator).',
        '2. يقوم مولد المسح بتغيير تردد المذبذب المحلي تدريجيًا بما يتناسب مع جهد الرامب، مما يؤدي إلى مسح نطاق التردد المطلوب.',
        '3. في نفس الوقت، يتحكم جهد المسح في انحراف شعاع CRT أفقيًا من اليسار إلى اليمين لتمثيل التردد على المحور الأفقي (X-axis).',
        '4. يحتوي محلل الطيف على مُضعف دخل RF (RF Attenuator) موضوع قبل الخلاط الأول، ويُستخدم للتحكم في مستوى الإشارة الداخلة إلى الخلاط.',
        '5. يساعد RF Attenuator في منع تشبع الخلاط والتشويه الناتج عن الإشارات عالية القدرة أو واسعة النطاق.',
        '6. بعد الخلاط، يتم تمرير الإشارة عبر مرشح IF Bandpass يُعرف عرض نطاقه باسم Resolution Bandwidth (RBW).',
        '7. يوجد مكبر IF بعد الخلاط وقبل مرشح IF، ويُستخدم لضبط الموضع الرأسي للإشارة على الشاشة دون التأثير على مستوى الإشارة عند الخلاط.',
        '8. عند تغيير كسب IF، يتم تغيير مستوى المرجع (Reference Level) تلقائيًا للحفاظ على ثبات موضع الإشارات على الشاشة.'
      ],
      en: [
        '1. The spectrum analyzer operates using a Local Oscillator (LO) implemented as a Voltage Controlled Oscillator (VCO).',
        '2. The sweep generator controls the LO frequency proportionally to a ramp voltage, allowing frequency scanning.',
        '3. The same sweep voltage deflects the CRT beam horizontally from left to right, forming the frequency domain on the X-axis.',
        '4. An RF input attenuator is placed before the first mixer to control the signal level applied to the mixer.',
        '5. The RF attenuator prevents mixer gain compression and distortion caused by high-level or broadband signals.',
        '6. After mixing, the signal passes through an IF bandpass filter whose bandwidth is called the Resolution Bandwidth (RBW).',
        '7. The IF gain is located after the mixer and before the IF filter and is used to adjust the vertical display position.',
        '8. Changes in IF gain automatically adjust the reference level to keep signals stationary on the CRT display.'
      ],
      slides: [operationOfSpectrum]
    }
  },
  // 24. Sensor, Transducer, Actuator
  {
    id: 24,
    category: 'theory',
    question: { ar: 'تعريف Sensor, Transducer, Actuator', en: 'Define Sensor, Transducer, Actuator' },
    answer: {
      ar: [
        'Sensor: هو جهاز يكتشف أي تغير في خاصية فيزيائية مثل الحرارة أو الضغط أو الضوء ويحوّلها إلى إشارة يمكن قياسها أو تسجيلها.\n',
        'Transducer: هو جهاز يقوم بنقل أو تحويل الطاقة من نظام إلى آخر سواء في نفس الصورة أو في صورة مختلفة.\n',
        'Actuator: هو جهاز يقوم بإنتاج خرج أو فعل ظاهر في نظام القياس، مثل إضاءة LED أو حركة مؤشر العداد.\n'
      ],
      en: [
        'Sensor: A device that detects a change in a physical property and converts it into a measurable or recordable signal.\n',
        'Transducer: A device that transfers or converts energy from one system to another in the same or different form.\n',
        'Actuator: A device that produces an observable output or action in a measurement system, such as an LED or moving coil meter.\n'
      ]
    }
  },
  // 25. Forms of Energy
  {
    id: 25,
    category: 'theory',
    question: { ar: 'الأشكال الرئيسية للطاقة (Main Forms of Energy)', en: 'Main Forms of Energy' },
    answer: { 
      ar: 'ميكانيكية، كهربية، حرارية، مغناطيسية، كيميائية، ضوئية.', 
      en: 'Mechanical, Electrical, Thermal, Magnetic, Chemical, Optical.' 
    }
  },
  // 26. Types of Transducers
  {
    id: 26,
    category: 'theory',
    question: { 
        ar: 'تفريعة أنواع المحولات', 
        en: 'Detailed Classification of Transducers ' 
    },
    answer: { 
        ar: [
            '1. Bridges (القناطر): Wheatstone bridge -> تنقسم إلى DC bridges و AC bridges.\n',
            '2. Amplifiers (المكبرات).\n',
            '3. Inductive (الحثية): Electrical displacement transducers / Inductive displacement transducers.\n',
            '4. Strain (الانفعال): تنقسم إلى: Linear (خطي), Rosette (تجميعي), Torque (عزم), Diaphragm (غشاء).\n',
            '5. Temperature (الحرارة): Resistive devices (أجهزة مقاومة) / Thermoelectric devices (أجهزة كهرواحـرارية).\n',
            '6. Ultrasonic (فوق صوتية).\n',
            '7. Radiation Thermometers (مقاييس الإشعاع الحراري): Optical pyrometer / Radiation pyrometers.\n',
            '8. Thermography (التصوير الحراري).\n',
            '9. Quartz Thermometers (مقاييس كوارتز).\n',
            '10. Fiber Optic Temp Sensors (ألياف ضوئية): Intrinsic sensor / Extrinsic sensor.\n'
        ],
        en: [
            '1. Bridges: Wheatstone bridge -> DC bridges & AC bridges.\n',
            '2. Amplifiers.\n',
            '3. Inductive: Electrical displacement transducers & Inductive displacement transducers.\n',
            '4. Strain: Linear, Rosette, Torque, Diaphragm.\n',
            '5. Temperature: Resistive devices & Thermoelectric devices.\n',
            '6. Ultrasonic.\n',
            '7. Radiation Thermometers: Optical pyrometer & Radiation pyrometers.\n',
            '8. Thermography.\n',
            '9. Quartz Thermometers.\n',
            '10. Fiber Optic Temperature Sensors: Intrinsic sensor & Extrinsic sensor.\n'
        ]
    }
},
  // 27. Transducers for length
  {
    id: 27,
    category: 'theory',
    question: { ar: 'محولات قياس الطول والإزاحة (Transducers for Length/Displacement)', en: 'Transducers for Length/Displacement' },
    answer: {
      ar: [
        '1. Electrical displacement transducers: أهمها Potentiometer ويُستخدم لقياس الإزاحة الخطية.',
        '2. Inductive displacement transducers: من نوع Variable-coupling وتتميز بالقوة والاعتمادية ومناسبة للتطبيقات الصناعية.'
      ],
      en: [
        '1. Electrical displacement transducers: Mainly potentiometer, used for linear displacement measurement.',
        '2. Inductive displacement transducers: Variable-coupling type, robust and widely used in industry.'
      ],
      slides: [electric,variable,inductive]
    },
    calculations: {
      ar: [
        '1. قانون الحساسية (Responsivity): $$ r = \\frac{V_{ex}}{l_{max}} $$',
        '2. القانون العام: $$ \\frac{\\delta V}{V_{ex}} = \\frac{\\delta l}{l_{max}} = \\frac{\\delta Z}{Z_{max}} $$'
      ],
      en: [
        '1. Responsivity formula: $$ r = \\frac{V_{ex}}{l_{max}} $$',
        '2. General formula: $$ \\frac{\\delta V}{V_{ex}} = \\frac{\\delta l}{l_{max}} = \\frac{\\delta Z}{Z_{max}} $$'
      ]
    }
  },
  // 28. Thermometer vs Thrmometer & Thermocouples (Updated with Quartz Note)
  {
    id: 28,
    category: 'theory',
    question: { 
      ar: 'الفرق بين الترمومتر والمزدوج الحراري (وملاحظة الكوارتز)', 
      en: 'Difference between Thermometer & Thermocouple (with Quartz Note)' 
    },
    answer: { 
      ar: [
        '1. Thermometer: يعتمد على التمدد الميكانيكي (Mechanical expansion). استجابة بطيئة.',
        '2. Thermocouple: يولد فرق جهد كهربي (Electrical voltage). استجابة سريعة جداً.',
        '3. Quartz Thermometer: يحتوي على مجس (Probe) عبارة عن أسطوانة من الستانلس ستيل (Stainless-steel cylinder)، مما يجعله أكبر حجماً فيزيائياً من المزدوج الحراري.'
      ],
      en: [
        '1. Thermometer: Based on mechanical expansion. Slow response.',
        '2. Thermocouple: Generates electrical voltage. Fast response.',
        '3. Quartz Thermometer: Has a probe consisting of a stainless-steel cylinder, which makes the device physically larger than thermocouples.'
      ],
      
    }
  },
  // 29-36. Examples
  { id: 29, category: 'calculation', question: { en: 'Example 1', ar: 'المثال 1' }, answer: { slides: [calc1] } },
  { id: 30, category: 'calculation', question: { en: 'Example 2', ar: 'المثال 2' }, answer: { slides: [calc2] } },
  { id: 31, category: 'calculation', question: { en: 'Example 3', ar: 'المثال 3' }, answer: { slides: [calc3, calc4] } },
  { id: 32, category: 'calculation', question: { en: 'Example 4', ar: 'المثال 4' }, answer: { slides: [calc5] } },
  { id: 33, category: 'calculation', question: { en: 'Example 5', ar: 'المثال 5' }, answer: { slides: [calc6, calc7] } },
  { id: 34, category: 'calculation', question: { en: 'Example 6', ar: 'المثال 6' }, answer: { slides: [calc8, calc9, calc10, calc13] } },
  { id: 35, category: 'calculation', question: { en: 'Example 7', ar: 'المثال 7' }, answer: { slides: [calc17, calc18] } },
  { id: 36, category: 'calculation', question: { en: 'Example 8', ar: 'المثال 8' }, answer: { slides: [calc19, calc20] } },
];

const ExamsPage = () => {
  const { language } = useLanguage();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'theory' | 'calculation' | 'circuit'>('all');
  const [slideIndex, setSlideIndex] = useState<{ [key: number]: number }>({});
  const [zoomedImage, setZoomedImage] = useState<{ qId: number; slideIndex: number } | null>(null);
  
  // Touch state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const filteredQuestions = filter === 'all' ? questions : questions.filter(q => q.category === filter);

  // --- Helpers ---
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'theory': return BookOpen;
      case 'calculation': return Calculator;
      case 'circuit': return CircuitBoard;
      default: return BookOpen;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      theory: { ar: 'نظري', en: 'Theory' },
      calculation: { ar: 'حسابي', en: 'Calculation' },
      circuit: { ar: 'دوائر', en: 'Circuit' },
    };
    return labels[category as keyof typeof labels][language];
  };

  // --- Slider Handlers ---
  const handlePrevSlide = (e: React.MouseEvent | Event, qId: number, length: number) => {
    e?.stopPropagation();
    setSlideIndex(prev => ({ ...prev, [qId]: ((prev[qId] || 0) - 1 + length) % length }));
  };

  const handleNextSlide = (e: React.MouseEvent | Event, qId: number, length: number) => {
    e?.stopPropagation();
    setSlideIndex(prev => ({ ...prev, [qId]: ((prev[qId] || 0) + 1) % length }));
  };

  // --- Zoom Logic ---
  const handleZoomPrev = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (!zoomedImage) return;
    const question = questions.find(q => q.id === zoomedImage.qId);
    if (!question?.answer?.slides) return;
    const length = question.answer.slides.length;
    setZoomedImage(prev => prev ? { ...prev, slideIndex: (prev.slideIndex - 1 + length) % length } : null);
  };

  const handleZoomNext = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (!zoomedImage) return;
    const question = questions.find(q => q.id === zoomedImage.qId);
    if (!question?.answer?.slides) return;
    const length = question.answer.slides.length;
    setZoomedImage(prev => prev ? { ...prev, slideIndex: (prev.slideIndex + 1) % length } : null);
  };

  // --- Keyboard Navigation for Zoom ---
  useEffect(() => {
    if (!zoomedImage) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleZoomPrev(e);
      else if (e.key === 'ArrowRight') handleZoomNext(e);
      else if (e.key === 'Escape') setZoomedImage(null);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [zoomedImage]);

  // --- Touch Logic (Swipe) ---
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Swipe for Card Slider
  const onCardTouchEnd = (qId: number, length: number) => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNextSlide(null as any, qId, length);
    if (isRightSwipe) handlePrevSlide(null as any, qId, length);
  };

  // Swipe for Zoom Modal
  const onZoomTouchEnd = () => {
    if (!touchStart || !touchEnd || !zoomedImage) return;
    const question = questions.find(q => q.id === zoomedImage.qId);
    if (!question?.answer?.slides) return;
    const length = question.answer.slides.length;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setZoomedImage(prev => prev ? { ...prev, slideIndex: (prev.slideIndex + 1) % length } : null);
    } else if (isRightSwipe) {
      setZoomedImage(prev => prev ? { ...prev, slideIndex: (prev.slideIndex - 1 + length) % length } : null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      
      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center" 
            onClick={() => setZoomedImage(null)}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onZoomTouchEnd}
          >
            <div className="relative w-full h-full p-4 flex items-center justify-center">
              <img
                src={questions.find(q => q.id === zoomedImage.qId)?.answer?.slides?.[zoomedImage.slideIndex] || ''}
                alt="Zoomed"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Close Button */}
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-md transition-all"
              >
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>

              {/* Navigation Buttons (Only if > 1 slide) */}
              {(questions.find(q => q.id === zoomedImage.qId)?.answer?.slides?.length || 0) > 1 && (
                <>
                  <button
                    onClick={handleZoomPrev}
                    // !hidden لإخفائها في الموبايل، lg:!flex لإظهارها في الشاشات الكبيرة
                    className="!hidden lg:!flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-md transition-all items-center justify-center"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={handleZoomNext}
                    // !hidden لإخفائها في الموبايل، lg:!flex لإظهارها في الشاشات الكبيرة
                    className="!hidden lg:!flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-md transition-all items-center justify-center"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                  {/* Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md text-sm">
                    {zoomedImage.slideIndex + 1} / {questions.find(q => q.id === zoomedImage.qId)?.answer?.slides?.length}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-10">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">

          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold text-primary">
              {language === 'ar' ? 'بنك الأسئلة للامتحان ' : 'Question Bank for Exam '}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'ar' ? 'حظاً موفقاً في دراستك وامتحانك!' : 'Good luck with your studies and exam!'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {(['all', 'theory', 'circuit', 'calculation'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {f === 'all' ? (language === 'ar' ? 'الكل' : 'All') : getCategoryLabel(f)}
              </button>
            ))}
          </div>

          {filteredQuestions.map(q => {
            const Icon = getCategoryIcon(q.category);
            const isOpen = openQuestion === q.id;
            const currentImgIndex = slideIndex[q.id] || 0;
            const slides = q.answer?.slides || [];
            const hasSlides = slides.length > 0;

            return (
              <motion.div
                layout
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : q.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-start transition-colors ${
                    isOpen ? 'bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors ${
                      isOpen ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {q.id}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs mb-1 opacity-70">
                      <Icon className="w-3.5 h-3.5" />
                      {getCategoryLabel(q.category)}
                    </div>
                    <h3 className="font-medium text-lg leading-snug">{q.question[language]}</h3>
                  </div>

                  {isOpen ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
                </button>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-6 bg-card border-t border-border space-y-6">
                        
                        {/* 1. Static Question Image */}
                        {q.questionImage && (
                          <div className="bg-muted/20 p-4 rounded-lg border text-center">
                             <img 
                               src={q.questionImage} 
                               alt="Question" 
                               className="max-h-60 mx-auto rounded object-contain"
                             />
                          </div>
                        )}

                        {/* 2. Math Calculations */}
                        {q.calculations && (
                          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3 text-yellow-600 dark:text-yellow-400 font-bold text-sm">
                              <Calculator className="w-4 h-4" />
                              {language === 'ar' ? 'القوانين:' : 'Formulas:'}
                            </div>
                            <div className="flex flex-col gap-2" dir="ltr">
                              {q.calculations[language].map((calc, idx) => (
                                <div key={idx} className="overflow-x-auto py-1">
                                  <BlockMath math={calc.replace(/\$\$/g, '')} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Text Answer */}
                        {q.answer && (q.answer.ar || q.answer.en) && (
                          <div className="prose prose-neutral dark:prose-invert max-w-none text-base">
                            <div
                              className="whitespace-pre-wrap leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: (Array.isArray(q.answer[language]) 
                                  ? (q.answer[language] as string[]).join('<br/>') 
                                  : q.answer[language] as string || '')
                                  .replace(/\n/g, '<br/>')
                              }}
                            />
                          </div>
                        )}

                       {/* 4. Slides (Images/Diagrams) */}
                        {hasSlides && (
                          <div className="mt-4">
                            <div 
                              className="relative group bg-muted/30 rounded-xl overflow-hidden border border-border select-none" // select-none تمنع تحديد النص أثناء السحب
                              // دوال اللمس المسؤولة عن السحب يميناً ويساراً
                              onTouchStart={onTouchStart} 
                              onTouchMove={onTouchMove} 
                              onTouchEnd={() => onCardTouchEnd(q.id, slides.length)}
                            >
                              {/* Image Display & Zoom Trigger */}
                              <div className="relative aspect-video flex items-center justify-center bg-white/50 dark:bg-black/20 p-2 cursor-pointer"
                                   onClick={() => setZoomedImage({ qId: q.id, slideIndex: currentImgIndex })}
                              >
                                <img 
                                  src={slides[currentImgIndex]} 
                                  alt={`Slide ${currentImgIndex + 1}`}
                                  className="max-w-full max-h-full object-contain rounded-md shadow-sm pointer-events-none" // pointer-events-none لتحسين استجابة اللمس
                                />
                                
                                {/* أيقونة التكبير تظهر عند التحويم */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                   <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                                </div>
                              </div>

                              {/* Navigation Arrows (if multiple slides) */}
                              {slides.length > 1 && (
                                <>
                                  {/* زر السابق: أضفنا ! لإجباره على الاختفاء في الموبايل */}
                                  <button
                                    onClick={(e) => handlePrevSlide(e, q.id, slides.length)}
                                    className="!hidden lg:!flex absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </button>

                                  {/* زر التالي: أضفنا ! لإجباره على الاختفاء في الموبايل */}
                                  <button
                                    onClick={(e) => handleNextSlide(e, q.id, slides.length)}
                                    className="!hidden lg:!flex absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background shadow-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>

                                  {/* Dots Indicator (نقاط التوضيح في الأسفل) */}
                                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 rounded-full bg-black/20 backdrop-blur-sm pointer-events-none">
                                    {slides.map((_, idx) => (
                                      <div 
                                        key={idx} 
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                          idx === currentImgIndex ? 'bg-primary' : 'bg-white/70'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                            
                            {/* نص توضيحي يظهر فقط إذا كان هناك أكثر من صورة */}
                            {slides.length > 1 && (
                              <p className="text-center text-xs text-muted-foreground mt-2 select-none">
                                {language === 'ar' ? 'اسحب الصورة يميناً أو يساراً للتنقل' : 'Swipe left or right to navigate'}
                              </p>
                            )}
                            
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ExamsPage;