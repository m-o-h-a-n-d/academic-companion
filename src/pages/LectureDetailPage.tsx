import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Target, Lightbulb, Cpu, Activity } from 'lucide-react';
import CircuitDiagram from '@/components/CircuitDiagram';
import FormulaBox from '@/components/FormulaBox';
import ConceptBox from '@/components/ConceptBox';

// Import circuit images
import rampTypeDvm from '@/assets/circuits/ramp-type-dvm.png';
import dvmBlockDiagram from '@/assets/circuits/dvm-block-diagram.png';
import dualSlopeDvm from '@/assets/circuits/dual-slope-dvm.png';
import frequencyMeter from '@/assets/circuits/frequency-meter.png';
import functionGenerator from '@/assets/circuits/function-generator.png';
import crtDiagram from '@/assets/circuits/crt-diagram.png';
import oscilloscopeCrt from '@/assets/circuits/oscilloscope-crt.png';
import wheatstoneBridge from '@/assets/circuits/wheatstone-bridge.png';
import acBridge from '@/assets/circuits/ac-bridge.png';
import strainGauge from '@/assets/circuits/strain-gauge.jpg';
import ultrasonicSensor from '@/assets/circuits/ultrasonic-sensor.jpg';

const LectureDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, dir, language } = useLanguage();
  const lectureId = parseInt(id || '1');

  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const ForwardArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const PrevChevron = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextChevron = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const lectures = getLectureContent(language);
  const lecture = lectures[lectureId - 1];

  if (!lecture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'المحاضرة غير موجودة' : 'Lecture Not Found'}
          </h1>
          <Button onClick={() => navigate('/lectures')}>
            {language === 'ar' ? 'العودة للمحاضرات' : 'Back to Lectures'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/lectures')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <BackArrow className="w-4 h-4" />
            {language === 'ar' ? 'العودة للمحاضرات' : 'Back to Lectures'}
          </Button>
        </motion.div>

        {/* Lecture Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {lectureId}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {lecture.title}
              </h1>
              <p className="text-muted-foreground">
                {lecture.subtitle}
              </p>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block">
            <div className="lecture-nav card-elevated p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {language === 'ar' ? 'محتويات المحاضرة' : 'Contents'}
              </h3>
              <nav className="space-y-1">
                {lecture.sections.map((section, index) => (
                  <a
                    key={index}
                    href={`#section-${index}`}
                    className="lecture-nav-item block text-sm"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Objectives */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card-elevated p-6"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                {t('lecture.objectives')}
              </h2>
              <ul className="space-y-2">
                {lecture.objectives.map((obj, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{obj}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Content Sections */}
            {lecture.sections.map((section, sectionIndex) => (
              <motion.section
                key={sectionIndex}
                id={`section-${sectionIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-elevated p-6"
              >
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  {section.title}
                </h2>
                
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      {item.type === 'paragraph' && (
                        <p className="text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      )}
                      {item.type === 'concept' && (
                        <ConceptBox
                          title={item.title || ''}
                          content={item.text || ''}
                          type={item.variant as 'info' | 'success' | 'warning' || 'info'}
                        />
                      )}
                      {item.type === 'formula' && (
                        <FormulaBox
                          formula={item.formula || ''}
                          explanation={item.explanation}
                          title={item.title}
                        />
                      )}
                      {item.type === 'list' && (
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ps-4">
                          {item.items?.map((listItem, listIndex) => (
                            <li key={listIndex}>{listItem}</li>
                          ))}
                        </ul>
                      )}
                      {item.type === 'table' && (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-muted/50">
                                {item.headers?.map((header, hIndex) => (
                                  <th key={hIndex} className="border border-border px-4 py-2 text-start text-sm font-semibold text-foreground">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {item.rows?.map((row, rIndex) => (
                                <tr key={rIndex} className="hover:bg-muted/30">
                                  {row.map((cell, cIndex) => (
                                    <td key={cIndex} className="border border-border px-4 py-2 text-sm text-muted-foreground">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {item.type === 'circuit' && (
                        <CircuitDiagram
                          src={item.src || ''}
                          title={item.title || ''}
                          description={item.description || ''}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-border">
              {lectureId > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/lecture/${lectureId - 1}`)}
                  className="flex items-center gap-2"
                >
                  <PrevChevron className="w-4 h-4" />
                  {t('lecture.prev')}
                </Button>
              ) : (
                <div />
              )}
              
              {lectureId < 8 ? (
                <Button
                  onClick={() => navigate(`/lecture/${lectureId + 1}`)}
                  className="flex items-center gap-2 btn-primary-gradient"
                >
                  {t('lecture.next')}
                  <NextChevron className="w-4 h-4" />
                </Button>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

function getLectureContent(language: string) {
  const isArabic = language === 'ar';
  
  return [
    // Lecture 1: Introduction
    {
      title: isArabic ? 'مقدمة في القياسات والأجهزة' : 'Introduction to Measurements & Instrumentation',
      subtitle: isArabic ? 'الوحدات الأساسية وأنظمة القياس' : 'Fundamental Units and Measurement Systems',
      objectives: isArabic ? [
        'فهم نظام الوحدات الدولي SI',
        'التعرف على الوحدات الأساسية والمشتقة',
        'فهم عناصر أنظمة القياس',
        'المقارنة بين الأجهزة التماثلية والرقمية',
        'حساب دقة ووضوح أجهزة القياس',
      ] : [
        'Understand the SI International Unit System',
        'Learn fundamental and derived units',
        'Understand measurement system elements',
        'Compare analog and digital instruments',
        'Calculate accuracy and resolution of measuring devices',
      ],
      sections: [
        {
          title: isArabic ? 'الوحدات الأساسية SI' : 'SI Fundamental Units',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'النظام الدولي للوحدات (SI) هو النظام المتري الحديث للقياس. يتكون من سبع وحدات أساسية تُعتبر أساساً لجميع القياسات الفيزيائية.'
                : 'The International System of Units (SI) is the modern metric system of measurement. It consists of seven base units that form the foundation for all physical measurements.',
            },
            {
              type: 'table',
              headers: isArabic ? ['الكمية', 'الوحدة', 'الرمز'] : ['Quantity', 'Unit', 'Symbol'],
              rows: [
                [isArabic ? 'الطول' : 'Length', isArabic ? 'متر' : 'meter', 'm'],
                [isArabic ? 'الكتلة' : 'Mass', isArabic ? 'كيلوجرام' : 'kilogram', 'kg'],
                [isArabic ? 'الزمن' : 'Time', isArabic ? 'ثانية' : 'second', 's'],
                [isArabic ? 'التيار الكهربائي' : 'Electric Current', isArabic ? 'أمبير' : 'ampere', 'A'],
                [isArabic ? 'درجة الحرارة' : 'Temperature', isArabic ? 'كلفن' : 'kelvin', 'K'],
                [isArabic ? 'شدة الإضاءة' : 'Luminous Intensity', isArabic ? 'كانديلا' : 'candela', 'cd'],
                [isArabic ? 'كمية المادة' : 'Amount of Substance', isArabic ? 'مول' : 'mole', 'mol'],
              ],
            },
          ],
        },
        {
          title: isArabic ? 'مفاهيم القياس الأساسية' : 'Basic Measurement Concepts',
          content: [
            {
              type: 'concept',
              title: isArabic ? 'الدقة (Accuracy)' : 'Accuracy',
              text: isArabic 
                ? 'تشير الدقة إلى الحد الأقصى للخطأ الذي لن يتجاوزه الجهاز. إذا كانت دقة فولتميتر 100V هي ±1%، فإن الخطأ الأقصى لأي قراءة لن يتجاوز ±1V.'
                : 'Accuracy indicates the maximum error that will not be exceeded. If the accuracy of a 100V voltmeter is ±1%, the maximum error for any reading will not exceed ±1V.',
              variant: 'info',
            },
            {
              type: 'concept',
              title: isArabic ? 'الحساسية (Sensitivity)' : 'Sensitivity',
              text: isArabic 
                ? 'حساسية الجهاز تشير إلى قدرته على الاستجابة بدقة للتغير في الخرج المقابل للتغير في الدخل.'
                : 'Sensitivity of an instrument indicates its capacity to respond truly to the change in output corresponding to the change in input.',
              variant: 'success',
            },
            {
              type: 'concept',
              title: isArabic ? 'الوضوح (Resolution)' : 'Resolution',
              text: isArabic 
                ? 'الوضوح هو أصغر تغيير في القيمة المقاسة يمكن للجهاز الاستجابة له. هو أصغر تغيير يمكن للجهاز قياسه.'
                : 'Resolution is the smallest change in the measured value to which the instrument can respond. It is the smallest change the instrument can measure.',
              variant: 'warning',
            },
          ],
        },
        {
          title: isArabic ? 'مقارنة الأجهزة التماثلية والرقمية' : 'Analog vs Digital Instruments',
          content: [
            {
              type: 'table',
              headers: isArabic ? ['التماثلي', 'الرقمي'] : ['Analog', 'Digital'],
              rows: [
                [isArabic ? 'دقة منخفضة' : 'Low precision', isArabic ? 'دقة عالية' : 'High precision'],
                [isArabic ? 'انحراف مستمر' : 'Continuous deflection', isArabic ? 'قراءة رقمية' : 'Numerical readout'],
                [isArabic ? 'خطأ المنظور ممكن' : 'Parallax error possible', isArabic ? 'لا يوجد مثل هذا الخطأ' : 'No such error'],
                [isArabic ? 'لا توافق مباشر مع الكمبيوتر' : 'No direct PC compatibility', isArabic ? 'متوافق مع المعالجات الدقيقة' : 'Compatible with microprocessors'],
              ],
            },
            {
              type: 'paragraph',
              text: isArabic 
                ? 'الأجهزة الرقمية توفر قراءات أكثر دقة وسهولة في القراءة، خاصة في ظروف الإضاءة المنخفضة أو من مسافة بعيدة.'
                : 'Digital instruments provide more accurate and easy-to-read readings, especially in low light conditions or from a distance.',
            },
          ],
        },
        {
          title: isArabic ? 'مثال على حساب الوضوح' : 'Resolution Calculation Example',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'مثال: جهاز فولتميتر به 100 تقسيم على المقياس ويمكنه قياس حتى 100V. كل تقسيم يمكن قراءته إلى نصف تقسيم. ما هو وضوح الجهاز؟'
                : 'Example: A voltmeter has 100 scale divisions and can measure up to 100V. Each division can be read to ½ division. What is the resolution?',
            },
            {
              type: 'formula',
              title: isArabic ? 'الحل' : 'Solution',
              formula: '100 div = 100V → 1 div = 1V → ½ div = 0.5V',
              explanation: isArabic 
                ? 'إذن وضوح الجهاز = 0.5 فولت'
                : 'Therefore, the resolution = 0.5V',
            },
          ],
        },
      ],
    },
    // Lecture 2: Digital Voltmeters
    {
      title: isArabic ? 'أجهزة قياس الجهد الرقمية (DVM)' : 'Digital Voltmeters (DVM)',
      subtitle: isArabic ? 'مبادئ العمل والأنواع المختلفة' : 'Working Principles and Different Types',
      objectives: isArabic ? [
        'فهم مبدأ عمل الفولتميتر الرقمي',
        'دراسة أنواع DVM المختلفة',
        'فهم تحويل الجهد إلى زمن',
        'حساب دقة ووضوح DVM',
      ] : [
        'Understand DVM working principles',
        'Study different DVM types',
        'Understand voltage-to-time conversion',
        'Calculate DVM accuracy and resolution',
      ],
      sections: [
        {
          title: isArabic ? 'مواصفات الفولتميتر الرقمي' : 'DVM General Specifications',
          content: [
            {
              type: 'list',
              items: isArabic ? [
                'نطاق الدخل: من ±1.000000 إلى ±1000.000 فولت مع اختيار تلقائي للنطاق',
                'الدقة المطلقة: ±0.005%',
                'الاستقرار قصير المدى: 0.002% لمدة 24 ساعة',
                'الوضوح: 1 μV على نطاق 1V',
                'مقاومة الدخل: R = 10 MΩ; C = 40 pF',
              ] : [
                'Input range: From ±1.000000 to ±1000.000 V with automatic range selection',
                'Absolute accuracy: ±0.005%',
                'Short term stability: 0.002% for 24 hr',
                'Resolution: 1 μV on 1V input range',
                'Input impedance: R = 10 MΩ; C = 40 pF',
              ],
            },
          ],
        },
        {
          title: isArabic ? 'أنواع الفولتميتر الرقمي' : 'Types of DVMs',
          content: [
            {
              type: 'list',
              items: isArabic ? [
                'Ramp-type DVM (نوع المنحدر)',
                'Dual Slope Integrating-type DVM (نوع التكامل المزدوج الميل)',
                'Continuous Balance DVM (التوازن المستمر)',
                'Successive Approximation DVM (التقريب المتتالي)',
              ] : [
                'Ramp-type DVM',
                'Dual Slope Integrating-type DVM',
                'Continuous Balance DVM',
                'Successive Approximation DVM',
              ],
            },
          ],
        },
        {
          title: isArabic ? 'DVM نوع المنحدر (Ramp-Type)' : 'Ramp-Type DVM',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'المبدأ: يتم تحويل الجهد المراد قياسه إلى زمن، ثم يُقاس هذا الزمن باستخدام عداد إلكتروني. تستخدم نبضات الساعة لقياس الفترة الزمنية.'
                : 'Principle: The voltage being measured is converted into time, and this time period is measured with an electronic counter. Clock pulses are used to measure the time interval.',
            },
            {
              type: 'circuit',
              src: rampTypeDvm,
              title: isArabic ? 'رسم بياني لـ Ramp-type DVM' : 'Ramp-type DVM Graph',
              description: isArabic 
                ? 'يوضح الرسم كيف يتقاطع جهد المنحدر مع الجهد المراد قياسه لتحديد فترة البوابة.'
                : 'The graph shows how the ramp voltage intersects with the measured voltage to determine the gating time interval.',
            },
            {
              type: 'circuit',
              src: dvmBlockDiagram,
              title: isArabic ? 'المخطط الكتلي لـ Ramp-type DVM' : 'Ramp-type DVM Block Diagram',
              description: isArabic 
                ? 'يتكون من: دخل الجهد، المقارنات، مولد المنحدر، البوابة، العداد، ووحدة العرض.'
                : 'Consists of: voltage input, comparators, ramp generator, gate, counter, and display unit.',
            },
          ],
        },
        {
          title: isArabic ? 'DVM التكامل المزدوج الميل' : 'Dual Slope Integrating DVM',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'في هذه الطريقة، لا تعتمد دقة التحويل على دقة المقاومة والمكثف. يستخدم مكامل لتكامل جهد مرجعي دقيق لفترة زمنية محددة.'
                : 'In this method, the accuracy of conversion does not depend on the precision of the resistor and capacitor. An integrator is used to integrate an accurate reference voltage for a fixed period of time.',
            },
            {
              type: 'circuit',
              src: dualSlopeDvm,
              title: isArabic ? 'المخطط الكتلي لـ Dual Slope DVM' : 'Dual Slope DVM Block Diagram',
              description: isArabic 
                ? 'يتضمن مفتاح إلكتروني، مكامل، منطق تحكم، عداد، ومولد ساعة. يقيس نسبة الأوقات بدلاً من القيم المطلقة.'
                : 'Includes electronic switch, integrator, control logic, counter, and clock generator. Measures ratio of times rather than absolute values.',
            },
            {
              type: 'concept',
              title: isArabic ? 'ميزة Dual Slope' : 'Dual Slope Advantage',
              text: isArabic 
                ? 'يلغي الحاجة إلى توقيت دقيق لأن القياس يعتمد على نسبة الأوقات (t2/t1) وليس على القيم المطلقة.'
                : 'Eliminates the need for accurate timing because the measurement depends on the ratio of times (t2/t1) rather than absolute values.',
              variant: 'success',
            },
          ],
        },
      ],
    },
    // Lecture 3: Frequency Meters
    {
      title: isArabic ? 'عدادات التردد الرقمية' : 'Digital Frequency Meters',
      subtitle: isArabic ? 'قياس التردد والفترة الزمنية' : 'Frequency and Period Measurement',
      objectives: isArabic ? [
        'فهم مبدأ قياس التردد',
        'دراسة الدوائر الأساسية لعداد التردد',
        'فهم كيفية تغيير نطاقات التردد',
        'حساب التردد من القياسات',
      ] : [
        'Understand frequency measurement principle',
        'Study basic frequency counter circuits',
        'Understand frequency range changing',
        'Calculate frequency from measurements',
      ],
      sections: [
        {
          title: isArabic ? 'مبدأ قياس التردد' : 'Frequency Measurement Principle',
          content: [
            {
              type: 'concept',
              title: isArabic ? 'تعريف التردد' : 'Frequency Definition',
              text: isArabic 
                ? 'التردد للإشارة الدورية يُعرَّف بأنه: عدد تكرارات الحدث في وحدة الزمن = عدد دورات الإشارة في الثانية الواحدة.'
                : 'Frequency of a periodic signal is defined as: the number of occurrences of a repeating event per unit time = Number of signal cycles per one second.',
              variant: 'info',
            },
            {
              type: 'paragraph',
              text: isArabic 
                ? 'لقياس تردد إشارة دورية معينة، تُستخدم موجة تلك الإشارة لتبديل عداد لفترة زمنية ثابتة محددة. عدد الدورات المحسوبة في وحدة الزمن يشير إلى تردد الإشارة.'
                : 'To measure the frequency of a periodic signal, the waveform is used to toggle a counter for a fixed time. The number of counted cycles per unit time indicates the signal frequency.',
            },
          ],
        },
        {
          title: isArabic ? 'عداد التردد الرقمي الأساسي' : 'Basic Digital Frequency Meter',
          content: [
            {
              type: 'circuit',
              src: frequencyMeter,
              title: isArabic ? 'المخطط الكتلي لعداد التردد' : 'Frequency Meter Block Diagram',
              description: isArabic 
                ? 'يتكون من: مكبر/مخفف، دائرة تشكيل الموجة، قاعدة الزمن، Flip-flop، بوابة AND، عداد، ومسجل العرض.'
                : 'Consists of: amplifier/attenuator, wave shaping circuit, time base, flip-flop, AND gate, counter, and display register.',
            },
            {
              type: 'list',
              items: isArabic ? [
                'يتم تكبير أو تخفيف إشارة الدخل حسب الحاجة',
                'تُحوَّل الإشارة إلى موجة مربعة وتُغذى إلى طرف بوابة AND',
                'إشارة قاعدة الزمن بتردد 1Hz تُغذى إلى Flip-flop',
                'يقسم Flip-flop التردد على 2 مما يعطي High لمدة 1 ثانية وLow لثانية أخرى',
                'دائرة العداد تعد نبضات الدخل لمدة 1 ثانية (التردد)',
              ] : [
                'Input signal is amplified or attenuated as necessary',
                'Signal is converted to square wave and fed to AND gate terminal',
                'Time base signal with 1Hz frequency is fed to flip-flop',
                'Flip-flop divides frequency by 2, giving High for 1s and Low for 1s',
                'Counter circuit counts input pulses for 1 second duration (Frequency)',
              ],
            },
          ],
        },
        {
          title: isArabic ? 'تغيير نطاق التردد' : 'Frequency Range Changing',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'يمكن استخدام ترددات قاعدة زمنية مختلفة لإعطاء عدة نطاقات لقياسات التردد. يمكن تحقيق قواعد زمنية مختلفة عن طريق توصيل عدادات عقدية متسلسلة. كل عداد عقدي يقسم التردد على 10.'
                : 'Different time-base frequencies can be used to give several ranges of frequency measurements. Different time bases can be achieved by connecting series decade counters. Each decade counter divides the frequency by 10.',
            },
            {
              type: 'formula',
              title: isArabic ? 'العلاقة بين التردد والفترة' : 'Frequency-Period Relationship',
              formula: 'f = 1/T',
              explanation: isArabic 
                ? 'حيث f هو التردد بالهرتز (Hz) و T هي الفترة الزمنية بالثواني (s)'
                : 'Where f is frequency in Hertz (Hz) and T is the time period in seconds (s)',
            },
          ],
        },
      ],
    },
    // Lecture 4: Function Generators
    {
      title: isArabic ? 'مولدات الإشارات' : 'Function Generators',
      subtitle: isArabic ? 'توليد الموجات المختلفة' : 'Generating Different Waveforms',
      objectives: isArabic ? [
        'فهم مبدأ عمل مولدات الإشارات',
        'دراسة دائرة Schmitt trigger',
        'فهم توليد الموجة المثلثة والمربعة',
        'حساب تردد وسعة الخرج',
      ] : [
        'Understand function generator operation',
        'Study Schmitt trigger circuit',
        'Understand triangular and square wave generation',
        'Calculate output frequency and amplitude',
      ],
      sections: [
        {
          title: isArabic ? 'الدائرة الأساسية' : 'Basic Circuit',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'مولد الإشارات ينتج خرج موجة جيبية ومربعة ومثلثة. أحياناً تُولَّد موجة منحدرة أيضاً. تردد وسعة الخرج قابلان للتغيير، وقد يتضمن ضبط إزاحة DC.'
                : 'A function generator produces sine, square, and triangular waveform outputs. Sometimes a ramp waveform is also generated. Output frequency and amplitude are variable, and a DC offset adjustment may be included.',
            },
            {
              type: 'circuit',
              src: functionGenerator,
              title: isArabic ? 'دائرة مولد الإشارات' : 'Function Generator Circuit',
              description: isArabic 
                ? 'تتكون من مكامل (Integrator) ودائرة Schmitt trigger. المكامل يولد الموجة المثلثة و Schmitt trigger يولد الموجة المربعة.'
                : 'Consists of an integrator and Schmitt trigger circuit. The integrator generates the triangular wave and Schmitt trigger generates the square wave.',
            },
          ],
        },
        {
          title: isArabic ? 'دائرة Schmitt Trigger' : 'Schmitt Trigger Circuit',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'دائرة Schmitt trigger هي من النوع غير المقلوب. عندما يزداد جهد الدخل إلى نقطة الإطلاق العليا (UTP)، يرتفع الخرج فجأة من مستواه الأكثر سلبية إلى مستواه الأكثر إيجابية.'
                : 'The Schmitt trigger circuit is a non-inverting type. When the input voltage increases to the upper trigger point (UTP), the output suddenly rises from its most negative level to its most positive level.',
            },
            {
              type: 'concept',
              title: isArabic ? 'نقاط الإطلاق' : 'Trigger Points',
              text: isArabic 
                ? 'UTP (Upper Trigger Point): النقطة التي يتحول عندها الخرج من Low إلى High. LTP (Lower Trigger Point): النقطة التي يتحول عندها الخرج من High إلى Low.'
                : 'UTP (Upper Trigger Point): Point where output switches from Low to High. LTP (Lower Trigger Point): Point where output switches from High to Low.',
              variant: 'info',
            },
            {
              type: 'formula',
              title: isArabic ? 'فرق الجهد المطلوب' : 'Required Voltage Difference',
              formula: 'Vdiff = 14V / 200,000 = 70μV',
              explanation: isArabic 
                ? 'هذا هو الحد الأدنى لفرق الجهد بين طرفي الدخل لإنتاج تشبع الخرج.'
                : 'This is the minimum voltage difference between input terminals to produce output saturation.',
            },
          ],
        },
      ],
    },
    // Lecture 5: Oscilloscopes
    {
      title: isArabic ? 'راسم الذبذبات (الأوسيلوسكوب)' : 'Oscilloscopes',
      subtitle: isArabic ? 'أنبوب الأشعة الكاثودية والتشغيل' : 'Cathode Ray Tube and Operation',
      objectives: isArabic ? [
        'فهم تركيب أنبوب الأشعة الكاثودية CRT',
        'دراسة مبدأ عمل الأوسيلوسكوب',
        'فهم عناصر التحكم المختلفة',
        'قياس الجهد والتردد باستخدام الأوسيلوسكوب',
      ] : [
        'Understand CRT construction',
        'Study oscilloscope working principle',
        'Understand different control elements',
        'Measure voltage and frequency using oscilloscope',
      ],
      sections: [
        {
          title: isArabic ? 'مقدمة عن الأوسيلوسكوب' : 'Introduction to Oscilloscope',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'الأوسيلوسكوب يتكون من أنبوب أشعة كاثودية (CRT) ودوائر التحكم والدخل المرتبطة به. في CRT، يتم توليد الإلكترونات عند كاثود مُسخَّن وتُشكَّل في حزمة دقيقة وتُسرَّع نحو شاشة فلورية. تتوهج الشاشة عند النقطة التي تضربها الإلكترونات.'
                : 'The oscilloscope consists of a Cathode Ray Tube (CRT) and its associated control and input circuitry. In the CRT, electrons generated at a heated cathode are shaped into a fine beam and accelerated toward a fluorescent screen. The screen glows at the point where the electrons strike.',
            },
            {
              type: 'circuit',
              src: crtDiagram,
              title: isArabic ? 'تركيب أنبوب الأشعة الكاثودية' : 'CRT Construction',
              description: isArabic 
                ? 'يتكون من: مسدس الإلكترون، الشبكة، الأنود المسرع، ألواح الانحراف الرأسية والأفقية، والشاشة الفلورية.'
                : 'Consists of: electron gun, grid, accelerating anode, vertical and horizontal deflecting plates, and fluorescent screen.',
            },
          ],
        },
        {
          title: isArabic ? 'مبدأ العمل' : 'Operating Principle',
          content: [
            {
              type: 'circuit',
              src: oscilloscopeCrt,
              title: isArabic ? 'مسار الإلكترونات في CRT' : 'Electron Path in CRT',
              description: isArabic 
                ? 'يتم انحراف حزمة الإلكترون رأسياً وأفقياً بواسطة جهود مطبقة على ألواح الانحراف. عادةً يتم مسح الحزمة أفقياً عبر الشاشة بواسطة جهد منحدر.'
                : 'The electron beam is deflected vertically and horizontally by voltages applied to deflecting plates. Usually, the beam is swept horizontally across the screen by a ramp voltage.',
            },
            {
              type: 'list',
              items: isArabic ? [
                'يتم مسح الحزمة أفقياً بواسطة دائرة قاعدة الزمن',
                'الموجة المراد فحصها تُطبق لانحراف الحزمة رأسياً',
                'ينتج عن ذلك عرض جهد-مقابل-زمن للموجة',
                'معظم الأوسيلوسكوبات ثنائية الأثر (dual-trace)',
              ] : [
                'The beam is swept horizontally by a time base circuit',
                'The waveform to be investigated deflects the beam vertically',
                'This results in a voltage-versus-time display',
                'Most oscilloscopes are dual-trace instruments',
              ],
            },
          ],
        },
      ],
    },
    // Lecture 6: Voltage, Frequency & Phase Measurement
    {
      title: isArabic ? 'قياس الجهد والتردد والطور' : 'Voltage, Frequency & Phase Measurement',
      subtitle: isArabic ? 'استخدام الأوسيلوسكوب للقياسات' : 'Using Oscilloscope for Measurements',
      objectives: isArabic ? [
        'قياس جهد القمة للقمة (Vp-p)',
        'تحديد تردد الموجة',
        'قياس فرق الطور بين موجتين',
        'فهم إعدادات VOLTS/DIV و TIME/DIV',
      ] : [
        'Measure peak-to-peak voltage (Vp-p)',
        'Determine wave frequency',
        'Measure phase difference between two waves',
        'Understand VOLTS/DIV and TIME/DIV settings',
      ],
      sections: [
        {
          title: isArabic ? 'قياس جهد القمة للقمة' : 'Peak-to-Peak Voltage Measurement',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'سعة القمة للقمة للموجة المعروضة تُقاس بسهولة على الأوسيلوسكوب. من المهم جداً التحقق من أن المفتاح المركزي على تحكم VOLTS/DIV في وضعه المعاير (CAL) قبل قياس سعات الموجة.'
                : 'The peak-to-peak amplitude of a displayed waveform is very easily measured on an oscilloscope. It is very important to check that the central vernier knob on the VOLTS/DIV control is in its calibrated (CAL) position before measuring.',
            },
            {
              type: 'formula',
              title: isArabic ? 'حساب Vp-p' : 'Vp-p Calculation',
              formula: 'Vp-p = (vertical divisions) × (VOLTS/DIV)',
              explanation: isArabic 
                ? 'مثال: إذا كانت الموجة تشغل 4.6 تقسيم رأسي والإعداد 100mV/DIV، فإن Vp-p = 4.6 × 100mV = 460mV'
                : 'Example: If wave occupies 4.6 vertical divisions at 100mV/DIV setting, then Vp-p = 4.6 × 100mV = 460mV',
            },
          ],
        },
        {
          title: isArabic ? 'تحديد التردد' : 'Frequency Determination',
          content: [
            {
              type: 'formula',
              title: isArabic ? 'حساب الفترة الزمنية' : 'Time Period Calculation',
              formula: 'T = (horizontal divisions/cycle) × (TIME/DIV)',
              explanation: isArabic 
                ? 'التردد يُحسب كمعكوس الفترة الزمنية: f = 1/T'
                : 'Frequency is calculated as the inverse of time period: f = 1/T',
            },
            {
              type: 'concept',
              title: isArabic ? 'مثال عملي' : 'Practical Example',
              text: isArabic 
                ? 'الموجة A: T = (8.8 div) × 0.5ms = 4.4ms → f = 1/4.4ms ≈ 227 Hz'
                : 'Wave A: T = (8.8 div) × 0.5ms = 4.4ms → f = 1/4.4ms ≈ 227 Hz',
              variant: 'success',
            },
          ],
        },
      ],
    },
    // Lecture 7: Digital Storage Oscilloscope
    {
      title: isArabic ? 'الأوسيلوسكوب التخزيني الرقمي' : 'Digital Storage Oscilloscope',
      subtitle: isArabic ? 'عناصر التحكم والقياسات التلقائية' : 'Controls and Automatic Measurements',
      objectives: isArabic ? [
        'فهم واجهة الأوسيلوسكوب التخزيني',
        'استخدام القياسات التلقائية',
        'ضبط معاملات العرض',
        'قياس الإشارات المعقدة',
      ] : [
        'Understand DSO interface',
        'Use automatic measurements',
        'Adjust display parameters',
        'Measure complex signals',
      ],
      sections: [
        {
          title: isArabic ? 'عناصر التحكم الرئيسية' : 'Main Control Elements',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'الأوسيلوسكوب التخزيني الرقمي (DSO) يوفر عناصر تحكم متعددة الأغراض تشمل: التحكم في القناة، التحكم الأفقي، التحكم في المشغل (Trigger)، والقياسات التلقائية.'
                : 'The Digital Storage Oscilloscope (DSO) provides multi-purpose controls including: channel control, horizontal control, trigger control, and automatic measurements.',
            },
            {
              type: 'list',
              items: isArabic ? [
                'CH1/CH2: اختيار القناة النشطة',
                'POSITION: ضبط موضع الموجة على الشاشة',
                'SCALE: ضبط مقياس الجهد أو الزمن',
                'LEVEL: ضبط مستوى المشغل',
                'AUTO: ضبط تلقائي لأفضل عرض للموجة',
              ] : [
                'CH1/CH2: Select active channel',
                'POSITION: Adjust waveform position on screen',
                'SCALE: Adjust voltage or time scale',
                'LEVEL: Adjust trigger level',
                'AUTO: Automatic setup for best waveform display',
              ],
            },
          ],
        },
        {
          title: isArabic ? 'القياس التلقائي' : 'Automatic Measurement',
          content: [
            {
              type: 'concept',
              title: isArabic ? 'خطوات القياس السريع' : 'Quick Measurement Steps',
              text: isArabic 
                ? '1. ضبط معامل تخفيف المجس إلى 10X. 2. توصيل مجس CH1 بنقطة القياس. 3. الضغط على زر AUTO للضبط التلقائي.'
                : '1. Set probe attenuation to 10X. 2. Connect CH1 probe to measurement point. 3. Press AUTO button for automatic setup.',
              variant: 'info',
            },
            {
              type: 'list',
              items: isArabic ? [
                'قياس الجهد: Vp-p, Vmax, Vmin, Vrms',
                'قياس الزمن: التردد، الفترة، وقت الصعود، وقت الهبوط',
                'قياس الطور: فرق الطور بين قناتين',
              ] : [
                'Voltage measurements: Vp-p, Vmax, Vmin, Vrms',
                'Time measurements: Frequency, Period, Rise time, Fall time',
                'Phase measurements: Phase difference between two channels',
              ],
            },
          ],
        },
      ],
    },
    // Lecture 8: Transducers & Bridges
    {
      title: isArabic ? 'المحولات والجسور' : 'Transducers & Bridge Circuits',
      subtitle: isArabic ? 'جسر ويتستون ومحولات القياس' : 'Wheatstone Bridge and Measurement Transducers',
      objectives: isArabic ? [
        'فهم مبدأ عمل جسر ويتستون',
        'دراسة الجسور المتناوبة AC',
        'فهم محولات الإزاحة والحرارة',
        'دراسة محولات الإجهاد ومحولات الموجات فوق الصوتية',
      ] : [
        'Understand Wheatstone bridge principle',
        'Study AC bridge circuits',
        'Understand displacement and temperature transducers',
        'Study strain gauges and ultrasonic transducers',
      ],
      sections: [
        {
          title: isArabic ? 'جسر ويتستون' : 'Wheatstone Bridge',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'جسر ويتستون هو الجسر الكلاسيكي باستخدام مقاومات كمكونات. يكون الجسر متوازناً عندما يتساوى الجهد عند النقطة X مع الجهد عند النقطة Y.'
                : 'The Wheatstone bridge is the classic bridge using resistors as components. The bridge is balanced when the voltage at point X is equal to the voltage at point Y.',
            },
            {
              type: 'circuit',
              src: wheatstoneBridge,
              title: isArabic ? 'جسر ويتستون' : 'Wheatstone Bridge',
              description: isArabic 
                ? 'عند التوازن: R1/R2 = R3/R4 (معادلة الجسر). هذه الجسور أكثر دقة من الأوميتر العادي بدقة تصل إلى 0.1%.'
                : 'At balance: R1/R2 = R3/R4 (Bridge Equation). These bridges are more accurate than regular ohmmeters with typical accuracy of 0.1%.',
            },
            {
              type: 'formula',
              title: isArabic ? 'معادلة الجسر' : 'Bridge Equation',
              formula: 'R1/R2 = R3/R4',
              explanation: isArabic 
                ? 'هذه المعادلة صحيحة فقط عند التوازن. يمكن استخدامها لحساب مقاومة مجهولة.'
                : 'This equation is true only at balance. It can be used to calculate unknown resistance.',
            },
          ],
        },
        {
          title: isArabic ? 'الجسور المتناوبة' : 'AC Bridges',
          content: [
            {
              type: 'circuit',
              src: acBridge,
              title: isArabic ? 'جسر المقاومة المتناوب' : 'AC Resistive Bridge',
              description: isArabic 
                ? 'يستخدم محول لإعطاء عزل أفضل بين المذبذب والجسر. يمكن جعل جانبي الجسر متساويين ومتعاكسين في الإثارة.'
                : 'Uses a transformer for better isolation between oscillator and bridge. Both sides of the bridge can be made exactly equal and opposite in excitation.',
            },
            {
              type: 'paragraph',
              text: isArabic 
                ? 'ميزة أخرى هي أن الجسر يحتاج فقط إلى مقاومتين (كلاهما عادةً محولات) ويمكن الحصول بسهولة على خرج أحادي الطرف عن طريق تأريض الجزء الأوسط من الملف الثانوي.'
                : 'Another advantage is that the bridge requires only two resistors (both usually transducers) and a single-ended output is easily obtained by grounding the center part of the secondary.',
            },
          ],
        },
        {
          title: isArabic ? 'محولات الإجهاد' : 'Strain Gauges',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'محولات الإجهاد هي أساساً شرائح رقيقة من المادة تتغير مقاومتها عند تعرضها للإجهاد. المعادلة الأساسية تُعطى بعامل المحول (GF).'
                : 'Strain gauges are essentially thin strips of material whose resistance changes when strained. The basic equation is given in terms of the gauge factor (GF).',
            },
            {
              type: 'formula',
              title: isArabic ? 'عامل المحول' : 'Gauge Factor',
              formula: 'GF = (δR/R)/(δl/l) = 1 + 2ν + (δρ/ρ)/(δl/l)',
              explanation: isArabic 
                ? 'حيث ν هي نسبة بواسون و ρ هي المقاومية. للمعادن GF ≈ 2، وللموصلات النصفية GF يمكن أن يصل إلى 100.'
                : 'Where ν is Poisson ratio and ρ is resistivity. For metals GF ≈ 2, for semiconductors GF can reach 100.',
            },
            {
              type: 'circuit',
              src: strainGauge,
              title: isArabic ? 'أنماط محولات الإجهاد' : 'Strain Gauge Patterns',
              description: isArabic 
                ? 'أنواع مختلفة: خطي، وردة، عزم، غشاء. تُستخدم في قياس القوة والضغط والتسارع.'
                : 'Different types: Linear, Rosette, Torque, Diaphragm. Used for measuring force, pressure, and acceleration.',
            },
          ],
        },
        {
          title: isArabic ? 'محولات الموجات فوق الصوتية' : 'Ultrasonic Transducers',
          content: [
            {
              type: 'paragraph',
              text: isArabic 
                ? 'الموجات فوق الصوتية هي نطاق ترددات أعلى من 20 كيلوهرتز، أي فوق النطاق الصوتي الذي يمكن للإنسان سماعه عادةً.'
                : 'Ultrasound is a band of frequencies above 20 kHz, that is, above the sonic range that humans can usually hear.',
            },
            {
              type: 'circuit',
              src: ultrasonicSensor,
              title: isArabic ? 'مستشعر الموجات فوق الصوتية' : 'Ultrasonic Sensor',
              description: isArabic 
                ? 'يتكون من مرسل ومستقبل. يُحدد التغير في المتغير المقاس إما بقياس تغير الزمن أو تغير الطور أو التردد.'
                : 'Consists of transmitter and receiver. Changes in measured variable determined by measuring change in time, phase, or frequency.',
            },
            {
              type: 'table',
              headers: isArabic ? ['الوسط', 'السرعة (م/ث)'] : ['Medium', 'Velocity (m/s)'],
              rows: [
                [isArabic ? 'الهواء' : 'Air', '331.6'],
                [isArabic ? 'الماء' : 'Water', '1440'],
                [isArabic ? 'الخشب (صنوبر)' : 'Wood (pine)', '3320'],
                [isArabic ? 'الحديد' : 'Iron', '5130'],
              ],
            },
            {
              type: 'formula',
              title: isArabic ? 'سرعة الصوت في الهواء' : 'Speed of Sound in Air',
              formula: 'V = 331.6 + 0.6T m/s',
              explanation: isArabic 
                ? 'حيث T هي درجة الحرارة بالدرجة المئوية. تغير 20°C يغير السرعة من 331.6 إلى 343.6 م/ث.'
                : 'Where T is temperature in °C. A 20°C change varies speed from 331.6 to 343.6 m/s.',
            },
          ],
        },
      ],
    },
  ];
}

export default LectureDetailPage;
