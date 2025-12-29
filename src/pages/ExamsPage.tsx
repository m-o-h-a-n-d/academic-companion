import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Calculator, CircuitBoard } from 'lucide-react';
import wheatstoneBridge from '@/assets/circuits/wheatstone-bridge.png';
import crtDiagram from '@/assets/circuits/crt-diagram.png';
import frequencyMeter from '@/assets/circuits/frequency-meter.png';
import functionGenerator from '@/assets/circuits/function-generator.png';
import dualSlopeDvm from '@/assets/circuits/dual-slope-dvm.png';
import rampTypeDvm from '@/assets/circuits/ramp-type-dvm.png';
import oscilloscopeCrt from '@/assets/circuits/oscilloscope-crt.png';
import strainGauge from '@/assets/circuits/strain-gauge.jpg';

interface Question {
  id: number;
  category: 'theory' | 'calculation' | 'circuit';
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
  image?: string;
}

const questions: Question[] = [
  // Theory Questions (1-20)
  {
    id: 1,
    category: 'theory',
    question: {
      ar: 'ما الفرق بين أجهزة القياس التماثلية (Analog) والرقمية (Digital)؟',
      en: 'What is the difference between Analog and Digital measuring instruments?',
    },
    answer: {
      ar: `**الأجهزة التماثلية (Analog):**
- تعرض القراءات على مقياس متدرج مع مؤشر
- القراءة مستمرة وليست متقطعة
- تتأثر بأخطاء القراءة البشرية (Parallax Error)
- أبسط في التصميم وأقل تكلفة

**الأجهزة الرقمية (Digital):**
- تعرض القراءات كأرقام على شاشة رقمية
- دقة أعلى وأخطاء أقل
- إمكانية التخزين والنقل للبيانات
- مقاومة دخل عالية جداً (High Input Impedance)`,
      en: `**Analog Instruments:**
- Display readings on a graduated scale with a pointer
- Continuous, not discrete readings
- Affected by human reading errors (Parallax Error)
- Simpler design and lower cost

**Digital Instruments:**
- Display readings as numbers on digital screen
- Higher accuracy and fewer errors
- Data storage and transfer capability
- Very high input impedance`,
    },
  },
  {
    id: 2,
    category: 'theory',
    question: {
      ar: 'عرّف كلاً من: الدقة (Accuracy)، الوضوح (Resolution)، والحساسية (Sensitivity).',
      en: 'Define: Accuracy, Resolution, and Sensitivity.',
    },
    answer: {
      ar: `**الدقة (Accuracy):** هي مدى قرب القيمة المقاسة من القيمة الحقيقية، وتُعبر عنها كنسبة مئوية من الخطأ.

**الوضوح (Resolution):** هو أصغر تغيير في القيمة المقاسة يمكن للجهاز أن يكتشفه ويعرضه. في الأجهزة الرقمية، يعتمد على عدد الأرقام (digits).

**الحساسية (Sensitivity):** هي نسبة التغير في الخرج إلى التغير في الدخل، أي مقدار استجابة الجهاز للتغيرات الصغيرة في الكمية المقاسة.`,
      en: `**Accuracy:** The closeness of the measured value to the true value, expressed as a percentage error.

**Resolution:** The smallest change in measured value that an instrument can detect and display. In digital instruments, it depends on the number of digits.

**Sensitivity:** The ratio of output change to input change, i.e., how much the instrument responds to small changes in the measured quantity.`,
    },
  },
  {
    id: 3,
    category: 'theory',
    question: {
      ar: 'ما هي أنواع الأخطاء في أجهزة القياس؟ اذكرها مع شرح مختصر.',
      en: 'What are the types of errors in measuring instruments? List and briefly explain each.',
    },
    answer: {
      ar: `**1. الأخطاء الإجمالية (Gross Errors):**
- أخطاء بشرية ناتجة عن سوء القراءة أو الاستخدام الخاطئ للجهاز.

**2. الأخطاء المنتظمة (Systematic Errors):**
- أخطاء ثابتة ومتكررة ناتجة عن عيوب في الجهاز أو ظروف التشغيل.
- تشمل: أخطاء الجهاز، أخطاء البيئة، أخطاء المعايرة.

**3. الأخطاء العشوائية (Random Errors):**
- أخطاء غير متوقعة تتغير بشكل عشوائي.
- لا يمكن تجنبها بالكامل لكن يمكن تقليلها بتكرار القياس.`,
      en: `**1. Gross Errors:**
- Human errors due to misreading or improper use of instruments.

**2. Systematic Errors:**
- Consistent, repeatable errors due to instrument defects or operating conditions.
- Include: instrument errors, environmental errors, calibration errors.

**3. Random Errors:**
- Unpredictable errors that vary randomly.
- Cannot be completely avoided but can be reduced by repeated measurements.`,
    },
  },
  {
    id: 4,
    category: 'theory',
    question: {
      ar: 'اشرح مبدأ عمل جهاز قياس الجهد الرقمي من النوع Ramp-Type DVM.',
      en: 'Explain the working principle of Ramp-Type Digital Voltmeter (DVM).',
    },
    answer: {
      ar: `**مبدأ العمل:**
1. يتم توليد موجة منحدر (Ramp Signal) تبدأ من الصفر وتزيد خطياً.
2. عند بدء المنحدر، يفتح بوابة (Gate) تسمح بمرور نبضات ساعة (Clock Pulses).
3. تستمر البوابة مفتوحة حتى يتساوى جهد المنحدر مع الجهد المراد قياسه.
4. عند التساوي، تُغلق البوابة ويتوقف العد.
5. عدد النبضات المحسوبة يتناسب طردياً مع الجهد المُدخل.

**الميزات:** بسيط التصميم، منخفض التكلفة.
**العيوب:** دقة محدودة، يتأثر بالضوضاء.`,
      en: `**Working Principle:**
1. A ramp signal is generated starting from zero and increasing linearly.
2. When the ramp starts, a gate opens allowing clock pulses to pass.
3. The gate remains open until the ramp voltage equals the input voltage.
4. When equal, the gate closes and counting stops.
5. The number of counted pulses is proportional to the input voltage.

**Advantages:** Simple design, low cost.
**Disadvantages:** Limited accuracy, affected by noise.`,
    },
    image: rampTypeDvm,
  },
  {
    id: 5,
    category: 'theory',
    question: {
      ar: 'ما مميزات جهاز Dual-Slope DVM مقارنة بـ Ramp-Type DVM؟',
      en: 'What are the advantages of Dual-Slope DVM compared to Ramp-Type DVM?',
    },
    answer: {
      ar: `**مميزات Dual-Slope DVM:**
1. **دقة أعلى:** لا يتأثر بتغيرات سرعة الساعة أو ثابت زمن المكثف.
2. **رفض الضوضاء:** يقوم بعملية تكامل تُلغي تأثير الضوضاء العشوائية.
3. **استقرار أفضل:** القياس يعتمد على نسبة وليس قيمة مطلقة.
4. **خطية أفضل:** أداء خطي ممتاز على نطاق واسع.

**السبب:** يستخدم مرحلتين من التكامل (Integration) - الأولى للجهد المُدخل والثانية للجهد المرجعي، مما يُلغي تأثير معظم مصادر الخطأ.`,
      en: `**Advantages of Dual-Slope DVM:**
1. **Higher accuracy:** Not affected by clock speed or capacitor time constant variations.
2. **Noise rejection:** Integration process cancels random noise effects.
3. **Better stability:** Measurement depends on ratio, not absolute values.
4. **Better linearity:** Excellent linear performance over a wide range.

**Reason:** Uses two integration phases - first for input voltage and second for reference voltage, canceling most error sources.`,
    },
    image: dualSlopeDvm,
  },
  {
    id: 6,
    category: 'theory',
    question: {
      ar: 'اشرح مبدأ عمل عداد التردد الرقمي (Digital Frequency Meter).',
      en: 'Explain the working principle of Digital Frequency Meter.',
    },
    answer: {
      ar: `**مبدأ العمل:**
1. **تشكيل الإشارة:** تحويل الإشارة الداخلة إلى نبضات مربعة باستخدام Schmitt Trigger.
2. **توليد Base Time:** توليد فترة زمنية معلومة بدقة (مثلاً 1 ثانية) من مذبذب كريستالي.
3. **فتح البوابة:** خلال فترة Base Time، تفتح بوابة AND لتمرير النبضات.
4. **العد:** عداد رقمي يحسب عدد النبضات التي مرت خلال الفترة الزمنية.
5. **العرض:** عدد النبضات = التردد (إذا كان Base Time = 1 ثانية).

**المعادلة:** f = N / T حيث N = عدد النبضات، T = زمن القياس`,
      en: `**Working Principle:**
1. **Signal Conditioning:** Convert input signal to square pulses using Schmitt Trigger.
2. **Base Time Generation:** Generate a precise time period (e.g., 1 second) from crystal oscillator.
3. **Gate Opening:** During Base Time, AND gate opens to pass pulses.
4. **Counting:** Digital counter counts pulses that passed during the time period.
5. **Display:** Number of pulses = frequency (if Base Time = 1 second).

**Equation:** f = N / T where N = number of pulses, T = measurement time`,
    },
    image: frequencyMeter,
  },
  {
    id: 7,
    category: 'theory',
    question: {
      ar: 'ما هي مكونات أنبوب الأشعة الكاثودية (CRT) في الأوسيلوسكوب؟',
      en: 'What are the components of Cathode Ray Tube (CRT) in an oscilloscope?',
    },
    answer: {
      ar: `**المكونات الرئيسية لـ CRT:**

**1. مجموعة المدفع الإلكتروني (Electron Gun):**
- الكاثود (Cathode): مصدر الإلكترونات
- شبكة التحكم (Control Grid): التحكم في شدة الشعاع
- الأنود المُسرِّع (Accelerating Anode): تسريع الإلكترونات
- الأنود البؤري (Focusing Anode): تركيز الشعاع

**2. نظام الانحراف (Deflection System):**
- ألواح الانحراف الأفقي (X-plates)
- ألواح الانحراف الرأسي (Y-plates)

**3. الشاشة الفوسفورية (Phosphor Screen):**
- تُحول طاقة الإلكترونات إلى ضوء مرئي`,
      en: `**Main CRT Components:**

**1. Electron Gun Assembly:**
- Cathode: Electron source
- Control Grid: Controls beam intensity
- Accelerating Anode: Accelerates electrons
- Focusing Anode: Focuses the beam

**2. Deflection System:**
- Horizontal deflection plates (X-plates)
- Vertical deflection plates (Y-plates)

**3. Phosphor Screen:**
- Converts electron energy to visible light`,
    },
    image: crtDiagram,
  },
  {
    id: 8,
    category: 'theory',
    question: {
      ar: 'ما الفرق بين الأوسيلوسكوب التماثلي والأوسيلوسكوب التخزيني الرقمي (DSO)؟',
      en: 'What is the difference between Analog Oscilloscope and Digital Storage Oscilloscope (DSO)?',
    },
    answer: {
      ar: `**الأوسيلوسكوب التماثلي:**
- يعرض الإشارة مباشرة على CRT
- لا يمكنه تخزين الإشارات
- مناسب للإشارات المتكررة
- Bandwidth محدود نسبياً
- تكلفة أقل

**الأوسيلوسكوب الرقمي (DSO):**
- يحول الإشارة إلى بيانات رقمية (ADC)
- يخزن الإشارات في ذاكرة رقمية
- يمكن عرض إشارات غير متكررة (Single Shot)
- قياسات تلقائية ودقيقة
- إمكانية نقل البيانات للحاسب
- تحليل طيفي FFT`,
      en: `**Analog Oscilloscope:**
- Displays signal directly on CRT
- Cannot store signals
- Suitable for repetitive signals
- Relatively limited bandwidth
- Lower cost

**Digital Storage Oscilloscope (DSO):**
- Converts signal to digital data (ADC)
- Stores signals in digital memory
- Can display non-repetitive signals (Single Shot)
- Automatic and precise measurements
- Data transfer to computer capability
- FFT spectral analysis`,
    },
  },
  {
    id: 9,
    category: 'theory',
    question: {
      ar: 'اشرح مبدأ عمل جسر ويتستون (Wheatstone Bridge) وما هي شروط الاتزان؟',
      en: 'Explain the working principle of Wheatstone Bridge and what are the balance conditions?',
    },
    answer: {
      ar: `**مبدأ العمل:**
جسر ويتستون هو دائرة تُستخدم لقياس المقاومات المجهولة بدقة عالية. يتكون من أربع مقاومات مرتبة على شكل ماسة مع جلفانومتر في المنتصف.

**شرط الاتزان:**
عندما لا يمر تيار في الجلفانومتر (Ig = 0)، يكون الجسر متزناً.

**معادلة الاتزان:**
R₁/R₂ = R₃/Rx

**أو:**
Rx = R₃ × (R₂/R₁)

**الاستخدامات:**
- قياس المقاومات المجهولة
- حساسات الإجهاد (Strain Gauges)
- قياس درجة الحرارة (RTD)`,
      en: `**Working Principle:**
Wheatstone Bridge is a circuit used to measure unknown resistances with high accuracy. It consists of four resistors arranged in a diamond shape with a galvanometer in the middle.

**Balance Condition:**
When no current flows through the galvanometer (Ig = 0), the bridge is balanced.

**Balance Equation:**
R₁/R₂ = R₃/Rx

**Or:**
Rx = R₃ × (R₂/R₁)

**Applications:**
- Measuring unknown resistances
- Strain Gauges
- Temperature measurement (RTD)`,
    },
    image: wheatstoneBridge,
  },
  {
    id: 10,
    category: 'theory',
    question: {
      ar: 'ما هي أنواع المحولات (Transducers)؟ اذكر أمثلة لكل نوع.',
      en: 'What are the types of Transducers? Give examples of each type.',
    },
    answer: {
      ar: `**تصنيف المحولات:**

**1. حسب مصدر الطاقة:**
- **نشطة (Active):** تولد طاقة كهربائية ذاتياً (Thermocouple, Piezoelectric)
- **سلبية (Passive):** تحتاج مصدر طاقة خارجي (RTD, Strain Gauge)

**2. حسب الكمية المقاسة:**
- **حرارة:** Thermocouple, RTD, Thermistor
- **ضغط/إجهاد:** Strain Gauge, Piezoelectric
- **ضوء:** LDR, Photodiode, Phototransistor
- **إزاحة:** LVDT, Potentiometer
- **مستوى:** Ultrasonic, Capacitive

**3. حسب نوع الخرج:**
- **تماثلي:** خرج متغير بشكل مستمر
- **رقمي:** خرج على شكل نبضات`,
      en: `**Transducer Classification:**

**1. By Power Source:**
- **Active:** Generate electrical energy (Thermocouple, Piezoelectric)
- **Passive:** Need external power (RTD, Strain Gauge)

**2. By Measured Quantity:**
- **Temperature:** Thermocouple, RTD, Thermistor
- **Pressure/Strain:** Strain Gauge, Piezoelectric
- **Light:** LDR, Photodiode, Phototransistor
- **Displacement:** LVDT, Potentiometer
- **Level:** Ultrasonic, Capacitive

**3. By Output Type:**
- **Analog:** Continuously varying output
- **Digital:** Pulse output`,
    },
  },
  {
    id: 11,
    category: 'theory',
    question: {
      ar: 'اشرح مبدأ عمل مقياس الإجهاد (Strain Gauge).',
      en: 'Explain the working principle of Strain Gauge.',
    },
    answer: {
      ar: `**مبدأ العمل:**
يعتمد على تغير مقاومة السلك المعدني عند تعرضه للشد أو الضغط.

**العلاقة الأساسية:**
ΔR/R = GF × ε

حيث:
- ΔR/R: التغير النسبي في المقاومة
- GF: معامل الحساسية (Gauge Factor)
- ε: الإجهاد (Strain)

**معامل الحساسية:**
GF = (ΔR/R) / ε ≈ 2 للمعادن

**التطبيقات:**
- قياس القوى والأحمال
- قياس الضغط
- تحليل الاهتزازات
- موازين الوزن الدقيقة`,
      en: `**Working Principle:**
Based on resistance change of metallic wire when subjected to tension or compression.

**Basic Relationship:**
ΔR/R = GF × ε

Where:
- ΔR/R: Relative change in resistance
- GF: Gauge Factor
- ε: Strain

**Gauge Factor:**
GF = (ΔR/R) / ε ≈ 2 for metals

**Applications:**
- Force and load measurement
- Pressure measurement
- Vibration analysis
- Precision weighing scales`,
    },
    image: strainGauge,
  },
  {
    id: 12,
    category: 'theory',
    question: {
      ar: 'ما الفرق بين Thermocouple و RTD في قياس درجة الحرارة؟',
      en: 'What is the difference between Thermocouple and RTD in temperature measurement?',
    },
    answer: {
      ar: `**Thermocouple (المزدوجة الحرارية):**
- **المبدأ:** تأثير Seebeck - توليد جهد عند تسخين نقطة اتصال معدنين مختلفين
- **النطاق:** واسع جداً (-200°C إلى +2000°C)
- **الدقة:** متوسطة (±1°C إلى ±2°C)
- **الاستجابة:** سريعة
- **التكلفة:** منخفضة
- **لا يحتاج مصدر خارجي** (Active)

**RTD (Resistance Temperature Detector):**
- **المبدأ:** تغير مقاومة المعدن (عادة البلاتين) مع الحرارة
- **النطاق:** محدود (-200°C إلى +600°C)
- **الدقة:** عالية جداً (±0.1°C)
- **الاستجابة:** أبطأ
- **التكلفة:** أعلى
- **يحتاج مصدر خارجي** (Passive)`,
      en: `**Thermocouple:**
- **Principle:** Seebeck effect - voltage generated when junction of two different metals is heated
- **Range:** Very wide (-200°C to +2000°C)
- **Accuracy:** Medium (±1°C to ±2°C)
- **Response:** Fast
- **Cost:** Low
- **No external power needed** (Active)

**RTD (Resistance Temperature Detector):**
- **Principle:** Metal resistance change (usually platinum) with temperature
- **Range:** Limited (-200°C to +600°C)
- **Accuracy:** Very high (±0.1°C)
- **Response:** Slower
- **Cost:** Higher
- **Needs external power** (Passive)`,
    },
  },
  {
    id: 13,
    category: 'theory',
    question: {
      ar: 'اشرح مكونات مولد الإشارات (Function Generator).',
      en: 'Explain the components of a Function Generator.',
    },
    answer: {
      ar: `**المكونات الرئيسية:**

**1. مذبذب مُتحكم بالجهد (VCO):**
- يولد موجة مثلثة أساسية
- التردد يتحكم فيه بجهد DC

**2. مُشكّل الموجة المربعة (Schmitt Trigger):**
- يحول الموجة المثلثة إلى موجة مربعة
- باستخدام مقارن (Comparator)

**3. مُشكّل الموجة الجيبية:**
- يحول المثلثة إلى جيبية
- باستخدام دائرة تشكيل غير خطية

**4. مُكبر الخرج (Output Amplifier):**
- يُكبر الإشارة للمستوى المطلوب
- تحكم في السعة (Amplitude)

**5. دائرة التحكم في التردد:**
- مفتاح نطاق التردد
- مقاومة متغيرة للضبط الدقيق`,
      en: `**Main Components:**

**1. Voltage Controlled Oscillator (VCO):**
- Generates basic triangular wave
- Frequency controlled by DC voltage

**2. Square Wave Shaper (Schmitt Trigger):**
- Converts triangular to square wave
- Using comparator

**3. Sine Wave Shaper:**
- Converts triangular to sine wave
- Using non-linear shaping circuit

**4. Output Amplifier:**
- Amplifies signal to required level
- Amplitude control

**5. Frequency Control Circuit:**
- Frequency range switch
- Variable resistor for fine tuning`,
    },
    image: functionGenerator,
  },
  {
    id: 14,
    category: 'theory',
    question: {
      ar: 'ما هي أنواع جسور التيار المتردد (AC Bridges)؟ اذكر استخدام كل نوع.',
      en: 'What are the types of AC Bridges? Mention the use of each type.',
    },
    answer: {
      ar: `**أنواع جسور AC:**

**1. جسر Maxwell:**
- لقياس المحاثة (Inductance) بدلالة السعة
- مناسب للملفات ذات Q متوسط

**2. جسر Hay:**
- لقياس الملفات ذات Q عالي
- دقة أعلى من Maxwell

**3. جسر Schering:**
- لقياس السعة (Capacitance)
- قياس معامل الفقد في المكثفات

**4. جسر Wien:**
- لقياس التردد
- يُستخدم في المذبذبات

**5. جسر Owen:**
- لقياس المحاثة
- مناسب لنطاق واسع من القيم`,
      en: `**Types of AC Bridges:**

**1. Maxwell Bridge:**
- For measuring inductance in terms of capacitance
- Suitable for medium Q coils

**2. Hay Bridge:**
- For measuring high Q coils
- Higher accuracy than Maxwell

**3. Schering Bridge:**
- For measuring capacitance
- Measuring loss factor in capacitors

**4. Wien Bridge:**
- For frequency measurement
- Used in oscillators

**5. Owen Bridge:**
- For measuring inductance
- Suitable for wide range of values`,
    },
  },
  {
    id: 15,
    category: 'theory',
    question: {
      ar: 'ما هو LDR (Light Dependent Resistor)؟ اشرح خصائصه.',
      en: 'What is LDR (Light Dependent Resistor)? Explain its characteristics.',
    },
    answer: {
      ar: `**تعريف LDR:**
مقاومة تتغير قيمتها حسب شدة الضوء الساقط عليها.

**مبدأ العمل:**
- في الظلام: مقاومة عالية جداً (MΩ)
- في الضوء: مقاومة منخفضة (kΩ أو أقل)

**المادة:** عادة كبريتيد الكادميوم (CdS)

**الخصائص:**
- علاقة غير خطية بين الضوء والمقاومة
- استجابة بطيئة نسبياً (ms)
- حساسية عالية للضوء المرئي
- لا يحتاج انحياز (bias)

**التطبيقات:**
- دوائر الإضاءة التلقائية
- كاميرات التصوير
- أجهزة الإنذار الضوئية`,
      en: `**LDR Definition:**
A resistor whose value changes according to incident light intensity.

**Working Principle:**
- In darkness: Very high resistance (MΩ)
- In light: Low resistance (kΩ or less)

**Material:** Usually Cadmium Sulfide (CdS)

**Characteristics:**
- Non-linear relationship between light and resistance
- Relatively slow response (ms)
- High sensitivity to visible light
- No bias needed

**Applications:**
- Automatic lighting circuits
- Cameras
- Light alarm devices`,
    },
  },
  {
    id: 16,
    category: 'theory',
    question: {
      ar: 'ما الفرق بين Photodiode و Phototransistor؟',
      en: 'What is the difference between Photodiode and Phototransistor?',
    },
    answer: {
      ar: `**Photodiode:**
- **التركيب:** ثنائي PN عادي
- **الاستجابة:** سريعة جداً (ns)
- **الحساسية:** منخفضة نسبياً
- **الخرج:** تيار صغير (μA)
- **وضع التشغيل:** انحياز عكسي
- **التطبيق:** اتصالات ضوئية، قياسات سريعة

**Phototransistor:**
- **التركيب:** ترانزستور مع قاعدة حساسة للضوء
- **الاستجابة:** أبطأ (μs)
- **الحساسية:** عالية (100-1000 مرة من Photodiode)
- **الخرج:** تيار أكبر (mA)
- **وضع التشغيل:** تضخيم داخلي
- **التطبيق:** كشف الأجسام، عدادات`,
      en: `**Photodiode:**
- **Structure:** Normal PN diode
- **Response:** Very fast (ns)
- **Sensitivity:** Relatively low
- **Output:** Small current (μA)
- **Operation:** Reverse bias
- **Application:** Optical communication, fast measurements

**Phototransistor:**
- **Structure:** Transistor with light-sensitive base
- **Response:** Slower (μs)
- **Sensitivity:** High (100-1000 times Photodiode)
- **Output:** Larger current (mA)
- **Operation:** Internal amplification
- **Application:** Object detection, counters`,
    },
  },
  {
    id: 17,
    category: 'theory',
    question: {
      ar: 'اشرح مبدأ عمل الألياف البصرية (Fiber Optics) في نقل البيانات.',
      en: 'Explain the working principle of Fiber Optics in data transmission.',
    },
    answer: {
      ar: `**مبدأ العمل:**
يعتمد على الانعكاس الكلي الداخلي (Total Internal Reflection) للضوء.

**التركيب:**
1. **القلب (Core):** زجاج عالي النقاء، معامل انكسار n₁
2. **الغلاف (Cladding):** معامل انكسار n₂ < n₁
3. **الغطاء الحماية (Coating):** حماية ميكانيكية

**شرط الانعكاس الكلي:**
زاوية السقوط > الزاوية الحرجة

**المميزات:**
- عرض نطاق عالي جداً
- مناعة من التداخل الكهرومغناطيسي
- خفة الوزن وصغر الحجم
- أمان عالي (صعوبة التنصت)

**الأنواع:**
- Single-mode: لمسافات طويلة
- Multi-mode: لمسافات قصيرة`,
      en: `**Working Principle:**
Based on Total Internal Reflection of light.

**Structure:**
1. **Core:** High-purity glass, refractive index n₁
2. **Cladding:** Refractive index n₂ < n₁
3. **Coating:** Mechanical protection

**Total Reflection Condition:**
Incident angle > Critical angle

**Advantages:**
- Very high bandwidth
- Immunity from electromagnetic interference
- Light weight and small size
- High security (difficult to tap)

**Types:**
- Single-mode: For long distances
- Multi-mode: For short distances`,
    },
  },
  {
    id: 18,
    category: 'theory',
    question: {
      ar: 'ما هي وظيفة دائرة Schmitt Trigger في أجهزة القياس؟',
      en: 'What is the function of Schmitt Trigger circuit in measuring instruments?',
    },
    answer: {
      ar: `**وظائف Schmitt Trigger:**

**1. تشكيل الإشارة:**
- تحويل أي إشارة (جيبية، مثلثة، غير منتظمة) إلى موجة مربعة نظيفة

**2. إزالة الضوضاء:**
- بفضل خاصية Hysteresis، لا يتأثر بالاضطرابات الصغيرة

**3. تحديد مستوى العتبة:**
- Upper Threshold Voltage (UTP)
- Lower Threshold Voltage (LTP)

**4. التطبيقات في القياسات:**
- عدادات التردد: تحويل الإشارة للعد
- مولدات الموجة المربعة
- دوائر التحكم والمقارنة

**خاصية Hysteresis:**
الفرق بين UTP و LTP يمنع التذبذب عند وجود ضوضاء`,
      en: `**Schmitt Trigger Functions:**

**1. Signal Shaping:**
- Convert any signal (sine, triangle, irregular) to clean square wave

**2. Noise Removal:**
- Due to Hysteresis, not affected by small disturbances

**3. Threshold Level Definition:**
- Upper Threshold Voltage (UTP)
- Lower Threshold Voltage (LTP)

**4. Measurement Applications:**
- Frequency counters: Signal conversion for counting
- Square wave generators
- Control and comparison circuits

**Hysteresis Property:**
Difference between UTP and LTP prevents oscillation in presence of noise`,
    },
  },
  {
    id: 19,
    category: 'theory',
    question: {
      ar: 'ما معنى مصطلح Bandwidth في الأوسيلوسكوب؟ وما أهميته؟',
      en: 'What does Bandwidth mean in oscilloscopes? What is its importance?',
    },
    answer: {
      ar: `**تعريف Bandwidth:**
هو نطاق الترددات الذي يستطيع الأوسيلوسكوب عرضه بدقة، ويُحدد عند النقطة التي تنخفض فيها سعة الإشارة إلى 70.7% (أو -3dB) من قيمتها الأصلية.

**الأهمية:**
1. **دقة القياس:** تردد الإشارة يجب أن يكون أقل من Bandwidth
2. **قاعدة الخمسة:** للقياس الدقيق، Bandwidth ≥ 5 × f_signal

**مثال:**
لقياس إشارة 20 MHz بدقة، تحتاج:
Bandwidth ≥ 5 × 20 = 100 MHz

**العلاقة بـ Rise Time:**
Rise Time ≈ 0.35 / Bandwidth

**ملاحظة:** كلما زاد Bandwidth، زادت تكلفة الجهاز`,
      en: `**Bandwidth Definition:**
The frequency range that the oscilloscope can display accurately, defined at the point where signal amplitude drops to 70.7% (or -3dB) of its original value.

**Importance:**
1. **Measurement Accuracy:** Signal frequency must be less than Bandwidth
2. **Rule of Five:** For accurate measurement, Bandwidth ≥ 5 × f_signal

**Example:**
To accurately measure 20 MHz signal:
Bandwidth ≥ 5 × 20 = 100 MHz

**Relationship with Rise Time:**
Rise Time ≈ 0.35 / Bandwidth

**Note:** Higher Bandwidth = Higher cost`,
    },
  },
  {
    id: 20,
    category: 'theory',
    question: {
      ar: 'ما هي أنواع المجسات (Probes) المستخدمة مع الأوسيلوسكوب؟',
      en: 'What are the types of Probes used with oscilloscopes?',
    },
    answer: {
      ar: `**أنواع المجسات:**

**1. المجس العادي 1X:**
- لا يضعف الإشارة
- مقاومة دخل منخفضة
- يُستخدم لإشارات الجهد المنخفض

**2. المجس المُضعف 10X:**
- يُضعف الإشارة 10 مرات
- مقاومة دخل عالية (10 MΩ)
- يُقلل تحميل الدائرة
- Bandwidth أعلى
- الأكثر استخداماً

**3. المجس النشط (Active Probe):**
- يحتوي مكبر داخلي
- مقاومة دخل عالية جداً
- للترددات العالية جداً

**4. مجس التيار (Current Probe):**
- لقياس التيار بدون قطع الدائرة
- يستخدم مبدأ Hall Effect

**5. المجس التفاضلي (Differential Probe):**
- لقياس الجهد بين نقطتين`,
      en: `**Probe Types:**

**1. Standard 1X Probe:**
- Does not attenuate signal
- Low input impedance
- Used for low voltage signals

**2. Attenuated 10X Probe:**
- Attenuates signal 10 times
- High input impedance (10 MΩ)
- Reduces circuit loading
- Higher bandwidth
- Most commonly used

**3. Active Probe:**
- Contains internal amplifier
- Very high input impedance
- For very high frequencies

**4. Current Probe:**
- Measures current without cutting circuit
- Uses Hall Effect principle

**5. Differential Probe:**
- Measures voltage between two points`,
    },
  },
  // Calculation Questions (21-35)
  {
    id: 21,
    category: 'calculation',
    question: {
      ar: 'جهاز DVM رقمي من 3½ digits يعمل على نطاق 2V. احسب الوضوح (Resolution) ودقة القياس إذا كانت الدقة ±0.5% من القراءة ±1 digit.',
      en: 'A 3½ digit DVM operates on 2V range. Calculate the Resolution and measurement accuracy if accuracy is ±0.5% of reading ±1 digit.',
    },
    answer: {
      ar: `**الحل:**

**1. حساب الوضوح (Resolution):**
- 3½ digits تعني أقصى قراءة = 1999
- النطاق = 2V = 2000 mV
- Resolution = Range / Max Count = 2000 / 2000 = 1 mV

**2. حساب دقة القياس لقراءة 1.5V:**
- خطأ النسبة المئوية = ±0.5% × 1.5 = ±0.0075V = ±7.5 mV
- خطأ الـ digit = ±1 × 1 mV = ±1 mV
- الخطأ الكلي = ±7.5 + ±1 = ±8.5 mV

**3. الدقة النهائية:**
القراءة = 1.5V ± 8.5 mV
أو 1.5V ± 0.57%`,
      en: `**Solution:**

**1. Calculate Resolution:**
- 3½ digits means max count = 1999
- Range = 2V = 2000 mV
- Resolution = Range / Max Count = 2000 / 2000 = 1 mV

**2. Calculate accuracy for 1.5V reading:**
- Percentage error = ±0.5% × 1.5 = ±0.0075V = ±7.5 mV
- Digit error = ±1 × 1 mV = ±1 mV
- Total error = ±7.5 + ±1 = ±8.5 mV

**3. Final Accuracy:**
Reading = 1.5V ± 8.5 mV
or 1.5V ± 0.57%`,
    },
  },
  {
    id: 22,
    category: 'calculation',
    question: {
      ar: 'في جسر ويتستون، إذا كان R₁ = 100Ω, R₂ = 200Ω, R₃ = 150Ω. احسب قيمة المقاومة المجهولة Rx عند الاتزان.',
      en: 'In a Wheatstone Bridge, if R₁ = 100Ω, R₂ = 200Ω, R₃ = 150Ω. Calculate the unknown resistance Rx at balance.',
    },
    answer: {
      ar: `**الحل:**

**شرط الاتزان لجسر ويتستون:**
R₁/R₂ = R₃/Rx

**بالتعويض:**
100/200 = 150/Rx

**حل المعادلة:**
Rx = 150 × (200/100)
Rx = 150 × 2
**Rx = 300Ω**

**التحقق:**
R₁/R₂ = 100/200 = 0.5
R₃/Rx = 150/300 = 0.5 ✓`,
      en: `**Solution:**

**Wheatstone Bridge balance condition:**
R₁/R₂ = R₃/Rx

**Substituting:**
100/200 = 150/Rx

**Solving:**
Rx = 150 × (200/100)
Rx = 150 × 2
**Rx = 300Ω**

**Verification:**
R₁/R₂ = 100/200 = 0.5
R₃/Rx = 150/300 = 0.5 ✓`,
    },
  },
  {
    id: 23,
    category: 'calculation',
    question: {
      ar: 'على شاشة الأوسيلوسكوب، موجة جيبية تشغل 4 تقسيمات رأسياً و 2.5 تقسيمة أفقياً. إذا كان Time/div = 2ms و Volt/div = 5V. احسب Vp-p والتردد.',
      en: 'On oscilloscope screen, a sine wave occupies 4 vertical divisions and 2.5 horizontal divisions. If Time/div = 2ms and Volt/div = 5V. Calculate Vp-p and frequency.',
    },
    answer: {
      ar: `**الحل:**

**1. حساب Vp-p:**
Vp-p = عدد التقسيمات الرأسية × Volt/div
Vp-p = 4 × 5V
**Vp-p = 20V**

**2. حساب الزمن الدوري (T):**
T = عدد التقسيمات الأفقية × Time/div
T = 2.5 × 2ms
T = 5 ms = 0.005 s

**3. حساب التردد:**
f = 1/T
f = 1/0.005
**f = 200 Hz**

**ملخص:**
- Vp-p = 20V
- T = 5 ms
- f = 200 Hz`,
      en: `**Solution:**

**1. Calculate Vp-p:**
Vp-p = Vertical divisions × Volt/div
Vp-p = 4 × 5V
**Vp-p = 20V**

**2. Calculate Period (T):**
T = Horizontal divisions × Time/div
T = 2.5 × 2ms
T = 5 ms = 0.005 s

**3. Calculate Frequency:**
f = 1/T
f = 1/0.005
**f = 200 Hz**

**Summary:**
- Vp-p = 20V
- T = 5 ms
- f = 200 Hz`,
    },
  },
  {
    id: 24,
    category: 'calculation',
    question: {
      ar: 'عداد تردد رقمي يستخدم Base Time = 0.1 ثانية. إذا كانت قراءة العداد 5000 نبضة، احسب التردد المُقاس ودقة القياس.',
      en: 'A digital frequency counter uses Base Time = 0.1 seconds. If the counter reading is 5000 pulses, calculate the measured frequency and measurement resolution.',
    },
    answer: {
      ar: `**الحل:**

**1. حساب التردد:**
f = N / T
f = 5000 / 0.1
**f = 50,000 Hz = 50 kHz**

**2. دقة القياس (Resolution):**
Resolution = 1 / Base Time
Resolution = 1 / 0.1
**Resolution = 10 Hz**

**3. خطأ القياس:**
الخطأ = ±1 count = ±10 Hz
النسبة المئوية = (10/50000) × 100 = ±0.02%

**ملاحظة:** لتحسين الدقة، يمكن زيادة Base Time`,
      en: `**Solution:**

**1. Calculate Frequency:**
f = N / T
f = 5000 / 0.1
**f = 50,000 Hz = 50 kHz**

**2. Measurement Resolution:**
Resolution = 1 / Base Time
Resolution = 1 / 0.1
**Resolution = 10 Hz**

**3. Measurement Error:**
Error = ±1 count = ±10 Hz
Percentage = (10/50000) × 100 = ±0.02%

**Note:** To improve accuracy, Base Time can be increased`,
    },
  },
  {
    id: 25,
    category: 'calculation',
    question: {
      ar: 'مقياس إجهاد (Strain Gauge) له مقاومة 120Ω ومعامل حساسية GF = 2.1. إذا تغيرت المقاومة بمقدار 0.24Ω، احسب الإجهاد (Strain).',
      en: 'A Strain Gauge has resistance 120Ω and Gauge Factor GF = 2.1. If resistance changed by 0.24Ω, calculate the Strain.',
    },
    answer: {
      ar: `**الحل:**

**المعطيات:**
- R = 120Ω
- ΔR = 0.24Ω
- GF = 2.1

**المعادلة:**
ΔR/R = GF × ε

**حساب ΔR/R:**
ΔR/R = 0.24/120 = 0.002

**حساب الإجهاد ε:**
ε = (ΔR/R) / GF
ε = 0.002 / 2.1
**ε = 0.000952 = 952 μstrain**

**أو بالنسبة المئوية:**
ε = 0.0952%`,
      en: `**Solution:**

**Given:**
- R = 120Ω
- ΔR = 0.24Ω
- GF = 2.1

**Equation:**
ΔR/R = GF × ε

**Calculate ΔR/R:**
ΔR/R = 0.24/120 = 0.002

**Calculate Strain ε:**
ε = (ΔR/R) / GF
ε = 0.002 / 2.1
**ε = 0.000952 = 952 μstrain**

**Or as percentage:**
ε = 0.0952%`,
    },
  },
  {
    id: 26,
    category: 'calculation',
    question: {
      ar: 'أوسيلوسكوب له Bandwidth = 100 MHz. احسب أسرع Rise Time يمكن قياسه بدقة.',
      en: 'An oscilloscope has Bandwidth = 100 MHz. Calculate the fastest Rise Time that can be accurately measured.',
    },
    answer: {
      ar: `**الحل:**

**العلاقة:**
Rise Time ≈ 0.35 / Bandwidth

**بالتعويض:**
Rise Time = 0.35 / (100 × 10⁶)
Rise Time = 0.35 / 100,000,000
**Rise Time = 3.5 ns**

**التفسير:**
- الأوسيلوسكوب قادر على قياس إشارات لها Rise Time ≥ 3.5 ns بدقة
- إشارات أسرع من ذلك ستظهر مشوهة
- لقياس إشارة بـ Rise Time = 1 ns، تحتاج:
  BW = 0.35/1ns = 350 MHz`,
      en: `**Solution:**

**Relationship:**
Rise Time ≈ 0.35 / Bandwidth

**Substituting:**
Rise Time = 0.35 / (100 × 10⁶)
Rise Time = 0.35 / 100,000,000
**Rise Time = 3.5 ns**

**Interpretation:**
- Oscilloscope can accurately measure signals with Rise Time ≥ 3.5 ns
- Faster signals will appear distorted
- To measure signal with Rise Time = 1 ns:
  BW = 0.35/1ns = 350 MHz`,
    },
  },
  {
    id: 27,
    category: 'calculation',
    question: {
      ar: 'جهاز Dual-Slope DVM يستخدم مكثف C = 0.1μF ومقاومة R = 100kΩ. إذا كان جهد الدخل 1.5V والجهد المرجعي 2V، احسب نسبة أزمنة التكامل.',
      en: 'A Dual-Slope DVM uses capacitor C = 0.1μF and resistance R = 100kΩ. If input voltage is 1.5V and reference voltage is 2V, calculate the integration time ratio.',
    },
    answer: {
      ar: `**الحل:**

**مبدأ Dual-Slope:**
في مرحلة التفريغ، الزمن يتناسب مع الجهد المُدخل:

t₂/t₁ = Vin/Vref

**بالتعويض:**
t₂/t₁ = 1.5/2 = 0.75

**التفسير:**
- t₁: زمن التكامل الثابت (تحدده الدائرة)
- t₂: زمن التفريغ (يُقاس)
- t₂ = 0.75 × t₁

**إذا كان t₁ = 100ms:**
t₂ = 0.75 × 100 = 75 ms

**ميزة هذه الطريقة:**
النتيجة لا تعتمد على قيم R و C بشكل مطلق`,
      en: `**Solution:**

**Dual-Slope Principle:**
In discharge phase, time is proportional to input voltage:

t₂/t₁ = Vin/Vref

**Substituting:**
t₂/t₁ = 1.5/2 = 0.75

**Interpretation:**
- t₁: Fixed integration time (set by circuit)
- t₂: Discharge time (measured)
- t₂ = 0.75 × t₁

**If t₁ = 100ms:**
t₂ = 0.75 × 100 = 75 ms

**Advantage of this method:**
Result doesn't depend on absolute R and C values`,
    },
  },
  {
    id: 28,
    category: 'calculation',
    question: {
      ar: 'RTD من البلاتين له مقاومة R₀ = 100Ω عند 0°C ومعامل حرارة α = 0.00385/°C. احسب المقاومة عند 150°C.',
      en: 'A platinum RTD has resistance R₀ = 100Ω at 0°C and temperature coefficient α = 0.00385/°C. Calculate resistance at 150°C.',
    },
    answer: {
      ar: `**الحل:**

**معادلة RTD:**
R(T) = R₀ × (1 + α × T)

**المعطيات:**
- R₀ = 100Ω
- α = 0.00385/°C
- T = 150°C

**بالتعويض:**
R(150) = 100 × (1 + 0.00385 × 150)
R(150) = 100 × (1 + 0.5775)
R(150) = 100 × 1.5775
**R(150) = 157.75Ω**

**التغير في المقاومة:**
ΔR = 157.75 - 100 = 57.75Ω

**الحساسية:**
ΔR/ΔT = 57.75/150 = 0.385 Ω/°C`,
      en: `**Solution:**

**RTD Equation:**
R(T) = R₀ × (1 + α × T)

**Given:**
- R₀ = 100Ω
- α = 0.00385/°C
- T = 150°C

**Substituting:**
R(150) = 100 × (1 + 0.00385 × 150)
R(150) = 100 × (1 + 0.5775)
R(150) = 100 × 1.5775
**R(150) = 157.75Ω**

**Resistance Change:**
ΔR = 157.75 - 100 = 57.75Ω

**Sensitivity:**
ΔR/ΔT = 57.75/150 = 0.385 Ω/°C`,
    },
  },
  {
    id: 29,
    category: 'calculation',
    question: {
      ar: 'على شاشة الأوسيلوسكوب تظهر موجتان جيبيتان بفرق طور. إذا كانت المسافة بين قمتيهما = 1.5 تقسيمة والزمن الدوري = 6 تقسيمات. احسب فرق الطور.',
      en: 'Two sine waves appear on oscilloscope with phase difference. If distance between peaks = 1.5 divisions and period = 6 divisions. Calculate phase difference.',
    },
    answer: {
      ar: `**الحل:**

**العلاقة:**
φ = (Δt/T) × 360°

حيث:
- Δt = فرق الزمن بين الموجتين = 1.5 تقسيمة
- T = الزمن الدوري = 6 تقسيمات

**بالتعويض:**
φ = (1.5/6) × 360°
φ = 0.25 × 360°
**φ = 90°**

**بالراديان:**
φ = 90° × (π/180) = π/2 rad

**ملاحظة:**
يمكن أيضاً استخدام منحنى ليساجو (Lissajous) لقياس فرق الطور`,
      en: `**Solution:**

**Relationship:**
φ = (Δt/T) × 360°

Where:
- Δt = Time difference between waves = 1.5 divisions
- T = Period = 6 divisions

**Substituting:**
φ = (1.5/6) × 360°
φ = 0.25 × 360°
**φ = 90°**

**In radians:**
φ = 90° × (π/180) = π/2 rad

**Note:**
Lissajous pattern can also be used to measure phase difference`,
    },
  },
  {
    id: 30,
    category: 'calculation',
    question: {
      ar: 'جهاز DVM من 4½ digits على نطاق 20V. ما هي أقصى قراءة يمكن عرضها وما هو الوضوح؟',
      en: 'A 4½ digit DVM on 20V range. What is the maximum displayable reading and what is the resolution?',
    },
    answer: {
      ar: `**الحل:**

**1. أقصى قراءة (Max Count):**
- 4½ digits = 4 أرقام كاملة + نصف رقم (0 أو 1)
- أقصى قراءة = 19999

**2. نطاق العرض:**
- النطاق = 20V
- أقصى قراءة معروضة = 19.999V

**3. الوضوح (Resolution):**
Resolution = Range / Max Count
Resolution = 20V / 20000
**Resolution = 1 mV = 0.001V**

**4. مثال:**
قراءة 12.345V تُعرض كـ: 12.345
آخر رقم (5) يمثل 1 mV`,
      en: `**Solution:**

**1. Maximum Count:**
- 4½ digits = 4 full digits + half digit (0 or 1)
- Max count = 19999

**2. Display Range:**
- Range = 20V
- Max displayed reading = 19.999V

**3. Resolution:**
Resolution = Range / Max Count
Resolution = 20V / 20000
**Resolution = 1 mV = 0.001V**

**4. Example:**
Reading 12.345V displayed as: 12.345
Last digit (5) represents 1 mV`,
    },
  },
  {
    id: 31,
    category: 'calculation',
    question: {
      ar: 'Thermocouple من النوع K يعطي جهد 4.1 mV. إذا كانت درجة حرارة المرجع = 25°C وحساسية المزدوجة = 41 μV/°C. احسب درجة الحرارة المقاسة.',
      en: 'Type K Thermocouple gives 4.1 mV output. If reference temperature = 25°C and sensitivity = 41 μV/°C. Calculate measured temperature.',
    },
    answer: {
      ar: `**الحل:**

**المعطيات:**
- V = 4.1 mV = 4100 μV
- T_ref = 25°C
- S = 41 μV/°C

**المعادلة:**
V = S × (T_hot - T_ref)

**حساب فرق الحرارة:**
ΔT = V / S
ΔT = 4100 / 41
ΔT = 100°C

**حساب درجة الحرارة المقاسة:**
T_hot = ΔT + T_ref
T_hot = 100 + 25
**T_hot = 125°C**

**ملاحظة:** هذا تقريب خطي، الحساسية الفعلية تتغير مع درجة الحرارة`,
      en: `**Solution:**

**Given:**
- V = 4.1 mV = 4100 μV
- T_ref = 25°C
- S = 41 μV/°C

**Equation:**
V = S × (T_hot - T_ref)

**Calculate temperature difference:**
ΔT = V / S
ΔT = 4100 / 41
ΔT = 100°C

**Calculate measured temperature:**
T_hot = ΔT + T_ref
T_hot = 100 + 25
**T_hot = 125°C**

**Note:** This is linear approximation, actual sensitivity varies with temperature`,
    },
  },
  {
    id: 32,
    category: 'calculation',
    question: {
      ar: 'في جسر Maxwell، R₁ = 1kΩ, R₄ = 10kΩ, C₄ = 1μF. احسب قيمة المحاثة Lx والمقاومة Rx عند الاتزان.',
      en: 'In Maxwell Bridge, R₁ = 1kΩ, R₄ = 10kΩ, C₄ = 1μF. Calculate inductance Lx and resistance Rx at balance.',
    },
    answer: {
      ar: `**الحل:**

**معادلات اتزان جسر Maxwell:**
Lx = R₁ × R₄ × C₄
Rx = (R₁ × R₄) / R₃

(بافتراض R₃ = R₄ = 10kΩ)

**حساب Lx:**
Lx = 1000 × 10000 × 1×10⁻⁶
Lx = 10,000,000 × 10⁻⁶
**Lx = 10 H**

**حساب Rx:**
Rx = (1000 × 10000) / 10000
**Rx = 1 kΩ**

**Quality Factor:**
Q = ωL/R = 2πfL/R`,
      en: `**Solution:**

**Maxwell Bridge balance equations:**
Lx = R₁ × R₄ × C₄
Rx = (R₁ × R₄) / R₃

(Assuming R₃ = R₄ = 10kΩ)

**Calculate Lx:**
Lx = 1000 × 10000 × 1×10⁻⁶
Lx = 10,000,000 × 10⁻⁶
**Lx = 10 H**

**Calculate Rx:**
Rx = (1000 × 10000) / 10000
**Rx = 1 kΩ**

**Quality Factor:**
Q = ωL/R = 2πfL/R`,
    },
  },
  {
    id: 33,
    category: 'calculation',
    question: {
      ar: 'جهاز قياس له خطأ ±0.5% من القراءة و ±0.1% من المدى الكامل. إذا كان المدى الكامل 100V وقراءة 25V، احسب الخطأ الكلي.',
      en: 'A measuring instrument has error ±0.5% of reading and ±0.1% of full scale. If full scale is 100V and reading is 25V, calculate total error.',
    },
    answer: {
      ar: `**الحل:**

**المعطيات:**
- القراءة = 25V
- المدى الكامل = 100V

**1. خطأ النسبة المئوية من القراءة:**
Error₁ = ±0.5% × 25V
Error₁ = ±0.125V

**2. خطأ النسبة المئوية من المدى الكامل:**
Error₂ = ±0.1% × 100V
Error₂ = ±0.1V

**3. الخطأ الكلي (في أسوأ حالة):**
Total Error = Error₁ + Error₂
Total Error = ±0.125 + ±0.1
**Total Error = ±0.225V**

**4. نسبة الخطأ الكلية:**
% Error = (0.225/25) × 100 = **±0.9%**`,
      en: `**Solution:**

**Given:**
- Reading = 25V
- Full scale = 100V

**1. Percentage error of reading:**
Error₁ = ±0.5% × 25V
Error₁ = ±0.125V

**2. Percentage error of full scale:**
Error₂ = ±0.1% × 100V
Error₂ = ±0.1V

**3. Total Error (worst case):**
Total Error = Error₁ + Error₂
Total Error = ±0.125 + ±0.1
**Total Error = ±0.225V**

**4. Total percentage error:**
% Error = (0.225/25) × 100 = **±0.9%**`,
    },
  },
  {
    id: 34,
    category: 'calculation',
    question: {
      ar: 'موجة مربعة على الأوسيلوسكوب لها ارتفاع 6 تقسيمات، Duty Cycle = 30%، وزمن دوري 10 تقسيمات. إذا كان Volt/div = 2V و Time/div = 1ms. احسب Vp-p، التردد، وزمن ON.',
      en: 'A square wave on oscilloscope has height 6 divisions, Duty Cycle = 30%, and period 10 divisions. If Volt/div = 2V and Time/div = 1ms. Calculate Vp-p, frequency, and ON time.',
    },
    answer: {
      ar: `**الحل:**

**1. حساب Vp-p:**
Vp-p = 6 × 2V = **12V**

**2. حساب الزمن الدوري:**
T = 10 × 1ms = **10 ms**

**3. حساب التردد:**
f = 1/T = 1/0.01 = **100 Hz**

**4. حساب زمن ON:**
Duty Cycle = t_ON / T × 100%
30% = t_ON / 10ms × 100%
t_ON = 0.30 × 10ms = **3 ms**

**5. زمن OFF:**
t_OFF = T - t_ON = 10 - 3 = **7 ms**`,
      en: `**Solution:**

**1. Calculate Vp-p:**
Vp-p = 6 × 2V = **12V**

**2. Calculate Period:**
T = 10 × 1ms = **10 ms**

**3. Calculate Frequency:**
f = 1/T = 1/0.01 = **100 Hz**

**4. Calculate ON time:**
Duty Cycle = t_ON / T × 100%
30% = t_ON / 10ms × 100%
t_ON = 0.30 × 10ms = **3 ms**

**5. OFF time:**
t_OFF = T - t_ON = 10 - 3 = **7 ms**`,
    },
  },
  {
    id: 35,
    category: 'calculation',
    question: {
      ar: 'عداد تردد يستخدم مذبذب كريستالي 10 MHz. إذا كان المقسم يقسم على 10⁶، احسب Base Time ودقة قياس تردد 1 kHz.',
      en: 'A frequency counter uses 10 MHz crystal oscillator. If divider divides by 10⁶, calculate Base Time and accuracy for measuring 1 kHz frequency.',
    },
    answer: {
      ar: `**الحل:**

**1. حساب Base Time:**
Base Time = Divider / Crystal Frequency
Base Time = 10⁶ / (10 × 10⁶)
**Base Time = 0.1 s = 100 ms**

**2. عدد النبضات المحسوبة لتردد 1 kHz:**
N = f × Base Time
N = 1000 × 0.1 = **100 pulses**

**3. دقة القياس (Resolution):**
Resolution = 1 / Base Time = 1 / 0.1 = **10 Hz**

**4. نسبة الخطأ:**
% Error = (Resolution / f) × 100
% Error = (10 / 1000) × 100 = **±1%**

**ملاحظة:** لتحسين الدقة، يمكن زيادة Base Time`,
      en: `**Solution:**

**1. Calculate Base Time:**
Base Time = Divider / Crystal Frequency
Base Time = 10⁶ / (10 × 10⁶)
**Base Time = 0.1 s = 100 ms**

**2. Pulses counted for 1 kHz:**
N = f × Base Time
N = 1000 × 0.1 = **100 pulses**

**3. Resolution:**
Resolution = 1 / Base Time = 1 / 0.1 = **10 Hz**

**4. Percentage Error:**
% Error = (Resolution / f) × 100
% Error = (10 / 1000) × 100 = **±1%**

**Note:** To improve accuracy, Base Time can be increased`,
    },
  },
  // Circuit Questions (36-50)
  {
    id: 36,
    category: 'circuit',
    question: {
      ar: 'ارسم المخطط الصندوقي (Block Diagram) لجهاز قياس الجهد الرقمي Ramp-Type DVM واشرح وظيفة كل مكون.',
      en: 'Draw the Block Diagram of Ramp-Type DVM and explain the function of each component.',
    },
    answer: {
      ar: `**المكونات ووظائفها:**

**1. مولد المنحدر (Ramp Generator):**
يولد جهد منحدر خطي يبدأ من الصفر ويزيد بمعدل ثابت.

**2. المقارن (Comparator):**
يقارن جهد المنحدر مع جهد الدخل. عند التساوي، يُعطي نبضة إشارة.

**3. بوابة AND (AND Gate):**
تتحكم في مرور نبضات الساعة إلى العداد.

**4. مذبذب الساعة (Clock Oscillator):**
يولد نبضات بتردد ثابت ومعروف بدقة.

**5. العداد (Counter):**
يحسب عدد نبضات الساعة التي مرت خلال فترة فتح البوابة.

**6. شاشة العرض (Display):**
تعرض القيمة المقاسة على شكل رقمي.`,
      en: `**Components and Functions:**

**1. Ramp Generator:**
Generates linear ramp voltage starting from zero and increasing at constant rate.

**2. Comparator:**
Compares ramp voltage with input voltage. When equal, gives signal pulse.

**3. AND Gate:**
Controls passage of clock pulses to counter.

**4. Clock Oscillator:**
Generates pulses at fixed and precisely known frequency.

**5. Counter:**
Counts clock pulses that passed during gate open period.

**6. Display:**
Shows measured value in digital form.`,
    },
    image: rampTypeDvm,
  },
  {
    id: 37,
    category: 'circuit',
    question: {
      ar: 'ارسم دائرة جسر ويتستون واشرح كيفية استخدامها لقياس مقاومة مجهولة.',
      en: 'Draw Wheatstone Bridge circuit and explain how to use it for measuring unknown resistance.',
    },
    answer: {
      ar: `**خطوات القياس:**

**1. توصيل الدائرة:**
- توصيل المقاومة المجهولة Rx في أحد أذرع الجسر
- توصيل مقاومات معروفة R₁, R₂, R₃
- توصيل الجلفانومتر بين النقطتين الوسطى

**2. ضبط الاتزان:**
- تغيير قيمة R₃ (المقاومة المتغيرة) حتى يصبح تيار الجلفانومتر = صفر
- عند هذه النقطة، الجسر متزن

**3. حساب Rx:**
من شرط الاتزان: R₁/R₂ = R₃/Rx
إذن: Rx = R₃ × (R₂/R₁)

**مميزات الطريقة:**
- دقة عالية جداً
- لا تتأثر بجهد المصدر
- قياس نسبي يُلغي أخطاء كثيرة`,
      en: `**Measurement Steps:**

**1. Connect Circuit:**
- Connect unknown resistance Rx in one arm
- Connect known resistances R₁, R₂, R₃
- Connect galvanometer between middle points

**2. Balance Adjustment:**
- Change R₃ value (variable resistor) until galvanometer current = zero
- At this point, bridge is balanced

**3. Calculate Rx:**
From balance condition: R₁/R₂ = R₃/Rx
Thus: Rx = R₃ × (R₂/R₁)

**Advantages:**
- Very high accuracy
- Not affected by source voltage
- Ratio measurement cancels many errors`,
    },
    image: wheatstoneBridge,
  },
  {
    id: 38,
    category: 'circuit',
    question: {
      ar: 'ارسم المخطط الصندوقي لعداد التردد الرقمي واشرح مراحل عمله.',
      en: 'Draw the Block Diagram of Digital Frequency Counter and explain its operation stages.',
    },
    answer: {
      ar: `**مراحل العمل:**

**1. تكييف الإشارة (Signal Conditioning):**
- Schmitt Trigger يحول الإشارة الداخلة إلى موجة مربعة نظيفة
- يزيل الضوضاء ويضمن حواف حادة

**2. توليد Base Time:**
- مذبذب كريستالي عالي الاستقرار
- مقسمات تردد لتوليد فترة زمنية دقيقة (1s, 0.1s, etc.)

**3. التحكم في البوابة:**
- Flip-Flop للتحكم في فتح/إغلاق البوابة
- AND Gate تمرر النبضات فقط أثناء Base Time

**4. العد والعرض:**
- عداد عشري (Decade Counter)
- فك الترميز وعرض على شاشة 7-segment

**5. التحكم والإعادة:**
- دائرة تحكم لتنظيم دورة القياس
- إعادة تصفير العداد للقياس التالي`,
      en: `**Operation Stages:**

**1. Signal Conditioning:**
- Schmitt Trigger converts input to clean square wave
- Removes noise and ensures sharp edges

**2. Base Time Generation:**
- High-stability crystal oscillator
- Frequency dividers to generate precise time period (1s, 0.1s, etc.)

**3. Gate Control:**
- Flip-Flop controls gate open/close
- AND Gate passes pulses only during Base Time

**4. Counting and Display:**
- Decade counter
- Decoding and display on 7-segment

**5. Control and Reset:**
- Control circuit to organize measurement cycle
- Counter reset for next measurement`,
    },
    image: frequencyMeter,
  },
  {
    id: 39,
    category: 'circuit',
    question: {
      ar: 'ارسم مكونات أنبوب الأشعة الكاثودية CRT واشرح مسار الإلكترونات.',
      en: 'Draw CRT components and explain electron path.',
    },
    answer: {
      ar: `**مسار الإلكترونات:**

**1. الانبعاث (Emission):**
- الكاثود المُسخَّن يطلق إلكترونات حرة (Thermionic Emission)
- درجة الحرارة عالية (~1000°C)

**2. التحكم في الشدة:**
- شبكة التحكم (Control Grid) - جهد سالب
- تتحكم في عدد الإلكترونات المارة
- تُحدد سطوع الشعاع

**3. التسريع والتركيز:**
- الأنود المُسرِّع يُعطي الإلكترونات سرعة عالية
- الأنود البؤري يُركز الشعاع في نقطة صغيرة

**4. الانحراف:**
- ألواح Y: انحراف رأسي (الإشارة)
- ألواح X: انحراف أفقي (المسح الزمني)

**5. التصادم والإضاءة:**
- الإلكترونات تصطدم بالشاشة الفوسفورية
- الطاقة الحركية تتحول لضوء مرئي`,
      en: `**Electron Path:**

**1. Emission:**
- Heated cathode releases free electrons (Thermionic Emission)
- High temperature (~1000°C)

**2. Intensity Control:**
- Control Grid - negative voltage
- Controls number of passing electrons
- Determines beam brightness

**3. Acceleration and Focusing:**
- Accelerating anode gives electrons high speed
- Focusing anode focuses beam into small point

**4. Deflection:**
- Y plates: vertical deflection (signal)
- X plates: horizontal deflection (time sweep)

**5. Impact and Illumination:**
- Electrons hit phosphor screen
- Kinetic energy converts to visible light`,
    },
    image: oscilloscopeCrt,
  },
  {
    id: 40,
    category: 'circuit',
    question: {
      ar: 'ارسم دائرة Dual-Slope DVM واشرح مراحل التكامل.',
      en: 'Draw Dual-Slope DVM circuit and explain integration phases.',
    },
    answer: {
      ar: `**مراحل التكامل:**

**المرحلة الأولى (تكامل الدخل):**
- المفتاح يوصل Vin إلى المكامل
- المكثف يشحن لفترة زمنية ثابتة T₁
- جهد الخرج يزيد خطياً

**المرحلة الثانية (تكامل المرجع):**
- المفتاح يوصل -Vref إلى المكامل
- المكثف يفرغ (جهد معاكس)
- العداد يحسب حتى يصل الجهد للصفر

**المعادلات:**
Vin × T₁ = Vref × T₂
Vin = Vref × (T₂/T₁)

**المميزات:**
- إلغاء تأثير قيم R و C
- رفض ممتاز للضوضاء
- دقة عالية جداً`,
      en: `**Integration Phases:**

**Phase 1 (Input Integration):**
- Switch connects Vin to integrator
- Capacitor charges for fixed time T₁
- Output voltage increases linearly

**Phase 2 (Reference Integration):**
- Switch connects -Vref to integrator
- Capacitor discharges (opposite voltage)
- Counter counts until voltage reaches zero

**Equations:**
Vin × T₁ = Vref × T₂
Vin = Vref × (T₂/T₁)

**Advantages:**
- Cancels R and C value effects
- Excellent noise rejection
- Very high accuracy`,
    },
    image: dualSlopeDvm,
  },
  {
    id: 41,
    category: 'circuit',
    question: {
      ar: 'ارسم دائرة مولد الموجة المثلثة باستخدام مكامل و Schmitt Trigger.',
      en: 'Draw triangular wave generator circuit using integrator and Schmitt Trigger.',
    },
    answer: {
      ar: `**مبدأ العمل:**

**1. دائرة Schmitt Trigger:**
- تُنتج موجة مربعة
- لها عتبتان: UTP و LTP
- الخرج يتأرجح بين +Vsat و -Vsat

**2. دائرة المكامل:**
- تستقبل الموجة المربعة
- تكامل الموجة المربعة يُنتج موجة مثلثة
- المنحدر يعتمد على RC

**العلاقات:**
- تردد الموجة: f = 1/(4RC) × (R₁/R₂)
- سعة المثلثة: Vp = (R₂/R₁) × Vsat

**الربط:**
خرج Schmitt → دخل المكامل
خرج المكامل → دخل Schmitt

**الناتج:** موجة مربعة + موجة مثلثة`,
      en: `**Working Principle:**

**1. Schmitt Trigger Circuit:**
- Produces square wave
- Has two thresholds: UTP and LTP
- Output oscillates between +Vsat and -Vsat

**2. Integrator Circuit:**
- Receives square wave
- Integration of square wave produces triangle wave
- Slope depends on RC

**Relationships:**
- Wave frequency: f = 1/(4RC) × (R₁/R₂)
- Triangle amplitude: Vp = (R₂/R₁) × Vsat

**Connection:**
Schmitt output → Integrator input
Integrator output → Schmitt input

**Result:** Square wave + Triangle wave`,
    },
    image: functionGenerator,
  },
  {
    id: 42,
    category: 'circuit',
    question: {
      ar: 'اشرح دائرة قياس الإجهاد باستخدام Strain Gauge وجسر ويتستون.',
      en: 'Explain strain measurement circuit using Strain Gauge and Wheatstone Bridge.',
    },
    answer: {
      ar: `**تركيب الدائرة:**

**1. توصيل Strain Gauge:**
- يوضع كأحد أذرع جسر ويتستون
- عادة يكون الذراع النشط (Active Arm)

**2. موازنة الجسر:**
- في البداية (بدون إجهاد)، يُوزن الجسر
- الخرج = صفر فولت

**3. عند تطبيق الإجهاد:**
- مقاومة Strain Gauge تتغير
- الجسر يخرج عن الاتزان
- يظهر جهد خرج متناسب مع الإجهاد

**معادلة الخرج:**
Vout = (GF × ε × Vin) / 4

**التحسينات:**
- Half Bridge: استخدام 2 strain gauges
- Full Bridge: استخدام 4 strain gauges (أعلى حساسية)
- دائرة تعويض الحرارة`,
      en: `**Circuit Configuration:**

**1. Strain Gauge Connection:**
- Placed as one arm of Wheatstone Bridge
- Usually the active arm

**2. Bridge Balancing:**
- Initially (no strain), bridge is balanced
- Output = zero volts

**3. When Strain Applied:**
- Strain Gauge resistance changes
- Bridge goes out of balance
- Output voltage proportional to strain appears

**Output Equation:**
Vout = (GF × ε × Vin) / 4

**Improvements:**
- Half Bridge: Use 2 strain gauges
- Full Bridge: Use 4 strain gauges (highest sensitivity)
- Temperature compensation circuit`,
    },
    image: strainGauge,
  },
  {
    id: 43,
    category: 'circuit',
    question: {
      ar: 'ارسم مخطط الأوسيلوسكوب التخزيني الرقمي (DSO) واشرح مساره.',
      en: 'Draw Digital Storage Oscilloscope (DSO) block diagram and explain signal path.',
    },
    answer: {
      ar: `**مسار الإشارة في DSO:**

**1. تكييف الإشارة (Front End):**
- مُضعف متغير (Attenuator)
- مُكبر (Amplifier)
- مرشح Anti-aliasing

**2. تحويل رقمي (ADC):**
- تحويل الإشارة التماثلية إلى عينات رقمية
- معدل العينات (Sample Rate) يحدد دقة التقاط التفاصيل

**3. الذاكرة (Acquisition Memory):**
- تخزين العينات الرقمية
- إمكانية تخزين إشارات قبل الـ Trigger

**4. المعالجة (Processing):**
- DSP للقياسات التلقائية
- حساب FFT
- المتوسطات وإزالة الضوضاء

**5. العرض (Display):**
- تحويل البيانات لرسم بياني
- شاشة LCD عالية الوضوح`,
      en: `**Signal Path in DSO:**

**1. Signal Conditioning (Front End):**
- Variable attenuator
- Amplifier
- Anti-aliasing filter

**2. Digital Conversion (ADC):**
- Convert analog signal to digital samples
- Sample Rate determines detail capture accuracy

**3. Memory (Acquisition Memory):**
- Store digital samples
- Can store signals before Trigger

**4. Processing:**
- DSP for automatic measurements
- FFT calculation
- Averaging and noise removal

**5. Display:**
- Convert data to graphical display
- High-resolution LCD screen`,
    },
  },
  {
    id: 44,
    category: 'circuit',
    question: {
      ar: 'اشرح دائرة قياس درجة الحرارة باستخدام RTD.',
      en: 'Explain temperature measurement circuit using RTD.',
    },
    answer: {
      ar: `**طرق التوصيل:**

**1. توصيل سلكين (2-Wire):**
- أبسط طريقة
- مقاومة الأسلاك تُضاف للقراءة
- دقة محدودة

**2. توصيل 3 أسلاك (3-Wire):**
- يُعوض مقاومة الأسلاك جزئياً
- يُستخدم جسر ويتستون معدل
- أكثر شيوعاً

**3. توصيل 4 أسلاك (4-Wire):**
- تعويض كامل لمقاومة الأسلاك
- أعلى دقة
- يُستخدم مصدر تيار ثابت

**دائرة القياس:**
- جسر ويتستون مع RTD في ذراع واحد
- مُكبر للإشارة الصغيرة
- ADC للتحويل الرقمي
- معالج للتحويل لدرجة حرارة`,
      en: `**Connection Methods:**

**1. 2-Wire Connection:**
- Simplest method
- Lead resistance adds to reading
- Limited accuracy

**2. 3-Wire Connection:**
- Partially compensates lead resistance
- Uses modified Wheatstone Bridge
- Most common

**3. 4-Wire Connection:**
- Full lead resistance compensation
- Highest accuracy
- Uses constant current source

**Measurement Circuit:**
- Wheatstone Bridge with RTD in one arm
- Amplifier for small signal
- ADC for digital conversion
- Processor to convert to temperature`,
    },
  },
  {
    id: 45,
    category: 'circuit',
    question: {
      ar: 'ارسم دائرة المقارن (Comparator) المستخدم في DVM واشرح عملها.',
      en: 'Draw Comparator circuit used in DVM and explain its operation.',
    },
    answer: {
      ar: `**مبدأ العمل:**

**1. المدخلات:**
- V+ (غير المقلوب): إشارة واحدة
- V- (المقلوب): إشارة المقارنة

**2. الخرج:**
- إذا V+ > V-: الخرج = +Vsat (HIGH)
- إذا V+ < V-: الخرج = -Vsat (LOW)

**استخدامه في Ramp-Type DVM:**
- V+ = جهد المنحدر (Ramp)
- V- = الجهد المُدخل للقياس
- عندما يتساوى الجهدان → الخرج يتحول
- هذا التحول يُوقف العداد

**مواصفات مهمة:**
- زمن استجابة سريع
- Offset منخفض
- حساسية عالية

**IC شائع:** LM311, LM339`,
      en: `**Working Principle:**

**1. Inputs:**
- V+ (non-inverting): One signal
- V- (inverting): Comparison signal

**2. Output:**
- If V+ > V-: Output = +Vsat (HIGH)
- If V+ < V-: Output = -Vsat (LOW)

**Use in Ramp-Type DVM:**
- V+ = Ramp voltage
- V- = Input voltage to measure
- When voltages equal → Output transitions
- This transition stops the counter

**Important Specifications:**
- Fast response time
- Low offset
- High sensitivity

**Common IC:** LM311, LM339`,
    },
  },
  {
    id: 46,
    category: 'circuit',
    question: {
      ar: 'اشرح دائرة توليد Base Time في عداد التردد.',
      en: 'Explain Base Time generation circuit in frequency counter.',
    },
    answer: {
      ar: `**مكونات الدائرة:**

**1. مذبذب كريستالي (Crystal Oscillator):**
- تردد عالي ومستقر (عادة 1-10 MHz)
- استقرار ±1 ppm أو أفضل
- يُحدد دقة القياس

**2. سلسلة مقسمات (Divider Chain):**
- مقسمات عشرية متتالية
- كل مرحلة تقسم على 10
- تُنتج ترددات فرعية: 100kHz, 10kHz, 1kHz, etc.

**3. محدد النطاق (Range Selector):**
- يختار التردد المناسب للقياس
- يُحدد Base Time: 0.001s, 0.01s, 0.1s, 1s, 10s

**مثال:**
- كريستال 10 MHz
- قسمة على 10⁷ = 1 Hz
- Base Time = 1 second

**الدقة:**
دقة Base Time = دقة الكريستال`,
      en: `**Circuit Components:**

**1. Crystal Oscillator:**
- High and stable frequency (usually 1-10 MHz)
- Stability ±1 ppm or better
- Determines measurement accuracy

**2. Divider Chain:**
- Cascaded decade dividers
- Each stage divides by 10
- Produces sub-frequencies: 100kHz, 10kHz, 1kHz, etc.

**3. Range Selector:**
- Selects appropriate frequency for measurement
- Sets Base Time: 0.001s, 0.01s, 0.1s, 1s, 10s

**Example:**
- 10 MHz crystal
- Divide by 10⁷ = 1 Hz
- Base Time = 1 second

**Accuracy:**
Base Time accuracy = Crystal accuracy`,
    },
  },
  {
    id: 47,
    category: 'circuit',
    question: {
      ar: 'ارسم دائرة Schmitt Trigger باستخدام Op-Amp واشرح حساب عتبات التحويل.',
      en: 'Draw Schmitt Trigger circuit using Op-Amp and explain threshold calculation.',
    },
    answer: {
      ar: `**تركيب الدائرة:**
- Op-Amp مع تغذية راجعة موجبة
- مقاومتان R₁ و R₂ لتحديد العتبات

**حساب العتبات:**

**العتبة العليا (UTP):**
UTP = +Vsat × (R₁/(R₁+R₂))

**العتبة السفلى (LTP):**
LTP = -Vsat × (R₁/(R₁+R₂))

**نطاق Hysteresis:**
H = UTP - LTP = 2Vsat × (R₁/(R₁+R₂))

**مثال:**
إذا Vsat = ±12V, R₁ = 10kΩ, R₂ = 100kΩ
UTP = 12 × (10/110) = +1.09V
LTP = -12 × (10/110) = -1.09V
H = 2.18V

**الفائدة:**
نطاق Hysteresis يمنع التذبذب عند وجود ضوضاء`,
      en: `**Circuit Configuration:**
- Op-Amp with positive feedback
- Two resistors R₁ and R₂ to set thresholds

**Threshold Calculation:**

**Upper Threshold (UTP):**
UTP = +Vsat × (R₁/(R₁+R₂))

**Lower Threshold (LTP):**
LTP = -Vsat × (R₁/(R₁+R₂))

**Hysteresis Range:**
H = UTP - LTP = 2Vsat × (R₁/(R₁+R₂))

**Example:**
If Vsat = ±12V, R₁ = 10kΩ, R₂ = 100kΩ
UTP = 12 × (10/110) = +1.09V
LTP = -12 × (10/110) = -1.09V
H = 2.18V

**Benefit:**
Hysteresis range prevents oscillation with noise`,
    },
  },
  {
    id: 48,
    category: 'circuit',
    question: {
      ar: 'اشرح دائرة تحويل الموجة المثلثة إلى موجة جيبية.',
      en: 'Explain circuit for converting triangular wave to sine wave.',
    },
    answer: {
      ar: `**طرق التحويل:**

**1. دائرة التشكيل غير الخطية (Diode Shaping):**
- سلسلة ثنائيات مع مقاومات
- كل ثنائي يُفعَّل عند مستوى جهد معين
- تُقرّب المثلثة إلى جيبية
- دقة محدودة (عادة 1-2% THD)

**2. مُكبر لوغاريثمي:**
- يستخدم خاصية ترانزستور الـ log
- أفضل دقة

**3. التقريب بالمقاومات:**
- شبكة مقاومات مع ثنائيات
- نقاط انكسار متعددة
- كل مرحلة تُضيف تقريباً

**الناتج:**
- موجة جيبية تقريبية
- THD (Total Harmonic Distortion) < 1% ممكن

**في Function Generator:**
الثلاث موجات متاحة: مربعة، مثلثة، جيبية`,
      en: `**Conversion Methods:**

**1. Non-linear Shaping Circuit (Diode Shaping):**
- Series diodes with resistors
- Each diode activates at specific voltage level
- Approximates triangle to sine
- Limited accuracy (usually 1-2% THD)

**2. Logarithmic Amplifier:**
- Uses transistor log characteristic
- Better accuracy

**3. Resistor Approximation:**
- Resistor network with diodes
- Multiple breakpoints
- Each stage adds approximation

**Result:**
- Approximate sine wave
- THD (Total Harmonic Distortion) < 1% possible

**In Function Generator:**
Three waveforms available: square, triangle, sine`,
    },
  },
  {
    id: 49,
    category: 'circuit',
    question: {
      ar: 'اشرح دائرة Time Base في الأوسيلوسكوب التماثلي.',
      en: 'Explain Time Base circuit in analog oscilloscope.',
    },
    answer: {
      ar: `**مكونات Time Base:**

**1. مولد المسح (Sweep Generator):**
- يولد موجة سن المنشار (Sawtooth)
- الجزء الصاعد: مسح الشاشة من اليسار لليمين
- الجزء الهابط (Flyback): عودة سريعة

**2. دائرة التزامن (Trigger Circuit):**
- تُزامن بداية المسح مع الإشارة
- تُحدد Level و Slope
- تضمن صورة ثابتة

**3. مُكبر الانحراف الأفقي (X-Amplifier):**
- يُكبر جهد المسح
- يُطبق على ألواح X

**4. دائرة Blanking:**
- تُعتم الشعاع أثناء Flyback
- تمنع خط العودة من الظهور

**التحكمات:**
- Time/div: سرعة المسح
- Trigger Level: نقطة البدء
- Trigger Slope: حافة صاعدة/هابطة`,
      en: `**Time Base Components:**

**1. Sweep Generator:**
- Generates sawtooth wave
- Rising part: sweep screen left to right
- Falling part (Flyback): quick return

**2. Trigger Circuit:**
- Synchronizes sweep start with signal
- Sets Level and Slope
- Ensures stable image

**3. Horizontal Deflection Amplifier (X-Amplifier):**
- Amplifies sweep voltage
- Applied to X plates

**4. Blanking Circuit:**
- Dims beam during Flyback
- Prevents return trace from appearing

**Controls:**
- Time/div: Sweep speed
- Trigger Level: Start point
- Trigger Slope: Rising/falling edge`,
    },
  },
  {
    id: 50,
    category: 'circuit',
    question: {
      ar: 'قارن بين أنواع جسور AC المختلفة من حيث التطبيق والدقة.',
      en: 'Compare different AC bridge types in terms of application and accuracy.',
    },
    answer: {
      ar: `**مقارنة جسور AC:**

| الجسر | التطبيق | الدقة | Q المناسب |
|-------|---------|-------|-----------|
| Maxwell | قياس L | متوسطة | Q < 10 |
| Hay | قياس L | عالية | Q > 10 |
| Schering | قياس C | عالية جداً | - |
| Wien | قياس f | عالية | - |
| Owen | قياس L | عالية | واسع |

**Maxwell Bridge:**
- مناسب للملفات ذات Q منخفض
- بسيط التصميم
- يستخدم مكثف قياسي

**Hay Bridge:**
- للملفات ذات Q عالي (> 10)
- أدق من Maxwell للمحاثات الكبيرة

**Schering Bridge:**
- لقياس المكثفات
- يقيس معامل الفقد (tan δ)
- يُستخدم في اختبار العوازل`,
      en: `**AC Bridge Comparison:**

| Bridge | Application | Accuracy | Suitable Q |
|--------|-------------|----------|------------|
| Maxwell | L measurement | Medium | Q < 10 |
| Hay | L measurement | High | Q > 10 |
| Schering | C measurement | Very High | - |
| Wien | f measurement | High | - |
| Owen | L measurement | High | Wide |

**Maxwell Bridge:**
- Suitable for low Q coils
- Simple design
- Uses standard capacitor

**Hay Bridge:**
- For high Q coils (> 10)
- More accurate than Maxwell for large inductances

**Schering Bridge:**
- For capacitor measurement
- Measures loss factor (tan δ)
- Used in insulation testing`,
    },
  },
];

const ExamsPage = () => {
  const { language, t } = useLanguage();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'theory' | 'calculation' | 'circuit'>('all');

  const filteredQuestions = filter === 'all' 
    ? questions 
    : questions.filter(q => q.category === filter);

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
    return labels[category as keyof typeof labels]?.[language] || category;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'بنك الأسئلة والامتحانات' : 'Question Bank & Exams'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'ar' 
                ? '50 سؤالاً شاملاً لمادة القياسات والأجهزة - نظري، حسابي، ودوائر' 
                : '50 comprehensive questions for Measurements & Devices - Theory, Calculations, and Circuits'}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { key: 'all', ar: 'جميع الأسئلة', en: 'All Questions' },
              { key: 'theory', ar: 'نظري', en: 'Theory' },
              { key: 'calculation', ar: 'حسابي', en: 'Calculations' },
              { key: 'circuit', ar: 'دوائر', en: 'Circuits' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === item.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {language === 'ar' ? item.ar : item.en}
                {item.key !== 'all' && (
                  <span className="ms-2 text-sm opacity-75">
                    ({questions.filter(q => q.category === item.key).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredQuestions.map((q) => {
              const Icon = getCategoryIcon(q.category);
              const isOpen = openQuestion === q.id;
              
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border overflow-hidden shadow-sm"
                >
                  {/* Question Header */}
                  <button
                    onClick={() => setOpenQuestion(isOpen ? null : q.id)}
                    className={`w-full px-6 py-4 flex items-center gap-4 text-start transition-all ${
                      isOpen 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isOpen ? 'bg-primary-foreground/20' : 'bg-primary/10'
                    }`}>
                      <span className={`font-bold ${isOpen ? 'text-primary-foreground' : 'text-primary'}`}>
                        {q.id}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={`w-4 h-4 ${isOpen ? 'text-primary-foreground/80' : 'text-primary'}`} />
                        <span className={`text-xs font-medium ${isOpen ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {getCategoryLabel(q.category)}
                        </span>
                      </div>
                      <h3 className="font-medium leading-relaxed">
                        {q.question[language]}
                      </h3>
                    </div>
                    
                    <div className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-6 bg-muted/30 border-t border-border">
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <div 
                              className="whitespace-pre-wrap text-foreground leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: q.answer[language]
                                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                  .replace(/\n/g, '<br/>')
                              }}
                            />
                          </div>
                          
                          {q.image && (
                            <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                              <img 
                                src={q.image} 
                                alt={`Diagram for question ${q.id}`}
                                className="max-w-full h-auto mx-auto rounded"
                              />
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

          {/* Stats */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-3 gap-4">
            {[
              { key: 'theory', ar: 'أسئلة نظرية', en: 'Theory Questions', count: questions.filter(q => q.category === 'theory').length },
              { key: 'calculation', ar: 'مسائل حسابية', en: 'Calculations', count: questions.filter(q => q.category === 'calculation').length },
              { key: 'circuit', ar: 'أسئلة دوائر', en: 'Circuit Questions', count: questions.filter(q => q.category === 'circuit').length },
            ].map((stat) => {
              const Icon = getCategoryIcon(stat.key);
              return (
                <div key={stat.key} className="bg-card rounded-xl p-4 border border-border text-center">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.count}</div>
                  <div className="text-sm text-muted-foreground">
                    {language === 'ar' ? stat.ar : stat.en}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamsPage;
